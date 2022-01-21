angular.module('inspinia').controller(
    'varlik_degeri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvVarlikDegeri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvVarlikDegeri) {
            $scope.kayitNo = $stateParams.kayitNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.kayitNo > 0)
                    $scope.VarlikDegeriSelect();
            }

            $scope.VarlikDegeriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvVarlikDegeri.VarlikDegeriSelect($scope.kayitNo);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık değeri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık olasılık değeri bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                        console.error('Varlık değeri bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.VarlikDegeriEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;

                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvVarlikDegeri.VarlikDegeriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık değeri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Varlık değeri kayıt işleminiz başarılı bir şekilde yapılmıştır.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Varlık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

