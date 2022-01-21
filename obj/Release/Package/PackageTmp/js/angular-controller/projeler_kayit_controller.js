angular.module('inspinia').controller(
    'projeler_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvKullanici','srvTicariKosul', 'srvProjePersonel','srvFinansKaynagiTuru','srvYasamDongusu', 'srvProjeTuru','srvProjeMusteriTipi', 'srvGenel', 'srvProjeler', 

        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvKullanici, srvTicariKosul, srvProjePersonel, srvFinansKaynagiTuru, srvYasamDongusu, srvProjeTuru, srvProjeMusteriTipi, srvGenel, srvProjeler) {
            //$controller('proje_fizibiletesi_liste_controller', { $scope: $scope });
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
                $scope.KullaniciGetData();
                $scope.setTab($scope.tab);
                $scope.setAltTab($scope.altTab);
                $scope.FinansKaynagiTuruGetData();
                $scope.ProjeTuruGetData();

                $scope.TicariKosulGetData();
                $scope.ProjeMusteriTipiGetData();

                if ($scope.projeID > 0) {
                    $scope.PeriyotTipiGetData();
                    $scope.YasamDongusuGetData();
                    $scope.TahminEdilenProjeSuresiGetData();
                    $scope.ProjePersonelGetDataGenel();
                    $scope.ProjelerSelect();

                }
            };


            //$scope.setAltTab = function (tabId) {
            //    //alert(tabId);
            //    $scope.altTab = tabId;
            //};


            $scope.ProjelerSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeler.ProjelerSelect($scope.projeID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProje = gelen.data;
                        $scope.IsCreate = 1;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Proje bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjelerEkleGuncelle = function (InfoProje, frmProje) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProje = true;
                if (frmProje.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmProje);
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

            $scope.setTab = function (tabValue) {
                $scope.tab = tabValue;

                if (tabValue === 0) {
                    if ($state.current.name.indexOf('proje.projelerkayit.fizibilite') !== -1) {
                        $scope.tab = 2;

                    }
                    if ($state.current.name.indexOf('proje.projelerkayit.projekart') !== -1) {
                        $scope.tab = 1;
                    }

                    if ($state.current.name.indexOf('proje.projelerkayit.plan') !== -1) {
                        $scope.tab = 3;
                    }

                    if ($state.current.name.indexOf('proje.projelerkayit.risk') !== -1) {
                        $scope.tab = 4;
                    }

                    if ($state.current.name.indexOf('proje.projelerkayit.talepyonetimsistemi') !== -1) {
                        $scope.tab = 5;
                    }
                    if ($state.current.name.indexOf('proje.projelerkayit.dokuman') !== -1) {
                        $scope.tab = 6;
                    }
                }

                $scope.altTab = $state.current.data.altTab;

                if ($scope.tab === 2 && !($scope.altTab > 1)) {
                    $scope.altTab = 1;
                }
                if ($scope.tab === 3 && !($scope.altTab > 1)) {
                    $scope.altTab = 5;
                }
                if ($scope.tab === 4 && !($scope.altTab > 1)) {
                    $scope.altTab = 31;
                }
                if ($scope.tab === 5 && !($scope.altTab > 1)) {
                    $scope.altTab = 20;
                }

            };

            $scope.setAltTab = function (altTabValue) {

                if ($state.current.data.altTab) {
                    $scope.altTab = $state.current.data.altTab;
                }
                if (altTabValue > 0) {
                    $scope.altTab = altTabValue;
                }
            };

            //Sayfadaki bütün kullanıcı listesi buradan çekilecek.
            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
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
                    $scope.ProjeTuruListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
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


            //Projenin içinde kullanılan personellerin servisi için eklendi.
            $scope.AramaKriterProjePersonelGenel = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };
            $scope.ProjePersonelGetDataGenel = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriterProjePersonelGenel);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        //$scope.toplamKayitSayisiProjePersonel = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePersonelListesiGenel = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
            

            $scope.PeriyotTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getPeriyotTipiListesi();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Periyot tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Periyot tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.PeriyotTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Periyot tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.YasamDongusuGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYasamDongusu.YasamDongusuGetData();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yaşam döngüsü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yaşam döngüsü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.YasamDongusuListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Yaşam döngüsü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TahminEdilenProjeSuresiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTahminEdilenProjeSuresiListesi();

                promiseGet.then(function (gelen) {
                    $scope.TahminEdilenProjeSuresiListesi = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Tahmin edilen proje süresi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Tahmin edilen proje süresi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tahmin edilen proje süresi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //tahminleme controllü ileride ayrı bir controle ayrılabilir.
            $scope.ProjeTahminEkleGuncelle = function (InfoProje) {
                $rootScope.sayfayukleniyor = true;
                //$scope.formCalistirildi = true;
                //if (form.$valid) { } else {

                //    $rootScope.focusToInvalid();
                //    return;
                //}
                var promiseGet = srvProjeler.ProjelerEkleGuncelle(InfoProje);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Tahminleme kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Tahminleme kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Tahminleme kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tahminleme kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

