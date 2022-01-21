angular.module('inspinia').controller(
    'olasilik_degeri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvOlasilikDegeri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvOlasilikDegeri, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                OLASILIK_DEGERI_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.OlasilikDegeriGetData();
            }

            $scope.OlasilikDegeriGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Olasılık değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W')
                        console.error('Olasılık değeri listesi yüklenirken bir hata oluştu.Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.OlasilikDegeriListesi = gelen.data.Veri;
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
                        console.error('Olasılık değeri listesi yüklenirken bir hata oluştu.Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.OLASILIK_DEGERI_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.OlasilikDegeriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriSil(info.OLASILIK_DEGERI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Olasılık değeri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Olasılık değeri silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Olasılık değeri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.OlasilikDegeriListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.OlasilikDegeriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Olasılık değeri silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.OlasilikDegeriSil($scope.secilenKayit);
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
                    OLASILIK_DEGERI_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.OlasilikDegeriGetData($scope.AramaKriter);
            }

            $scope.OlasilikDegeriEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmOlasilikDegeri.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmOlasilikDegeri);
                    return;
                }
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Olasılık değeri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Olasılık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Olasılık değeri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.OlasilikDegeriGetData();
                        $scope.Info.VARLIK_OLASILIK_ETKI_DEGERI_TIPI_ID = null;
                        $scope.Info.OLASILIK_DEGERI_ADI = null;
                        $scope.Info.OLASILIK_DEGERI_KATSAYISI = null;
                        $scope.Info.OLASILIK_DEGERI_PERIYOT = null;
                        $scope.formCalistirildi = false;

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Olasılık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

