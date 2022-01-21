angular.module('inspinia').controller(
    'proje_konfigurasyon_arac_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeKonfigurasyonArac', 'srvKonfigurasyonArac',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeKonfigurasyonArac, srvKonfigurasyonArac) {
            $scope.projeID = $stateParams.projeID;
            $scope.konfigurasyonAracNo = $stateParams.konfigurasyonAracNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {

                LISTE: false
            };
            $scope.init = function () {
                $scope.konfigurasyonAracListesiYukle();

                if ($scope.konfigurasyonAracNo > 0)
                    $scope.ProjeKonfigurasyonAracSelect();
            }

            $scope.ProjeKonfigurasyonAracSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeKonfigurasyonArac.ProjeKonfigurasyonAracSelect($scope.konfigurasyonAracNo);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Konfigürasyon araç bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjeKonfigurasyonAraci = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeKonfigurasyonAracEkleGuncelle = function (InfoProjeKonfigurasyonAraci) {
                $scope.formCalistirildiProjeKonfigurasyonArac = true;
                if ($scope.frmProjeKonfigurasyonArac.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeKonfigurasyonArac);
                    return;
                }
                InfoProjeKonfigurasyonAraci.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeKonfigurasyonArac.ProjeKonfigurasyonAracEkleGuncelle(InfoProjeKonfigurasyonAraci);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjeKonfigurasyonArac = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Konfigürasyon araç kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        $scope.formCalistirildiProjeKonfigurasyonArac = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Konfigürasyon araç kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }


            $scope.konfigurasyonAracListesiYukle = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGetMetrikler = srvKonfigurasyonArac.KonfigurasyonAracGetData($scope.AramaKriter);

                promiseGetMetrikler.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Konfigürasyon araç listesi yüklenirken bir hata oluştu. ', gelen.data.sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.KonfigurasyonAracListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Projede verilecek eğitim bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }



        }]);

