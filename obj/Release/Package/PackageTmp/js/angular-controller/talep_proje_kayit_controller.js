angular.module('inspinia').controller(
    'talep_proje_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTalepProje', 'srvTalepProjeSurecLog', 'srvProjeler', 'srvProjeIterasyon', 'srvProjeGereksinim', 'srvTalepProjeSahibiLog', 'srvTalepProjeTalepTipiLog', 'srvKullaniciProje', 'srvTalepProjeIlgi', 'srvTalepBagliOlduguTalepler', 'srvTalepProjeAciklama', 'srvTalepProjeDokuman', 'srvTalepProjeSurecAkisLog', 'srvTalepProjeGenelLog', 'srvKullanici', 'srvProjeModul', 'srvProjeDogrulamaKriteri', 'srvTalepProjeDogrulamaKriteri', 'srvTalepProjeGereksinim', 'srvSurec','srvTalepSiniflandirmaTipi','srvSurec', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTalepProje, srvTalepProjeSurecLog, srvProjeler, srvProjeIterasyon, srvProjeGereksinim, srvTalepProjeSahibiLog, srvTalepProjeTalepTipiLog, srvKullaniciProje, srvTalepProjeIlgi, srvTalepBagliOlduguTalepler, srvTalepProjeAciklama, srvTalepProjeDokuman, srvTalepProjeSurecAkisLog, srvTalepProjeGenelLog, srvKullanici, srvProjeModul, srvProjeDogrulamaKriteri, srvTalepProjeDogrulamaKriteri, srvTalepProjeGereksinim, srvSurec, srvTalepSiniflandirmaTipi, srvSurec, Ayarlarim) {
            $scope.options = {
                height: 250,
                toolbar: [
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                    ["table", ["table"]]
                ]
            };

            moment.locale('tr');

            $scope.talepProjeID = $stateParams.talepProjeID;

            $scope.testSurecIsCreate = 0;
            $scope.IsCreate = 0;//1;
            $scope.altTab = 0;
            $scope.tab = 0;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                LISTE: false,
                PROJE_ID: '',
                KULLANICI_ID: $scope.$storage.KULLANICI_ID
            };
            $scope.AramaKriterGereksinim = {
                LISTE: true,
                PROJE_ID: '',
                PROJE_MODUL_ID: '',
                PROJE_GEREKSINIM_NO: '',
                PROJE_GEREKSINIM_ADI: '',
                PROJE_ITERASYON_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 5
            };

            $scope.AramaKriterTalepAciklama = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                DURUM: true,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
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



            $scope.AramaKriterIterasyon = {
                LISTE: false,
                PROJE_ID: '',
                PROJE_MODUL_ID: ''
            };


            $scope.AramaKriterSurecLog = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                LISTE: false,
                SUREC: false
            };

            $scope.AramaKriterSurecLog = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                LISTE: false,
                SUREC: false
            };


            $scope.init = function () {

                $scope.setTab($scope.tab);
                $scope.setAltTab($scope.altTab);
                $scope.TalepTipiGetData();
                $scope.KurumKullanıcı();
                //$scope.TalepProjeSurecTipiGetData();
                $scope.KullaniciProjeGetData();
                $scope.KullaniciGetData();
                if ($scope.talepProjeID > 0) {
                    $scope.IsCreate = 1;
                    $scope.TalepProjeSelect();
                    $scope.InfoTalepOnay = {};
                    $scope.TalepProjeDokumanGetData();
                    $scope.TalepProjeIlgiGetData(null);
                    $scope.TalepProjeGenelLogGetData();
                    $scope.TalepProjeAciklamaGetData($scope.AramaKriterTalepAciklama);

                } else {

                    $scope.InfoTalep = {};
                    $scope.InfoTalep.InfoYeniDokumanListesi = [];
                    $scope.InfoTalep.TALEP_ATAYAN_KULLANICI_ADI = $scope.$storage.AD_SOYAD; // yeni kayıttta aktif kullanıcının adını alacak.

                }
            };



            $scope.InfoSurecProgres = {
                progressValue: '',
                progressStyle: ''
            };
            $scope.InfoSurecAkisProgres = {
                progressValue: '',
                progressStyle: ''
            };




            $scope.TalepProjeSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeSelect($scope.talepProjeID);

                promiseGet.then(function (gelen) {
                    $scope.InfoTalep = gelen.data;
                    $scope.InfoTalepOnay.TALEP_REDDET_ACIKLAMA = $scope.InfoTalep.TALEP_REDDET_ACIKLAMA;

                    $scope.InfoYeniTalepSurecAkis.YENI_SUREC_AKIS_TIPI_ID = $scope.InfoTalep.YENI_SUREC_AKIS_TIPI_ID;

                    //Talep süreç selectten gelen talep süreç ve akışlarına göre progress fonksiyonuna gönderilip hesaplama yapılıyor.
                    var talepSurecProgress = $scope.SurecProgressHesaplama($scope.InfoTalep.TALEP_PROJE_SUREC_TIPI_ID, $scope.InfoTalep.YENI_SUREC_AKIS_TIPI_ID, $scope.InfoTalep.EN_SON_TALEP_SUREC_LOG_ID, $scope.InfoTalep.YENI_SUREC_AKIS_TIPI_SUREC_LOG_ID);
                    $scope.InfoSurecProgres.progressValue = talepSurecProgress[0];
                    $scope.InfoSurecProgres.progressStyle = talepSurecProgress[1];


                    //Talep akış değeri gönderilerek progress barda akış açıklaması yapılıyor.
                    var talepSurecAkisProgress = $scope.SurecAkisProgressHesaplama($scope.InfoTalep.YENI_SUREC_AKIS_TIPI_ID);
                    $scope.InfoSurecAkisProgres.progressValue = talepSurecAkisProgress[0];
                    $scope.InfoSurecAkisProgres.progressStyle = talepSurecAkisProgress[1];

                    //Talep tipine göre gereksinim alanı gösterilme durumu ayarlanıyor.
                    $scope.TalepTipi($scope.InfoTalep.TALEP_TIPI_ID);

                    $scope.KullanıcıSayfaGorunum();
                    //Talep tipi 4 veya test kontrol 0 dan büyük ise  test sayfasının görünmesi gerekiyor.
                    if ($scope.talepTipiId === 4 || $scope.InfoTalep.TALEP_PROJE_TEST_KONTROL > 0) {
                        $scope.talepTipiTestIsCreate = 1;
                    }
                    // Talebin enson süreci yeni süreç ile eşit değilse ve yeni süreç null değilse yeni süreç akış adını null değeri atıyoruz.



                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KullanıcıSayfaGorunum = function () {
                if (parseInt($scope.InfoTalep.TALEP_DURUM_TIPI_ID) === 3 || parseInt($scope.InfoTalep.TALEP_DURUM_TIPI_ID) === 5) {
                    $scope.talepKapaliDurumu = true;
                    $scope.talepKapaliSagTaraf = true;
                    mesajGoster('Dikkat', 'Taleb kapalı veya reddedildiği için hiç bir işlem yapamazsınız.', 'W');
                    $(".summernote").siblings(".note-editor").find(".note-editable").attr("contenteditable", "false");
                }
                //Talep durum a göre başlatılmadan hiç bir işlem yapılamıyacağı uyarısı veriliyor.
                else if (parseInt($scope.InfoTalep.TALEP_DURUM_TIPI_ID) === 4 && ($scope.InfoTalep.KULLANICI_ID === $scope.$storage.KULLANICI_ID || $scope.InfoTalep.KULLANICI_ID !== $scope.$storage.KULLANICI_ID)) {
                    mesajGoster('Dikkat', 'Talebinizi başlatmadan hiç bir işlem yapamazsınız.', 'W');
                    $scope.talepKapaliDurumu = true;
                    $scope.talepKapaliSagTaraf = true;
                    $(".summernote").siblings(".note-editor").find(".note-editable").attr("contenteditable", "false");
                }
                else if (parseInt($scope.InfoTalep.TALEP_DURUM_TIPI_ID) === 4 && $scope.InfoTalep.TALEP_ATAYAN_KULLANICI_ID === $scope.$storage.KULLANICI_ID) { 
                    $scope.talepKapaliDurumu = true;
                    $scope.talepKapaliSagTaraf = false;
                    $(".summernote").siblings(".note-editor").find(".note-editable").attr("contenteditable", "false");
                }
                else if (parseInt($scope.InfoTalep.TALEP_DURUM_TIPI_ID) === 2 && $scope.InfoTalep.KULLANICI_ID === $scope.$storage.KULLANICI_ID) {
                    $scope.talepKapaliDurumu = false;
                    $scope.talepKapaliSagTaraf = false;
                    $(".summernote").siblings(".note-editor").find(".note-editable").attr("contenteditable", "true");
                }
                else if (parseInt($scope.InfoTalep.TALEP_DURUM_TIPI_ID) === 2 && $scope.InfoTalep.TALEP_ATAYAN_KULLANICI_ID === $scope.$storage.KULLANICI_ID) {  
                    $scope.talepKapaliDurumu = true;
                    $scope.talepKapaliSagTaraf = false;
                    $(".summernote").siblings(".note-editor").find(".note-editable").attr("contenteditable", "false");
                }
                
                else if (parseInt($scope.InfoTalep.TALEP_DURUM_TIPI_ID) === 2 && $scope.InfoTalep.KULLANICI_ID !== $scope.$storage.KULLANICI_ID) {
                    $scope.talepKapaliDurumu = true;
                    $scope.talepKapaliSagTaraf = true;
                    $(".summernote").siblings(".note-editor").find(".note-editable").attr("contenteditable", "false");
                }
            };



            $scope.TalepProjeEkleGuncelle = function (InfoTalep, frm_TalepProje) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;


                if (frm_TalepProje.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frm_TalepProje);
                    return;
                }
                if (($scope.talepTipiId === 6 || $scope.talepTipiId === 3) && $scope.TalepGereksinimListesi.length === 0 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false && $scope.formCalistirildi) {
                    $rootScope.sayfayukleniyor = false;
                    return;
                }
                if ($scope.talepTipiId === 2 && $scope.talepProjeID <= 0 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    InfoTalep.InfoProblem.PROJE_ACILIYET_ETKI_SONUC_ID = $scope.InfoProblemHesap.PROJE_ACILIYET_ETKI_SONUC_ID;
                }
                if ($scope.talepTipiId === 3 && $scope.talepProjeID <= 0) {
                    InfoTalep.InfoDegisiklik.PROJE_ACILIYET_ETKI_SONUC_ID = $scope.InfoDegisiklikHesap.PROJE_ACILIYET_ETKI_SONUC_ID;
                }

                if ($scope.talepProjeID <= 0) {//Arka tarafa eklensin.
                    InfoTalep.TALEP_DURUM_TIPI_ID = 4;
                    InfoTalep.InfoTalepIlgili = $scope.TalepProjeIlgiListesi;
                    InfoTalep.TalepGereksinimListesi = $scope.TalepGereksinimListesi;
                }

                InfoTalep.TALEP_TIPI_ID = $scope.talepTipiId;
                var promiseGet = srvTalepProje.TalepProjeEkleGuncelle(InfoTalep);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Talep kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.talepProjeID = gelen.data.returnKayitNo;
                        $state.go('talep.talepprojekayit.talepprojekart', { talepProjeID: $scope.talepProjeID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KurumKullanıcı = function () {
                if ($scope.talepProjeID === "" && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === true) {
                    $scope.kurumDurumu = true;
                } else if ($scope.talepProjeID === "" && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.kurumDurumu = false;
                } else if ($scope.talepProjeID > 0 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === true) {
                    $scope.kurumDurumu = false;
                }
                else if ($scope.talepProjeID > 0 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.kurumDurumu = false;
                }
            };

            $scope.TalepTipiGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };


            $scope.setTab = function (tabValue) {
                $scope.tab = tabValue;

                if (tabValue === 0) {

                    if ($state.current.name.indexOf('kart') !== -1) {
                        $scope.tab = 1;

                    }

                    if ($state.current.name.indexOf('talepprojetaleptipidfikayit') !== -1) {
                        $scope.tab = 2;
                    }

                    if ($state.current.name.indexOf('talepprojetaleptipiproblemkayit') !== -1) {
                        $scope.tab = 3;
                    }

                    if ($state.current.name.indexOf('talepprojetaleptipidegisiklikkayit') !== -1) {
                        $scope.tab = 4;
                    }
                    if ($state.current.name.indexOf('talepprojetestsenaryolistesi') !== -1) {
                        $scope.tab = 9;
                    }

                }
                $scope.altTab = $state.current.data.altTab;

                if ($scope.tab === 2 && !($scope.altTab > 1)) {
                    $scope.altTab = 1;
                }
                if ($scope.tab === 3 && !($scope.altTab > 1)) {
                    $scope.altTab = 11;
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

            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.KullaniciProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.ProjeGereksinimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterGereksinim.PROJE_ID = $scope.InfoTalep.PROJE_ID;
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

            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                        $rootScope.sayfayukleniyor = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.TalepTipi = function (talepTipiId) {
                $scope.talepTipiId = talepTipiId;

                if (talepTipiId === 1 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false && ($scope.talepProjeID === 0 || $scope.talepProjeID === "")) {
                    $scope.InfoTalep.InfoDfi = null;
                    $scope.SurecGetData();
                }

                if (talepTipiId === 2 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false && ($scope.talepProjeID === 0 || $scope.talepProjeID === "")) {
                    $scope.InfoTalep.InfoProblem = null;
                    $scope.TalepSiniflandirmaTipiGetData();
                    $scope.ProjeEtkiGetData();
                    $scope.ProjeAciliyetGetData();
                }

                if (talepTipiId === 3 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false && ($scope.talepProjeID === 0 || $scope.talepProjeID === "")) {
                    $scope.InfoTalep.InfoDegisiklik = null;
                    $scope.TalepSiniflandirmaTipiGetData();
                    $scope.ProjeEtkiGetData();
                    $scope.ProjeAciliyetGetData();
                }

                if ((talepTipiId === 2 || talepTipiId === 3 || talepTipiId === 6) && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    if ($scope.talepProjeID > 0) {
                        $scope.ProjeGereksinimGetData(); // Selectten geldiği zaman çalışacak
                    }
                    $scope.talepTipiGereksinimDurumu = true;
                }
                else {
                    $scope.talepTipiGereksinimDurumu = false;
                }

                if (talepTipiId !== 8 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false && $scope.talepProjeID > 0) {
                    $scope.ProjeIterasyonGetData();
                    $scope.ProjeModulGetData();
                }



                if ((talepTipiId === 3 || talepTipiId === 6 || talepTipiId === 7) && $scope.talepProjeID === "") {
                    $scope.InfoTalep.TALEP_PROJE_SUREC_TIPI_ADI = "Analiz";
                }

                if (talepTipiId === 8) {
                    $scope.InfoTalep.PROJE_ITERASYON_ID = null;
                }

                if ($scope.talepProjeID === "") {
                    $scope.InfoTalep.PROJE_GEREKSINIM_ID = null;
                    $scope.InfoTalep.PROJE_GEREKSINIM_ADI = null;
                    $scope.InfoTalep.TALEP_PROJE_SUREC_TIPI_ID = null;
                    $scope.InfoProblemHesap = null;
                    $scope.InfoDegisiklikHesap = null;
                }

            };

            $scope.SurecGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvSurec.SurecGetData();
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Sürüm listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Sürüm listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.SurecListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sürüm listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepSiniflandirmaTipiGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepSiniflandirmaTipi.TalepSiniflandirmaTipiGetData();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Sınıflandırma listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Sınıflandırma listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepSiniflandirmaTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sınıflandırma listesi yüklenirken bir hata oluştu. Hata:', hata);
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
                        if ($scope.talepTipiId === 2) {
                            $scope.InfoProblemHesap = gelen.data;
                        }
                        if ($scope.talepTipiId === 3) {
                            $scope.InfoDegisiklikHesap = gelen.data;
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Aciliyet etki sonuç bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.GeriTalepProjeReddet = function () {
                $scope.$modalInstance.dismiss('cancel');
            };

            $scope.TalepProjeReddet = function () {
                $scope.$modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_reddet.html',
                    //controller: 'talep_proje_kayit_controller',
                    scope: $scope
                });
            };


            $scope.TalepGereksinimListesi = [];
            $scope.GereksinimOnay = function (gereksinim_Id, gereksinim_Adi) {
                if ($scope.talepProjeID > 0) {
                    $scope.TalepProjeGereksinimEkleGuncelle(gereksinim_Id);
                } else {
                    //$scope.InfoTalep.PROJE_GEREKSINIM_ID = gereksinim_Id;
                    //$scope.InfoTalep.PROJE_GEREKSINIM_ADI = gereksinim_Adi;
                    var GereksinimListe = {
                        PROJE_GEREKSINIM_ID: gereksinim_Id,
                        PROJE_GEREKSINIM_ADI: gereksinim_Adi
                    };
                   
                    var kontrol = $scope.TalepGereksinimListesi.findIndex(x => x.PROJE_GEREKSINIM_ID === gereksinim_Id);
                    if (kontrol > -1) {
                        mesajGoster('Dikkat', 'Aynı gereksinimi iki kez ekleyemezsiniz.' ,'W');
                        return;
                    } else {
                        
                        $scope.TalepGereksinimListesi.push(GereksinimListe);
                    }
                    
                }
                
                $scope.$modalInstanceGereksinimSec.dismiss('cancel');
            };

            $scope.TalepGereksinimListeGoster = function () {
                $scope.filtreTemizleGereksinim();
                if ($scope.talepProjeID > 0) {
                    $scope.TalepProjeGereksinimGetData();
                }

                $scope.$modalInstanceGereksinimListe = $modal.open({
                    templateUrl: 'views/common/modal_talep_gereksinim_liste.html',
                    size: 'lg',
                    scope: $scope
                });

            };

            $scope.TalepGereksinimListeGeri = function () {
                $scope.$modalInstanceGereksinimListe.dismiss('cancel');
            };

            $scope.AramaKriterTalepGereksinimListe = {
                TALEP_PROJE_ID: $scope.talepProjeID
            };

            $scope.TalepProjeGereksinimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeGereksinim.TalepProjeGereksinimGetData($scope.AramaKriterTalepGereksinimListe);
                promiseGet.then(function (gelen) {
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talebe bağlı gereksinim listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talebe bağlı gereksinim listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.TalepGereksinimListesi = gelen.data.Veri;
                        $rootScope.sayfayukleniyor = false;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talebe bağlı gereksinim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeGereksinimSil = function (infoTalepGereksinim) {
                $rootScope.sayfayukleniyor = true;
                if ($scope.talepProjeID > 0) {
                    var promiseGet = srvTalepProjeGereksinim.TalepProjeGereksinimSil(infoTalepGereksinim.TALEP_PROJE_GEREKSINIM_ID);
                    promiseGet.then(function (gelen) {

                        $rootScope.sayfayukleniyor = false;
                        if (gelen.data.basariDurumu === false) {
                            mesajGoster('Dikkat', 'Talebe bağlı gereksinim silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                            console.error('Talebe bağlı gereksinim silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                        }
                        else {
                            mesajGoster('İşlem tamam.', "Talebe bağlı gereksinim silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                            $scope.TalepProjeGereksinimGetData();
                            $scope.TalepProjeGenelLogGetData();
                        }
                    },
                        function (hata) {
                            $rootScope.sayfayukleniyor = false;
                            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                            console.error('Talebe bağlı gereksinim silme işlemi sırasında bir hata oluştu. Hata:', hata);
                        });
                } else {
                    $rootScope.sayfayukleniyor = false;
                    angular.forEach($scope.TalepGereksinimListesi, function (valueTalepGereksinim, keyTalepGereksinim) {
                        if (valueTalepGereksinim.PROJE_GEREKSINIM_ID === infoTalepGereksinim.PROJE_GEREKSINIM_ID) {
                            $scope.TalepGereksinimListesi.splice(keyTalepGereksinim, 1);
                        }
                    });
                }


            };

            $scope.modalSilmeOnayiTalepProjeGereksinim = function (infoTalepGereksinim) {
                $scope.secilenKayit = infoTalepGereksinim;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeGereksinimSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };


            $scope.InfoTalepProjeGereksinim = {};
            $scope.TalepProjeGereksinimEkleGuncelle = function (gereksinimId) {
                $scope.InfoTalepProjeGereksinim.TALEP_PROJE_ID = $scope.talepProjeID;
                $scope.InfoTalepProjeGereksinim.PROJE_GEREKSINIM_ID = gereksinimId;
                var promiseGet = srvTalepProjeGereksinim.TalepProjeGereksinimEkleGuncelle($scope.InfoTalepProjeGereksinim);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep gereksinim kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep gereksinim kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Talep gereksinim kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.TalepGereksinimListeGeri();
                        $scope.TalepProjeGenelLogGetData();
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep gereksinim kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.GereksinimSec = function () {
                $scope.filtreTemizleGereksinim();
                $scope.$modalInstanceGereksinimSec = $modal.open({
                    templateUrl: 'views/common/modal_talep_gereksinim_sec.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.GereksinimGeri = function () {
                $scope.$modalInstanceGereksinimSec.dismiss('cancel');
            };

            //$scope.GereksinimTemizle = function () {
            //    $scope.InfoTalep.PROJE_GEREKSINIM_ID = null;
            //    $scope.InfoTalep.PROJE_GEREKSINIM_ADI = null;
            //};

            $scope.ProjeSec = function () {
                if ($scope.$storage.IS_KURUM_MUSTERI_KULLANICI !== true && $scope.talepTipiId !== 8) {
                    $scope.ProjeModulGetData();
                    $scope.ProjeIterasyonGetData();
                  //  $scope.GereksinimTemizle();
                }
                if ($scope.$storage.IS_KURUM_MUSTERI_KULLANICI === true) {
                    $scope.KullaniciProjelerSelect();
                }
            };

            $scope.AramaKriterProjeModul = {
                PROJE_ID: '',
                LISTE: false
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
                $scope.AramaKriterIterasyon.PROJE_ID = $scope.InfoTalep.PROJE_ID;
                $scope.AramaKriterIterasyon.PROJE_MODUL_ID = $scope.InfoTalep.PROJE_MODUL_ID;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonGetData($scope.AramaKriterIterasyon);
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

            $scope.KullaniciProjelerSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeSelect($scope.InfoTalep.PROJE_ID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProje = gelen.data;
                        $scope.InfoTalep.KULLANICI_ID = $scope.InfoProje.PROJE_YONETICISI_ID;
                        $scope.InfoTalep.TALEP_SAHIBI_KULLANICI_ADI = $scope.InfoProje.PROJE_YONETICISI_ADI;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeOnaylama = function (InfoTalepOnay) {
                $scope.InfoTalepOnay.TALEP_PROJE_ID = $scope.talepProjeID;
                $scope.InfoTalepOnay.EN_SON_TALEP_SUREC_LOG_ID = $scope.InfoTalep.EN_SON_TALEP_SUREC_LOG_ID;
                var promiseGet = srvTalepProje.TalepProjeOnay($scope.InfoTalepOnay);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        //$scope.InfoTalep.TALEP_DURUM_TIPI_ID = gelen.data.returnKayitNo;
                        if (parseInt($scope.InfoTalepOnay.TALEP_DURUM_TIPI_ID) === 5) {
                            $scope.GeriTalepProjeReddet();
                        }
                        $scope.TalepProjeSelect();

                        //$scope.KullanıcıSayfaGorunum();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


            //Talep ilgili 
            $scope.InfoTalepIlgili = {};

            $scope.AramaKriterIlgili = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                LISTE: false
            };

            $scope.TalepProjeIlgiGetData = function (durum) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeIlgi.TalepProjeIlgiGetData($scope.AramaKriterIlgili);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İlgili listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İlgili listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        if (durum !== null) {
                            $scope.TalepProjeIlgiliBagliListesi = gelen.data.Veri;
                        }
                        else {
                            $scope.TalepProjeIlgiListesi = gelen.data.Veri;
                            angular.forEach($scope.TalepProjeIlgiListesi, function (value, key) {
                                if (value.KULLANICI_ID === $scope.$storage.KULLANICI_ID && value.KULLANICI_ID != $scope.InfoTalep.KULLANICI_ID && t.KULLANICI_ID != $scope.InfoTalep.TALEP_ATAYAN_KULLANICI_ID) {
                                    $scope.talepKapaliSagTaraf = false;
                                    $scope.talepKapaliDurumu = true;
                                }
                            });
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İlgili türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepIlgiliEkle = function () {
                $scope.InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI = null;
                $scope.InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI_AD_SOYAD = null;
                //if ($scope.talepProjeID === 0) {
                //    $scope.YeniTalepIlgiliListesi = [];
                //}

                $scope.$modalInstanceTalepIlgili = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_ilgili_ekle.html',
                    size: 'sm',
                    scope: $scope
                });
            };

            $scope.GeriTalepIlgili = function () {
                $scope.formCalistirildiTalepProjeIlgili = false;
                $scope.$modalInstanceTalepIlgili.dismiss('cancel');
            };

            $scope.TalepProjeIlgiListesi = [];

            $scope.TalepIlgiliEkleOnKontrol = function (InfoTalepIlgili, frmTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepProjeIlgili = true;
                if (frmTalepIlgili.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTalepIlgili);
                    return;
                }
                if ($scope.talepProjeID > 0) {
                    var InfoYeniTalepIlgiliDuzenle = {
                        TALEP_PROJE_ILGI_KULLANICI_ID: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID,
                        TALEP_PROJE_ILGI_KULLANICI_AD_SOYAD: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.AD_SOYAD
                    };
                    $scope.TalepProjeIlgiEkleGuncelle(InfoYeniTalepIlgiliDuzenle);
                } else {
                    var kontrol = true;
                    //if ($scope.TalepProjeIlgiListesi.length > 0) {
                    angular.forEach($scope.TalepProjeIlgiListesi, function (value, key) {
                        if (value.TALEP_PROJE_ILGI_KULLANICI_ID === InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID) {
                            kontrol = false;
                        }
                    });
                    $rootScope.sayfayukleniyor = false;
                    if (kontrol) {
                        var InfoYeniTalepIlgili = {
                            TALEP_PROJE_ILGI_KULLANICI_ID: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID,
                            AvatarBase64: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.AvatarBase64,
                            CINSIYET: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.CINSIYET,
                            TALEP_PROJE_ILGI_KULLANICI_AD_SOYAD: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.AD_SOYAD
                        };
                        $scope.TalepProjeIlgiListesi.push(InfoYeniTalepIlgili);
                    }

                    $scope.GeriTalepIlgili();
                }

            };

            $scope.TalepProjeIlgiEkleGuncelle = function (InfoTalepIlgili) {


                InfoTalepIlgili.TALEP_PROJE_ID = $scope.talepProjeID;
                var promiseGet = srvTalepProjeIlgi.TalepProjeIlgiEkleGuncelle(InfoTalepIlgili);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'İlgili kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('İlgili kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "İlgili kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.TalepProjeIlgiGetData(null);
                        $scope.GeriTalepIlgili();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İlgili kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeIlgiSil = function (infoTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                if ($scope.talepProjeID > 0) {
                    var promiseGet = srvTalepProjeIlgi.TalepProjeIlgiSil(infoTalepIlgili.TALEP_PROJE_ILGI_ID);
                    promiseGet.then(function (gelen) {
                        //if (gelen.data.basariDurumu) {
                        //    mesajGoster(gelen.data.mesaj);

                        //}
                        $rootScope.sayfayukleniyor = false;
                        if (gelen.data.basariDurumu === false) {
                            mesajGoster('Dikkat', 'İlgili silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                            console.error('İlgili silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                        }
                        else {
                            mesajGoster('İşlem tamam.', "İlgili silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                            $scope.TalepProjeIlgiGetData(null);
                        }
                    },
                        function (hata) {
                            $rootScope.sayfayukleniyor = false;
                            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                            console.error('İlgili kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                        });
                }
                else {
                    $rootScope.sayfayukleniyor = false;
                    angular.forEach($scope.TalepProjeIlgiListesi, function (valueilgili, keyilgili) {
                        if (valueilgili.TALEP_PROJE_ILGI_KULLANICI_ID === infoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI_ID) {
                            $scope.TalepProjeIlgiListesi.splice(keyilgili, 1);
                        }
                    });
                }

            };

            $scope.modalSilmeOnayiTalepIlgili = function (infoTalepIlgili) {
                $scope.secilenKayit = infoTalepIlgili;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeIlgiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };
            //Talep ilgili Son

            //Talep Tipi Log
            $scope.TipMenuSec = function () {
                $scope.TalepProjeTalepTipiLogGetData();
            };

            $scope.AramaKriterTalepTipiLog = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.TalepProjeTalepTipiLogGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeTalepTipiLog.TalepProjeTalepTipiLogGetData($scope.AramaKriterTalepTipiLog);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep tipi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiTalepTipiLog = gelen.data.ToplamKayitSayisi;
                        $scope.TalepProjeTalepTipiLogListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoYeniTalepTipi = {
                YENI_TALEP_TIPI_ID: '',
                ACIKLAMA: ''
            };

            $scope.yeniTalepTipiGoster = function () {
                $scope.talepTipiKayit = true;
                $scope.yeniTalepSahibiGizle();
                $scope.yeniTalepSureciGizle();
            };

            $scope.yeniTalepTipiGizle = function () {
                $scope.talepTipiKayit = false;
                $scope.formCalistirildiYeniTalepTipi = false;
                $scope.InfoYeniTalepTipi.YENI_TALEP_TIPI_ID = null;
                $scope.InfoYeniTalepTipi.ACIKLAMA = null;
            };

            $scope.YeniTalepTipiKaydet = function (InfoYeniTalepTipi, frmYeniTalepTipi) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiYeniTalepTipi = true;
                if (frmYeniTalepTipi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmYeniTalepTipi);
                    return;
                }

                InfoYeniTalepTipi.TALEP_PROJE_ID = $scope.talepProjeID;
                InfoYeniTalepTipi.ONCEKI_TALEP_TIPI_ID = $scope.InfoTalep.TALEP_TIPI_ID;
                var promiseGet = srvTalepProjeTalepTipiLog.TalepProjeTalepTipiLogEkleGuncelle(InfoYeniTalepTipi);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep tipi kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep tipi kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Talep tipi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.yeniTalepTipiGizle();
                        $state.reload();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep tipi kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };
            //Talep Tipi Log Son

            //Talep Sahibi Log
            $scope.SahibiMenuSec = function () {
                $scope.TalepProjeSahibiLogGetData();
            };

            $scope.AramaKriterTalepSahibiLog = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.TalepProjeSahibiLogGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeSahibiLog.TalepProjeSahibiLogGetData($scope.AramaKriterTalepSahibiLog);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep sahibi log listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep sahibi log listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiTalepSahibiLog = gelen.data.ToplamKayitSayisi;
                        $scope.TalepProjeSahibiLogListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep sahibi log listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.yeniTalepSahibiGoster = function () {
                $scope.talepSahibiKayit = true;
                $scope.yeniTalepTipiGizle();
                $scope.yeniTalepSureciGizle();
            };

            $scope.yeniTalepSahibiGizle = function () {
                $scope.talepSahibiKayit = false;
                $scope.formCalistirildiYeniTalepSahibi = false;
                $scope.InfoTalep.TALEP_PROJE_SAHIBI_LOG_ONCEKI_ATANAN_KULLANICI_ID = null;
                $scope.InfoTalep.TALEP_PROJE_SAHIBI_LOG_ACIKLAMA = null;
            };

            $scope.YeniTalepSahibiKaydet = function (InfoYeniTalepSahibi, frmYeniTalepSahibi) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiYeniTalepSahibi = true;
                if (frmYeniTalepSahibi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmYeniTalepSahibi);
                    return;
                }
                InfoYeniTalepSahibi.TALEP_PROJE_ID = $scope.talepProjeID;
                InfoYeniTalepSahibi.TALEP_PROJE_SAHIBI_LOG_ONCEKI_ATAYAN_KULLANICI_ID = $scope.InfoTalep.KULLANICI_ID;
                var promiseGet = srvTalepProjeSahibiLog.TalepProjeSahibiLogEkleGuncelle(InfoYeniTalepSahibi);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep sahibi kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep sahibi kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Talep sahibi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");

                        $scope.yeniTalepSahibiGizle();
                        $scope.TalepProjeSelect();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep sahibi kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };
            //Talep Sahibi Log Son

            //Talep Süreç Log
            $scope.SurecMenuSec = function () {
                $scope.TalepProjeSurecLogGetData();
            };

            $scope.AramaKriterTalepSurecLog = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                LISTE: true,
                SUREC: false,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.TalepProjeSurecLogGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeSurecLog.TalepProjeSurecLogGetData($scope.AramaKriterTalepSurecLog);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep süreç log listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep süreç log listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiSurecLog = gelen.data.ToplamKayitSayisi;
                        $scope.TalepProjeSurecLogListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep süreç log listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoYeniTalepSureci = {
                TALEP_PROJE_YENI_SUREC_TIPI_ID: '',
                TALEP_PROJE_SUREC_LOG_ACIKLAMA: ''
            };

            $scope.yeniTalepSureciGoster = function () {
                $scope.talepSureciKayit = true;
                $scope.yeniTalepTipiGizle();
                $scope.yeniTalepSahibiGizle();
            };

            $scope.yeniTalepSureciGizle = function () {
                $scope.talepSureciKayit = false;
                $scope.formCalistirildiYeniTalepSureci = false;
                $scope.InfoYeniTalepSureci.TALEP_PROJE_YENI_SUREC_TIPI_ID = null;
            };

            $scope.YeniTalepSureciKaydet = function (InfoYeniTalepSureci, frmYeniTalepSureci) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiYeniTalepSureci = true;
                if (frmYeniTalepSureci.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmYeniTalepSureci);
                    return;
                }

                InfoYeniTalepSureci.TALEP_PROJE_ID = $scope.talepProjeID;
                InfoYeniTalepSureci.TALEP_PROJE_SUREC_LOG_KONTROL = false;
                InfoYeniTalepSureci.TALEP_PROJE_ONCEKI_SUREC_TIPI_ID = $scope.InfoTalep.TALEP_PROJE_SUREC_TIPI_ID;
                var promiseGet = srvTalepProjeSurecLog.TalepProjeSurecLogEkleGuncelle(InfoYeniTalepSureci);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Süreç kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Süreç kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Süreç kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if (InfoYeniTalepSureci.TALEP_PROJE_YENI_SUREC_TIPI_ID === 4) {
                            $state.reload();
                        }
                        else {

                            $scope.yeniTalepSureciGizle();
                            $scope.TalepProjeSelect();
                            $scope.TalepProjeGenelLogGetData();
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Süreç kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };



            //Talep Surec Log Son

            //Talep Bagli Talep
            $scope.BagliMenuSec = function () {
                $scope.TalepBagliOlduguTaleplerGetData();
            };

            $scope.AramaKriterTalepBagli = {
                LISTE: true,
                TALEP_PROJE_ID: $scope.talepProjeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                UST: true,
                ALT: false
            };

            $scope.AramaKriterTalepListe = {
                PROJE_ID: '',
                TALEP_SAHIBI_KULLANICI_ID: '',
                TALEP_TIPI_ID: '',
                TALEP_DURUM_TIPI_ID: '',
                TALEP_PROJE_TALEP_NO: '',
                TALEP_PROJE_KONU: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.TalepProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeGetData($scope.AramaKriterTalepListe);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiTalep = gelen.data.ToplamKayitSayisi;
                        $scope.TalepProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepBagliOlduguTaleplerGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepBagliOlduguTalepler.TalepBagliOlduguTaleplerGetData($scope.AramaKriterTalepBagli);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bağlı olduğu talep listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bağlı olduğu talep listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiTalepBagli = gelen.data.ToplamKayitSayisi;
                        $scope.TalepBagliOlduguUstTaleplerListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bağlı olduğu talep listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoBagliTalepYeniKayit = {
                TALEP_PROJE_ID: '',
                UST_TALEP_PROJE_ID: '',
                UST_TALEP_PROJE_KONU: ''
            };

            $scope.BagliTalepOnay = function (talepProjeId, talepProjeKonu) {
                $scope.InfoBagliTalepYeniKayit.UST_TALEP_PROJE_ID = talepProjeId;
                $scope.InfoBagliTalepYeniKayit.UST_TALEP_PROJE_KONU = talepProjeKonu;
                $scope.$modalInstanceBagliTalepSec.dismiss('cancel');
            };

            $scope.BagliTalepSec = function () {
                $scope.BagliTalepTemizle();
                $scope.AramaKriterTalepListe.PROJE_ID = $scope.InfoTalep.PROJE_ID;
                $scope.TalepProjeGetData();
                $scope.$modalInstanceBagliTalepSec = $modal.open({
                    templateUrl: 'views/common/modal_talep_bagli_talep_sec.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.BagliTalepGeri = function () {
                $scope.$modalInstanceBagliTalepSec.dismiss('cancel');
            };

            $scope.BagliTalepTemizle = function () {
                $scope.InfoBagliTalepYeniKayit.UST_TALEP_PROJE_ID = null;
                $scope.InfoBagliTalepYeniKayit.UST_TALEP_PROJE_KONU = null;

            };

            $scope.TalepBagliOlduguTaleplerEkleGuncelle = function (InfoBagliTalepYeniKayit, frmBagliTalep) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiBagliTalep = true;
                if (frmBagliTalep.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmBagliTalep);
                    return;
                }
                InfoBagliTalepYeniKayit.TALEP_PROJE_ID = $scope.talepProjeID;
                var promiseGet = srvTalepBagliOlduguTalepler.TalepBagliOlduguTaleplerEkleGuncelle(InfoBagliTalepYeniKayit);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep bağla kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep bağla işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Talep Bağla kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.BagliTalepTemizle();
                        $scope.formCalistirildiBagliTalep = false;
                        $scope.TalepBagliOlduguTaleplerGetData();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep bağla kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepBagliOlduguTaleplerSil = function (infoTalepBagli) {
                $rootScope.sayfayukleniyor = true;
                $scope.BagliTalepSil = {
                    TALEP_PROJE_ID: $scope.talepProjeID,
                    TALEP_BAGLI_OLDUGU_TALEPLER_ID: infoTalepBagli.TALEP_BAGLI_OLDUGU_TALEPLER_ID
                };
                var promiseGet = srvTalepBagliOlduguTalepler.TalepBagliOlduguTaleplerSil($scope.BagliTalepSil);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bağlı talep silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bağlı talep silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Bağlı talep silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.TalepBagliOlduguTaleplerGetData();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bağlı talep silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayiTalepBagli = function (infoTalepBagli) {
                $scope.secilenKayit = infoTalepBagli;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepBagliOlduguTaleplerSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.InfoBagliTalep = {
                TALEP_PROJE_ID: '',
                TALEP_PROJE_KONU: '',
                TALEP_SAHIBI_AD_SOYAD: '',
                TALEP_DURUM_TIPI_ADI: '',
                TALEP_SAHIBI_AvatarBase64: '',
                TALEP_SAHIBI_CINSIYET: '',
                YENI_SUREC_TIPI_ID: '',
                TALEP_PROJE_SUREC_LOG_ID: '',
                YENI_SUREC_AKIS_TIPI_ID: '',
                SurecAkisBar: '',
                SurecBar: '',
                SurecBarStyle: '',
                SurecAkisBarStyle: ''

            };

            $scope.BagliTalepBilgisi = function (bagliTalep) {
                $scope.InfoBagliTalep.TALEP_PROJE_ID = $scope.talepProjeID === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_PROJE_ID : bagliTalep.TALEP_PROJE_ID;
                $scope.InfoBagliTalep.TALEP_PROJE_KONU = parseInt($scope.talepProjeID) === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_PROJE_KONU : bagliTalep.ALT_TALEP_PROJE_KONU;
                $scope.InfoBagliTalep.TALEP_SAHIBI_AD_SOYAD = parseInt($scope.talepProjeID) === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_SAHIBI_AD_SOYAD : bagliTalep.ALT_TALEP_SAHIBI_AD_SOYAD;
                $scope.InfoBagliTalep.TALEP_DURUM_TIPI_ADI = parseInt($scope.talepProjeID) === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_DURUM_TIPI_ADI : bagliTalep.ALT_TALEP_DURUM_TIPI_ADI;
                $scope.InfoBagliTalep.TALEP_SAHIBI_CINSIYET = parseInt($scope.talepProjeID) === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_SAHIBI_CINSIYET : bagliTalep.ALT_TALEP_SAHIBI_CINSIYET;
                $scope.InfoBagliTalep.TALEP_SAHIBI_AvatarBase64 = parseInt($scope.talepProjeID) === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_SAHIBI_AvatarBase64 : bagliTalep.ALT_TALEP_SAHIBI_AvatarBase64;
                $scope.InfoBagliTalep.TALEP_TIPI_ID = parseInt($scope.talepProjeID) === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_TIPI_ID : bagliTalep.ALT_TALEP_TIPI_ID;
                $scope.InfoBagliTalep.TALEP_PROJE_SUREC_LOG_ID = bagliTalep.TALEP_PROJE_SUREC_LOG_ID;
                $scope.InfoBagliTalep.YENI_SUREC_TIPI_ID = bagliTalep.YENI_SUREC_TIPI_ID;
                $scope.InfoBagliTalep.YENI_SUREC_AKIS_TIPI_ID = bagliTalep.YENI_SUREC_AKIS_TIPI_ID;
                $scope.InfoBagliTalep.YENI_SUREC_AKIS_SUREC_LOG_ID = bagliTalep.YENI_SUREC_AKIS_SUREC_LOG_ID;
                $scope.InfoBagliTalep.BAGLI_TALEP_SUREC = bagliTalep.BAGLI_TALEP_SUREC;

                $scope.AramaKriterBagliTalepAciklama.TALEP_PROJE_ID = parseInt($scope.talepProjeID) === bagliTalep.TALEP_PROJE_ID ? bagliTalep.UST_TALEP_PROJE_ID : bagliTalep.TALEP_PROJE_ID;
                //$scope.AramaKriterBagliTalepAciklama.LISTE = false;
                //$scope.AramaKriterBagliTalepAciklama.DURUM = true;
                $scope.TalepProjeAciklamaGetData($scope.AramaKriterBagliTalepAciklama);

                $scope.SurecProgress = $scope.SurecProgressHesaplama($scope.InfoBagliTalep.YENI_SUREC_TIPI_ID, $scope.InfoBagliTalep.YENI_SUREC_AKIS_TIPI_ID, $scope.InfoBagliTalep.TALEP_PROJE_SUREC_LOG_ID, $scope.InfoBagliTalep.YENI_SUREC_AKIS_SUREC_LOG_ID);
                $scope.InfoBagliTalep.SurecBar = $scope.SurecProgress[0];
                $scope.InfoBagliTalep.SurecBarStyle = $scope.SurecProgress[1];
                $scope.AkisProgress = $scope.SurecAkisProgressHesaplama($scope.InfoBagliTalep.YENI_SUREC_AKIS_TIPI_ID);
                $scope.InfoBagliTalep.SurecAkisBar = $scope.AkisProgress[0];
                $scope.InfoBagliTalep.SurecAkisBarStyle = $scope.AkisProgress[1];
                $scope.AramaKriterIlgili.TALEP_PROJE_ID = bagliTalep.UST_TALEP_PROJE_ID;
                $scope.TalepProjeIlgiGetData(true);
            };

            $scope.SurecProgressHesaplama = function (surecTipiId, surecAkisTipiId, surecLogId, surecAkisSurecLogId) {
                switch (surecTipiId) {
                    case 1:

                        if ((surecAkisTipiId === 1 || surecAkisTipiId === 2) && surecLogId === surecAkisSurecLogId) {
                            return [10, { 'width': '10%' }];
                        }
                        else if (surecAkisTipiId === 3 && surecLogId === surecAkisSurecLogId) {
                            return [20, { 'width': '20%' }];
                        }
                        else {
                            return [0, { 'width': '0%' }];
                        }
                        break;
                    case 2:

                        if ((surecAkisTipiId === 1 || surecAkisTipiId === 2) && surecLogId === surecAkisSurecLogId) {
                            return [30, { 'width': '30%' }];
                        }
                        else if (surecAkisTipiId === 3 && surecLogId === surecAkisSurecLogId) {
                            return [40, { 'width': '40%' }];
                        }
                        else {
                            return [20, { 'width': '20%' }];
                        }
                        break;
                    case 3:
                        if ((surecAkisTipiId === 1 || surecAkisTipiId === 2) && surecLogId === surecAkisSurecLogId) {
                            return [50, { 'width': '50%' }];
                        }
                        else if (surecAkisTipiId === 3 && surecLogId === surecAkisSurecLogId) {
                            return [60, { 'width': '60%' }];
                        }
                        else {
                            return [40, { 'width': '40%' }];
                        }
                        break;
                    case 4:
                        if ((surecAkisTipiId === 1 || surecAkisTipiId === 2) && surecLogId === surecAkisSurecLogId) {
                            return [70, { 'width': '70%' }];
                        }
                        else if (surecAkisTipiId === 3 && surecLogId === surecAkisSurecLogId) {
                            return [80, { 'width': '80%' }];
                        }
                        else {
                            return [60, { 'width': '60%' }];
                        }
                        break;
                    case 5:
                        if ((surecAkisTipiId === 1 || surecAkisTipiId === 2) && surecLogId === surecAkisSurecLogId) {
                            return [90, { 'width': '90%' }];
                        }
                        else if (surecAkisTipiId === 3 && surecLogId === surecAkisSurecLogId) {
                            return [100, { 'width': '100%' }];
                        }
                        else {
                            return [80, { 'width': '80%' }];
                        }
                        break;
                    default:
                        return [0, { 'width': '0%' }];
                        break;
                }


            };

            $scope.SurecAkisProgressHesaplama = function (surecAkisTipiId) {
                switch (surecAkisTipiId) {
                    case 1:
                        return [50, { 'width': '50%' }];
                        break;
                    case 2:
                        return [50, { 'width': '50%' }];
                        break;
                    case 3:
                        return [100, { 'width': '100%' }];
                        break;
                    case 4:
                        return [0, { 'width': '0%' }];
                        break;
                    default:
                        return [0, { 'width': '0%' }];
                        break;
                }
            };
            //Talep Bagli Son

            //Talep Acıklama 


            $scope.InfoTalepAciklama = {
                TALEP_PROJE_ACIKLAMA_ACIKLAMA: ''
            };


            $scope.AramaKriterBagliTalepAciklama = {
                TALEP_PROJE_ID: '',
                DURUM: false,
                LISTE: false
            };

            $scope.TalepProjeAciklamaGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeAciklama.TalepProjeAciklamaGetData(AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Açıklama listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Açıklama listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        if (AramaKriter.DURUM === false) {
                            $scope.BagliTalepAciklamaListesi = gelen.data.Veri;
                        }
                        else {
                            $scope.toplamKayitSayisiTalepAciklama = gelen.data.ToplamKayitSayisi;
                            $scope.TalepProjeAciklamaListesi = gelen.data.Veri;
                        }

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Açıklama listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeAciklamaEkleGuncelle = function (InfoTalepAciklama, frmTalepAciklama) {
                $scope.formCalistirildiTalepAciklama = true;
                if (frmTalepAciklama.$valid) { } else {
                    $rootScope.focusToInvalid(frmTalepAciklama);
                    return;
                }

                InfoTalepAciklama.TALEP_PROJE_SUREC_LOG_ID = $scope.InfoTalep.EN_SON_TALEP_SUREC_LOG_ID;
                InfoTalepAciklama.TALEP_PROJE_ID = $scope.talepProjeID;
                var promiseGet = srvTalepProjeAciklama.TalepProjeAciklamaEkleGuncelle(InfoTalepAciklama);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Açıklama kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Açıklama kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Açıklama kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.TalepProjeAciklamaGetData($scope.AramaKriterTalepAciklama);
                        $scope.formCalistirildiTalepAciklama = false;
                        $scope.InfoTalepAciklama.TALEP_PROJE_ACIKLAMA_ACIKLAMA = null;
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Açıklama kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };
            //Acıklama Son 

            //Talep Döküman


            $scope.AramaKriterTalepDokuman = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                LISTE: false
            };

            $scope.TalepProjeDokumanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeDokuman.TalepProjeDokumanGetData($scope.AramaKriterTalepDokuman);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisiTalepDokuman = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dökuman listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dökuman listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepProjeDokumanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dökuman listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoTalepDokuman = {
                TALEP_PROJE_ID: '',
                TALEP_PROJE_DOKUMAN_ADI: '',
                TALEP_PROJE_DOKUMAN_DOSYA: '',
                TALEP_DOKUMAN_DOKUMAN_DOSYA_TIPI: '',
                TALEP_DOKUMAN_DOKUMAN_DOSYA_BOYUTU: ''
            };

            $scope.handleFileSelect = function (evt) {
                var file = evt[0];
                var reader = new FileReader();
                reader.onload = function (evt) {
                    $scope.$apply(function ($scope) {
                        $scope.InfoTalepDokuman.TALEP_PROJE_DOKUMAN_ADI = file.name;
                        $scope.InfoTalepDokuman.TALEP_PROJE_DOKUMAN_DOSYA = evt.target.result;
                        $scope.InfoTalepDokuman.TALEP_DOKUMAN_DOKUMAN_DOSYA_TIPI = file.type;
                        $scope.InfoTalepDokuman.TALEP_DOKUMAN_DOKUMAN_DOSYA_BOYUTU = file.size;
                    });
                };
                reader.readAsDataURL(file);
            };



            $scope.talepDokumanSifirla = function () {
                $scope.InfoTalepDokuman.TALEP_PROJE_DOKUMAN_ADI = null;
                $scope.InfoTalepDokuman.TALEP_PROJE_DOKUMAN_DOSYA = null;
                $scope.InfoTalepDokuman.TALEP_DOKUMAN_DOKUMAN_DOSYA_TIPI = null;
                $scope.InfoTalepDokuman.TALEP_DOKUMAN_DOKUMAN_DOSYA_BOYUTU = null;
            };

            $scope.TalepProjeDokumanEkleGuncelle = function (InfoTalepDokuman, frmTalepDokuman) {
                $rootScope.sayfayukleniyor = true;

                $scope.formCalistirildiTalepDosya = true;
                if (frmTalepDokuman.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTalepDokuman);
                    return;
                }
                if (InfoTalepDokuman.TALEP_PROJE_DOKUMAN_DOSYA === null) {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTalepDokuman);
                    return;
                }

                InfoTalepDokuman.TALEP_PROJE_ID = $scope.talepProjeID;
                var promiseGet = srvTalepProjeDokuman.TalepProjeDokumanEkleGuncelle(InfoTalepDokuman);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dökuman kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dökuman kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Dökuman kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        angular.element("#fileDosya").trigger('click');
                        $scope.talepDokumanSifirla();
                        $scope.formCalistirildiTalepDosya = false;
                        $scope.TalepProjeDokumanGetData();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dökuman kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeDokumanSil = function (infoTalepDokuman) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeDokuman.TalepProjeDokumanSil(infoTalepDokuman.TALEP_PROJE_DOKUMAN_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dökuman silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dökuman silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Dökuman silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.TalepProjeDokumanGetData();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dökuman silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayiTalepDokuman = function (infoTalepDokuman) {
                $scope.secilenKayit = infoTalepDokuman;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeDokumanSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.TalepDokumanGoster = function (talepDokumanID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeDokuman.TalepProjeDokumanSelect(talepDokumanID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman bilgileri yüklenirken bir hata oluştu. Hata:' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        $scope.RaporData = { Dosya: gelen.data.TALEP_DOKUMAN_DOSYA_URL, canPrint: browserCanPrint, ekUzanti: 'pdf' };
                        $rootScope.sayfayukleniyor = false;
                        $scope.modalInstanceEkGoster = $modal.open({
                            templateUrl: 'views/common/modal_rapor_pdf_viewer.html',
                            size: 'lg',
                            scope: $scope
                        });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceEkGoster.dismiss('cancel');
            };

            //Talep Dokuman Son

            //Surec Akıs 

            // Süreç akış devam edilecek.

            $scope.InfoYeniTalepSurecAkis = {
                YENI_SUREC_AKIS_TIPI_ID: '',
                YENI_SUREC_AKIS_TIPI_ADI: '',
                TALEP_PROJE_ID: '',
                ONCEKI_SUREC_AKIS_TIPI_ID: '',
                TALEP_PROJE_SUREC_LOG_ID: '',
                TALEP_PROJE_SUREC_LOG_NEDEN_DOGRULANMADI: ''
            };






            $scope.AramaKriterDogrulamaKriteri = {
                PROJE_ID: '',
                TALEP_SUREC_DURUMU: true,
                TALEP_PROJE_SUREC_TIPI_ID: ''
            };

            $scope.ProjeDogrulamaKriteriGetData = function () {
                $scope.AramaKriterDogrulamaKriteri.TALEP_PROJE_SUREC_TIPI_ID = $scope.InfoTalep.TALEP_PROJE_SUREC_TIPI_ID;
                $scope.AramaKriterDogrulamaKriteri.PROJE_ID = $scope.InfoTalep.PROJE_ID;
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDogrulamaKriteri.ProjeDogrulamaKriteriGetData($scope.AramaKriterDogrulamaKriteri);
                promiseGet.then(function (gelen) {
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeDogrulamaKriteriListesi = gelen.data.Veri;
                    }

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.SurecAkisTamamla = function () {
                $scope.formCalistirildiSurecAkisTamamlama = false;

                $scope.ProjeDogrulamaKriteriGetData();
                $scope.$modalInstanceSurecAkisTamamla = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_surec_akis_tamamla.html',
                    size: 'lg',
                    scope: $scope,
                    backdrop: 'static'
                });
            };

            $scope.SurecAkisTamamlaGeri = function () {
                $scope.$modalInstanceSurecAkisTamamla.dismiss('cancel');
            };




            $scope.YeniTalepSurecAkisKaydet = function (InfoYeniTalepSurecAkis, InfoSurecAkisTamamlama, frmTalepProjeSurecAkisTamamlaVeRed) {
                $rootScope.sayfayukleniyor = true;

                InfoYeniTalepSurecAkis.TALEP_PROJE_ID = $scope.talepProjeID;
                if ($scope.talepTipiId === 3 || $scope.talepTipiId === 6 || $scope.talepTipiId === 7) {
                    InfoYeniTalepSurecAkis.TALEP_PROJE_SUREC_LOG_ID = $scope.InfoTalep.EN_SON_TALEP_SUREC_LOG_ID;
                    //InfoYeniTalepSurecAkis.ONCEKI_SUREC_AKIS_TIPI_ID = $scope.InfoTalep.YENI_SUREC_AKIS_TIPI_ID;
                }
                else {
                    InfoYeniTalepSurecAkis.TALEP_PROJE_SUREC_LOG_ID = null;
                }

                if (InfoSurecAkisTamamlama != null) {
                    $scope.formCalistirildiSurecAkisTamamlama = true;
                    if (frmTalepProjeSurecAkisTamamlaVeRed.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $rootScope.focusToInvalid(frmTalepProjeSurecAkisTamamlaVeRed);
                        return;
                    }
                    InfoYeniTalepSurecAkis.InfoSurecAkisTamamlama = InfoSurecAkisTamamlama;
                }
                if (InfoYeniTalepSurecAkis.YENI_SUREC_AKIS_TIPI_ID === 4) {
                    $scope.formCalistirildiSurecAkisTamamlama = true;
                    if (frmTalepProjeSurecAkisTamamlaVeRed.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $rootScope.focusToInvalid(frmTalepProjeSurecAkisTamamlaVeRed);
                        return;
                    }
                }

                var promiseGet = srvTalepProjeSurecAkisLog.TalepProjeSurecAkisLogEkleGuncelle(InfoYeniTalepSurecAkis);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Akış onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Akış onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Akış onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir. " + gelen.data.mesaj, "S");
                        if (InfoYeniTalepSurecAkis.YENI_SUREC_AKIS_TIPI_ID === 3) {
                            $scope.SurecAkisTamamlaGeri();
                        }
                        if (InfoYeniTalepSurecAkis.YENI_SUREC_AKIS_TIPI_ID === 4) {
                            $scope.SurecAkisRedGeri();
                        }
                        $scope.TalepProjeSelect();
                        $scope.TalepProjeGenelLogGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Akış onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeDogrulamaKriteriEkleGuncelle = function (InfoDogrulamaKriter, frmTalepProjeSurecAkisTamamla) {
                $scope.formCalistirildiSurecAkisTamamlama = true;
                if (frmTalepProjeSurecAkisTamamla.$valid) { } else {
                    $rootScope.focusToInvalid(frmTalepProjeSurecAkisTamamla);
                    return;
                }
                var InfoTalepDogrulamaKriter = {
                    TALEP_PROJE_ID: $scope.talepProjeID,
                    TALEP_PROJE_SUREC_LOG_ID: $scope.InfoTalep.EN_SON_TALEP_SUREC_LOG_ID,
                    TALEP_DOGRULAMA_KRITERLER: InfoDogrulamaKriter
                };

                var promiseGet = srvTalepProjeDogrulamaKriteri.TalepProjeDogrulamaKriteriEkleGuncelle(InfoTalepDogrulamaKriter);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Süreç akış tamamlama kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Süreç akış tamamlama kayıt işlemi sırasında bir hata oluştu.', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Süreç akış tamamlama kayıt işleminiz başarılı bir şekilde gerçeklelmiştir.", "S");
                        $scope.SurecAkisTamamlaGeri();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Süreç akış tamamlama kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeSurecAkisRed = function () {
                $scope.InfoYeniTalepSurecAkis.TALEP_PROJE_SUREC_LOG_NEDEN_DOGRULANMADI = null;
                $scope.$modalInstanceTalepSurecAkisRed = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_surec_akis_reddet.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.SurecAkisRedGeri = function () {
                $scope.formCalistirildiSurecRed = false;
                $scope.$modalInstanceTalepSurecAkisRed.dismiss('cancel');
            };

            //Sonucların grup gösterimi
            $scope.AramaKriterTalepDogrulama = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                TALEP_PROJE_SUREC_LOG_ID: ''
            };

            $scope.surecDogrulamaKriterGrup = function () {
                $scope.TalepProjeDogrulamaKriteriGetData($scope.AramaKriterTalepDogrulama);
                $scope.$modalInstanceDogrulamaKriterGrup = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_surec_akis_tamamla_grup.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.surecDogrulamaKriterGrupGeri = function () {
                $scope.$modalInstanceDogrulamaKriterGrup.dismiss('cancel');
            };


            $scope.TalepProjeDogrulamaKriteriGetData = function (AramaKriterGetData) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeDogrulamaKriteri.TalepProjeDogrulamaKriteriGetData(AramaKriterGetData);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriter listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriter listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        if (AramaKriterGetData.GRUP_NO > 0) {
                            $scope.TalepProjeDogrulamaKriteriListesi = gelen.data;
                        } else {
                            $scope.TalepProjeDogrulamaKriteriGrupListesi = gelen.data;
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriter listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriterTalepDogrulamaSonuc = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                TALEP_PROJE_SUREC_LOG_ID: '',
                GRUP_NO: '',
            };

            $scope.surecDogrulamaKriterSonucGoster = function () {

                $scope.TalepProjeDogrulamaKriteriGetData($scope.AramaKriterTalepDogrulamaSonuc);
                $scope.$modalInstanceDogrulamaKriterSonuc = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_surec_akis_tamamla_sonuc.html',
                    size: 'lg',
                    scope: $scope
                });
            };



            $scope.surecDogrulamaKriterSonucGeri = function () {
                $scope.$modalInstanceDogrulamaKriterSonuc.dismiss('cancel');
            };

            //$scope.TalepProjeDogrulamaKriteriSelect = function (talepDogrulamaKriteriGrupNo) {
            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = srvTalepProjeDogrulamaKriteri.TalepProjeDogrulamaKriteriSelect(talepDogrulamaKriteriGrupNo);

            //    promiseGet.then(function (gelen) {
            //        $scope.TalepProjeDogrulamaKriteriListesi = gelen.data;
            //        $rootScope.sayfayukleniyor = false;
            //    },
            //        function (hata) {
            //            $rootScope.sayfayukleniyor = false;
            //            mesajGoster('Dikkat', "TalepProjeDogrulamaKriteri bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            //            console.log('TalepProjeDogrulamaKriteriSelect Hata:', hata);
            //        });
            //};

            //Surec Akıs Son

            //Genel Log

            $scope.AramaKriterGenelLog = {
                TALEP_PROJE_ID: $scope.talepProjeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.TalepProjeGenelLogGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProjeGenelLog.TalepProjeGenelLogGetData($scope.AramaKriterGenelLog);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep işlemleri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep işlemleri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiTalepGenelLog = gelen.data.ToplamKayitSayisi;
                        $scope.TalepProjeGenelLogListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep işlemleri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //Toplantı link
            $scope.ToplantiAc = function () {
                if ($scope.InfoTalep.TOPLANTI_ID === undefined || $scope.InfoTalep.TOPLANTI_ID === 0) { return; }
                var url = $state.href('toplanti.toplantikayit', { toplantiID: $scope.InfoTalep.TOPLANTI_ID });
                window.open(url, '_blank');
            };
        }]);

