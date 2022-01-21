angular.module('inspinia').controller(
    'avans_turu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvAvansTuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvAvansTuru) {
            $scope.AvansTuruID = $stateParams.AvansTuruID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.AvansTuruID > 0)
                    $scope.AvansTuruSelect();
            }

            $scope.AvansTuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvansTuru.AvansTuruSelect($scope.AvansTuruID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "AvansTuru bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('AvansTuruSelect Hata:', hata);
                    });
            }

            $scope.AvansTuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvAvansTuru.AvansTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('AvansTuruEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('AvansTuruEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

