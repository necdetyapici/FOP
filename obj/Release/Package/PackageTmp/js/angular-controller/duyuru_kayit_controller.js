angular.module('inspinia').controller(
    'duyuru_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDuyuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDuyuru) {
            $scope.duyuruID = $stateParams.duyuruID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.DuyuruDurumuListesi = [{ DUYURU_DURUMU_ID: 1, DUYURU_DURUMU_ADI: 'Yayında' },
            { DUYURU_DURUMU_ID: 2, DUYURU_DURUMU_ADI: 'Hazırlanıyor' },
            { DUYURU_DURUMU_ID: 3, DUYURU_DURUMU_ADI: 'Kaldırıldı' }];

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.duyuruID > 0)
                    $scope.DuyuruSelect();
                $scope.DuyuruDurumSelect();

            }


            $scope.DuyuruDurumSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getDuyuruDurumu($scope.DuyuruDurumuID);

                promiseGet.then(function (gelen) {
                    $scope.DuyuruDurumuListesi = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Duyuru bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DuyuruSelect Duyuru bilgileri yükleme hatası Hata:', hata);
                    });
            }

            $scope.DuyuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDuyuru.DuyuruSelect($scope.duyuruID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Duyuru bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DuyuruSelect Duyuru bilgileri yükleme hatası Hata:', hata);
                    });
            }

            $scope.DuyuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvDuyuru.DuyuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DuyuruSelect Duyuru bilgileri güncelleme hatası Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $state.go('yonetim.duyurulistesi');
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DuyuruSelect Duyuru bilgileri yükleme hatası Hata:', errorPl);
                    });
            }

        }]);

