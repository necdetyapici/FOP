angular.module('inspinia').controller(
    'ik_departman_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkDepartman',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkDepartman) {
            $scope.IkDepartmanID = $stateParams.IkDepartmanID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.IkDepartmanID > 0)
                    $scope.IkDepartmanSelect();
            }

            $scope.IkDepartmanSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDepartman.IkDepartmanSelect($scope.IkDepartmanID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Departman bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('IkDepartmanSelect Hata:', hata);
                    });
            }

            $scope.IkDepartmanEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvIkDepartman.IkDepartmanEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false)
                    {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('IkDepartmanEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('IkDepartmanEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

