angular.module('inspinia').controller(
    'proje_turu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeTuru',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeTuru) {
            $scope.ProjeTuruID = $stateParams.ProjeTuruID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.ProjeTuruID > 0)
                    $scope.ProjeTuruSelect();
            }

            $scope.ProjeTuruSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTuru.ProjeTuruSelect($scope.ProjeTuruID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Proje Türü bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('ProjeTuruSelect Hata:', hata);
                    });
            }

            $scope.ProjeTuruEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else
                {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvProjeTuru.ProjeTuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('ProjeTuruEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('ProjeTuruEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

