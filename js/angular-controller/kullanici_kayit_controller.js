angular.module('inspinia').controller(
    'kullanici_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', '$log', 'srvGenel', 'ngDialog', 'srvYetkilendirme', 'srvKullanici', 'srvMusteri',  'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, $log, srvGenel, ngDialog, srvYetkilendirme, srvKullanici, srvMusteri,   Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {

                LISTE: false

            };

            $scope.AramaKriterListe = {
                KULLANICI_ID: $scope.kullaniciID,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.AramaKriterKullaniciYetki = {
                KULLANICI_ID: $scope.kullaniciID,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.init = function () {
                if ($scope.$storage.IS_PICT_YONETICI === true)
                    $scope.MusteriGetData();
                $scope.kullaniciTipiYukle();

                if ($scope.kullaniciID !== undefined && $scope.kullaniciID !== "") {
                    $scope.kullaniciBilgileriniYukle();

                } else {
                    //  $scope.GetYetkiKullaniciTipiID();

                }
            };


            $scope.MusteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMusteri.MusteriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Müşteri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Müşteri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.MusteriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciTipiYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getKullaniciTipiListesi();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı tipleri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı tipleri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.KullaniciTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı tipleri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciBilgileriniYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciSelect($scope.kullaniciID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Kullanici = gelen.data;
                        $scope.YetkiKullaniciTipiID = $scope.Kullanici.YetkiKullaniciTipiID;
                        //$scope.yetkiGruplariListesiniGetir();
                        //$scope.MusteriYetkiGrupGetData();
                        $scope.YetkiGruplariGetData();
                        $scope.getKullaniciYetkiGruplari();
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
                        console.error('Kullanıcı bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.YetkiGruplariGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.getYetkiGruplariListesi($scope.AramaKriter);
                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;
                    if (pl.data.Veri.length > 0 && pl.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grup listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grup listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                        $scope.YetkiGruplariListesi = pl.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yetki grup listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciKaydet = function (Kullanici) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frm_Kullanici.$valid) { }
                else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frm_Kullanici);
                    return;
                }

                if (Kullanici.BoolCinsiyet === true) {
                    Kullanici.CINSIYET = "E";
                } else {
                    Kullanici.CINSIYET = "K";
                }

                var promiseGet = srvKullanici.KullaniciKaydet(Kullanici);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        Kullanici.KULLANICI_ID = gelen.data.returnKayitNo;
                        $scope.kullaniciID = gelen.data.returnKayitNo;
                        $scope.kullaniciBilgileriniYukle();
                        mesajGoster("İşlem tamam.", "Kullanıcı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciTemizle = function () {
                $scope.Kullanici = undefined;
                $scope.kullaniciID = 0;
                $scope.formCalistirildi = false;
            };



            $scope.getKullaniciYetkiGruplari = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.getKullaniciYetkiGruplari($scope.kullaniciID);

                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;
                    if (pl.data.length > 0 && pl.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı yetki grupları listesi yüklenirken bir hata oluştu.' + pl.data.mesaj, pl.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı yetki grupları listesi yüklenirken bir hata oluştu. Hata:', pl.data.sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiKullaniciYetkiGrup = pl.data.length;
                        $scope.KullaniciYetkiGruplari = pl.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı yetki grupları listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciYetkiGrubuKaydet = function (KullaniciYetki) {
                $scope.formCalistirildiKullaniciYetki = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmKullaniciYetki.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmKullaniciYetki);
                    return;
                }
                KullaniciYetki.KULLANICI_ID = $scope.kullaniciID;
                var promiseGet = srvYetkilendirme.KullaniciYetkiGrubuKaydet(KullaniciYetki);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı yetki grub kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı yetki grub kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Kullanıcı yetki grup kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.getKullaniciYetkiGruplari();
                        $scope.formCalistirildiKullaniciYetki = false;
                        $scope.KullaniciYetki.YETKI_GRUP_ID = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı yetki grup kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalKullaniciYetkiGrubuSilOnayi = function (KullaniciYetkiGrupID) {
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if (value === "true")
                            $scope.kullaniciYetkiGrubuSil(KullaniciYetkiGrupID);
                        else
                            return;
                    }
                );
            };

            $scope.kullaniciYetkiGrubuSil = function (KullaniciYetkiGrupID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.KullaniciYetkiGrubuSil(KullaniciYetkiGrupID);
                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;
                    if (pl.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı yetki grup silme işlemi sırasında bir hata oluştu.' + pl.data.mesaj, pl.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error("Kullanıcı yetki grup silme işlemi sırasında bir hata oluştu. Hata:", pl.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Kullanıcı yetki grup silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.getKullaniciYetkiGruplari();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı yetki grup silme işlemi sırasında hata oluştu. Hata:', hata);
                    });
            };

            $scope.resmiTemizle = function () {
                $scope.Kullanici.AvatarBase64 = '';
            };

            $scope.modalKullaniciResmi = function () {
                $rootScope.modalInstance = $modal.open({
                    templateUrl: 'views/modal_kullanici_resim.html',
                    size: 'lg',
                    windowClass: "animated fadeInUpBig",
                    backdrop: 'static', // dışarısı tıklanınca çıkmaması için
                    scope: $scope
                });
            };

        }]);