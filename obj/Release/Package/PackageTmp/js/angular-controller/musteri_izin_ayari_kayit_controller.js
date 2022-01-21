angular.module('inspinia').controller(
    'musteri_izin_ayari_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvMusteriIzinAyari', 'srvMusteriTatilGunleri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvMusteriIzinAyari, srvMusteriTatilGunleri, Ayarlarim) {
            $scope.musteriID = $stateParams.musteriID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterTatilGunu = {
                MUSTERI_ID: $scope.musteriID,
                TATIL_GUNU: null,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.musteriID > 0) {
                    $scope.MusteriIzinAyariSelect();
                    $scope.MusteriTatilGunleriGetData();
                }
                    
            }

            $scope.MusteriIzinAyariSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMusteriIzinAyari.MusteriIzinAyariSelect($scope.musteriID);

                promiseGet.then(function (gelen) {
                    $scope.InfoIzinAyar = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "MusteriIzinAyari bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('MusteriIzinAyariSelect Hata:', hata);
                    });
            }

            $scope.MusteriIzinAyariEkleGuncelle = function (InfoIzinAyar, frmIzinAyar) {
                $scope.formCalistirildiIzinAyar = true;
                $rootScope.sayfayukleniyor = true;
                if (frmIzinAyar.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmIzinAyar);
                    return;
                }
                InfoIzinAyar.MUSTERI_ID = $scope.musteriID;
                var promiseGet = srvMusteriIzinAyari.MusteriIzinAyariEkleGuncelle(InfoIzinAyar);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('MusteriIzinAyariEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $rootScope.sayfayukleniyor = false;
                        $scope.formCalistirildiIzinAyar = false;
                        $scope.MusteriIzinAyariSelect();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('MusteriIzinAyariEkleGuncelle Hata:', errorPl);
                    });
            }

           

            $scope.MusteriTatilGunleriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMusteriTatilGunleri.MusteriTatilGunleriGetData($scope.AramaKriterTatilGunu);
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisiTatilGunleri = gelen.data.ToplamKayitSayisi;
                    $scope.MusteriTatilGunleriListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "MusteriTatilGunleri listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('MusteriTatilGunleriGetData Hata:', hata);
                    });
            };

            $scope.MusteriTatilGunleriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMusteriTatilGunleri.MusteriTatilGunleriSil(info.MUSTERI_TATIL_GUNLERI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.MusteriTatilGunleriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('MusteriTatilGunleriSil Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiTatilGunu = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.MusteriTatilGunleriSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.MusteriTatilGunleriEkleGuncelle = function (InfoTatilGunleri, frmTatilGunleri) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTatilGunleri = true;
                if (frmTatilGunleri.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTatilGunleri);
                    return;
                }
                InfoTatilGunleri.MUSTERI_ID = $scope.musteriID;
                if (InfoTatilGunleri.TEKRARLANSIN_MI != true) {
                    InfoTatilGunleri.TEKRARLANSIN_MI = false;
                }
                var promiseGet = srvMusteriTatilGunleri.MusteriTatilGunleriEkleGuncelle(InfoTatilGunleri);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E');
                        console.error('MusteriTatilGunleriEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.MusteriTatilGunleriGetData();
                        $rootScope.sayfayukleniyor = false;
                        $scope.formCalistirildiTatilGunleri = false;
                        $scope.InfoTatilGunleri.TATIL_GUNU = null;
                        $('#txtTATIL_GUNU').val(null);
                        $scope.InfoTatilGunleri.TEKRARLANSIN_MI = null;
                    }
                },
                    function (errorPl) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W');
                        console.error('MusteriTatilGunleriEkleGuncelle Hata:', errorPl);
                    });
            }

            $scope.filtreTemizleTatilGunleri = function () {
                $('#txtTATIL_GUNU_FITRELE').val(null);
                $scope.AramaKriterTatilGunu = {
                    MUSTERI_ID: $scope.musteriID,
                    TATIL_GUNU: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.MusteriTatilGunleriGetData($scope.AramaKriterTatilGunu);
            }
        }]);

