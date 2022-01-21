angular.module('inspinia').controller(
    'proje_test_senaryo_talep_durum_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeTestSenaryoTalepDurum', 'srvProjeTestSenaryo', 'srvProjeTestSenaryoTestAdimTalepDurum', 'srvGenel', 'srvProjeGereksinim', 'srvProjeIterasyon', 'srvProjeModul', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeTestSenaryoTalepDurum, srvProjeTestSenaryo, srvProjeTestSenaryoTestAdimTalepDurum, srvGenel, srvProjeGereksinim, srvProjeIterasyon, srvProjeModul, Ayarlarim) {
            $scope.talepProjeID = $stateParams.talepProjeID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterProjeTestSenaryoTalepDurum = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                TALEP_PROJE_TEST_SENARYO_GRUP: '',
                PROJE_TEST_SENARYO_ID: ''
            };

            $scope.AramaKriterProjeTestSenaryoTalepDurumLog = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                TALEP_PROJE_TEST_SENARYO_GRUP: '',
                PROJE_TEST_SENARYO_ID: ''
            };

            $scope.AramaKriterProjeTestSenaryo = {
                PROJE_ID: '',
                PROJE_GEREKSINIM_ID: '',
                PROJE_GEREKSINIM_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.InfoProjeTestSenaryoTalepDurum = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                DURUM: '',
                PROJE_TEST_SENARYO_ID: '',
                PROJE_TEST_SENARYO_NO: ''
            };

           

            $scope.AramaKriterProjeTestSenaryoTestAdimTalepDurumModal = {
                PROJE_TEST_SENARYO_TALEP_DURUM_ID: '',
                TALEP_PROJE_ID: $scope.talepProjeID
            };

            $scope.init = function () {
                $scope.grupLogGoster = false;
                $scope.ProjeTestSenaryoTalepDurumGetData();
            };

            $scope.ProjeTestSenaryoTalepDurumGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterProjeTestSenaryoTalepDurum.TALEP_PROJE_TEST_SENARYO_GRUP = true;
                $scope.AramaKriterProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_ID = null;
                var promiseGet = srvProjeTestSenaryoTalepDurum.ProjeTestSenaryoTalepDurumGetData($scope.AramaKriterProjeTestSenaryoTalepDurum);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep test senaryo listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep Test senaryo listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiProjeTestSenaryoTalepDurumGrup = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeTestSenaryoTalepDurumGrupListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep test senaryo listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeTestSenaryoTalepDurumLogGetData = function (seciliProjeTestSenaryoId, seciliProjeTestSenaryoNo) {
                $rootScope.sayfayukleniyor = true;
                $scope.seciliProjeTestSenaryoId = seciliProjeTestSenaryoId;
                $scope.seciliProjeTestSenaryoNo = seciliProjeTestSenaryoNo;
                $scope.AramaKriterProjeTestSenaryoTalepDurumLog.TALEP_PROJE_TEST_SENARYO_GRUP === false;
                $scope.AramaKriterProjeTestSenaryoTalepDurumLog.PROJE_TEST_SENARYO_ID = seciliProjeTestSenaryoId;

                var promiseGet = srvProjeTestSenaryoTalepDurum.ProjeTestSenaryoTalepDurumGetData($scope.AramaKriterProjeTestSenaryoTalepDurumLog);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep test senaryo log listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep Test senaryo log listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiProjeTestSenaryoTalepDurumLog = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeTestSenaryoTalepDurumGrupLogListesi = gelen.data.Veri;
                        $scope.grupLogGoster = true;

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep test senaryo log listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeTestSenaryoTalepDurumSil = function (InfoProjeTestSenaryoTalepDurum) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTestSenaryoTalepDurum.ProjeTestSenaryoTalepDurumSil(InfoProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_TALEP_DURUM_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test senaryo silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test senaryo silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Test senaryo silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.AramaKriterProjeTestSenaryoTalepDurum.TALEP_PROJE_TEST_SENARYO_GRUP = true;
                        $scope.ProjeTestSenaryoTalepDurumGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test senaryo silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (InfoProjeTestSenaryoTalepDurum) {
                $scope.secilenKayit = InfoProjeTestSenaryoTalepDurum;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjeTestSenaryoTalepDurumSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };


            $scope.ProjeTestSenaryoTalepDurumEkleGuncelle = function (InfoProjeTestSenaryoTalepDurum, frmProjeTestSenaryoTalepDurum) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepProjeTestSenaryo = true;
                if ($scope.frmProjeTestSenaryoTalepDurum.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeTestSenaryoTalepDurum);
                    return;
                }

                var promiseGet = srvProjeTestSenaryoTalepDurum.ProjeTestSenaryoTalepDurumEkleGuncelle(InfoProjeTestSenaryoTalepDurum);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep test senaryo kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep test senaryo kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Talep test senaryo kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.AramaKriterProjeTestSenaryoTalepDurum.TALEP_PROJE_TEST_SENARYO_GRUP = true;
                        $scope.ProjeTestSenaryoTalepDurumGetData();
                        $scope.InfoProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_ID = null;
                        $scope.InfoProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_NO = null;
                        $scope.formCalistirildiTalepProjeTestSenaryo = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep test senaryo kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizleProjeTestSenaryo = function () {
                $scope.AramaKriterProjeTestSenaryo = {
                    PROJE_GEREKSINIM_ID: '',
                    PROJE_GEREKSINIM_ADI: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.ProjeTestSenaryoGetData();
            };

            $scope.TestSenaryoOnay = function (projeTestSenaryoId, projeTestSenaryoNo) {
                $scope.InfoProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_ID = projeTestSenaryoId;
                $scope.InfoProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_NO = projeTestSenaryoNo;
                $scope.$modalInstanceTestSenaryoSec.dismiss('cancel');
            };

            $scope.TestSenaryoSec = function () {
                $scope.testSenaryoAktif = true;
                $scope.ProjeTestSenaryoGetData();
                $scope.$modalInstanceTestSenaryoSec = $modal.open({
                    templateUrl: 'views/common/modal_talep_test_senaryo_sec.html',
                    size: 'lg',
                    scope: $scope
                });
                $scope.$modalInstanceTestSenaryoSec.result.then(function () {
                }, function () {
                    $scope.GereksinimTemizle();
                });
            };

            $scope.TestSenaryoGeri = function () {
                $scope.$modalInstanceTestSenaryoSec.dismiss('cancel');
            };

            $scope.TestSenaryoTemizle = function () {
                $scope.InfoProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_ID = null;
                $scope.InfoProjeTestSenaryoTalepDurum.PROJE_TEST_SENARYO_NO = null;
            };


            $scope.ProjeTestSenaryoGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterProjeTestSenaryo.PROJE_ID = $scope.$parent.InfoTalep.PROJE_ID;
                var promiseGet = srvProjeTestSenaryo.ProjeTestSenaryoGetData($scope.AramaKriterProjeTestSenaryo);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test senaryo listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test senaryo listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiTestSenaryo = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeTestSenaryoListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test senaryo listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.GereksinimSec = function () {
                $scope.ProjeGereksinimGetData();
                $scope.$modalInstanceGereksinimSec = $modal.open({
                    templateUrl: 'views/common/modal_talep_gereksinim_sec.html',
                    //controller: 'proje_test_senaryo_talep_durum_liste_controller',
                    size: 'lg',
                    scope: $scope
                }); $scope.$modalInstanceGereksinimSec.result.then(function () {
                }, function () {
                    //$scope.GereksinimTemizle();
                });
            };

            $scope.GereksinimOnay = function (gereksinim_Id, gereksinim_Adi) {
                if ($scope.testSenaryoAktif === true) {
                    $scope.AramaKriterProjeTestSenaryo.PROJE_GEREKSINIM_ID = gereksinim_Id;
                    $scope.AramaKriterProjeTestSenaryo.PROJE_GEREKSINIM_ADI = gereksinim_Adi;
                }
                if ($scope.yeniTestSenaryoAktif === true) {
                    $scope.InfoYeniTestSenaryo.PROJE_GEREKSINIM_ID = gereksinim_Id;
                    $scope.InfoYeniTestSenaryo.PROJE_GEREKSINIM_ADI = gereksinim_Adi;
                }

                $scope.$modalInstanceGereksinimSec.dismiss('cancel');
            };

            $scope.GereksinimGeri = function () {
                $scope.$modalInstanceGereksinimSec.dismiss('cancel');
            };

            $scope.GereksinimTemizle = function () {
                if ($scope.testSenaryoAktif === true) {
                    $scope.AramaKriterProjeTestSenaryo.PROJE_GEREKSINIM_ID = null;
                    $scope.AramaKriterProjeTestSenaryo.PROJE_GEREKSINIM_ADI = null;
                }
                if ($scope.yeniTestSenaryoAktif === true) {
                    $scope.InfoYeniTestSenaryo.PROJE_GEREKSINIM_ID = null;
                    $scope.InfoYeniTestSenaryo.PROJE_GEREKSINIM_ADI = null;
                }
                $scope.AramaKriterGereksinim.SayfaNo = 1; // Test senaryo sec tıkladığında her seferinde ilk sayfayı göstericek.
                $scope.AramaKriterGereksinim.PROJE_GEREKSINIM_NO = null;
                $scope.AramaKriterGereksinim.PROJE_GEREKSINIM_ADI = null;
            };

            $scope.AramaKriterGereksinim = {
                LISTE: true,
                PROJE_ID: '',
                PROJE_GEREKSINIM_NO: '',
                PROJE_GEREKSINIM_ADI: '',
                PROJE_ITERASYON_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 5
            };


            $scope.filtreTemizleGereksinim = function () {
                $scope.AramaKriterGereksinim = {
                    LISTE: true,
                    //PROJE_ID: '', // proje sıfırlanmıyacak
                    PROJE_GEREKSINIM_NO: '',
                    PROJE_GEREKSINIM_ADI: '',
                    PROJE_ITERASYON_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: 5
                };
                $scope.ProjeGereksinimGetData();
            };

            $scope.ProjeGereksinimGetData = function () {
                $scope.AramaKriterGereksinim.PROJE_ID = $scope.$parent.InfoTalep.PROJE_ID;

                var promiseGet = srvProjeGereksinim.ProjeGereksinimGetData($scope.AramaKriterGereksinim);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
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

            $scope.InfoTestAdimEkle = {
                PROJE_TEST_SENARYO_TALEP_DURUM_ID: '',
                TALEP_PROJE_ID: '',
                PROJE_TEST_SENARYO_NO: '',
                PROJE_TEST_SENARYO_ID: ''
                //PROJE_ID: ''
            };

            //Test senaryo başlatıldığı zaman adımların hepsi eklenmesi. Eğer ilk başlatılma değilse yeni test senaryo kaydı atılıyor.
            $scope.ProjeTestSenaryoTestAdimTalepDurumEkle = function (seciliProjeTestSenaryoId, seciliProjeTestSenaryoNo) {
                $rootScope.sayfayukleniyor = true;
                $scope.InfoTestAdimEkle.PROJE_TEST_SENARYO_ID = seciliProjeTestSenaryoId;
                $scope.InfoTestAdimEkle.PROJE_TEST_SENARYO_NO = seciliProjeTestSenaryoNo;
                //$scope.InfoTestAdimEkle.PROJE_ID = $scope.InfoTalep.PROJE_ID;
                $scope.InfoTestAdimEkle.TALEP_PROJE_ID = $scope.$parent.InfoTalep.TALEP_PROJE_ID;
                var promiseGet = srvProjeTestSenaryoTalepDurum.ProjeTestSenaryoTestAdımEkle($scope.InfoTestAdimEkle);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep test senaryo test adım kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep test senaryo test adım kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Talep test senaryo test adım kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.seciliProjeTestSenaryoId = seciliProjeTestSenaryoId;
                        $scope.seciliProjeTestSenaryoNo = seciliProjeTestSenaryoNo;
                        $scope.AramaKriterProjeTestSenaryoTestAdimTalepDurumModal.PROJE_TEST_SENARYO_TALEP_DURUM_ID = gelen.data.returnKayitNo;
                        $scope.ProjeTestSenaryoTestAdimTalepDurumModalGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep test senaryo test adım kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    }
                );
            };

            $scope.TestSenaryoCalistir = function () {
                $scope.$modalInstanceTestSenaryoCalistir = $modal.open({
                    templateUrl: 'views/common/modal_talep_test_senaryo_calistir.html',
                    size: 'lg',
                    backdrop: 'static',
                    scope: $scope
                });
            };

            $scope.TestSenaryoCalistirGeri = function () {
                $scope.$modalInstanceTestSenaryoCalistir.dismiss('cancel');
            };

            $scope.TalepDurumLogSonucGoster = function (projeTestSenaryoTalepDurumId) {
                $scope.AramaKriterProjeTestSenaryoTestAdimTalepDurumModal.PROJE_TEST_SENARYO_TALEP_DURUM_ID = projeTestSenaryoTalepDurumId;
                $scope.ProjeTestSenaryoTestAdimTalepDurumModalGetData(true);
                $scope.$modalInstanceTalepDurumLogSonuc = $modal.open({
                    templateUrl: 'views/common/modal_talep_test_senaryo_sonuc.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.TalepDurumLogSonucGeri = function () {
                $scope.$modalInstanceTalepDurumLogSonuc.dismiss('cancel');
            };

            //Başlat butona basılınca çalışacak proje test senaryo test adım talep durum gelecek veri
            $scope.ProjeTestSenaryoTestAdimTalepDurumModalGetData = function (durum) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTestSenaryoTestAdimTalepDurum.ProjeTestSenaryoTestAdimTalepDurumGetData($scope.AramaKriterProjeTestSenaryoTestAdimTalepDurumModal);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep test senaryo test adım listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep test senaryo test adım listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjeTestSenaryoTestAdimTalepDurumListesiModal = gelen.data.Veri;
                        if (durum === undefined) {
                            $scope.TestSenaryoCalistir();
                        } 
                        
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep test senaryo test adım listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
          


            $scope.InfoTestSenaryoTestAdımVeBug = {};
            $scope.ProjeTestSenaryoTestAdimTalepDurumEkleGuncelle = function (ProjeTestSenaryoTestAdimTalepDurumListesiModal, InfoProblemBug) {
                $rootScope.sayfayukleniyor = true;
                if (InfoProblemBug !== undefined) {
                    $scope.formCalistirildiBugEkle = true;
                    if ($scope.frmTestSenaryoProblem.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $rootScope.focusToInvalid($scope.frmTestSenaryoProblem);
                        return;
                    }
                    InfoProblemBug.PROJE_ACILIYET_ETKI_SONUC_ID = $scope.InfoProblemBugHesap.PROJE_ACILIYET_ETKI_SONUC_ID;
                    InfoProblemBug.TalepProjeIlgiBugListesi = $scope.TalepProjeIlgiBugListesi;
                    InfoProblemBug.InfoYeniDokumanBugListesi = $scope.InfoYeniDokumanBugListesi;
                }

                $scope.InfoTestSenaryoTestAdımVeBug.TestSenaryoTestAdımTalepDurumListesi = ProjeTestSenaryoTestAdimTalepDurumListesiModal;
                $scope.InfoTestSenaryoTestAdımVeBug.InfoProblemBug = InfoProblemBug;
                $scope.InfoTestSenaryoTestAdımVeBug.TALEP_PROJE_ID = $scope.talepProjeID;
                var promiseGet = srvProjeTestSenaryoTestAdimTalepDurum.ProjeTestSenaryoTestAdimTalepDurumEkleGuncelle($scope.InfoTestSenaryoTestAdımVeBug);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test adımları onaylama veya bug kaydı işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test adımları onaylama veya bug kaydı işlemi işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Test adımları işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if ($scope.$modalInstanceTestSenaryoBug !== undefined) {
                            $scope.InfoProblemBugSifirlama();
                            $scope.formCalistirildiBugEkle = false;
                            $scope.TestSenaryoBugGeri();
                            $scope.TestSenaryoCalistirGeri();

                        } else {
                            $scope.TestSenaryoCalistirGeri();
                        }
                        if ($scope.grupLogGoster === true) {
                            $scope.ProjeTestSenaryoTalepDurumLogGetData($scope.seciliProjeTestSenaryoId, $scope.seciliProjeTestSenaryoNo);
                        }

                        $scope.ProjeTestSenaryoTalepDurumGetData(); // bu durumu senaryoların en son durumunu çekmek için yeniden atıyoruz.
                        //$scope.ProjeTestSenaryoTestAdimTalepDurumGenelGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test adımları işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TestSenaryoBug = function (senaryoAdimlari) {
                $scope.ProjeEtkiGetData();
                $scope.ProjeAciliyetGetData();
                $scope.ProjeIterasyonGetData();
                $scope.ProjeModulGetData();
                $scope.InfoProblemBug.PROJE_ADI = $scope.$parent.InfoTalep.PROJE_ADI;
                $scope.InfoProblemBug.PROJE_GEREKSINIM_ID = senaryoAdimlari[0].PROJE_GEREKSINIM_ID;
                $scope.InfoProblemBug.PROJE_GEREKSINIM_ADI = senaryoAdimlari[0].PROJE_GEREKSINIM_ADI;
                $scope.TalepProblemAciklama(senaryoAdimlari);
                $scope.$modalInstanceTestSenaryoBug = $modal.open({
                    templateUrl: 'views/common/modal_test_senaryo_bug_ekle.html',
                    controller: 'proje_test_senaryo_talep_durum_liste_controller',
                    size: 'lg',
                    scope: $scope
                }); $scope.$modalInstanceTestSenaryoBug.result.then(function () {
                }, function () {
                    $scope.InfoProblemBugSifirlama();
                    //$scope.InfoProblemBug = null;
                    $scope.$modalInstanceTestSenaryoBug = undefined;
                    $scope.ProjeTestSenaryoTalepDurumGetData();
                    $scope.ProjeTestSenaryoTalepDurumLogGetData($scope.seciliProjeTestSenaryoId, $scope.seciliProjeTestSenaryoNo);
                   
                });

            };

            $scope.TestSenaryoBugGeri = function () {
                $scope.$modalInstanceTestSenaryoBug.dismiss('cancel');
                //$scope.InfoProblemBug = null;

            };

            $scope.InfoProblemBug = {
                TALEP_TIPI_ADI: 'Problem',
                PROJE_ID: null,
                PROJE_ADI: null,
                PROJE_GEREKSINIM_ID: null,
                PROJE_GEREKSINIM_ADI: null,
                PROJE_ITERASYON_ID: null,
                PROJE_MODUL_ID: null,
                KULLANICI_ID: null,
                TALEP_PROJE_KONU: null,
                //TALEP_ONGORULEN_ZAMAN: null,
                TALEP_PLANLANAN_BASLANGIC_TARIHI: null,
                TALEP_PLANLANAN_BITIS_TARIHI: null,
                TALEP_PROJE_ACIKLAMA: null,
                TALEP_SINIFLANDIRMA_TIPI_ADI: 'Test',
                PROJE_ETKI_ID: null,
                PROJE_ACILIYET_ID: null,
                TALEP_PROJE_TALEP_TIPI_PROBLEM_ACIKLAMA: null,
                PROJE_ACILIYET_ETKI_SONUC_ID: null,
                PROJE_ACILIYET_ETKI_SONUC_ADI: null
                //InfoYeniDokumanListesi: null
            };
            $scope.InfoYeniDokumanBugListesi = [];

            $scope.InfoProblemBugSifirlama = function () {
                $scope.InfoProblemBug = {
                    TALEP_TIPI_ADI: 'Problem',
                    PROJE_ID: null,
                    PROJE_ADI: null,
                    PROJE_GEREKSINIM_ID: null,
                    PROJE_GEREKSINIM_ADI: null,
                    PROJE_ITERASYON_ID: null,
                    PROJE_MODUL_ID: null,
                    KULLANICI_ID: null,
                    TALEP_PROJE_KONU: null,
                    //TALEP_ONGORULEN_ZAMAN: null,
                    TALEP_PLANLANAN_BASLANGIC_TARIHI: null,
                    TALEP_PLANLANAN_BITIS_TARIHI: null,
                    TALEP_PROJE_ACIKLAMA: null,
                    TALEP_SINIFLANDIRMA_TIPI_ADI: 'Test',
                    PROJE_ETKI_ID: null,
                    PROJE_ACILIYET_ID: null,
                    TALEP_PROJE_TALEP_TIPI_PROBLEM_ACIKLAMA: null,
                    PROJE_ACILIYET_ETKI_SONUC_ID: null,
                    PROJE_ACILIYET_ETKI_SONUC_ADI: null
                    //InfoYeniDokumanListesi: null
                };
                $scope.InfoYeniDokumanBugListesi = [];
            };


            //Kontrol edilecek
            $scope.ProjeModulGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var AramaKriterProjeModul = {
                    PROJE_ID: $scope.$parent.InfoTalep.PROJE_ID
                };
                var promiseGet = srvProjeModul.ProjeModulGetData(AramaKriterProjeModul);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Modül listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Modül listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeModulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Modül listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeModulGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterProjeModul.PROJE_ID = $scope.InfoTalep.PROJE_ID;
                var promiseGet = srvProjeModul.ProjeModulGetData($scope.AramaKriterProjeModul);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Modül listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Modül listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeModulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Modül listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeIterasyonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var AramaKriterIterasyon = {
                    PROJE_ID: $scope.$parent.InfoTalep.PROJE_ID
                };
                var promiseGet = srvProjeIterasyon.ProjeIterasyonGetData(AramaKriterIterasyon);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İterasyon listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjeIterasyonListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeEtkiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeEtkiGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Etki listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Etki listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjeEtkiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etki listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeAciliyetGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeAciliyetGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Aciliyet listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Aciliyet listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjeAciliyetListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Aciliyet listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.ProjeAciliyetEtkiSonucHesapGetData = function (PROJE_ETKI_ID, PROJE_ACILIYET_ID) {
                var AramaKriterEtkiSonucHesap = {
                    PROJE_ETKI_ID: PROJE_ETKI_ID,
                    PROJE_ACILIYET_ID: PROJE_ACILIYET_ID
                };
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeAciliyetEtkiSonucHesapGetData(AramaKriterEtkiSonucHesap);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Aciliyet etki sonuç bilgileri yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Aciliyet etki sonuç bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.$parent.InfoProblemBugHesap = gelen.data;
                        $scope.$parent.InfoProblemBug.PROJE_ACILIYET_ETKI_SONUC_ADI = gelen.data.PROJE_ACILIYET_ETKI_SONUC_ADI;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Aciliyet etki sonuç bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.TalepProblemAciklama = function (senaryoAdimlari) {

                $scope.InfoProblemBug.TALEP_PROJE_ACIKLAMA = "<table class='table table-striped table-hover'> <thead><tr><td><b>No</b></td><td><b>Sonuç</b></td><td><b>Açıklama</b></td><td><b>Beklenen Sonuç</b></td></tr></thead><tbody>";
                angular.forEach(senaryoAdimlari, function (value, key) {
                    $scope.InfoProblemBug.TALEP_PROJE_ACIKLAMA += "<tr><td>" + value.SIRA + "</td><td>" + $scope.DurumKontrol(value.YENI_DURUM) + "</td><td>" + value.ACIKLAMA + "</td><td>" + value.BEKLENEN_SONUC + "</td></tr>";
                });
                $scope.InfoProblemBug.TALEP_PROJE_ACIKLAMA += "</tbody></table>";
            };

            $scope.DurumKontrol = function (durum) {
                switch (durum) {
                    case true: return "Başarılı";
                    case false: return "Başarısız";
                    default: return "Hiçbiri";
                }
            };

            $scope.TalepIlgiliBugEkle = function () {
                $scope.InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI = null;
                $scope.$modalInstanceTalepIlgili = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_ilgili_ekle.html',
                    windowClass: 'tooltip',
                    size: 'sm',
                    scope: $scope
                });
            };

            $scope.GeriTalepIlgili = function () {
                $scope.formCalistirildiTalepProjeIlgili = false;
                $scope.$modalInstanceTalepIlgili.dismiss('cancel');
            };

            $scope.TalepProjeIlgiBugListesi = [];

            $scope.TalepIlgiliEkleOnKontrol = function (InfoTalepBugIlgili, frmTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepProjeIlgili = true;
                if (frmTalepIlgili.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTalepIlgili);
                    return;
                }

                var kontrol = true;
                angular.forEach($scope.TalepProjeBugIlgiListesi, function (value, key) {
                    if (value.TALEP_PROJE_ILGI_KULLANICI_ID === InfoTalepBugIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID) {
                        kontrol = false;
                    }
                });
                $rootScope.sayfayukleniyor = false;
                if (kontrol) {
                    var InfoYeniTalepIlgiliBug = {
                        TALEP_PROJE_ILGI_KULLANICI_ID: InfoTalepBugIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID,
                        AvatarBase64: InfoTalepBugIlgili.TALEP_PROJE_ILGI_KULLANICI.AvatarBase64,
                        CINSIYET: InfoTalepBugIlgili.TALEP_PROJE_ILGI_KULLANICI.CINSIYET,
                        TALEP_PROJE_ILGI_KULLANICI_AD_SOYAD: InfoTalepBugIlgili.TALEP_PROJE_ILGI_KULLANICI.AD_SOYAD
                    };
                    $scope.TalepProjeIlgiBugListesi.push(InfoYeniTalepIlgiliBug);
                }

                $scope.GeriTalepIlgili();

            };

            $scope.TalepProjeIlgiSilBug = function (infoTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                angular.forEach($scope.TalepProjeIlgiBugListesi, function (valueilgili, keyilgili) {
                    if (valueilgili.TALEP_PROJE_ILGI_KULLANICI_ID === infoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI_ID) {
                        $rootScope.sayfayukleniyor = false;
                        $scope.TalepProjeIlgiBugListesi.splice(keyilgili, 1);
                    }
                });

            };

            $scope.modalSilmeOnayiTalepIlgiliBug = function (infoTalepIlgili) {
                $scope.secilenKayit = infoTalepIlgili;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeIlgiSilBug($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };
            //Yeni test senaryo ekle
            $scope.InfoYeniTestSenaryo = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                PROJE_ID: '',
                TEST_SENARYO_NO: '',
                TEST_SENARYO_TEST_TIPI_ID: '',
                PROJE_GEREKSINIM_ID: '',
                PROJE_GEREKSINIM_ADI: ''
            };

            $scope.YeniTestSenaryo = function () {
                $scope.TestSenaryoTestTipiGetData();
                $scope.InfoYeniTestSenaryo.PROJE_ID = $scope.$parent.InfoTalep.PROJE_ID;
                $scope.YeniTestSenaryoAdimlariListesi = [];
                $scope.yeniTestSenaryoAktif = true; //Gereksinim onayında değişkene değeri alırken kullanıyoruz.
                $scope.$modalInstanceYeniTestSenaryoEkle = $modal.open({
                    templateUrl: 'views/common/modal_talep_test_senaryo_ekle.html',
                    //controller: 'proje_test_senaryo_talep_durum_liste_controller',
                    size: 'lg',
                    backdrop: 'static',
                    scope: $scope
                });
                $scope.$modalInstanceYeniTestSenaryoEkle.result.then(function () {
                }, function () {
                    $scope.formCalistirildiYeniTestSenaryo = false;
                    $scope.InfoYeniTestSenaryo.TEST_SENARYO_NO = null;
                    $scope.InfoYeniTestSenaryo.TEST_SENARYO_TEST_TIPI_ID = null;
                    $scope.GereksinimTemizle();
                    $scope.yeniTestSenaryoAktif = false;
                });
            };

            $scope.YeniTestSenaryoGeri = function () {
                $scope.$modalInstanceYeniTestSenaryoEkle.dismiss('cancel');
            };



            $scope.YeniTestSenaryoAdimEkle = function (testAdimId) {
                if (testAdimId !== null) {
                    $scope.YeniTestAdimGuncelle(testAdimId);
                }
                else {
                    $scope.InfoProjeTestSenaryoTestAdimSifirlama();
                }

                $scope.$modalInstanceYeniTestSenaryoTestAdim = $modal.open({
                    templateUrl: 'views/common/modal_proje_test_senaryo_adim_ekle.html',
                    size: 'lg',
                    scope: $scope
                });
                $scope.$modalInstanceYeniTestSenaryoTestAdim.result.then(function () {
                }, function () {
                    $scope.InfoProjeTestSenaryoTestAdimSifirlama();
                });
            };

            //modal proje test senaryo test adim dosyasında başka yerde kullanıldığı için Geri olarak ismi kullanılıyor.
            $scope.Geri = function () {
                $scope.$modalInstanceYeniTestSenaryoTestAdim.dismiss('cancel');
            };


            $scope.TestSenaryoTestTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTestSenaryoTestTipi();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Test tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Test tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TestSenaryoTestTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Test tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoProjeTestSenaryoTestAdim = {
                INDEX_ID: null,
                SIRA: '',
                AKTOR: '',
                GIRIS_KOSULU: '',
                ACIKLAMA: '',
                BEKLENEN_SONUC: ''
            };

            $scope.InfoProjeTestSenaryoTestAdimSifirlama = function () {
                $scope.formProjeTestSenaryoTestAdimCalistirildi = false;
                $scope.InfoProjeTestSenaryoTestAdim.INDEX_ID = null;
                $scope.InfoProjeTestSenaryoTestAdim.SIRA = null;
                $scope.InfoProjeTestSenaryoTestAdim.AKTOR = null;
                $scope.InfoProjeTestSenaryoTestAdim.GIRIS_KOSULU = null;
                $scope.InfoProjeTestSenaryoTestAdim.ACIKLAMA = null;
                $scope.InfoProjeTestSenaryoTestAdim.BEKLENEN_SONUC = null;
            };

            //Test Adimlarını diziye eklemek için tasarlandı.
            $scope.Ekle = function (InfoProjeTestSenaryoTestAdim, frmProjeTestSenaryoAdim) {
                $rootScope.sayfayukleniyor = true;
                $scope.formProjeTestSenaryoTestAdimCalistirildi = true;
                if (frmProjeTestSenaryoAdim.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmProjeTestSenaryoAdim);
                    return;
                }
                if (InfoProjeTestSenaryoTestAdim.INDEX_ID !== null) {
                    angular.forEach($scope.YeniTestSenaryoAdimlariListesi, function (value, key) {
                        if (InfoProjeTestSenaryoTestAdim.INDEX_ID === key) {
                            value.SIRA = InfoProjeTestSenaryoTestAdim.SIRA;
                            value.AKTOR = InfoProjeTestSenaryoTestAdim.AKTOR;
                            value.GIRIS_KOSULU = InfoProjeTestSenaryoTestAdim.GIRIS_KOSULU;
                            value.ACIKLAMA = InfoProjeTestSenaryoTestAdim.ACIKLAMA;
                            value.BEKLENEN_SONUC = InfoProjeTestSenaryoTestAdim.BEKLENEN_SONUC;
                        }
                    });
                }
                else {
                    var InfoYeniTestSenaryoTestAdim = {
                        SIRA: InfoProjeTestSenaryoTestAdim.SIRA,
                        AKTOR: InfoProjeTestSenaryoTestAdim.AKTOR,
                        GIRIS_KOSULU: InfoProjeTestSenaryoTestAdim.GIRIS_KOSULU,
                        ACIKLAMA: InfoProjeTestSenaryoTestAdim.ACIKLAMA,
                        BEKLENEN_SONUC: InfoProjeTestSenaryoTestAdim.BEKLENEN_SONUC
                    };
                    $scope.YeniTestSenaryoAdimlariListesi.push(InfoYeniTestSenaryoTestAdim);
                }
                $rootScope.sayfayukleniyor = false;
                $scope.Geri();
            };

            $scope.YeniTestAdimGuncelle = function (testAdimId) {
                angular.forEach($scope.YeniTestSenaryoAdimlariListesi, function (value, key) {
                    if (testAdimId === key) {
                        $scope.InfoProjeTestSenaryoTestAdim.INDEX_ID = key;
                        $scope.InfoProjeTestSenaryoTestAdim.SIRA = value.SIRA;
                        $scope.InfoProjeTestSenaryoTestAdim.AKTOR = value.AKTOR;
                        $scope.InfoProjeTestSenaryoTestAdim.GIRIS_KOSULU = value.GIRIS_KOSULU;
                        $scope.InfoProjeTestSenaryoTestAdim.ACIKLAMA = value.ACIKLAMA;
                        $scope.InfoProjeTestSenaryoTestAdim.BEKLENEN_SONUC = value.BEKLENEN_SONUC;
                    }
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
                            $scope.YeniTestSenaryoAdimSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.YeniTestSenaryoAdimSil = function (InfoProjeTestSenaryoTestAdim) {
                $rootScope.sayfayukleniyor = false;
                var index = $scope.YeniTestSenaryoAdimlariListesi.indexOf(InfoProjeTestSenaryoTestAdim);
                if (index !== -1)
                    $scope.YeniTestSenaryoAdimlariListesi.splice(index, 1);
            };


            $scope.YeniTestSenaryoEkle = function (InfoYeniTestSenaryo, YeniTestSenaryoAdimlariListesi, frmYeniTestSenaryo) {
                $scope.formCalistirildiYeniTestSenaryo = true;
                $rootScope.sayfayukleniyor = true;
                if (frmYeniTestSenaryo.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmYeniTestSenaryo);
                    return;
                }


                var Info = {
                    InfoYeniTestSenaryo: InfoYeniTestSenaryo,
                    YeniTestSenaryoAdimlariListesi: YeniTestSenaryoAdimlariListesi
                };
                var promisGet = srvProjeTestSenaryoTalepDurum.YeniTestSenaryoEkle(Info);
                promisGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yeni test senaryo kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yeni test senaryo kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Yeni test senaryo kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.YeniTestSenaryoGeri();
                        $scope.AramaKriterProjeTestSenaryoTalepDurum.TALEP_PROJE_TEST_SENARYO_GRUP = true;
                        $scope.ProjeTestSenaryoTalepDurumGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yeni test senaryo kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };
        }]);

