angular.module('inspinia').controller(
    'proje_iterasyon_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeSurum', 'srvProjeIterasyon', 'srvProjeModul',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeSurum, srvProjeIterasyon, srvProjeModul) {
            $scope.projeIterasyonID = $stateParams.projeIterasyonID;
            $scope.projeID = $stateParams.projeID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };
            $scope.AramaKriterModul = {
                PROJE_ID: $scope.projeID,
                MUSTERI_ID: '',
                MODUL_ADI: '',
                SayfaNo: 1
            };
            $scope.init = function () {

                $scope.ProjeSurumGetData();
                $scope.IterasyonDurumGetData();
                $scope.ProjeModulGetData();
                if ($scope.projeIterasyonID > 0)
                    $scope.ProjeIterasyonSelect();
            }

            $scope.ProjeIterasyonSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonSelect($scope.projeIterasyonID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İterasyon bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İterasyon bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjeiterasyon = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İterasyon bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeIterasyonEkleGuncelle = function (InfoProjeiterasyon) {
                $scope.formCalistirildiProjeiterasyon = true;
                if ($scope.frmProjeiterasyon.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeiterasyon);
                    return;
                }
                InfoProjeiterasyon.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonEkleGuncelle(InfoProjeiterasyon);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "İterasyon kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İterasyon kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "İterasyon kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İterasyon kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeSurumGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurum.ProjeSurumGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje sürüm listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ProjeSurumListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };



            $scope.IterasyonDurumGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIterasyonDurumTipi();

                promiseGet.then(function (gelen) {
                    $scope.IterasyonDurumListesi = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İterasyon durum tipi listesi yükleirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('İterasyon durum tipi listesi yükleirken bir hata oluştu.', gelen.data[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İterasyon durum tipi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });

            }

            $scope.ProjeModulGetData = function (AramaKriterModul) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeModul.ProjeModulGetData($scope.AramaKriterModul);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje modül listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeModulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

