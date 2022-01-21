angular.module('inspinia').controller(
    'yetki_grup_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'srvGenel', 'srvYetkilendirme',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, srvGenel, srvYetkilendirme) {
            $scope.yetkiGrupID = $stateParams.yetkiGrupID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {

                if ($scope.yetkiGrupID !== undefined && $scope.yetkiGrupID !== "")
                    $scope.yetkiGrupBilgileriniYukle();
            };

            $scope.yetkiGrupBilgileriniYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.getYetkiGruplari($scope.yetkiGrupID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grup bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grup bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.YetkiGrubu = gelen.data;
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
                        console.error('Yetki grup bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.yetkiGrubuKaydet = function (YetkiGrubu) {
                $scope.formCalistirildi = true;
                $rootScope.sayfayukleniyor = true;

                if ($scope.frmYetkiGrup.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmYetkiGrup);
                    $scope.formCalistirildi = false;
                    return;
                }

                var promiseGet = srvYetkilendirme.YetkiGrubuKaydet(YetkiGrubu);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grup kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grup kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Yetki grup işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        // $state.go('yonetim.yetkilendirmeislemleri', {});
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yetki grup kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }
        }]);