angular.module('inspinia').controller(
    'risk_isleme_stratejisi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvRiskIslemeStratejisi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvRiskIslemeStratejisi) {
            $scope.RiskIslemeStratejisiID = $stateParams.RiskIslemeStratejisiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.RiskIslemeStratejisiID > 0)
                    $scope.RiskIslemeStratejisiSelect();
            }

            $scope.RiskIslemeStratejisiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvRiskIslemeStratejisi.RiskIslemeStratejisiSelect($scope.RiskIslemeStratejisiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "RiskIslemeStratejisi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('RiskIslemeStratejisiSelect Hata:', hata);
                    });
            }

            $scope.RiskIslemeStratejisiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvRiskIslemeStratejisi.RiskIslemeStratejisiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('RiskIslemeStratejisiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('RiskIslemeStratejisiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

