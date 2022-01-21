angular.module('inspinia').controller(
    'dokuman_klasor_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanKlasor',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanKlasor) {
            $scope.dokumanKlasorID = $stateParams.dokumanKlasorID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.DokumanKlasorGetData();
                if ($scope.dokumanKlasorID > 0)
                    $scope.DokumanKlasorSelect();
            };

            $scope.DokumanKlasorSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorSelect($scope.dokumanKlasorID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman klasör bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Dokuman klasör bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.DokumanKlasorEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmDokumanKlasor.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmDokumanKlasor);
                    $rootScope.sayfayukleniyor = false;
                    return;
                }
                var promiseGet = srvDokumanKlasor.DokumanKlasorEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Dokuman klasör kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Dokuman klasör kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman klasör kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriterUstKlasor = {
                DOKUMAN_GOSTER: true,
                LISTE: false
            }; 

            $scope.DokumanKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorGetData($scope.AramaKriterUstKlasor);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman klasör listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.UstDokumanKlasorListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

