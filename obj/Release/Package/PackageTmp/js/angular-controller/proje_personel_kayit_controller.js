angular.module('inspinia').controller(
    'proje_personel_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjePersonel', 'srvKullanici',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjePersonel, srvKullanici) {
            $scope.projeID = $stateParams.projeID;
            $scope.projePersonelID = $stateParams.projePersonelID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.TecrubeGetData();
                //$scope.kullaniciYukle();

                if ($scope.projePersonelID > 0)
                    $scope.ProjePersonelSelect();
            };

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };

            $scope.ProjePersonelSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonel.ProjePersonelSelect($scope.projePersonelID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjePersonel = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePersonelEkleGuncelle = function (InfoProjePersonel) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePersonel = true;
                if ($scope.frmProjePersonel.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjePersonel);
                    return;
                }
                InfoProjePersonel.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjePersonel.ProjePersonelEkleGuncelle(InfoProjePersonel);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjePersonelGetDataGenel();//Temel fonksiyon güncellenmediği için yeniden servis atılıyor.
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TecrubeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTecrube();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Tecrübe listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Tecrübe listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TecrubeListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tecrübe listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

