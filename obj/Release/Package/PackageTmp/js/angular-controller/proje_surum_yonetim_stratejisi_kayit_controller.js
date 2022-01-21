angular.module('inspinia').controller(
    'proje_surum_yonetim_stratejisi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeSurumYonetimStratejisi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeSurumYonetimStratejisi) {
            $scope.projeID = $stateParams.projeID;
            $scope.surumyonetimstratejisiNo = $stateParams.surumyonetimstratejisiNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.periyotTipiYukle();
                if ($scope.surumyonetimstratejisiNo > 0)
                    $scope.ProjeSurumYonetimStratejisiSelect();
            }

            $scope.ProjeSurumYonetimStratejisiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurumYonetimStratejisi.ProjeSurumYonetimStratejisiSelect($scope.surumyonetimstratejisiNo);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Sürüm yönetim stratejisi bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Sürüm yönetim stratejisi bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoSurumYonetimStratejisi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sürüm yönetim stratejisi bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeSurumYonetimStratejisiEkleGuncelle = function (InfoSurumYonetimStratejisi) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiSurumYonetimStratejisi = true;
                if ($scope.frmProjeSurumYonetimStratejisi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeSurumYonetimStratejisi);
                    return;
                }
                InfoSurumYonetimStratejisi.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeSurumYonetimStratejisi.ProjeSurumYonetimStratejisiEkleGuncelle(InfoSurumYonetimStratejisi);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiSurumYonetimStratejisi = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Sürüm yönetim stratejisi kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Sürüm yönetim stratejisi kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Sürüm yönetim stratejisi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sürüm yönetim stratejisi kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }



            $scope.periyotTipiYukle = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getPeriyotTipiListesi();

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Periyot tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        Console.error('Periyot tipi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.PeriyotTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Periyot tipi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });

            }


        }]);

