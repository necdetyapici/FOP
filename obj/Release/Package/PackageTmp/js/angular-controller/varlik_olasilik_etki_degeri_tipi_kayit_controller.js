angular.module('inspinia').controller(
    'varlik_olasilik_etki_degeri_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvVarlikOlasilikEtkiDegeriTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvVarlikOlasilikEtkiDegeriTipi) {
            $scope.kayitNo = $stateParams.kayitNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.kayitNo > 0)
                    $scope.VarlikOlasilikEtkiDegeriTipiSelect();
            }

            $scope.VarlikOlasilikEtkiDegeriTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvVarlikOlasilikEtkiDegeriTipi.VarlikOlasilikEtkiDegeriTipiSelect($scope.kayitNo);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık olasılık değeri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık değeri olasılık değeri bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
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
                        console.error('Varlık olasılık değeri bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.VarlikOlasilikEtkiDegeriTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvVarlikOlasilikEtkiDegeriTipi.VarlikOlasilikEtkiDegeriTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık olasılık değeri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık olasılık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Varlık olasılık değeri kayıt işleminiz başarılı bir şekilde yapılmıştır.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Varlık olasılık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

