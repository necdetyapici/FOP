angular.module('inspinia').controller(
    'proje_dokuman_dosya_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeDokumanDosyaTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeDokumanDosyaTipi) {
            $scope.ProjeDokumanDosyaTipiID = $stateParams.ProjeDokumanDosyaTipiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.ProjeDokumanDosyaTipiID > 0)
                    $scope.ProjeDokumanDosyaTipiSelect();
            }

            $scope.ProjeDokumanDosyaTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDokumanDosyaTipi.ProjeDokumanDosyaTipiSelect($scope.ProjeDokumanDosyaTipiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "ProjeDokumanDosyaTipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('ProjeDokumanDosyaTipiSelect Hata:', hata);
                    });
            }

            $scope.ProjeDokumanDosyaTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvProjeDokumanDosyaTipi.ProjeDokumanDosyaTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('ProjeDokumanDosyaTipiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('ProjeDokumanDosyaTipiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

