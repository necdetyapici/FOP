angular.module('inspinia').controller(
    'proje_teslim_edilecek_urun_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeTeslimEdilecekUrun', 'srvProjePersonel',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeTeslimEdilecekUrun, srvProjePersonel) {
            $scope.projeID = $stateParams.projeID;
            $scope.teslimEdilecekUrunNo = $stateParams.teslimEdilecekUrunNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
               
                if ($scope.teslimEdilecekUrunNo > 0)
                    $scope.ProjeTeslimEdilecekUrunSelect();
            }

            $scope.AramaKriterListe = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };

            $scope.AramaKriter = {

                LISTE: false
            };
            $scope.ProjeTeslimEdilecekUrunSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTeslimEdilecekUrun.ProjeTeslimEdilecekUrunSelect($scope.teslimEdilecekUrunNo);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teslim edilecek ürün bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teslim edilecek ürün bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoTeslimEdilecekUrun = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teslim edilecek ürün bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeTeslimEdilecekUrunEkleGuncelle = function (InfoTeslimEdilecekUrun) {
                $scope.formCalistirildiTeslimEdilecekUrun = true;
                if ($scope.frmProjeTeslimEdilecekUrun.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeTeslimEdilecekUrun);
                    return;
                }
                var promiseGet = srvProjeTeslimEdilecekUrun.ProjeTeslimEdilecekUrunEkleGuncelle(InfoTeslimEdilecekUrun);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Teslim edilecek ürün kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teslim edilecek ürün kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Teslim edilecek ürün kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teslim edilecek ürün kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            //$scope.ProjePersonelGetData = function () {
            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriterListe);
            //    promiseGet.then(function (gelen) {
            //        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            //        $scope.ProjePersonelListesi = gelen.data.Veri;
            //        $rootScope.sayfayukleniyor = false;
            //    },
            //        function (hata) {
            //            $rootScope.sayfayukleniyor = false;
            //            mesajGoster('Dikkat', "Proje proje işlemleri kayıt plan proje personel listesi yüklenirken bir hata oluştu. Hata: " + hata.data.MessageDetail, 'W');
            //            console.log('Proje proje işlemleri kayıt plan proje personel listesi yüklenirken bir hata oluştu. Hata:', hata);
            //        });
            //};


        }]);

