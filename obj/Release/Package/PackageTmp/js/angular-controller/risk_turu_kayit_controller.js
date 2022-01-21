angular.module('inspinia').controller(
    'risk_turu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvRiskTuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvRiskTuru) {
            $scope.riskTuruID = $stateParams.riskTuruID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                if ($scope.riskTuruID > 0)
                    $scope.RiskTuruSelect();
            }

            $scope.RiskTuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvRiskTuru.RiskTuruSelect($scope.riskTuruID);
                promiseGet.then(function (gelen) {                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk türü bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk türü bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dİkkat', hata.data.mesaj, 'I');
                        }
                        console.error('Risk türü bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.RiskTuruEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmRiskTuru.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmRiskTuru);
                    return;
                }
                var promiseGet = srvRiskTuru.RiskTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk türü kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk türü kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Risk türü kayıt işleminiz başarılı bir şekilde gerçekleştirlmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk türü kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }




        }]);

