angular.module('inspinia').controller(
    'dokuman_yayin_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanYayin', 'srvDokumanGozdenGecirmeKriterAdim', 'srvDokumanProjePaketiGrup', 'srvDokumanProjePaketiKlasor', 'srvDokumanGozdenGecirme', 'srvKullaniciProje', 'srvProjeModul', 'srvProjeIterasyon', 'srvKullanici', 'srvGenel', 'srvDokumanTalep', 'Constants','Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanYayin, srvDokumanGozdenGecirmeKriterAdim, srvDokumanProjePaketiGrup, srvDokumanProjePaketiKlasor, srvDokumanGozdenGecirme, srvKullaniciProje, srvProjeModul, srvProjeIterasyon, srvKullanici, srvGenel, srvDokumanTalep, Constants, Ayarlarim) {
            $scope.dokumanID = $stateParams.dokumanID;
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanCinsi = Constants.DOKUMAN_CINSI;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                DOKUMAN_ID: $scope.dokumanID,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.detay = false;
                $scope.DokumanYayinGetData();
            };

            $scope.DokumanYayinGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYayin.DokumanYayinGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman yayın listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman yayın listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanYayinListesi = gelen.data.Veri;
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
                        console.error('Doküman yayın listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanYayinSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYayin.DokumanYayinSil(info.DOKUMAN_YAYIN_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman yayın silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman yayın silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    } else {
                        mesajGoster('İşlem tamam.', "Doküman yayın silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.DokumanYayinGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman yayın silme işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.DokumanYayinSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            

            $scope.detayGoster = function (yayinId, yayinRev) {
                $scope.detay = !$scope.detay;
                if ($scope.detay == true) {
                    $scope.AramaKriterOnIzleme.DOKUMAN_ID = $scope.dokumanID;
                    $scope.AramaKriterOnIzleme.YAYIN_REV = yayinRev;
                    $scope.AramaKriterOnIzleme.DOKUMAN_YAYIN_ID = yayinId;
                    $scope.DokumanYayinOnIzlemeSelect();
                }
                $scope.dokumanYayinId = yayinId;
                $scope.dokumanYayinRev = yayinRev;
            };

            $scope.AramaKriterOnIzleme = {
                DOKUMAN_ID: '',
                YAYIN_REV: '',
                DOKUMAN_YAYIN_ID: ''
            };

            $scope.tinymceOptions = {

                language: 'tr_TR',
                theme: 'modern',
                plugins: 'print fullpage noneditable',

                noneditable_leave_contenteditable: true,
                menubar: "file",
                toolbar: false,

                removed_menuitems: 'newdocument',
                content_css: [
                    '../css/tinymce/fontgoogleapisLato300300i400400i.css',
                    '../css/tinymce/codeopen.css'
                ],
                height: '842',

                setup: function (editor) {

                    editor.on("init", function () {
                        $('.mce-edit-area').css({ "width": "21cm", "margin": "auto", "background-color": "gray" });
                    });
                    editor.on("focus", function () {
                        tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                    });
                }
            };

            $scope.DokumanYayinOnIzlemeSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYayin.DokumanYayinOnIzlemeSelect($scope.AramaKriterOnIzleme);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Verisyon bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Versiyon bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDokumanOnay = gelen.data;
                        if ($scope.InfoDokumanOnay.DOKUMAN_CINSI_GOSTER == true && $scope.InfoDokumanOnay.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.klasor) {
                            $scope.InfoDokumanOnay.DOKUMAN_YAYIN_ON_IZLEME = null;
                        }

                        else if ($scope.InfoDokumanOnay.DOKUMAN_CINSI_GOSTER == true && $scope.InfoDokumanOnay.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.emfadokuman) {

                            $scope.DOKUMAN_YAYIN_ON_IZLEME = gelen.data.DOKUMAN_YAYIN_ON_IZLEME;
                        }
                        else if ($scope.InfoDokumanOnay.DOKUMAN_CINSI_GOSTER == true && $scope.InfoDokumanOnay.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.emfadokuman && $scope.InfoDokumanOnay.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.klasor) {
                            document.getElementById('pdf').src = gelen.data.DOKUMAN_YAYIN_ON_IZLEME;
                        }
                        else {
                            document.getElementById('imgpdf').src = gelen.data.DOKUMAN_YAYIN_ON_IZLEME; //path yolu gelecek.
                        }
                        //document.getElementById('onizlemeyayin').innerHTML = gelen.data.DOKUMAN_YAYIN_ON_IZLEME;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Versiyon bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriterGozdenGecirme = {
                DOKUMAN_GOZDEN_GECIRME_KRITERI_ID: '',
                AKTIF: true
            };

            $scope.DokumanGozdenGecirmeKriterAdimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimGetData($scope.AramaKriterGozdenGecirme);
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriteri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriteri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiDokumanGozdenGecirmeAdimAktif = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanGozdenGecirmeKriterAdimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriteri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DokumanGozdenGecir = function () {
                $scope.AramaKriterGozdenGecirme.DOKUMAN_GOZDEN_GECIRME_KRITERI_ID = $scope.InfoDokumanOnay.DOKUMAN_GOZDEN_GECIRME_KRITERI_ID;
                $scope.DokumanGozdenGecirmeKriterAdimGetData();
                $scope.$modalInstanceGozdenGecir = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_versiyon_gozden_gecir.html',
                    scope: $scope

                });
            };


            $scope.DokumanGozdenGecirKapat = function () {
                $scope.$modalInstanceGozdenGecir.dismiss('cancel');
            };

            $scope.DokumanOnay = function (InfoDokumanOnay, frmDokuman) {
                if (frmDokuman !== null) {
                    $scope.formCalistirildiDokumanOnay = true;
                    if (frmDokuman.$valid) { } else {
                        $rootScope.focusToInvalid(frmDokuman);
                        return;
                    }
                }

                var promiseGet = srvDokumanYayin.DokumanOnay(InfoDokumanOnay);
                promiseGet.then(function (gelen) {


                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman onay işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman onay işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman onay işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.formCalistirildiDokumanOnay = false;
                        if (frmDokuman.$name === 'frmDokumanGozdenGecir'  ) {
                            $scope.DokumanGozdenGecirKapat();
                        }
                        if (frmDokuman.$name === 'frmOnay') {
                            $scope.DokumanOnayKapat();
                        }
                        if (frmDokuman.$name === 'frmDokumanRed') {
                            $scope.DokumanRedGeri();
                        }
                        $scope.DokumanYayinOnIzlemeSelect();
                        $scope.DokumanYayinGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman onay işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.DokumanReddet = function () {
                $scope.$modalInstanceDokumanReddet= $modal.open({
                    templateUrl: 'views/common/modal_dokuman_versiyon_reddet.html',
                    scope: $scope,

                });
            };


            $scope.DokumanRedGeri = function () {
                $scope.$modalInstanceDokumanReddet.dismiss('cancel');
            };

            $scope.DokumanOnayla = function () {
                $scope.$modalInstanceDokumanOnay = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_versiyon_onayla.html',
                    scope: $scope,

                });
            };


            $scope.DokumanOnayKapat = function () {
                $scope.$modalInstanceDokumanOnay.dismiss('cancel');
            };

            $scope.projePaketiOnayi = function () {
                if ($scope.InfoDokumanOnay.PROJE_PAKETI_EKLENTISI === true) {
                    $scope.DokumanProjePaketiGrupGetData();
                }
            }

            $scope.AramaKriterProjePaketiGrup = {
                LISTE: false
            };

            $scope.DokumanProjePaketiGrupGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanProjePaketiGrup.DokumanProjePaketiGrupGetData($scope.AramaKriterProjePaketiGrup);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanProjePaketiGrupListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiGrup listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanProjePaketiGrupGetData Hata:', hata);
                    });
            };



            $scope.AramaKriterProjeKlasorDosya = {
                LISTE: false,
                DOKUMAN_KLASOR_TIPI: true,
                DOKUMAN_PROJE_PAKETI_GRUP_ID: '',
                AKTIF: true
            }

            $scope.DokumanProjePaketiKlasorDosyaGetData = function () {
                $scope.AramaKriterProjeKlasorDosya.DOKUMAN_PROJE_PAKETI_GRUP_ID = $scope.InfoDokumanOnay.DOKUMAN_PROJE_PAKETI_GRUP_ID;
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorGetData($scope.AramaKriterProjeKlasorDosya);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanProjePaketiKlasorDosyaListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanProjePaketiKlasorGetData Hata:', hata);
                    });
            };


            $scope.gozdenGecirmeSonucGoster = function (dokumanId, grup) {
                $scope.AramaKriterDokumanGozdenGecirmeSonuc.DOKUMAN_ID = dokumanId;
                $scope.AramaKriterDokumanGozdenGecirmeSonuc.GRUP = grup;
                $scope.DokumanGozdenGecirmeGetData();
                $scope.$modalInstanceDokumanGozdenGecirmeSonuc = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_versiyon_sonuc.html',
                    scope: $scope,

                });
            };


            $scope.gozdenGecirmeSonucGeri = function () {
                $scope.versiyonGG = false;
                $scope.$modalInstanceDokumanGozdenGecirmeSonuc.dismiss('cancel');
            };



            $scope.AramaKriterDokumanGozdenGecirmeSonuc = {
                LISTE: false,
                DOKUMAN_ID: '',
                GRUP: ''
            }

            $scope.DokumanGozdenGecirmeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirme.DokumanGozdenGecirmeGetData($scope.AramaKriterDokumanGozdenGecirmeSonuc);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman gözden geçirme listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman gözden geçirme listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                       // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanGozdenGecirmeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman gözden geçirme sonuç listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //Talep kayıt işlemleri

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

            $scope.DokumanTalepAc = function (gozdenGecirmeAdimlari) {
                $scope.KullaniciProjeGetData();
                $scope.KullaniciGetData();
                $scope.SurecGetData();
                $scope.YeniGozdenGecirmeKriteriAdimListesi = gozdenGecirmeAdimlari;
                $scope.TalepDfiAciklama(gozdenGecirmeAdimlari);
                $scope.$modalInstanceDokumanDfi = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_talep_dfi_ekle .html',
                    size: 'lg',
                    scope: $scope
                });

            };

            $scope.DokumanDfiGeri = function () {
                $scope.$modalInstanceDokumanDfi.dismiss('cancel');

            };

            $scope.ProjeSec = function () {
                if ($scope.$storage.IS_KURUM_MUSTERI_KULLANICI !== true) {
                    $scope.ProjeModulGetData();
                    $scope.ProjeIterasyonGetData();
                }
            };

            $scope.InfoDokumanDfi = {
                TALEP_TIPI_ADI: 'DFI',
                PROJE_ID: null,
                PROJE_ADI: null,
                PROJE_ITERASYON_ID: null,
                PROJE_MODUL_ID: null,
                KULLANICI_ID: null,
                TALEP_PROJE_KONU: null,
                TALEP_PLANLANAN_BASLANGIC_TARIHI: null,
                TALEP_PLANLANAN_BITIS_TARIHI: null,
                TALEP_PROJE_ACIKLAMA: null,
                SUREC_ID: null,
                TALEP_PROJE_TALEP_TIPI_DFI_UYGUNSUZLUK_NEDEN_ACIKLAMA: null,
                TALEP_PROJE_TALEP_TIPI_DFI_TEKRAR_ENGELLEME_FAALIYET_ACIKLAMA: null,
                KOK_NEDEN: null
            };
            $scope.InfoYeniDokumanDfiListesi = [];
            $scope.YeniGozdenGecirmeKriteriAdimListesi = [];
            $scope.InfoTalepIlgili = {};
            $scope.InfoDfiDokumanSifirlama = function () {
                $scope.InfoDokumanDfi = {
                    TALEP_TIPI_ADI: 'DFI',
                    PROJE_ID: null,
                    PROJE_ADI: null,
                    PROJE_ITERASYON_ID: null,
                    PROJE_MODUL_ID: null,
                    KULLANICI_ID: null,
                    TALEP_PROJE_KONU: null,
                    TALEP_PLANLANAN_BASLANGIC_TARIHI: null,
                    TALEP_PLANLANAN_BITIS_TARIHI: null,
                    TALEP_PROJE_ACIKLAMA: null,
                    SUREC_ID: null,
                    TALEP_PROJE_TALEP_TIPI_DFI_UYGUNSUZLUK_NEDEN_ACIKLAMA: null,
                    TALEP_PROJE_TALEP_TIPI_DFI_TEKRAR_ENGELLEME_FAALIYET_ACIKLAMA: null,
                    KOK_NEDEN: null
                };
                $scope.formCalistirildiDokumanDfi = false;
                $scope.InfoYeniDokumanDfiListesi = [];
                $scope.YeniGozdenGecirmeKriteriAdimListesi = [];
            };

            $scope.TalepDfiAciklama = function (gozdenGecirmeAdimlari) {

                $scope.InfoDokumanDfi.TALEP_PROJE_ACIKLAMA = "<table class='table table-striped table-hover'> <thead><tr><td><b>No</b></td><td><b>Sonuç</b></td><td><b>Kriter</b></td><td><b>Nedeni</b></td></tr></thead><tbody>";
                angular.forEach(gozdenGecirmeAdimlari, function (value, key) {
                    if (value.DURUM_ACIKLAMA === undefined) {
                        value.DURUM_ACIKLAMA = "";
                    }
                    $scope.InfoDokumanDfi.TALEP_PROJE_ACIKLAMA += "<tr><td>" + key + 1 + "</td><td>" + $scope.DurumKontrol(value.DURUMU) + "</td><td>" + value.KRITER + "</td><td>" + value.DURUM_ACIKLAMA  + "</td></tr>";
                });
                $scope.InfoDokumanDfi.TALEP_PROJE_ACIKLAMA += "</tbody></table>";
            };

            $scope.DurumKontrol = function (durum) {
                switch (durum) {
                    case true: return "Kabul Edildi";
                    case false: return "Reddedildi";
                    default: return "Hiçbiri";
                }
            };

            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriterTalep);
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

            $scope.ProjeModulGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var AramaKriterProjeModul = {
                    PROJE_ID: $scope.InfoDokumanDfi.PROJE_ID
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

            $scope.ProjeIterasyonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var AramaKriterIterasyon = {
                    PROJE_ID: $scope.InfoDokumanDfi.PROJE_ID,
                    LISTE: false
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

            $scope.SurecGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getSurec();
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Sürüm listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Sürüm listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.SurecListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sürüm listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriterTalep = {
                LISTE: false,
                PROJE_ID: '',
                KULLANICI_ID: $scope.$storage.KULLANICI_ID
            };

            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterTalep);
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

            $scope.TalepIlgiliDokumanEkle = function () {
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

            $scope.TalepProjeIlgiDokumanListesi = [];

            $scope.TalepIlgiliEkleOnKontrol = function (InfoTalepDokumanIlgili, frmTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepProjeIlgili = true;
                if (frmTalepIlgili.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTalepIlgili);
                    return;
                }

                var kontrol = true;
                angular.forEach($scope.TalepProjeIlgiDokumanListesi, function (value, key) {
                    if (value.TALEP_PROJE_ILGI_KULLANICI_ID === InfoTalepDokumanIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID) {
                        kontrol = false;
                    }
                });
                $rootScope.sayfayukleniyor = false;
                if (kontrol) {
                    var InfoYeniTalepIlgiliDokuman = {
                        TALEP_PROJE_ILGI_KULLANICI_ID: InfoTalepDokumanIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID,
                        AvatarBase64: InfoTalepDokumanIlgili.TALEP_PROJE_ILGI_KULLANICI.AvatarBase64,
                        CINSIYET: InfoTalepDokumanIlgili.TALEP_PROJE_ILGI_KULLANICI.CINSIYET,
                        TALEP_PROJE_ILGI_KULLANICI_AD_SOYAD: InfoTalepDokumanIlgili.TALEP_PROJE_ILGI_KULLANICI.AD_SOYAD
                    };
                    $scope.TalepProjeIlgiDokumanListesi.push(InfoYeniTalepIlgiliDokuman);
                }

                $scope.GeriTalepIlgili();

            };

            $scope.TalepProjeIlgiSilDokuman = function (infoTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                angular.forEach($scope.TalepProjeIlgiDokumanListesi, function (valueilgili, keyilgili) {
                    if (valueilgili.TALEP_PROJE_ILGI_KULLANICI_ID === infoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI_ID) {
                        $rootScope.sayfayukleniyor = false;
                        $scope.TalepProjeIlgiDokumanListesi.splice(keyilgili, 1);
                    }
                });

            };

            $scope.modalSilmeOnayiTalepIlgiliDokuman = function (infoTalepIlgili) {
                $scope.secilenKayit = infoTalepIlgili;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeIlgiSilDokuman($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.DokumanTalepEkleGuncelle = function (InfoDokumanDfi, frmDokumanDfi) {
                $scope.formCalistirildiDokumanDfi = true;
                if (frmDokumanDfi.$valid) { } else {
                    $rootScope.focusToInvalid(frmDokumanDfi);
                    return;
                }
                InfoDokumanDfi.DOKUMAN_ID = $scope.dokumanID;
                InfoDokumanDfi.DOKUMAN_YAYIN_ID = $scope.dokumanYayinId;
                InfoDokumanDfi.InfoYeniDokumanDfiListesi = $scope.InfoYeniDokumanDfiListesi;
                InfoDokumanDfi.YeniGozdenGecirmeKriteriAdimListesi = $scope.YeniGozdenGecirmeKriteriAdimListesi;
                InfoDokumanDfi.TalepProjeIlgiDokumanListesi = $scope.TalepProjeIlgiDokumanListesi;
                var promiseGet = srvDokumanTalep.DokumanTalepEkleGuncelle(InfoDokumanDfi);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanTalepEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.DokumanYayinGetData();
                        $scope.InfoDfiDokumanSifirlama();
                        $scope.DokumanDfiGeri();
                        $scope.DokumanGozdenGecirKapat();
                        $scope.DokumanYayinOnIzlemeSelect();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanTalepEkleGuncelle Hata:', errorPl);
                    });
            }

            //$scope.AramaKriterDokumanIndir = {
            //    DOKUMAN_ID:'',
            //    DOKUMAN_YAYIN_ID: '',
            //    YAYIN_REV: ''
            //};

            //$scope.DokumanIndirGetData = function () {
            //    $scope.AramaKriterDokumanIndir.DOKUMAN_YAYIN_ID = $scope.dokumanYayinId;
            //    $scope.AramaKriterDokumanIndir.YAYIN_REV = $scope.dokumanYayinRev;
            //        $scope.AramaKriterDokumanIndir.DOKUMAN_ID = $scope.dokumanID;

            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = srvDokumanYayin.DokumanIndir($scope.AramaKriterDokumanIndir);
            //    promiseGet.then(function (gelen) {
            //        $rootScope.sayfayukleniyor = false;
            //        if (gelen.data.basariDurumu == false) {
            //            mesajGoster('Dikkat', "Doküman indirme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
            //            console.error('Doküman indirme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
            //        } else {

            //            var anchor = angular.element('<a/>');
            //            anchor.attr({
            //                href: gelen.data.DOKUMAN_INDIR_PATH,
            //                target: '_blank',
            //                download: gelen.data.ADI
            //            })[0].click();
            //            mesajGoster("İşlem tamam.", "Doküman indirme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
            //        }
            //    },
            //        function (hata) {
            //            $rootScope.sayfayukleniyor = false;
            //            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
            //            console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata:', hata);
            //        });
            //};
            $scope.DokumanIndirGetData = function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display:none";
                a.href = "api/DokumanYayin/DokumanIndir?t=" + $rootScope.$storage.TOKEN.toString().split('=').join('_') + "&DOKUMAN_ID=" + $scope.dokumanID + "&DOKUMAN_YAYIN_ID=" + $scope.dokumanYayinId + "&YAYIN_REV=" + $scope.dokumanYayinRev;
                a.click();
                window.URL.revokeObjectURL(urll);
            }
        }]);

