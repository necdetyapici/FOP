angular.module('inspinia').controller(
    'b_g_aciklik_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvBGAciklik',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvBGAciklik) {
            $scope.bgAciklikID = $stateParams.bgAciklikID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.bgAciklikID > 0)
                    $scope.BGAciklikSelect();
            }

            $scope.BGAciklikSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGAciklik.BGAciklikSelect($scope.bgAciklikID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği açıklık bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği açıklık bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
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
                        console.error('Bilgi güvenliği açıklık bilgileri yüklenirken bir hata oluştu.Hata:', hata);
                    });
            }

            $scope.BGAciklikEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmAciklik.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmAciklik);
                    return;
                }
                var promiseGet = srvBGAciklik.BGAciklikEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği açıklık kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bilgi güvenliği açıklık kayıt işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Bilgi güvenliği açıklık kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği açıklık kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            }

        }]);

