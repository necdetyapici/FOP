angular.module('inspinia').controller(
    'konfigurasyon_arac_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvKonfigurasyonArac',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvKonfigurasyonArac) {
            $scope.konfigurasyonAracID = $stateParams.konfigurasyonAracID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                if ($scope.konfigurasyonAracID > 0)
                    $scope.KonfigurasyonAracSelect();
            }

            $scope.KonfigurasyonAracSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKonfigurasyonArac.KonfigurasyonAracSelect($scope.konfigurasyonAracID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                        console.log('Konfigürasyon araç bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                       

                    });
            }

            $scope.KonfigurasyonAracEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frm_KonfigurasyonArac.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frm_KonfigurasyonArac);
                    return;
                }
                var promiseGet = srvKonfigurasyonArac.KonfigurasyonAracEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Konfigürasyon araç kayıt işleminiz başarılı bir şekilde gerçekleşmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                       
                    });
            }

        }]);

