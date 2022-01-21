angular.module('inspinia').controller(
    'dokuman_yetki_kullanici_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanYetkiKullanici', 'srvKullanici', 'srvDokumanYetkiGrupKlasor', 'srvDokumanYetkiGrup', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanYetkiKullanici, srvKullanici, srvDokumanYetkiGrupKlasor, srvDokumanYetkiGrup, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanKlasorID = $stateParams.dokumanKlasorID;
            $scope.AramaKriterKullaniciYetki = {
                MUSTERI_ID: '',
                DOKUMAN_KLASOR_ID : $scope.dokumanKlasorID,
                KULLANICI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.KullaniciListesiniGetir();
                $scope.DokumanYetkiGrupGetData();
                if ($scope.dokumanKlasorID > 0) {
                    $scope.DokumanYetkiKullaniciGetData();
                    $scope.DokumanYetkiGrupKlasorGetData();
                }
                
            }

            $scope.DokumanYetkiKullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiKullanici.DokumanYetkiKullaniciGetData($scope.AramaKriterKullaniciYetki);
                promiseGet.then(function (gelen) {
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Doküman personel yetki listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman personel yetki listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiKullaniciYetki = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanYetkiKullaniciListesi = gelen.data.Veri;
                        $rootScope.sayfayukleniyor = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiKullanici listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanYetkiKullaniciGetData Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanYetkiKullaniciSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiKullanici.DokumanYetkiKullaniciSil(info.DOKUMAN_YETKI_KULLANICI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DokumanYetkiKullaniciGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DokumanYetkiKullaniciSil Hata:', hata);
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
                            $scope.DokumanYetkiKullaniciSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizleYetkiKulanici = function () {
                $scope.AramaKriterKullaniciYetki = {
                    MUSTERI_ID: '',
                    DOKUMAN_KLASOR_ID : $scope.dokumanKlasorID,
                    KULLANICI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.DokumanYetkiKullaniciGetData($scope.AramaKriterKullaniciYetki);
            }

            $scope.DokumanYetkiKullaniciEkleGuncelle = function (InfoYetkiKullanici, frmYetkiKullanici) {
                if (frmYetkiKullanici != null) {
                    $scope.formCalistirildiYetkiKullanici = true;
                    if (frmYetkiKullanici.$valid) { } else {
                        $rootScope.focusToInvalid(frmYetkiKullanici);
                        return;
                    }
                }
                
                InfoYetkiKullanici.DOKUMAN_KLASOR_ID = $scope.dokumanKlasorID;
                var promiseGet = srvDokumanYetkiKullanici.DokumanYetkiKullaniciEkleGuncelle(InfoYetkiKullanici);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanYetkiKullaniciEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.InfoYetkiKullanici.KULLANICI_ID = null;
                        $scope.formCalistirildiYetkiKullanici = false;
                        $scope.DokumanYetkiKullaniciGetData();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanYetkiKullaniciEkleGuncelle Hata:', errorPl);
                    });
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


            $scope.AramaKriterYetkiGrupKlasor = {
                DOKUMAN_KLASOR_ID: $scope.dokumanKlasorID,
                DOKUMAN_YETKI_GRUP_ID: '',
                LISTE:true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.DokumanYetkiGrupKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorGetData($scope.AramaKriterYetkiGrupKlasor);
                promiseGet.then(function (gelen) {
                    
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Doküman yetki grup listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman yetki grup listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiYetkiGrupKlasor = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanYetkiGrupKlasorListesi = gelen.data.Veri;
                        $rootScope.sayfayukleniyor = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiGrupKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanYetkiGrupKlasorGetData Hata:', hata);
                    });
            };


            $scope.DokumanYetkiGrupKlasorEkleGuncelle = function (InfoYetkiKlasor, frmYetkiGrupKlasor) {
                if (frmYetkiGrupKlasor != null) {
                    $scope.formCalistirildi = true;
                    if (frmYetkiGrupKlasor.$valid) { } else {
                        $rootScope.focusToInvalid(frmYetkiGrupKlasor);
                        return;
                    }
                }
                
                InfoYetkiKlasor.DOKUMAN_KLASOR_ID = $scope.dokumanKlasorID;
                
                var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorEkleGuncelle(InfoYetkiKlasor);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanYetkiGrupKlasorEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.DokumanYetkiGrupKlasorSelect();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanYetkiGrupKlasorEkleGuncelle Hata:', errorPl);
                    });
            }

            $scope.DokumanYetkiGrupGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrup.DokumanYetkiGrupGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanYetkiGrupListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiGrup listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanYetkiGrupGetData Hata:', hata);
                    });
            };


            $scope.filtreTemizleYetkiGrup = function () {

                $scope.AramaKriterYetkiGrupKlasor = {
                    DOKUMAN_KLASOR_ID: $scope.dokumanKlasorID,
                    DOKUMAN_YETKI_GRUP_ID: '',
                    LISTE: true,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.DokumanYetkiGrupKlasorGetData($scope.AramaKriterYetkiGrupKlasor);
            }

        }]);

