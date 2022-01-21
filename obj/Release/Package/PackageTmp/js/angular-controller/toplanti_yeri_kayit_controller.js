angular.module('inspinia').controller(
    'toplanti_yeri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvToplantiYeri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvToplantiYeri) {
            $scope.ToplantiYeriID = $stateParams.ToplantiYeriID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.ToplantiYeriID > 0)
                    $scope.ToplantiYeriSelect();
            }

            $scope.ToplantiYeriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiYeri.ToplantiYeriSelect($scope.ToplantiYeriID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Toplantı Yeri bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('ToplantiYeriSelect Hata:', hata);
                    });
            }

            $scope.ToplantiYeriEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvToplantiYeri.ToplantiYeriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('ToplantiYeriEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('ToplantiYeriEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

