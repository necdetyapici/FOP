angular.module('inspinia').controller(
    'avans_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvAvans',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvAvans) {
            $scope.avansID = $stateParams.avansID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                LISTE: false,
                KULLANICI_ID: $scope.$storage.KULLANICI_ID
            };
            
            $scope.init = function () {
                $scope.AvansSelect();
            };
            
            $scope.AvansSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvans.AvansSelect($scope.avansID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        if (gelen.data.basariDurumu === false) {
                            mesajGoster('Dikkat', 'Personel avans bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                            console.error('Personel avans bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                        }
                    }
                    else {
                        $scope.InfoPersonelAvans = gelen.data;
                        $scope.onayKontrol = $scope.InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID;
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
                        console.error('Personel avans bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.IkPersonelAvansGozdenGecir = function () {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_avans_gozden_gecir.html',
                    controller: 'avans_kayit_controller',
                    scope: $scope
                });
            };

            $scope.GeriAvansGozdenGecir = function () {
                $scope.modalInstance.dismiss('cancel');
            };
            
  
            $scope.IkPersonelAvansReddet = function () {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_avans_reddet.html',
                    controller: 'avans_kayit_controller',
                    scope: $scope
                });
            };

            $scope.GeriAvansReddet = function () {
                $scope.modalInstance.dismiss('cancel');
            };

            $scope.IkPersonelAvansOnaylama = function (InfoPersonelAvans) {
                $rootScope.sayfayukleniyor = true;
                if (InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID === 4) {
                    $scope.formCalistirildiPersonelAvansReddet = true;
                    if ($scope.frmPersonelAvansReddet.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $scope.InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID = $scope.onayKontrol;
                        $rootScope.focusToInvalid($scope.frmPersonelAvansReddet);
                        return;
                    }
                }
                if (InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID === 2) {
                    $scope.formCalistirildiPersonelAvansGozdenGecir = true;
                    if ($scope.frmPersonelAvansGozdenGecir.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $scope.InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID = $scope.onayKontrol;
                        $rootScope.focusToInvalid($scope.frmPersonelAvansGozdenGecir);
                        return;
                    }
                }
                if (InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID === 3) {
                    $scope.formCalistirildiPersonelAvans = true;
                    if ($scope.frmIkPersonelAvans.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $scope.InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID = $scope.onayKontrol;
                        $rootScope.focusToInvalid($scope.frmIkPersonelAvans);
                        return;
                    }
                }

                var promiseGet = srvAvans.AvansOnaylama(InfoPersonelAvans);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel avans onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel avans onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel avans onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");

                        if (InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID === 4) {
                            $scope.GeriAvansReddet();
                        }

                        if (InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID === 2) {
                            $scope.GeriAvansGozdenGecir();
                        }
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel avans onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            

        }]);

