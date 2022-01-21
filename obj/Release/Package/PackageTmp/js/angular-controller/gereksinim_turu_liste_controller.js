angular.module('inspinia').controller(
    'gereksinim_turu_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGereksinimTuru', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGereksinimTuru, Ayarlarim) {
            $scope.AramaKriter = {
                LISTE: true,
                GEREKSINIM_TURU_ADI: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.GereksinimTuruGetData();
            }

            $scope.GereksinimTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGereksinimTuru.GereksinimTuruGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim Turu listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim Turu listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.GereksinimTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Gereksinim Turu listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.GEREKSINIM_TURU_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.GereksinimTuruSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGereksinimTuru.GereksinimTuruSil(info.GEREKSINIM_TURU_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim Turu silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim Turu silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Gereksinim Turu silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.GereksinimTuruGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('GereksinimTuruSil Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.GereksinimTuruSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.GereksinimTuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvGereksinimTuru.GereksinimTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('Gereksinim Turu Kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                        $rootScope.sayfayukleniyor = false;

                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('Gereksinim Turu Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz. Hata:', errorPl);
                        $rootScope.sayfayukleniyor = false;
                    });
            }
        }]);

