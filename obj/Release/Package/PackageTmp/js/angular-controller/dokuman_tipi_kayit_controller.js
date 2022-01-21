angular.module('inspinia').controller(
    'dokuman_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanTipi) {
            $scope.dokumanTipiID = $stateParams.dokumanTipiID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.dokumanTipiID > 0)
                    $scope.DokumanTipiSelect();
            };

            $scope.DokumanTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanTipi.DokumanTipiSelect($scope.dokumanTipiID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman tipi bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Dokuman tipi bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Dokuman tipi bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.DokumanTipiEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmDokumanTipi) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmDokumanTipi);
                    return;
                }
                var promiseGet = srvDokumanTipi.DokumanTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman tipi kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Dokuman tipi kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Dokuman tipi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman tipi kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            };

        }]);

