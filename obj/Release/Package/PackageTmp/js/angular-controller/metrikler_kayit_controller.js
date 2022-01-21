angular.module('inspinia').controller(
    'metrikler_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvMetrikler',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvMetrikler) {
            $scope.sistemMetrikID = $stateParams.sistemMetrikID;

            //arama kriterleri belirlenir.
            $scope.AramaKriter = {
                METRIK: '',
                UST_METRIK_LISTESI: 1,
                LISTE: false
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.sistemMetrikID > 0)
                    $scope.MetriklerSelect();
                $scope.MetriklerGetData();
            }

            $scope.MetriklerSelect = function () {
                $rootScope.sayfayukleniyor = true;
                //alert($scope.sistemMetrikID);
                var promiseGet = srvMetrikler.MetriklerSelect($scope.sistemMetrikID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Metrik bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Metrik bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                        console.error('Metrik bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.MetriklerGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMetrikler.MetriklerGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Metrik listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Metrik listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.MetriklerListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('sistem.metriklistesi');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Metrik listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };
            $scope.MetriklerEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmMetrik.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmMetrik);
                    return;
                }
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMetrikler.MetriklerEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Metrik kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Metrik kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Metrik kayıt işleminiz başarılı bir şekilde yapılmıştır.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Metrik kayıt işlemi sırasında bir hata oluştu. Hata:', hata);

                    });
            }

        }]);

