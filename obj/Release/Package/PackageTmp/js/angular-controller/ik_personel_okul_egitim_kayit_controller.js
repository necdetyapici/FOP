angular.module('inspinia').controller(
    'ik_personel_okul_egitim_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkPersonelOkulEgitim', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkPersonelOkulEgitim, Ayarlarim) {
            $scope.ikPersonelOkulEgitimID = $stateParams.ikPersonelOkulEgitimID;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.Ayarlar = Ayarlarim;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {

                if ($scope.ikPersonelOkulEgitimID > 0)
                    $scope.IkPersonelOkulEgitimSelect();
                $scope.OkulDurumTipiGetData();
                $scope.OkulTuruGetData();
            };

            $scope.IkPersonelOkulEgitimSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelOkulEgitim.IkPersonelOkulEgitimSelect($scope.ikPersonelOkulEgitimID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel okul eğitimi bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel okul eğitimi bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonelOkulEgitimi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel okul eğitimi bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkPersonelOkulEgitimEkleGuncelle = function (InfoPersonelOkulEgitimi) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmPersonelOkulEgitim.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmPersonelOkulEgitim);
                    return;
                }
                InfoPersonelOkulEgitimi.KULLANICI_ID = $scope.kullaniciID;
                var promiseGet = srvIkPersonelOkulEgitim.IkPersonelOkulEgitimEkleGuncelle(InfoPersonelOkulEgitimi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel okul eğitimi kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel okul eğitimi kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel okul eğitimi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel okul eğitimi kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.OkulDurumTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getOkulDurumTipi();
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Okul durum tipi listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Okul durum tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.OkulDurumTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Okul durum tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.OkulTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getOkulTuru();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Okul türü listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Okul türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.OkulTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Okul türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

