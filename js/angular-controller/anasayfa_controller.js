angular.module('inspinia').controller(
    'anasayfa_controller', ['$scope', '$http', '$state', '$stateParams', '$log', '$localStorage', 'srvKullanici', '$location', '$sessionStorage', '$rootScope', 'SweetAlert', '$modal', 'srvGenel', 'srvProfilBilgileri',
    function ($scope, $http, $state, $stateParams, $log, $localStorage, srvKullanici, $location, $sessionStorage, $rootScope, $SweetAlert, $modal, srvGenel, srvProfilBilgileri) {

        $scope.AramaKriter = {
            Anasayfa: 1
        };

        $scope.init = function () {
            $scope.KullaniciListesiGetData();
            $scope.kullaniciBilgileriniYukle();
            $scope.menuleriGetir();
            if ($rootScope.oncekiAdres != null) {
                $location.path($rootScope.oncekiAdres);
                $rootScope.oncekiAdres = null;
            }
            $scope.tarih = new Date().getDate();

        };

        $scope.menuleriGetir = function () {
            $rootScope.sayfayukleniyor = true;
            var promiseGet = srvGenel.getSolMenuListesi();

            promiseGet.then(function (pl) {
                $scope.$storage = $sessionStorage.$default({
                    MenuListesi: pl.data
                });
                //$rootScope.MenuListesi = pl.data;
                $rootScope.sayfayukleniyor = false;
            },
                function (errorPl) {
                    $rootScope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', "Menu listesi yüklenirken bir hata oluştu. Hata: " + errorPl.data, 'W')
                    $log.error('menuleriGetir Hata:', errorPl);
                });
        };


        $scope.profilKaydet = function (Kullanici) {
            $scope.formCalistirildi = true;

            if ($scope.form.$valid) { } else { return; }
            var promiseGet = srvProfilBilgileri.ProfilKaydet(Kullanici);
            promiseGet.then(function (gelen) {
                if (gelen.data.basariDurumu == false) {
                    mesajGoster('Dikkat', "Profil bilgileri güncellme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                    $log.error('Profil bilgileri güncellme işlemi sırasında bir hata oluştu.', gelen.data.sistemMesaj);
                }
                else {
                    //$scope.$storage.avatar = gelen.data.returnKayitNo;
                    $scope.kullaniciBilgileriniYukle();
                    mesajGoster("İşlem tamam.", "Profil bilgileri güncelleme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                }
            },
                function (hata) {
                    $rootScope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                    console.error('Profil bilgileri güncelleme işlemi sırasında bir hata oluştu. Hata:', hata);
                });
        }

        $scope.setUrl = function (Url) {
            $state.go(Url);
        };

        $scope.kullaniciBilgileriniYukle = function () {
            $rootScope.sayfayukleniyor = true;
            var promiseGet = srvProfilBilgileri.GetData();

            promiseGet.then(function (gelen) {
                $rootScope.sayfayukleniyor = false;
                if (gelen.data.basariDurumu == false) {
                    mesajGoster('Dikkat', 'Profil bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                    console.error('Profil bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                }
                else {
                    $scope.Kullanici = gelen.data;
                }
            },
                function (hata) {
                    $rootScope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                    console.error('Profil bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                });
        }

        $scope.ignoreTurkish = function (item) {
            if (!$scope.txtArama) return true;
            var search = removeTurkish($scope.txtArama).toLowerCase();
            return text.indexOf(search) > -1;
        };

        function removeTurkish(value) {
            return value
                .replace(/ç/g, 'c')
                .replace(/Ç/g, 'c')
                .replace(/ı/g, 'i')
                .replace(/İ/g, 'i')
                .replace(/ğ/g, 'g')
                .replace(/Ğ/g, 'g')
                .replace(/ü/g, 'u')
                .replace(/Ü/g, 'u')
                .replace(/ş/g, 's')
                .replace(/Ş/g, 's')
                .replace(/ö/g, 'o')
                .replace(/Ö/g, 'o');
        }

        $scope.KullaniciListesiGetData = function (AramaKriter) {
            $rootScope.sayfayukleniyor = true;
            var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriter);

            promiseGet.then(function (pl) {
                $rootScope.sayfayukleniyor = false;

                if (pl.data.Veri.length > 0 && pl.data.Veri[0].basariDurumu === false) {
                    mesajGoster('Dikkat', 'Kullanıcı listesi yüklenirken bir hata oluştu.' + pl.data.Veri[0].mesaj, pl.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                    console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata:', pl.data.Veri[0].sistemMesaj);
                } else {
                    $scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                    $scope.KullaniciListesi = pl.data.Veri;
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
                    console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata:', hata);
                });
        };


        $(window).resize(function () {
            $(".sweet-alert").css("margin-top", -$(".sweet-alert").outerHeight() / 2);
        });


    }]);

