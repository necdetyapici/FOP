angular.module('inspinia').controller(
    'talep_rapor_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGrafikRapor', 'srvKullanici', 'srvKullaniciProje', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGrafikRapor, srvKullanici, srvKullaniciProje, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                //  KULLANICI_ID: $scope.$storage.KULLANICI_ID
                //RAPOR : 1
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriterListe = {
                LISTE: false,
                FILTER: true,
                KULLANICI_ID: $scope.$storage.KULLANICI_ID
            };
            $scope.init = function () {
                $scope.KullaniciProjeGetData();
                $scope.TalepDurumTipiGetData();
                $scope.TalepTipiGetData();
                $scope.TalepSahibiGetData();
                $scope.GrafikTipiGetData();
            }
            $scope.grafikTuru = function (AramaKriter) {
                if (AramaKriter.GRAFIK_TIPI_ID == 1) {
                    AramaKriter.RAPOR = 1;
                    $scope.pieData = null;
                    $scope.grafikBarData = null;
                    $scope.TalepRaporTrendGetData(AramaKriter);
                }
                else if (AramaKriter.GRAFIK_TIPI_ID == 2) {
                    AramaKriter.RAPOR = 2;
                    $scope.grafikData = null;
                    $scope.grafikBarData = null;
                    $scope.TalepRaporPieData(AramaKriter);
                }
                else if (AramaKriter.GRAFIK_TIPI_ID == 3) {
                    AramaKriter.RAPOR = 3;
                    $scope.grafikData = null;
                    $scope.pieData = null;
                    $scope.TalepRaporBarGetData(AramaKriter);
                }
            }

            $scope.TalepRaporTrendGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGrafikRapor.grafikRaporGetData(AramaKriter);

                promiseGet.then(function (gelen) {
                    $scope.grafikData = gelen.data;
                    ColumnsAy = [];
                    ColumnsVeri = [];
                    sayi = ['Talep'];
                    ColumnsVeri.push(sayi);
                    angular.forEach(gelen.data, function (value, key) {
                        ColumnAy = [value.ay];
                        ColumnVeri = [value.sayi];
                        ColumnsAy.push(ColumnAy);
                        ColumnsVeri.push(ColumnVeri);
                    });

                    c3.generate({
                        bindto: '#lineChart',
                        data: {
                            columns: [
                                ColumnsVeri
                            ],
                            colors: {
                                data1: '#1ab394',
                                data2: '#BABABA'
                            }
                        },
                        axis: {
                            x: {
                                type: 'category',
                                categories: ColumnsAy
                            }
                        }
                    });

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "grafik yüklenirken bir hata oluştu. Hata: " + hata.data.MessageDetail, 'W');
                        console.log('getData Hata:', hata);
                    });
            }

            $scope.TalepRaporPieData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGrafikRapor.grafikRaporGetData(AramaKriter);

                promiseGet.then(function (gelen) {
                    $scope.pieData = gelen.data;
                    Columns = [];
                    angular.forEach(gelen.data, function (value, key) {
                        Column = [value.ay, value.sayi];
                        Columns.push(Column);
                    });
                    c3.generate({
                        bindto: '#pie',
                        data: {
                            columns: Columns,
                            type: 'pie'
                        },
                        pie: {
                            label: {
                                format: function (value) { return value; }
                            }
                        }
                    });

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "grafik yüklenirken bir hata oluştu. Hata: " + hata.data.MessageDetail, 'W');
                        console.log('getData Hata:', hata);
                    });
            }

            $scope.TalepRaporBarGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGrafikRapor.grafikRaporGetData(AramaKriter);

                promiseGet.then(function (gelen) {
                    $scope.grafikBarData = gelen.data;

                    ColumnsSayi = [];
                    ColumnsAy = [];
                    talep = ['Talep'];
                    ColumnsSayi.push(talep);
                    angular.forEach(gelen.data, function (value, key) {
                        ColumnAy = [value.ay];
                        ColumnSayi = [value.sayi];
                        ColumnsSayi.push(ColumnSayi);
                        ColumnsAy.push(ColumnAy);
                    });

                    c3.generate({
                        bindto: '#barChart',
                        data: {
                            columns: [
                                ColumnsSayi
                                //['x', 30, 50, 100]
                            ],
                            type: 'bar'
                        },
                        axis: {
                            x: {
                                type: 'category',
                                categories: ColumnsAy
                                //categories: ["asd","bdf","asdf"]
                            }
                        }
                    });

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "grafik yüklenirken bir hata oluştu. Hata: " + hata.data.MessageDetail, 'W');
                        console.log('getData Hata:', hata);
                    });
            }


            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.KullaniciProjeListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "KullaniciProje listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('KullaniciProjeGetData Hata:', hata);
                    });
            };

            $scope.TalepTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepTipi();
                promiseGet.then(function (gelen) {
                    $scope.TalepTipiListesi = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Proje proje işlemleri kayıt plan proje personel tecrübe listesi yüklenirken bir hata oluştu. Hata: " + hata.data, 'W');
                        console.log('Proje proje işlemleri kayıt plan proje personel tecrübe listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            }

            $scope.TalepDurumTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepDurumTipi();
                promiseGet.then(function (gelen) {
                    $scope.TalepDurumListesi = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Proje proje işlemleri kayıt plan proje personel tecrübe listesi yüklenirken bir hata oluştu. Hata: " + hata.data, 'W');
                        console.log('Proje proje işlemleri kayıt plan proje personel tecrübe listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            }

            $scope.TalepSahibiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterListe);
                promiseGet.then(function (pl) {
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                    $scope.TalepSahibiListesi = pl.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (errorPl) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Toplantı toplantı kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata: " + errorPl.data, 'W')
                        $log.error('Toplantı toplantı kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata:', errorPl);
                    });
            }

            $scope.GrafikTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.GrafikTipiListesi = [{ 'GRAFIK_TIPI_ID': '1', 'GRAFIK_TIPI_ADI': 'Trend' }, { 'GRAFIK_TIPI_ID': '2', 'GRAFIK_TIPI_ADI': 'Pie' }, { 'GRAFIK_TIPI_ID': '3', 'GRAFIK_TIPI_ADI': 'Bar' }];
            }




            $scope.filtreTemizle = function () {
                angular.element("#cmbPROJE_ID")[0].value = null;
                angular.element("#cmbTALEP_TIPI_ID")[0].value = null;
                angular.element("#cmbKULLANICI_ID")[0].value = null;
                angular.element("#cmbTALEP_DURUM_TIPI_ID")[0].value = null;
                angular.element("#cmbGRAFIK_TIPI_ID")[0].value = null;


                $scope.AramaKriter = {

                };
                $('#txtTALEP_BASLANGIC_TARIHI').val(null);
                $('#txtTALEP_BITIS_TARIHI').val(null);
                //$scope.grafikTuru($scope.AramaKriter);
            }

        }]);

