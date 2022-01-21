angular.module('inspinia').controller(
    'mail_grup_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvKullanici', 'srvMailGrupKullanici', 'srvMailGrup', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvKullanici, srvMailGrupKullanici, srvMailGrup, Ayarlarim) {
            $scope.mailGrupID = $stateParams.mailGrupID;
            $scope.Ayarlar = Ayarlarim;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.MailGrupTuruGetData();
                if ($scope.mailGrupID > 0) {
                    $scope.MailGrupSelect();
                    $scope.MailGrupKullaniciGetData();
                    $scope.KullaniciGetData();
                }

            };

            $scope.MailGrupSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMailGrup.MailGrupSelect($scope.mailGrupID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Mail grup bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Mail Grup bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Mail grup bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MailGrupEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmMailGrup.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmMailGrup);
                    return;
                }
                var promiseGet = srvMailGrup.MailGrupEkleGuncelle(Info);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Mail grup kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Mail grup kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Mail grup kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.mailGrupID = gelen.data.returnKayitNo;
                        $state.go('yonetim.mailgrupkayit', { mailGrupID: $scope.mailGrupID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Mail grup kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MailGrupTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getMailTuruGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Mail grup türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Mail grup türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.MailGrupTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Mail grup türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
            $scope.AramaKriterKullanici = {
                LISTE: false
            }
            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterKullanici);
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


            $scope.PersonelEkle = function () {

                $scope.$modalInstancePersonelEkle = $modal.open({
                    templateUrl: 'views/common/modal_mail_grup_kullanici_ekle.html',
                    size: 'sm',
                    scope: $scope
                });
            };

            $scope.Geri = function () {
                $scope.formCalistirildiMailGrupKullanici = false;
                $scope.$modalInstancePersonelEkle.dismiss('cancel');
            };

            $scope.AramaKriterMailGrupKullanici = {
                LISTE: true,
                MAIL_GRUP_KULLANICI_AD_SOYAD: '',
                MAIL_GRUP_ID: $scope.mailGrupID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.MailGrupKullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMailGrupKullanici.MailGrupKullaniciGetData($scope.AramaKriterMailGrupKullanici);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Grup personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Grup personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiMailGrupKullanici = gelen.data.ToplamKayitSayisi;
                        $scope.MailGrupKullaniciListesi = gelen.data.Veri;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Grup personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.MailGrupKullaniciEkleGuncelle = function (InfoMailGrupKullanici, frmMailGrupKullanici) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiMailGrupKullanici = true;
                if (frmMailGrupKullanici.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid();
                    return;
                }
                InfoMailGrupKullanici.MAIL_GRUP_ID = $scope.mailGrupID;
                var promiseGet = srvMailGrupKullanici.MailGrupKullaniciEkleGuncelle(InfoMailGrupKullanici);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Grup personel kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Grup personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Grup personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");

                        $scope.MailGrupKullaniciGetData();
                        $scope.Geri();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Grup personel kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MailGrupKullaniciSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMailGrupKullanici.MailGrupKullaniciSil(info.MAIL_GRUP_KULLANICI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Mail grup kullanıcı silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Mail grup kullanıcı silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Mail grup kullanıcı silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.MailGrupKullaniciListesi.length == 1 && $scope.toplamKayitSayisiMailGrupKullanici > 10) {
                            $scope.AramaKriterMailGrupKullanici.SayfaNo = $scope.AramaKriterMailGrupKullanici.SayfaNo - 1;
                        }
                        $scope.MailGrupKullaniciGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('MailGrupKullaniciSil Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiMailGrupKullanici = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.MailGrupKullaniciSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizleMailGrupKullanici = function () {
                $scope.AramaKriterMailGrupKullanici = {
                    LISTE: true,
                    MAIL_GRUP_KULLANICI_AD_SOYAD: null,
                    MAIL_GRUP_ID: $scope.mailGrupID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.MailGrupKullaniciGetData($scope.AramaKriterMailGrupKullanici);
            };

        }]);

