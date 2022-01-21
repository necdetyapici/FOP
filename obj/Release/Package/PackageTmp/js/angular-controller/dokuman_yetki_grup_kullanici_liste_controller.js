angular.module('inspinia').controller(
    'dokuman_yetki_grup_kullanici_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanYetkiGrupKullanici', 'srvKullanici', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanYetkiGrupKullanici, srvKullanici, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanYetkiGrupID = $stateParams.dokumanYetkiGrupID;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                LISTE: true,
                KULLANICI_ID: '',
                DOKUMAN_YETKI_GRUP_ID: $scope.dokumanYetkiGrupID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.KullaniciListesiniGetir();
                if ($scope.dokumanYetkiGrupID > 0) {
                    $scope.DokumanYetkiGrupKullaniciGetData();
                }
                
            }

            $scope.DokumanYetkiGrupKullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrupKullanici.DokumanYetkiGrupKullaniciGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanYetkiGrupKullaniciListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiGrupKullanici listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanYetkiGrupKullaniciGetData Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanYetkiGrupKullaniciSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrupKullanici.DokumanYetkiGrupKullaniciSil(info.DOKUMAN_YETKI_GRUP_KULLANICI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DokumanYetkiGrupKullaniciGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DokumanYetkiGrupKullaniciSil Hata:', hata);
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
                            $scope.DokumanYetkiGrupKullaniciSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.DokumanYetkiGrupKullaniciEkleGuncelle = function (InfoYetkiKullanici, frmYetkiGrupKullanici) {
                $scope.formCalistirildi = true;
                if (frmYetkiGrupKullanici.$valid) { } else {
                    $rootScope.focusToInvalid(frmYetkiGrupKullanici);
                    return;
                }
                InfoYetkiKullanici.DOKUMAN_YETKI_GRUP_ID = $scope.dokumanYetkiGrupID;
                var promiseGet = srvDokumanYetkiGrupKullanici.DokumanYetkiGrupKullaniciEkleGuncelle(InfoYetkiKullanici);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanYetkiGrupKullaniciEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.DokumanYetkiGrupKullaniciGetData();
                        $scope.InfoYetkiKullanici.KULLANICI_ID = null;
                        $scope.formCalistirildi = false;
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanYetkiGrupKullaniciEkleGuncelle Hata:', errorPl);
                    });
            }

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    MUSTERI_ID: '',
                    LISTE: true,
                    KULLANICI_ID: null,
                    DOKUMAN_YETKI_GRUP_ID: $scope.dokumanYetkiGrupID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.DokumanYetkiGrupKullaniciGetData($scope.AramaKriter);
            }

            $scope.AramaKriterListe = {
                LISTE: false,
            };

            $scope.KullaniciListesiniGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterListe);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

