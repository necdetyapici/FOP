angular.module('inspinia').controller(
    'ik_demirbas_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkDemirbas', 'srvIkDemirbasCinsi', 'srvIkBirim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkDemirbas, srvIkDemirbasCinsi, srvIkBirim) {
            $scope.ikDemirbasID = $stateParams.ikDemirbasID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                $scope.IkDemirbasCinsiGetData();
                $scope.DemirbasDurumuGetData();
                $scope.IkBirimGetData();
                if ($scope.ikDemirbasID > 0) {
                    $scope.IkDemirbasSelect();
                } else {
                    $scope.demirbasTipi = true;
                }


            };

            $scope.IkDemirbasSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDemirbas.IkDemirbasSelect($scope.ikDemirbasID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbaş bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbaş bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                        $scope.demirbasTipi = gelen.data.DURUM;
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
                        console.error('Demirbaş bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkDemirbasEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmDemirbas.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmDemirbas);
                    return;
                }
                Info.DURUM = $scope.demirbasTipi;
                var promiseGet = srvIkDemirbas.IkDemirbasEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbaş kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbaş kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Demirbaş kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");


                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Demirbaş kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkDemirbasCinsiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDemirbasCinsi.IkDemirbasCinsiGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbaş cinsi listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbaş cinsi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.IkDemirbasCinsiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Demirbaş cinsi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkBirimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkBirim.IkBirimGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Birim listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Birim listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.IkBirimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Birim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DemirbasDurumuGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getDemirbasDurumu();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbas durumu listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbas durumu listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.DemirbasDurumuListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Demirbaş durumu listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

