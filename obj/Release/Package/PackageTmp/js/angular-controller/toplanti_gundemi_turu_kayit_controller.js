angular.module('inspinia').controller(
    'toplanti_gundemi_turu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvToplantiGundemiTuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvToplantiGundemiTuru) {
            $scope.ToplantiGundemiTuruID = $stateParams.ToplantiGundemiTuruID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.ToplantiGundemiTuruID > 0)
                    $scope.ToplantiGundemiTuruSelect();
            }

            $scope.ToplantiGundemiTuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiTuru.ToplantiGundemiTuruSelect($scope.ToplantiGundemiTuruID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Toplantı Gündemi Turu bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('ToplantiGundemiTuruSelect Hata:', hata);
                    });
            }

            $scope.ToplantiGundemiTuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else
                {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvToplantiGundemiTuru.ToplantiGundemiTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('ToplantiGundemiTuruEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('ToplantiGundemiTuruEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

