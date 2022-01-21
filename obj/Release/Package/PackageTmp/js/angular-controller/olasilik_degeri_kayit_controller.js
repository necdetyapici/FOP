angular.module('inspinia').controller(
    'olasilik_degeri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvOlasilikDegeri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvOlasilikDegeri) {
            $scope.olasilikDegeriID = $stateParams.olasilikDegeriID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                if ($scope.olasilikDegeriID > 0)
                    $scope.OlasilikDegeriSelect();
            }

            $scope.OlasilikDegeriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriSelect($scope.olasilikDegeriID);

                promiseGet.then(function (gelen) {                   
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Olasılık değeri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Olasılık değeri bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                        console.error('Olasılık değeri bilgileri yüklenirken bir hata oluştu. Hata: ', hata);                       
                    });
            }

            $scope.OlasilikDegeriEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmOlasilikDegeri.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmOlasilikDegeri);
                    return;
                }
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Olasılık değeri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Olasılık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Olasılık değeri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Olasılık değeri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                        
                    });
            }

        }]);

