angular.module('inspinia').controller(
    'dokuman_gozden_gecirme_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanGozdenGecirme',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanGozdenGecirme) {
            $scope.kayitNo = $stateParams.kayitNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.kayitNo > 0)
                    $scope.DokumanGozdenGecirmeSelect();
            }

            $scope.DokumanGozdenGecirmeSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirme.DokumanGozdenGecirmeSelect($scope.kayitNo);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman gözden geçirme bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman gözden geçirme bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Doküman gözden geçirme bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.DokumanGozdenGecirmeEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvDokumanGozdenGecirme.DokumanGozdenGecirmeEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman gözden geçirme kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman gözden geçirme kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman gözden geçirme kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir. " + gelen.data.mesaj, "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman gözden geçirme kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

