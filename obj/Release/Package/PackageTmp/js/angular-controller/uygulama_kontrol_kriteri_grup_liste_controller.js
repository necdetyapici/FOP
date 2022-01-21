angular.module('inspinia').controller(
    'uygulama_kontrol_kriteri_grup_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvUygulamaKontrolKriteriGrup', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvUygulamaKontrolKriteriGrup, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                UYGULAMA_KONTROL_KRITERI_GRUP_ADI: '',
                UYGULAMA_KONTROL_GRUP: false,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.UygulamaKontrolKriteriGrupGetData();
                $scope.UstUygulamaKontrolKriteriGrupGetData();
            }

            $scope.UygulamaKontrolKriteriGrupGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri grup listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri grup listesi yüklenirken bir hata oluştu. Hata:', gelen.hata.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.UygulamaKontrolKriteriGrupListesi = gelen.data.Veri;
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
                        console.error('Uygulama kontrol kriteri grup listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.UYGULAMA_KONTROL_KRITERI_GRUP_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.UygulamaKontrolKriteriGrupSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupSil(info.UYGULAMA_KONTROL_KRITERI_GRUP_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri grup silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri grup silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Uygulama kontrol kriteri grup silme işleminiz başarılı bir şekilde gerçekleştirilmiştir", 'S');
                        if ($scope.UygulamaKontrolKriteriGrupListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.UygulamaKontrolKriteriGrupGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri grup silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.UygulamaKontrolKriteriGrupSil($scope.secilenKayit);
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
                    UYGULAMA_KONTROL_KRITERI_GRUP_ADI: null,
                    LISTE: true,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.UygulamaKontrolKriteriGrupGetData($scope.AramaKriter);
            }

            $scope.UygulamaKontrolKriteriGrupEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmUygulamaKontrolKriteriGrup.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmUygulamaKontrolKriteriGrup);
                    return;
                }
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri grup kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri grup kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Uygulama kontrol kriteri grup kayıt işlemi başarılı bir şekilde gerçekleştirilmiştir", 'S');
                        $scope.UygulamaKontrolKriteriGrupGetData();
                        $scope.UstUygulamaKontrolKriteriGrupGetData();
                        angular.element("#txtUYGULAMA_KONTROL_KRITERI_GRUP_ADI")[0].value = null;
                        $scope.Info.UST_UYGULAMA_KONTROL_KRITERI_GRUP_ID = null;
                        $scope.Info.UYGULAMA_KONTROL_KRITERI_GRUP_ADI = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri grup kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.UstUygulamaKontrolKriteriGrupGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri üst grup listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri üst grup listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.UstUygulamaKontrolKriteriGrupListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri üst grup listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

