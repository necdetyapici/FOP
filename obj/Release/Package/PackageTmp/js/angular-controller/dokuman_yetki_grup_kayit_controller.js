angular.module('inspinia').controller(
    'dokuman_yetki_grup_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanYetkiGrup',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanYetkiGrup) {
            $scope.dokumanYetkiGrupID = $stateParams.dokumanYetkiGrupID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.dokumanYetkiGrupID > 0)
                    $scope.DokumanYetkiGrupSelect();
            }

            $scope.DokumanYetkiGrupSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrup.DokumanYetkiGrupSelect($scope.dokumanYetkiGrupID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiGrup bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DokumanYetkiGrupSelect Hata:', hata);
                    });
            }

            $scope.DokumanYetkiGrupEkleGuncelle = function (Info, frmYetkiGrup) {
                $scope.formCalistirildi = true;
                if (frmYetkiGrup.$valid) { } else {
                    $rootScope.focusToInvalid(frmYetkiGrup);
                    return;
                }
                var promiseGet = srvDokumanYetkiGrup.DokumanYetkiGrupEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanYetkiGrupEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanYetkiGrupEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

