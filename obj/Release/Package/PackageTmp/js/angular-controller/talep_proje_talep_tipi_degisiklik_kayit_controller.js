angular.module('inspinia').controller(
    'talep_proje_talep_tipi_degisiklik_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTalepProjeTalepTipiDegisiklik', 
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTalepProjeTalepTipiDegisiklik) {
            $scope.talepProjeTipiDegisiklikID = $stateParams.talepProjeTipiDegisiklikID;
            $scope.talepProjeID = $stateParams.talepProjeID;

            $scope.AramaKriterDegisiklikHesap = {
                PROJE_ACILIYET_ETKI_SONUC: ''
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.TalepSiniflandirmaGetData();
                $scope.ProjeEtkiGetData();
                $scope.ProjeAciliyetGetData();
                //$scope.TalepProjeSelect();

                if ($scope.talepProjeID > 0)
                    $scope.TalepProjeTalepTipiDegisiklikSelect();
            };

            $scope.TalepProjeTalepTipiDegisiklikSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeTalepTipiDegisiklik.TalepProjeTalepTipiDegisiklikSelect($scope.talepProjeID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Değişiklik bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Değişiklik bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDegisiklik = gelen.data;
                        $scope.$parent.ProjeAciliyetEtkiSonucHesapGetData($scope.InfoDegisiklik.PROJE_ETKI_ID, $scope.InfoDegisiklik.PROJE_ACILIYET_ID);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Değişiklik bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeTalepTipiDegisiklikEkleGuncelle = function (InfoDegisiklik) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepTipiDegisiklik = true;
                if ($scope.frmTalepTipiDegisiklik.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmTalepTipiDegisiklik);
                    return;
                }
                InfoDegisiklik.PROJE_ACILIYET_ETKI_SONUC_ID = $scope.$parent.InfoDegisiklikHesap.PROJE_ACILIYET_ETKI_SONUC_ID;
                InfoDegisiklik.TALEP_PROJE_ID = $scope.talepProjeID;
                var promiseGet = srvTalepProjeTalepTipiDegisiklik.TalepProjeTalepTipiDegisiklikEkleGuncelle(InfoDegisiklik);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Değişiklik kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Değişiklik kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Değişiklik kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Değişiklik kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            
        }]);

