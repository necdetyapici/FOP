angular.module('inspinia').controller(
    'konfigurasyon_arac_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvKonfigurasyonArac', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvKonfigurasyonArac, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                PROJE_ID: $scope.konfigurasyonaracID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                KONFIGURASYON_ARACI: '',
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.KonfigurasyonAracGetData();
            }

            $scope.KonfigurasyonAracGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKonfigurasyonArac.KonfigurasyonAracGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W')
                        console.error('Konfigürasyon araç listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.KonfigurasyonAracListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Konfigürasyon araç listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.KONFIGURASYON_ARACI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.KonfigurasyonAracSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKonfigurasyonArac.KonfigurasyonAracSil(info.KONFIGURASYON_ARAC_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    } else {
                        mesajGoster('İşlem tamam.', "Konfigürasyon araç silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.KonfigurasyonAracListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.KonfigurasyonAracGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç silme işlemi sırasında bir hata oluştu.Hata:', hata);
                    });

            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.KonfigurasyonAracSil($scope.secilenKayit);
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
                    KONFIGURASYON_ARACI: null,
                    LISTE: true
                };
                $scope.KonfigurasyonAracGetData($scope.AramaKriter);
            }

            $scope.KonfigurasyonAracEkleGuncelle = function (Info) {
                $scope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frm_KonfigurasyonArac.$valid) { } else {
                    $scope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frm_KonfigurasyonArac);
                    return;
                }
                var promiseGet = srvKonfigurasyonArac.KonfigurasyonAracEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    $scope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Konfigürasyon araç kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.KonfigurasyonAracGetData();
                        $scope.Info.KONFIGURASYON_ARACI = null;
                    }
                },
                    function (hata) {
                        $scope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }
        }]);

