angular.module('inspinia').controller(
    'ik_personel_avans_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel','srvAvansTuru', 'srvAvans', 'srvKullaniciProje',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvAvansTuru, srvAvans, srvKullaniciProje) {
            $scope.ikPersonelAvansID = $stateParams.ikPersonelAvansID;
            $scope.kullaniciID = $stateParams.kullaniciID;


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                LISTE: false,
                KULLANICI_ID: $scope.kullaniciID
            };

            $scope.init = function () {
                $scope.InfoPersonelAvans = {};
                $scope.ParaBirimiGetData();
                $scope.AvansTuruGetData();
                $scope.KullaniciProjeGetData();
                if ($scope.ikPersonelAvansID > 0) {
                    $scope.AvansSelect();
                }
                else {
                    $scope.InfoPersonelAvans.TALEP_EDEN_KULLANICI_AD_SOYAD = $scope.$storage.AD_SOYAD;
                }
            };

            $scope.AvansSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvans.AvansSelect($scope.ikPersonelAvansID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel avans bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel avans bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonelAvans = gelen.data;
                        $scope.pasif = true;
                        $scope.personelGenelIkYoneticiId = $scope.InfoPersonelAvans.GOZDEN_GECIREN_KULLANICI_ID;
                        $scope.personelGenelIkYoneticiKullaniciAdSoyad = $scope.InfoPersonelAvans.GOZDEN_GECIREN_KULLANICI_AD_SOYAD;

                        if ($scope.InfoPersonelAvans.PROJE_ID) {
                            $scope.GetProjeEtiket($scope.InfoPersonelAvans.PROJE_ID,false);
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel avans bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.etiketOlustur = function (yeniEtiket) {
                var item = {
                    PROJE_ETIKET_ID: -1,
                    ADI: yeniEtiket,
                    KULLANICI_ID: -1,
                    MUSTERI_ID: -1,
                    KAYIT_TARIHI: Date.now,
                    PROJE_ID: $scope.InfoPersonelAvans.PROJE_ID

                };

                return item;
            }

            $scope.GetProjeEtiket = function (projeID,sifirla) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeEtiketListesi(projeID)
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;

                    //let array = [];

                    //for (var i = 0; i < gelen.data.length; i++) {
                    //    array.push(gelen.data[i].ADI);
                    //}

                    $scope.ProjeEtiketListesi = gelen.data;

                    if (sifirla)
                        $scope.InfoPersonelAvans.SeciliEtiketler = null;
                    //if (gelen.data.Veri.length == 0 && gelen.data.Veri[0].basariDurumu === false) {
                    //    mesajGoster('Dikkat', 'Proje Etiket listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                    //    console.error('Proje Etiket listesi yüklerken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    //} else {
                    //    $scope.ProjeEtiketListesi = gelen.data.Veri;
                    //}
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje Etiket listesi yüklerken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.AvansEkleGuncelle = function (InfoPersonelAvans) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiPersonelAvans = true;
                if ($scope.frmIkPersonelAvans.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmIkPersonelAvans);
                    return;
                }
                InfoPersonelAvans.TALEP_EDEN_KULLANICI_ID = $scope.kullaniciID;
                InfoPersonelAvans.GOZDEN_GECIREN_KULLANICI_ID = $scope.personelGenelIkYoneticiId;
                //$scope.Onaylama();
                var promiseGet = srvAvans.AvansEkleGuncelle(InfoPersonelAvans);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel avans kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel avans kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Personel avans kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ikPersonelAvansID = gelen.data.returnKayitNo;
                        $scope.AvansSelect();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel avans kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ParaBirimiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getParaBirimi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Para birimi listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Para birimi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ParaBirimiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Para birimi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AvansTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvansTuru.AvansTuruGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Avans türü listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Avans türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.AvansTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Avans türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje listesi yüklerken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje listesi yüklerken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.IkPersonelAvansOnaylama = function (InfoPersonelAvans) {
                $rootScope.sayfayukleniyor = true;
                $scope.InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID = 6;
                $scope.InfoPersonelAvans.TALEP_EDEN_KULLANICI_ID = $scope.kullaniciID;

                var promiseGet = srvAvans.AvansOnaylama(InfoPersonelAvans);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel avans onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel avans onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel avans onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if (InfoPersonelAvans.AVANS_MASRAF_DURUMU_ID === 4) {
                            $scope.GeriAvansReddet();
                        }
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel avans onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


        }]);

