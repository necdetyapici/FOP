angular.module('inspinia').controller(
    'proje_modul_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeModul',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeModul) {
            $scope.projeID = $stateParams.projeID;
            $scope.projeModulID = $stateParams.projeModulID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.projeModulID > 0)
                    $scope.ProjeModulSelect();
            }

            $scope.ProjeModulSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeModul.ProjeModulSelect($scope.projeModulID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje modül bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje modül bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjeModul = gelen.data;

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje modül bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeModulEkleGuncelle = function (InfoProjeModul) {
                $scope.formCalistirildiProjeModul = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeModul.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeModul);
                    return;
                }
                InfoProjeModul.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeModul.ProjeModulEkleGuncelle(InfoProjeModul);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Proje modül kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje modül kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Proje modül kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje modül kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

