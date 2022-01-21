angular.module('inspinia').controller(
    'kargo_sirketi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvKargoSirketi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvKargoSirketi) {
            $scope.KargoSirketiID = $stateParams.KargoSirketiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.KargoSirketiID > 0)
                    $scope.KargoSirketiSelect();
            }

            $scope.KargoSirketiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKargoSirketi.KargoSirketiSelect($scope.KargoSirketiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Kargo Şirketi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('KargoSirketiSelect Hata:', hata);
                    });
            }

            $scope.KargoSirketiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvKargoSirketi.KargoSirketiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('Kargo Şirketi Kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                        $rootScope.sayfayukleniyor = false;

                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('Kargo Şirketi Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz. Hata:', errorPl);
                        $rootScope.sayfayukleniyor = false;
                    });
            }

        }]);

