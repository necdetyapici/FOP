angular.module('inspinia').controller(
    'talep_proje_gereksinim_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTalepProjeGereksinim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTalepProjeGereksinim) {
            $scope.kayitNo = $stateParams.kayitNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.kayitNo > 0)
                    $scope.TalepProjeGereksinimSelect();
            }

            $scope.TalepProjeGereksinimSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeGereksinim.TalepProjeGereksinimSelect($scope.kayitNo);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "TalepProjeGereksinim bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('TalepProjeGereksinimSelect Hata:', hata);
                    });
            }

            $scope.TalepProjeGereksinimEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvTalepProjeGereksinim.TalepProjeGereksinimEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('TalepProjeGereksinimEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('TalepProjeGereksinimEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

