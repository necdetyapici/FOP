angular.module('inspinia').controller(
    'proje_fizibiletesi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeFizibiletesi', 'srvMetrikler',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeFizibiletesi, srvMetrikler) {
            $scope.projeID = $stateParams.projeID;
            $scope.projeFizibiliteID = $stateParams.projeFizibiliteID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                $scope.MetriklerGetData();
                $scope.DegerlendirmeYontemiGetData();
                if ($scope.projeFizibiliteID > 0)
                    $scope.ProjeFizibiletesiSelect();
            };

            $scope.ProjeFizibiletesiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeFizibiletesi.ProjeFizibiletesiSelect($scope.projeFizibiliteID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Fizibilite bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Fizibilite bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjeFizibilite = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Fizibilite bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.ProjeFizibiletesiEkleGuncelle = function (InfoProjeFizibilite) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjeFizibilite = true;
                if ($scope.frmProjeFizibilitesi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeFizibilitesi);
                    return;
                }
                InfoProjeFizibilite.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeFizibiletesi.ProjeFizibiletesiEkleGuncelle(InfoProjeFizibilite);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Fizibilite kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Fizibilite kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.MetriklerGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetMetrikler = srvMetrikler.MetriklerGetData($scope.AramaKriter);

                promiseGetMetrikler.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Metrik listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Metrik listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.MetriklerListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Metrik listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DegerlendirmeYontemiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetDegerlendirmeYontemi = srvGenel.getDegerlendirmeYontemi();

                promiseGetDegerlendirmeYontemi.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Değerlendirme yöntemi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Değerlendirme yöntemi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.DegerlendirmeYontemiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Değerlendirme yöntemi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



        }]);

