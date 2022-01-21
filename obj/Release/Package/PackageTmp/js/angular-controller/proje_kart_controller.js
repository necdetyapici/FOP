angular.module('inspinia').controller(
    'proje_kart_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel','srvTicariKosul','srvProjeMusteriTipi','srvFinansKaynagiTuru','srvProjeTuru', 'srvProjeler', 
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTicariKosul, srvProjeMusteriTipi, srvFinansKaynagiTuru, srvProjeTuru, srvProjeler) {
            $scope.projeID = $stateParams.projeID;
            $scope.IsCreate = 0;//1;
            $scope.altTab = 0;
            $scope.tab = 0;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                $scope.FinansKaynagiTuruGetData();
                $scope.ProjeTuruGetData();

                $scope.TicariKosulGetData();
                $scope.ProjeMusteriTipiGetData();
            };
            

            $scope.ProjelerEkleGuncelle = function (InfoProje) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProje = true;
                if ($scope.frmProje.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProje);
                    return;
                }
                var promiseGet = srvProjeler.ProjelerEkleGuncelle(InfoProje);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Proje kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.projeID = gelen.data.returnKayitNo;
                        $state.go('proje.projelerkayit.projekart', { projeID: $scope.projeID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.FinansKaynagiTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvFinansKaynagiTuru.FinansKaynagiTuruGetData();

                promiseGet.then(function (gelen) {
                    $scope.FinansKaynagiTuruListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Finans kaynağı listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Finans kaynağı listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Finans kaynağı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTuru.ProjeTuruGetData();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ProjeTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TicariKosulGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTicariKosul.TicariKosulGetData();

                promiseGet.then(function (gelen) {
                    $scope.TicariKosulListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Ticari koşul listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Ticari koşul listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Ticari koşul listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeMusteriTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeMusteriTipi.ProjeMusteriTipiGetData();

                promiseGet.then(function (gelen) {
                    $scope.ProjeMusteriTipiListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Müşteri tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Müşteri tipi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
            
        }]);

