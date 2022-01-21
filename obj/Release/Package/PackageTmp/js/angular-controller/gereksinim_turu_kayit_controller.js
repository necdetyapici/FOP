angular.module('inspinia').controller(
    'gereksinim_turu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvGereksinimTuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvGereksinimTuru) {
            $scope.GereksinimTuruID = $stateParams.GereksinimTuruID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.GereksinimTuruID > 0)
                    $scope.GereksinimTuruSelect();
            }

            $scope.GereksinimTuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGereksinimTuru.GereksinimTuruSelect($scope.GereksinimTuruID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "GereksinimTuru bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('GereksinimTuruSelect Hata:', hata);
                    });
            }

            $scope.GereksinimTuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvGereksinimTuru.GereksinimTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('GereksinimTuruEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('GereksinimTuruEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

