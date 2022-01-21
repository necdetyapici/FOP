angular.module('inspinia').controller(
    'etkilenen_varliklar_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvEtkilenenVarliklar',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvEtkilenenVarliklar) {
            $scope.etkilenenVarlikID = $stateParams.etkilenenVarlikID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                if ($scope.etkilenenVarlikID > 0)
                    $scope.EtkilenenVarliklarSelect();
            }

            $scope.EtkilenenVarliklarSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkilenenVarliklar.EtkilenenVarliklarSelect($scope.etkilenenVarlikID);
                promiseGet.then(function (gelen) {                  
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkilenen varlıklar kaydı yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkilenen varlıklar kaydı yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Etkilenen varlıklar kaydı yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.EtkilenenVarliklarEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmEtkilenenVarlik.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmEtkilenenVarlik);
                    return;
                }
                var promiseGet = srvEtkilenenVarliklar.EtkilenenVarliklarEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkilenen varlıklar kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkilenen varlıklar kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Etkilenen varlıklar kayıt işleminiz başarılı bir şekilde gerçekleştrilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkilenen varlıklar kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

