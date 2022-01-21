angular.module('inspinia').controller(
    'etki_degeri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvEtkiDegeri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvEtkiDegeri, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                ETKI_DEGERI_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.EtkiDegeriGetData();
            }

            $scope.EtkiDegeriGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkiDegeri.EtkiDegeriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etki degeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W')
                        console.error('Etki değeri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.EtkiDegeriListesi = gelen.data.Veri;
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
                        console.error('Etki değeri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ETKI_DEGERI_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.EtkiDegeriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkiDegeri.EtkiDegeriSil(info.ETKI_DEGERI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etki değeri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etki değeri silme işlemi sırasında bir hata oluştu. Hata:', hata.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Etki değeri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.EtkiDegeriListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.EtkiDegeriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etki değeri silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.EtkiDegeriSil($scope.secilenKayit);
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
                    ETKI_DEGERI_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.EtkiDegeriGetData($scope.AramaKriter);
            }

            $scope.EtkiDegeriEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $scope.sayfayukleniyor = true;
                if ($scope.frmEtkiDegeri.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmEtkiDegeri);
                    return;
                }
                var promiseGet = srvEtkiDegeri.EtkiDegeriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    $scope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etki değeri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etki değeri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Etki değeri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.EtkiDegeriGetData();
                        $scope.Info.ETKI_DEGERI_ADI = null;
                        $scope.Info.VARLIK_OLASILIK_ETKI_DEGERI_TIPI_ID = null;
                        $scope.Info.ETKI_DEGERI_PERIYOT = null;
                        $scope.Info.ETKI_DEGERI_KATSAYISI = null;
                    }
                },
                    function (hata) {
                        $scope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etki değeri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

