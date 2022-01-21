angular.module('inspinia').controller(
    'etki_degeri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvEtkiDegeri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvEtkiDegeri) {
            $scope.etkiDegeriID = $stateParams.etkiDegeriID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.etkiDegeriID > 0)
                    $scope.EtkiDegeriSelect();
            }
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.EtkiDegeriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkiDegeri.EtkiDegeriSelect($scope.etkiDegeriID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etki değeri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etki değeri bilgileri yüklenirken bir hata oluştu Hata: ', gelen.data.sistemMesaj);
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
                        console.error('Etki değeri bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.EtkiDegeriEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmEtkiDegeri.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmEtkiDegeri);
                    return;
                }
                var promiseGet = srvEtkiDegeri.EtkiDegeriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etki değeri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Etki değeri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Etki değeri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etki değeri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

