angular.module('inspinia').controller(
    'personel_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvPersonelTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvPersonelTipi) {
            $scope.PersonelTipiID = $stateParams.PersonelTipiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.PersonelTipiID > 0)
                    $scope.PersonelTipiSelect();
            }

            $scope.PersonelTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvPersonelTipi.PersonelTipiSelect($scope.PersonelTipiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "PersonelTipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('PersonelTipiSelect Hata:', hata);
                    });
            }

            $scope.PersonelTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvPersonelTipi.PersonelTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('PersonelTipiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('PersonelTipiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

