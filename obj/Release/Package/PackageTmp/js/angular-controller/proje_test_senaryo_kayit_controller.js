angular.module('inspinia').controller(
    'proje_test_senaryo_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvTestSenaryoTestTipi', 'srvGenel', 'srvProjeTestSenaryo', 'srvProjeTestSenaryoTestAdim', 'srvProjeIterasyon', 'srvProjeGereksinim', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvTestSenaryoTestTipi, srvGenel, srvProjeTestSenaryo, srvProjeTestSenaryoTestAdim, srvProjeIterasyon, srvProjeGereksinim, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeTestSenaryoID = $stateParams.projeTestSenaryoID;
            $scope.projeID = $stateParams.projeID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriterGereksinim = {
                LISTE: true,
                PROJE_ID: $scope.projeID,
                PROJE_ITERASYON_ID: '',
                PROJE_GEREKSINIM_NO: '',
                PROJE_GEREKSINIM_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 5
            };

            $scope.AramaKriterIterasyon = {
                LISTE: false,
                PROJE_ID: $scope.projeID
            };
            $scope.init = function () {
                //$scope.ProjeIterasyonGetData();
                $scope.ProjeGereksinimGetData();
                $scope.TestSenaryoTestTipiGetData();
                $scope.ProjeTestSenaryoTestAdimGetData();
                if ($scope.projeTestSenaryoID > 0) {
                    $scope.ProjeTestSenaryoSelect();
                }
               

            };

            $scope.InfoProjeTestSenaryo = {
                TEST_SENARYO_NO: null,
                TEST_SENARYO_TEST_TIPI_ID: null,
                PROJE_GEREKSINIM_ID: null,
                PROJE_GEREKSINIM_ADI: null
            };

            $scope.ProjeTestSenaryoSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTestSenaryo.ProjeTestSenaryoSelect($scope.projeTestSenaryoID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test senaryo bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test senaryo bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjeTestSenaryo = gelen.data;
                        if ($scope.InfoProjeTestSenaryo.PROJE_GEREKSINIM_ID === null) {
                            $scope.gereksinimDurumu = false;
                        }
                        else {
                            $scope.gereksinimDurumu = true;
                            $scope.ProjeGereksinimGetData();
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test senaryo bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeTestSenaryoEkleGuncelle = function (InfoProjeTestSenaryo) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjeTestSenaryo = true;
                if ($scope.frmProjeTestSenaryo.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeTestSenaryo);
                    return;
                }

                InfoProjeTestSenaryo.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeTestSenaryo.ProjeTestSenaryoEkleGuncelle(InfoProjeTestSenaryo);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test senaryo kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test senaryo kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Test senaryo kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.projeTestSenaryoID = gelen.data.returnKayitNo;
                        $state.go('proje.projelerkayit.talepyonetimsistemi.projetestsenaryokayit', { projeID: $scope.projeID, projeTestSenaryoID: $scope.projeTestSenaryoID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test senaryo kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TestSenaryoTestTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTestSenaryoTestTipi.TestSenaryoTestTipiGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TestSenaryoTestTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.TestSenaryoAdimEkle = function (projeTestSenaryoTestAdimID) {
                if (projeTestSenaryoTestAdimID > 0) {
                    $scope.ProjeTestSenaryoTestAdimSelect(projeTestSenaryoTestAdimID);
                } else {
                    $rootScope.InfoProjeTestSenaryoTestAdim.PROJE_TEST_SENARYO_ADIM_ID = null;
                    $scope.TestSenaryoAdimSifirlama();
                }
                $scope.$modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_proje_test_senaryo_adim_ekle.html',
                    controller: 'proje_test_senaryo_kayit_controller',
                    size: 'lg',
                    scope: $scope
                });
                $scope.$modalInstance.result.then(function () {
                    $scope.ProjeTestSenaryoTestAdimGetData();
                }, function (data) {
                    });
            };

            $scope.Ekle = function (InfoProjeTestSenaryoTestAdim) {
                $scope.ProjeTestSenaryoTestAdimEkleGuncelle(InfoProjeTestSenaryoTestAdim, frmProjeTestSenaryoAdim);

            };

            $scope.Geri = function () {
                $scope.$modalInstance.close();
            };

            $scope.AramaKriterTestSernaryoAdim = {
                MUSTERI_ID: '',
                PROJE_ID: $scope.projeID,
                PROJE_TEST_SENARYO_ID: $scope.projeTestSenaryoID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $rootScope.InfoProjeTestSenaryoTestAdim = {
                PROJE_TEST_SENARYO_ADIM_ID: null,
                PROJE_TEST_SENARYO_ID: '',
                PROJE_ID: '',
                AKTOR: '',
                SIRA: '',
                GIRIS_KOSULU: '',
                ACIKLAMA: '',
                BEKLENEN_SONUC: ''
            };

            $scope.ProjeTestSenaryoTestAdimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTestSenaryoTestAdim.ProjeTestSenaryoTestAdimGetData($scope.AramaKriterTestSernaryoAdim);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test adım listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test adım listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeTestSenaryoTestAdimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test adım listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeTestSenaryoTestAdimSelect = function (projeTestSenaryoTestAdimID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTestSenaryoTestAdim.ProjeTestSenaryoTestAdimSelect(projeTestSenaryoTestAdimID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test adım bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test adım bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $rootScope.InfoProjeTestSenaryoTestAdim = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test adım bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeTestSenaryoTestAdimEkleGuncelle = function (InfoProjeTestSenaryoTestAdim) {
                $rootScope.sayfayukleniyor = true;
                $scope.formProjeTestSenaryoTestAdimCalistirildi = true;
                if ($scope.frmProjeTestSenaryoAdim.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeTestSenaryoAdim);
                    return;
                }
                InfoProjeTestSenaryoTestAdim.PROJE_TEST_SENARYO_ID = $scope.projeTestSenaryoID;
                InfoProjeTestSenaryoTestAdim.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeTestSenaryoTestAdim.ProjeTestSenaryoTestAdimEkleGuncelle(InfoProjeTestSenaryoTestAdim);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test adım kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test adım kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Test adım kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                       // $scope.ProjeTestSenaryoTestAdimGetData();
                        $scope.Geri();
                        $scope.TestSenaryoAdimSifirlama();
                        $scope.formProjeTestSenaryoTestAdimCalistirildi = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test adım kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TestSenaryoAdimSifirlama = function () {
                $rootScope.InfoProjeTestSenaryoTestAdim.PROJE_TEST_SENARYO_ADIM_ID = null;
                $rootScope.InfoProjeTestSenaryoTestAdim.SIRA = null;
                $rootScope.InfoProjeTestSenaryoTestAdim.AKTOR = null;
                $rootScope.InfoProjeTestSenaryoTestAdim.GIRIS_KOSULU = null;
                $rootScope.InfoProjeTestSenaryoTestAdim.ACIKLAMA = null;
                $rootScope.InfoProjeTestSenaryoTestAdim.BEKLENEN_SONUC = null;
            };

            $scope.ProjeTestSenaryoTestAdimSil = function (InfoProjeTestSenaryoTestAdim) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTestSenaryoTestAdim.ProjeTestSenaryoTestAdimSil(InfoProjeTestSenaryoTestAdim.PROJE_TEST_SENARYO_ADIM_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test adım silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test adım silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Test adım silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeTestSenaryoTestAdimGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test adım silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayiProjeTestSenaryoTestAdim = function (InfoProjeTestSenaryoTestAdim) {
                $scope.secilenKayit = InfoProjeTestSenaryoTestAdim;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjeTestSenaryoTestAdimSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.GereksinimOnay = function (gereksinim_Id, gereksinim_Adi) {
                $scope.InfoProjeTestSenaryo.PROJE_GEREKSINIM_ID = gereksinim_Id;
                $scope.InfoProjeTestSenaryo.PROJE_GEREKSINIM_ADI = gereksinim_Adi;
                //$scope.$modalInstanceGereksinimSec.dismiss('cancel');
                $scope.GereksinimGeri();
            };

            $scope.GereksinimSec = function () {
                $scope.$modalInstanceGereksinimSec = $modal.open({
                    templateUrl: 'views/common/modal_talep_gereksinim_sec.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.GereksinimGeri = function () {
                $scope.$modalInstanceGereksinimSec.dismiss('cancel');
            };

            $scope.GereksinimTemizle = function () {
                $scope.InfoProjeTestSenaryo.PROJE_GEREKSINIM_ID = null;
                $scope.InfoProjeTestSenaryo.PROJE_GEREKSINIM_ADI = null;
                $scope.ProjeGereksinimGetData();
            };

            $scope.filtreTemizleGereksinim = function () {
                $scope.AramaKriterGereksinim.PROJE_GEREKSINIM_NO = null;
                $scope.AramaKriterGereksinim.PROJE_GEREKSINIM_ADI= null;
                $scope.AramaKriterGereksinim.PROJE_ID = $scope.projeID;
                $scope.AramaKriterGereksinim.SayfaNo = 1;
                $scope.AramaKriterGereksinim.SayfaBasinaKayitSayisi = Ayarlarim.SayfaBasinaKayitSayisi;
                $scope.ProjeGereksinimGetData();
            };

            $scope.ProjeGereksinimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeGereksinim.ProjeGereksinimGetData($scope.AramaKriterGereksinim);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiGereksinim = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeGereksinimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeTestSenaryoTestAdimAktifPasif = function (InfoProjeTestSenaryoTestAdim) {
                $rootScope.sayfayukleniyor = true;
                
                InfoProjeTestSenaryoTestAdim.PROJE_TEST_SENARYO_ID = $scope.projeTestSenaryoID;
                InfoProjeTestSenaryoTestAdim.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeTestSenaryoTestAdim.ProjeTestSenaryoTestAdimAktifPasif(InfoProjeTestSenaryoTestAdim);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test adım onay işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test adım onay işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Test adım onay işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test adım onay işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };
        }]);

