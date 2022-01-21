angular.module('inspinia').controller(
    'talep_proje_talep_tipi_dfi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTalepProjeTalepTipiDfi', 'srvTalepProje',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTalepProjeTalepTipiDfi, srvTalepProje) {
            $scope.talepProjeTipiDfiID = $stateParams.talepProjeTipiDfiID;
            $scope.talepProjeID = $stateParams.talepProjeID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.SurecGetData();

                if ($scope.talepProjeID > 0)
                    $scope.TalepProjeTalepTipiDfiSelect();
            };

            $scope.TalepProjeTalepTipiDfiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeTalepTipiDfi.TalepProjeTalepTipiDfiSelect($scope.talepProjeID);

                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dfi bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dfi bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDfi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dfi bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.TalepProjeTalepTipiDfiEkleGuncelle = function (InfoDfi) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepTipiDfi = true;
                if ($scope.frmTalepTipiDfi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmTalepTipiDfi);
                    return;
                }
                InfoDfi.TALEP_PROJE_ID = $scope.talepProjeID;
                var promiseGet = srvTalepProjeTalepTipiDfi.TalepProjeTalepTipiDfiEkleGuncelle(InfoDfi);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dfi kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dfi kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Dfi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dfi kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            
        }]);

