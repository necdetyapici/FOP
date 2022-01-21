angular.module('inspinia').controller(
    'projede_egitim_alan_personel_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjedeEgitimAlanPersonel', 'srvProjedeVerilecekEgitim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjedeEgitimAlanPersonel, srvProjedeVerilecekEgitim) {
            $scope.projeID = $stateParams.projeID;
            $scope.egitimalanpersonelNo = $stateParams.egitimalanpersonelNo;



            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: false

            };

            $scope.init = function () {
                //$scope.personelYukle();
                $scope.verilecekEgitimYukle();
                if ($scope.egitimalanpersonelNo > 0)
                    $scope.ProjedeEgitimAlanPersonelSelect();
            }

            $scope.ProjedeEgitimAlanPersonelSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeEgitimAlanPersonel.ProjedeEgitimAlanPersonelSelect($scope.egitimalanpersonelNo);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim alan personel bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim alan personel bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim alan personel bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjedeEgitimAlanPersonelEkleGuncelle = function (Info) {
                $scope.formCalistirildiProjeEgitimAlanPersonel = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeEgitimAlanPersonel.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeEgitimAlanPersonel);
                    return;
                }
                Info.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjedeEgitimAlanPersonel.ProjedeEgitimAlanPersonelEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Eğitim alan personel kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim alan personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Eğitim alan personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Eğitim alan personel kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }



            //$scope.personelYukle = function () {
            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriter);

            //    promiseGet.then(function (gelen) {
            //        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            //       $scope.ProjePersonelListesi = gelen.data.Veri;
            //       $rootScope.sayfayukleniyor = false;
            //   },
            //       function (hata) {
            //           $rootScope.sayfayukleniyor = false;
            //           mesajGoster('Dikkat', "Proje proje işlemleri kayıt plan projede eğitim alan personel kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata: " + hata.data, 'W');
            //           console.log('Proje proje işlemleri kayıt plan projede eğitim alan personel kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata:', hata);
            //       });
            //}


            $scope.verilecekEgitimYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeVerilecekEgitim.ProjedeVerilecekEgitimGetData($scope.AramaKriter);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Verilecek eğitim listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Verilecek eğitim listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.verilecekEgitimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Verilecek eğitim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }


        }]);

