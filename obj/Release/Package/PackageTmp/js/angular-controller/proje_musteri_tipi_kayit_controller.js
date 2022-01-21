angular.module('inspinia').controller(
    'proje_musteri_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeMusteriTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeMusteriTipi) {
            $scope.ProjeMusteriTipiID = $stateParams.ProjeMusteriTipiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.ProjeMusteriTipiID > 0)
                    $scope.ProjeMusteriTipiSelect();
            }

            $scope.ProjeMusteriTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeMusteriTipi.ProjeMusteriTipiSelect($scope.ProjeMusteriTipiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "ProjeMusteriTipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('ProjeMusteriTipiSelect Hata:', hata);
                    });
            }

            $scope.ProjeMusteriTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvProjeMusteriTipi.ProjeMusteriTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('ProjeMusteriTipiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('ProjeMusteriTipiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

