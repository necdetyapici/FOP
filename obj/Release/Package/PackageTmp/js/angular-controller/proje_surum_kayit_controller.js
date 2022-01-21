angular.module('inspinia').controller(
    'proje_surum_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeSurum',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeSurum) {
            $scope.projeID = $stateParams.projeID;
            $scope.projeSurumID = $stateParams.projeSurumID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.projeSurumID > 0)
                    $scope.ProjeSurumSelect();
            }
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.ProjeSurumSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurum.ProjeSurumSelect($scope.projeSurumID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje sürüm bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjeSurum = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje sürüm bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeSurumEkleGuncelle = function (InfoProjeSurum) {
                $scope.formCalistirildiProjeSurum = true;
                if ($scope.frmProjeSurum.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeSurum);
                    return;
                }
                var promiseGet = srvProjeSurum.ProjeSurumEkleGuncelle(InfoProjeSurum);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Proje sürüm kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Proje sürüm kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje sürüm kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

