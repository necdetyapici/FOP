angular.module('inspinia').controller(
    'yasam_dongusu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvYasamDongusu',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvYasamDongusu) {
            $scope.YasamDongusuID = $stateParams.YasamDongusuID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.YasamDongusuID > 0)
                    $scope.YasamDongusuSelect();
            }

            $scope.YasamDongusuSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYasamDongusu.YasamDongusuSelect($scope.YasamDongusuID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "YasamDongusu bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('YasamDongusuSelect Hata:', hata);
                    });
            }

            $scope.YasamDongusuEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvYasamDongusu.YasamDongusuEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('YasamDongusuEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('YasamDongusuEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

