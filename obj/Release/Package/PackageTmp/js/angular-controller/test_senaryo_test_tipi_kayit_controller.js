angular.module('inspinia').controller(
    'test_senaryo_test_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTestSenaryoTestTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTestSenaryoTestTipi) {
            $scope.TestSenaryoTestTipiID = $stateParams.TestSenaryoTestTipiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.TestSenaryoTestTipiID > 0)
                    $scope.TestSenaryoTestTipiSelect();
            }

            $scope.TestSenaryoTestTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTestSenaryoTestTipi.TestSenaryoTestTipiSelect($scope.TestSenaryoTestTipiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "TestSenaryoTestTipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('TestSenaryoTestTipiSelect Hata:', hata);
                    });
            }

            $scope.TestSenaryoTestTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvTestSenaryoTestTipi.TestSenaryoTestTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('TestSenaryoTestTipiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('TestSenaryoTestTipiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

