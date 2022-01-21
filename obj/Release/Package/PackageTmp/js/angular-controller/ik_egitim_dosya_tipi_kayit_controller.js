angular.module('inspinia').controller(
    'ik_egitim_dosya_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkEgitimDosyaTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkEgitimDosyaTipi) {
            $scope.IkEgitimDosyaTipiID = $stateParams.IkEgitimDosyaTipiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.IkEgitimDosyaTipiID > 0)
                    $scope.IkEgitimDosyaTipiSelect();
            }

            $scope.IkEgitimDosyaTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimDosyaTipi.IkEgitimDosyaTipiSelect($scope.IkEgitimDosyaTipiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "IkEgitimDosyaTipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('IkEgitimDosyaTipiSelect Hata:', hata);
                    });
            }

            $scope.IkEgitimDosyaTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvIkEgitimDosyaTipi.IkEgitimDosyaTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('IkEgitimDosyaTipiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('IkEgitimDosyaTipiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

