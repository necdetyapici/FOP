angular.module('inspinia').controller(
    'musteri_ayari_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvMusteri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvMusteri) {
            $scope.musteriID = $stateParams.musteriID;
            $scope.IsCreate = 1;//1;
            $scope.altTab = 0;
            $scope.tab = 0;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
       
            $scope.init = function () {
                $scope.setTab($scope.tab);
                $scope.setAltTab($scope.altTab);
                if ($scope.musteriID > 0)
                    $scope.MusteriSelect();
            };

            $scope.MusteriSelect = function () {
                $rootScope.sayfayukleniyor = true;

                var promiseGet = srvMusteri.MusteriSelect($scope.musteriID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Müşteri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Müşteri bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
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
                        console.error('Müşteri bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.setTab = function (tabValue) {
                $scope.tab = tabValue;

                if (tabValue === 0) {
                    if ($state.current.name.indexOf('yonetim.musteriayari.proje') !== -1) { //Proje
                        $scope.tab = 5;

                    }

                    if ($state.current.name.indexOf('yonetim.musteriayari.talep') !== -1) { //Talep Yönetim Sistemi
                        $scope.tab = 2;
                    }

                    if ($state.current.name.indexOf('yonetim.musteriayari.insankaynaklari') !== -1) { //İnsan Kaynakları
                        $scope.tab = 3;
                    }

                    if ($state.current.name.indexOf('yonetim.musteriayari.toplanti') !== -1) { //Toplantı
                        $scope.tab = 4;
                    }

                    if ($state.current.name.indexOf('yonetim.musteriayari.dokuman') !== -1) { //Doküman Yönetim Sistemi
                        $scope.tab = 1;
                    }
                   
                }

                $scope.altTab = $state.current.data.altTab;

                if ($scope.tab === 2 && !($scope.altTab > 1)) {
                    $scope.altTab = 1;
                }
                if ($scope.tab === 3 && !($scope.altTab > 1)) {
                    $scope.altTab = 5;
                }
                if ($scope.tab === 4 && !($scope.altTab > 1)) {
                    $scope.altTab = 31;
                }
                if ($scope.tab === 5 && !($scope.altTab > 1)) {
                    $scope.altTab = 20;
                }


            };
            $scope.setAltTab = function (altTabValue) {

                if ($state.current.data.altTab) {
                    $scope.altTab = $state.current.data.altTab;
                }
                if (altTabValue > 0) {
                    $scope.altTab = altTabValue;
                }
            };

        }]);

