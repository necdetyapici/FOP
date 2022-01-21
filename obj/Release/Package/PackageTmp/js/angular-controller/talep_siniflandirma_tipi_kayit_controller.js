angular.module('inspinia').controller(
    'talep_siniflandirma_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTalepSiniflandirmaTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTalepSiniflandirmaTipi) {
            $scope.TalepSiniflandirmaTipiID = $stateParams.TalepSiniflandirmaTipiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.TalepSiniflandirmaTipiID > 0)
                    $scope.TalepSiniflandirmaTipiSelect();
            }

            $scope.TalepSiniflandirmaTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepSiniflandirmaTipi.TalepSiniflandirmaTipiSelect($scope.TalepSiniflandirmaTipiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "TalepSiniflandirmaTipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('TalepSiniflandirmaTipiSelect Hata:', hata);
                    });
            }

            $scope.TalepSiniflandirmaTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvTalepSiniflandirmaTipi.TalepSiniflandirmaTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('TalepSiniflandirmaTipiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('TalepSiniflandirmaTipiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

