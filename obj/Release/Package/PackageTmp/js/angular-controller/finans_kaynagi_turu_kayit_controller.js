angular.module('inspinia').controller(
    'finans_kaynagi_turu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvFinansKaynagiTuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvFinansKaynagiTuru) {
            $scope.FinansKaynagiTuruID = $stateParams.FinansKaynagiTuruID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.FinansKaynagiTuruID > 0)
                    $scope.FinansKaynagiTuruSelect();
            }

            $scope.FinansKaynagiTuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvFinansKaynagiTuru.FinansKaynagiTuruSelect($scope.FinansKaynagiTuruID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "FinansKaynagiTuru bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('FinansKaynagiTuruSelect Hata:', hata);
                    });
            }

            $scope.FinansKaynagiTuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvFinansKaynagiTuru.FinansKaynagiTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('FinansKaynagiTuruEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('FinansKaynagiTuruEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

