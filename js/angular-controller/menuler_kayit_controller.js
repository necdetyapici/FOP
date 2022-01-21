angular.module('inspinia').controller(
    'menuler_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvMenu',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvMenu) {
            $scope.menuID = $stateParams.menuID;
            $scope.YeniMenuID = $stateParams.menuID;
          
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.MenulerGetData();
                if ($scope.menuID > 0) {
                    $scope.MenulerSelect();

                }
            };

            $scope.MenulerSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMenu.MenulerSelect($scope.menuID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Menü bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Menü bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                        if ($scope.menuID > 0) {
                            $scope.Info.YENI_MENU_ID = $scope.menuID;
                        }
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
                        console.error('Menü bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MenulerEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmMenuler.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmMenuler);
                    $rootScope.sayfayukleniyor = false;
                    return;
                }
                var promiseGet = srvMenu.MenulerEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Menü kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Menü kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Menü kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Menü kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriter = {
                LISTE: false
            };

            $scope.MenulerGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMenu.MenulerGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.MenulerListesi = gelen.data.Veri;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Menü listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Menü listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Menü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

