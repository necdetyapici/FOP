angular.module('inspinia').controller(
    'proje_musteri_egitimi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeMusteriEgitimi', 'srvProjePersonel',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeMusteriEgitimi, srvProjePersonel) {
            $scope.projeID = $stateParams.projeID;
            $scope.musteriEgitimiNo = $stateParams.musteriEgitimiNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: false

            };
            $scope.init = function () {

                $scope.PersonelYukle();

                if ($scope.musteriEgitimiNo > 0)
                    $scope.ProjeMusteriEgitimiSelect();
            }

            $scope.ProjeMusteriEgitimiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeMusteriEgitimi.ProjeMusteriEgitimiSelect($scope.musteriEgitimiNo);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Müşteri eğitimi bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Müşteri eğitimi bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjeMusteriEgitimi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri eğitimi bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeMusteriEgitimiEkleGuncelle = function (InfoProjeMusteriEgitimi) {
                $scope.formCalistirildiProjeMusteriEgitimi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeMusteriEgitimi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeMusteriEgitimi);
                    return;
                }
                var promiseGet = srvProjeMusteriEgitimi.ProjeMusteriEgitimiEkleGuncelle(InfoProjeMusteriEgitimi);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjeMusteriEgitimi = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Müşteri eğitimi kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Müşteri eğitimi kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Müşteri eğitimi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $scope.formCalistirildiProjeMusteriEgitimi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri eğitimi kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }


            $scope.PersonelYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitmen listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitmen listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ProjePersonelListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitmen listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };
        }]);

