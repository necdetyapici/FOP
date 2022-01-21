angular.module('inspinia').controller(
    'ik_birim_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkBirim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkBirim) {
            $scope.IkBirimID = $stateParams.IkBirimID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.IkBirimID > 0)
                    $scope.IkBirimSelect();
            }

            $scope.IkBirimSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkBirim.IkBirimSelect($scope.IkBirimID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Birim bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('IkBirimSelect Hata:', hata);
                    });
            }

            $scope.IkBirimEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else
                {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvIkBirim.IkBirimEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('IkBirimEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('IkBirimEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

