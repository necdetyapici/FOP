angular.module('inspinia').controller(
    'proje_konfigurasyon_arac_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeKonfigurasyonArac', 'srvKonfigurasyonArac', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeKonfigurasyonArac, srvKonfigurasyonArac, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $scope.search = {};
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeKonfigurasyonAracGetData();
                $scope.konfigurasyonAracListesiYukle();
            }
            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                KONFIGURASYON_ARACI_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.ProjeKonfigurasyonAracGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeKonfigurasyonArac.ProjeKonfigurasyonAracGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeKonfigurasyonAracListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.KONFIGURASYON_ARACI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeKonfigurasyonAracSil = function (InfoProjeKonfigurasyonAraci) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeKonfigurasyonArac.ProjeKonfigurasyonAracSil(InfoProjeKonfigurasyonAraci.PROJE_KONFIGURASYON_ARAC_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Konfigürasyon araç silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeKonfigurasyonAracListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeKonfigurasyonAracGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjeKonfigurasyonAraci) {
                $scope.secilenKayit = InfoProjeKonfigurasyonAraci;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeKonfigurasyonAracSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PROJE_ID: $scope.projeID,
                    KONFIGURASYON_ARACI_ADI: null,
                    LISTE: true
                };
                $scope.ProjeKonfigurasyonAracGetData($scope.AramaKriter);
            }

            $scope.ProjeKonfigurasyonAracEkleGuncelle = function (InfoProjeKonfigurasyonAraci) {
                $scope.formCalistirildiProjeKonfigurasyonArac = true;
                if ($scope.frmProjeKonfigurasyonArac.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeKonfigurasyonArac);
                    return;
                }
                InfoProjeKonfigurasyonAraci.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeKonfigurasyonArac.ProjeKonfigurasyonAracEkleGuncelle(InfoProjeKonfigurasyonAraci);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjeKonfigurasyonArac = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Konfigürasyon kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjeKonfigurasyonAracGetData();
                        $scope.InfoProjeKonfigurasyonAraci.KONFIGURASYON_ARAC_ID = null;
                        angular.element("#txtACIKLAMA")[0].value = null;

                    }
                },
                    function (hata) {
                        $scope.formCalistirildiProjeKonfigurasyonArac = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.AramaKriterKonfigurasyonArac = {

                LISTE: false
            };
            $scope.konfigurasyonAracListesiYukle = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGetMetrikler = srvKonfigurasyonArac.KonfigurasyonAracGetData($scope.AramaKriterKonfigurasyonArac);

                promiseGetMetrikler.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç listesi yüklenirken bir hata oluştu. ', gelen.data.sistemMesaj);
                    } else {
                        $scope.KonfigurasyonAracListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }
        }]);

