angular.module('inspinia').controller(
    'talep_proje_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvTalepProje','srvProjeIterasyon', 'srvProjeler', 'srvProjeIterasyon', 'srvGenel',
        'srvKullaniciProje', 'srvKullanici', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvTalepProje, srvProjeIterasyon,srvProjeler, srvProjeIterasyon, srvGenel, srvKullaniciProje, srvKullanici, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterListe = {
                LISTE: false,
                KULLANICI_ID: $scope.$storage.KULLANICI_ID,
                PROJE_ID: ''
            };
            $scope.AramaKriter = {
                LISTE: true,
                PROJE_ID: '',
                TALEP_SAHIBI_KULLANICI_ID: '',
                PROJE_ITERASYON_ID: '',
                TALEP_TIPI_ID: '',
                TALEP_DURUM_TIPI_ID: '',
                TALEP_PROJE_TALEP_NO: '',
                TALEP_ATAYAN_KULLANICI_ID: '',
                TALEP_PROJE_KONU: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.KullaniciProjeGetData();
                $scope.TalepTipiGetData();
                $scope.TalepDurumTipiGetData();
                $scope.KullaniciGetData();
                $scope.tabClick(1);
            };


            $scope.TalepProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.TalepProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Talep listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.TalepProjeSil = function (InfoTalep) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeSil(InfoTalep.TALEP_PROJE_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Talep silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.TalepProjeGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (InfoTalep) {
                $scope.secilenKayit = InfoTalep;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeIterasyonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterListe.PROJE_ID = $scope.AramaKriter.PROJE_ID;
                //if ($scope.AramaKriter.PROJE_ID === null || $scope.AramaKriter.PROJE_ID === undefined) {
                //    $scope.AramaKriter.PROJE_ID = 0;
                //}
                var promiseGet = srvProjeIterasyon.ProjeIterasyonGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İterasyon listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ProjeIterasyonListesi = gelen.data.Veri;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep tipi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.TalepListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepDurumTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepDurumTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep durum tipi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep durum tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.TalepDurumListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep durum tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };




            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                //$state.reload();
                //$scope.AramaKriter = {
                //    LISTE: true,
                //    PROJE_ID: null,
                //    PROJE_ITERASYON_ID: null,
                //    TALEP_TIPI_ID: null,
                //    TALEP_DURUM_TIPI_ID: null,
                //    TALEP_PROJE_TALEP_NO: null,
                //    TALEP_ATAYAN_KULLANICI_ID: null,
                //    TALEP_SAHIBI_KULLANICI_ID: null,
                //    TALEP_PROJE_KONU: null,
                //    SayfaNo: 1,
                //    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                //};
                switch ($scope.tab) {
                    case 1:
                        $scope.tabClick(1);
                        break;
                    case 2:
                        $scope.tabClick(2);
                        break;
                    default: 
                        $scope.tabClick(3);
                        break;
                }
                //$scope.TalepProjeGetData($scope.AramaKriterListe);
            };

            $scope.temizleFiltre = function () {
                $scope.AramaKriter = {
                    LISTE: true,
                    PROJE_ID: null,
                    PROJE_ITERASYON_ID: null,
                    TALEP_TIPI_ID: null,
                    TALEP_DURUM_TIPI_ID: null,
                    TALEP_PROJE_TALEP_NO: null,
                    TALEP_SAHIBI_KULLANICI_ID: null,
                    TALEP_ATAYAN_KULLANICI_ID: null,
                    TALEP_PROJE_KONU: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
            };

            $scope.tabClick = function (tab) {
                if (tab === 1) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabBir');
                    $scope.tab = 1;
                    $scope.AramaKriter.TALEP_SAHIBI_KULLANICI_ID = $scope.$storage.KULLANICI_ID;
                    $scope.TalepProjeGetData();

                }
                if (tab === 2) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabIki');
                    $scope.tab = 2;
                    $scope.AramaKriter.TALEP_ATAYAN_KULLANICI_ID = $scope.$storage.KULLANICI_ID;
                    $scope.TalepProjeGetData();
                }
                else if (tab === 3) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabUc');
                    $scope.tab = 3;
                    $scope.TalepProjeGetData();

                }
            };
        }]);

