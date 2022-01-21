angular.module('inspinia').controller(
    'olcme_turu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvOlcmeTuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvOlcmeTuru) {
            $scope.OlcmeTuruID = $stateParams.OlcmeTuruID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.OlcmeTuruID > 0)
                    $scope.OlcmeTuruSelect();
            }

            $scope.OlcmeTuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvOlcmeTuru.OlcmeTuruSelect($scope.OlcmeTuruID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "OlcmeTuru bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('OlcmeTuruSelect Hata:', hata);
                    });
            }

            $scope.OlcmeTuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvOlcmeTuru.OlcmeTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('OlcmeTuruEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('OlcmeTuruEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

