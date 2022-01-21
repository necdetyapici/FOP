angular.module('inspinia').controller(
    'talep_proje_talep_tipi_problem_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvTalepSiniflandirmaTipi', 'srvGenel', 'srvTalepProjeTalepTipiProblem', 'srvTalepProje',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvTalepSiniflandirmaTipi, srvGenel, srvTalepProjeTalepTipiProblem,  srvTalepProje) {
            $scope.talepProjeID = $stateParams.talepProjeID;
            $scope.talepProjeTipiProblemID = $stateParams.talepProjeTipiProblemID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriterProblemHesap = {
                PROJE_ACILIYET_ETKI_SONUC: ''
            };
            $scope.init = function () {

                $scope.TalepSiniflandirmaTipiGetData();
                $scope.ProjeEtkiGetData();
                $scope.ProjeAciliyetGetData();

                if ($scope.talepProjeID > 0) {
                    $scope.TalepProjeTalepTipiProblemSelect();
                }

            };

            $scope.TalepProjeTalepTipiProblemSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeTalepTipiProblem.TalepProjeTalepTipiProblemSelect($scope.talepProjeID);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Problem bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Problem bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProblem = gelen.data;
                        $scope.$parent.ProjeAciliyetEtkiSonucHesapGetData($scope.InfoProblem.PROJE_ETKI_ID, $scope.InfoProblem.PROJE_ACILIYET_ID);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Problem bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });


            };

            $scope.TalepProjeTalepTipiProblemEkleGuncelle = function (InfoProblem) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepTipiProblem = true;
                if ($scope.frmTalepTipiProblem.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmTalepTipiProblem);
                    return;
                }
                InfoProblem.TALEP_PROJE_ID = $scope.talepProjeID;
                InfoProblem.PROJE_ACILIYET_ETKI_SONUC_ID = $scope.$parent.InfoProblemHesap.PROJE_ACILIYET_ETKI_SONUC_ID;
                var promiseGet = srvTalepProjeTalepTipiProblem.TalepProjeTalepTipiProblemEkleGuncelle(InfoProblem);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Problem kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Problem kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Problem kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Problem kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepSiniflandirmaTipiGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepSiniflandirmaTipi.TalepSiniflandirmaTipiGetData();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Sınıflandırma listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Sınıflandırma listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepSiniflandirmaTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sınıflandırma listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };
          

            


        }]);

