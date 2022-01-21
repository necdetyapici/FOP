angular.module('inspinia').controller(
    'proje_fizibiletesi_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeFizibiletesi', 'srvMetrikler', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeFizibiletesi, srvMetrikler, srvGenel, Ayarlarim) {
            $scope.projeID = $stateParams.projeID;
            $scope.Ayarlar = Ayarlarim;

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                METRIK_ID: '',
                DEGERLENDIRME_YONTEMI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.AramaKriterMetrik = {
                LISTE: false
            };
            $scope.search = {};
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeFizibiletesiGetData();
                $scope.MetriklerGetData();
                $scope.DegerlendirmeYontemiGetData();
            };


            $scope.ProjeFizibiletesiGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeFizibiletesi.ProjeFizibiletesiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Fizibilite listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Fizibilite listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeFizibiletesiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Fizibilite listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.METRIK).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };


            $scope.ProjeFizibiletesiSil = function (InfoProjeFizibilite) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeFizibiletesi.ProjeFizibiletesiSil(InfoProjeFizibilite.PROJE_FIZIBILITE_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Fizibilite silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Fizibilite silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Fizibilite silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeFizibiletesiListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeFizibiletesiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Fizibilite silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.modalSilmeOnayi = function (InfoProjeFizibilite) {
                $scope.secilenKayit = InfoProjeFizibilite;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjeFizibiletesiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.MetriklerGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetMetrikler = srvMetrikler.MetriklerGetData($scope.AramaKriterMetrik);

                promiseGetMetrikler.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Metrik listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Metrik listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.MetriklerListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Metrik listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DegerlendirmeYontemiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetDegerlendirmeYontemi = srvGenel.getDegerlendirmeYontemi();

                promiseGetDegerlendirmeYontemi.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Değerlendirme yöntemi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Değerlendirme yöntemi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.DegerlendirmeYontemiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Değerlendirme yöntemi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    METRIK_ID: null,
                    DEGERLENDIRME_YONTEMI_ID: null,
                    PROJE_ID: $scope.projeID,
                    LISTE: true
                };
                $scope.ProjeFizibiletesiGetData($scope.AramaKriter);
            };

            $scope.ProjeFizibiletesiEkleGuncelle = function (InfoProjeFizibilite) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjeFizibilite = true;
                if ($scope.frmProjeFizibilitesi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeFizibilitesi);
                    return;
                }
                InfoProjeFizibilite.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeFizibiletesi.ProjeFizibiletesiEkleGuncelle(InfoProjeFizibilite);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Fizibilite kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Fizibilite kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjeFizibiletesiGetData();
                        $scope.formCalistirildiProjeFizibilite = false;
                        $scope.InfoProjeFizibilite.METRIK_ID = null;
                        $scope.InfoProjeFizibilite.DEGERLENDIRME_YONTEMI_ID = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

