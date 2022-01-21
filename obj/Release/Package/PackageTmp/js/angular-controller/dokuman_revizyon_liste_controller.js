angular.module('inspinia').controller(
    'dokuman_revizyon_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanBaslik', 'srvKullanici', 'srvDokumanGozdenGecirmeKriteri', 'srvDokumanKlasor', 'srvDokumanYayin', 'srvDokumanTipi', 'Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanBaslik, srvKullanici, srvDokumanGozdenGecirmeKriteri, srvDokumanKlasor, srvDokumanYayin, srvDokumanTipi, Constants, Ayarlarim) {
            $scope.dokumanID = $stateParams.dokumanID;
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanCinsi = Constants.DOKUMAN_CINSI;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.detay = false;
                $scope.DokumanRevizyonGetData();
            };

            $scope.AramaKriter = {
                DOKUMAN_ID: $scope.dokumanID
            };

            $scope.DokumanRevizyonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanBaslik.DokumanRevizyonGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman revizyon listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman revizyon listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiRevizyon = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanRevizyonListesi = gelen.data.Veri;

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman revizyon listesi yüklenirken bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.YayinAc = function (yayinRev) {
                $scope.yayinRev = yayinRev;
                $scope.InfoDokumanYayin = {};
                $scope.KullaniciListesiniGetir();
                $scope.DokumanGozdenGecirmeKriteriGetData();
                $scope.$modalInstanceDokumanYayinAc = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_yayin.html',
                    scope: $scope
                });
            };

            $scope.YayinKapat = function () {
                $scope.$modalInstanceDokumanYayinAc.dismiss('cancel');
            };

            $scope.AramaKriterListe = {
                LISTE: false
            };

            $scope.KullaniciListesiniGetir = function () {
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

            $scope.DokumanGozdenGecirmeKriteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriteri.DokumanGozdenGecirmeKriteriGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriteri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriteri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.DokumanGozdenGecirmeKriteriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriteri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.detayGoster = function (yayinRev) {
                $scope.detay = true;
                $scope.AramaKriterOnIzleme.DOKUMAN_ID = $scope.dokumanID;
                $scope.AramaKriterOnIzleme.YAYIN_REV = yayinRev;
                $scope.DokumanRevizyonOnIzlemeSelect();

                $scope.dokumanYayinRev = yayinRev;
            };

            $scope.AramaKriterOnIzleme = {
                DOKUMAN_ID: '',
                YAYIN_REV: ''
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

            $scope.DokumanRevizyonOnIzlemeSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanBaslik.DokumanRevizyonOnIzlemeSelect($scope.AramaKriterOnIzleme);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Verisyon bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Versiyon bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDokumanRevizyon = gelen.data;
                        if ($scope.InfoDokumanRevizyon.DOKUMAN_CINSI_GOSTER == true && $scope.InfoDokumanRevizyon.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.klasor) {
                            $scope.InfoDokumanRevizyon.DOKUMAN_ON_IZLEME = null;
                        }

                        else if ($scope.InfoDokumanRevizyon.DOKUMAN_CINSI_GOSTER == true && $scope.InfoDokumanRevizyon.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.emfadokuman) {

                            $scope.DOKUMAN_ON_IZLEME = gelen.data.DOKUMAN_ON_IZLEME;
                        }
                        else if ($scope.InfoDokumanRevizyon.DOKUMAN_CINSI_GOSTER == true && $scope.InfoDokumanRevizyon.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.emfadokuman && $scope.InfoDokumanRevizyon.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.klasor) {
                            document.getElementById('pdf').src = gelen.data.DOKUMAN_ON_IZLEME;
                        }
                        else {
                            document.getElementById('imgpdf').src = gelen.data.DOKUMAN_ON_IZLEME; //path yolu gelecek.
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

            $scope.DokumanYayinEkleGuncelle = function (InfoDokumanYayin, frmYayinla) {
                $scope.formCalistirildiDokumanYayin = true;
                if (frmYayinla.$valid) { } else {
                    $rootScope.focusToInvalid(frmYayinla);
                    return;
                }
                InfoDokumanYayin.DOKUMAN_YAYIN_DURUMU_ID = 1; // onay bekleniyor konumu
                InfoDokumanYayin.DOKUMAN_ID = $scope.dokumanID;
                InfoDokumanYayin.YAYIN_REV = $scope.yayinRev;
                var promiseGet = srvDokumanYayin.DokumanYayinEkleGuncelle(InfoDokumanYayin);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Doküman yayın kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman yayın kayıt işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman yayın kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.YayinKapat();
                        $scope.DokumanRevizyonGetData();
                        $scope.formCalistirildiDokumanYayin = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman yayın kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            


            $scope.DokumanFarkliKaydetAc = function (rev) {
                $scope.formCalistirildiDokumanFarkliKaydet = false;
                $scope.InfoDokumanFarkliKaydet = { FARKLI_KAYDET_REV: rev, DOKUMAN_ID: $scope.dokumanID };
                if ($scope.DokumanRevizyonListesi[0].DOKUMAN_CINSI_ID == $scope.dokumanCinsi.emfadokuman) {
                    $scope.InfoDokumanFarkliKaydet.DOKUMAN_TIP_KONTROL = true;
                }
                else {
                    $scope.InfoDokumanFarkliKaydet.DOKUMAN_TIP_KONTROL = false;
                }
                $scope.DokumanTipiGetData();
                $scope.DokumanKlasorGetData();
                $scope.$modalInstanceDokumanFarkliKaydetAc = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_farkli_kaydet.html',
                    scope: $scope
                });
            };

            $scope.DokumanFarkliKaydetKapat = function () {
                $scope.$modalInstanceDokumanFarkliKaydetAc.dismiss('cancel');
            };

            $scope.AramaKriterListe = {
                LISTE: false,
                KULLANICI_ID: $scope.$storage.KULLANICI_ID,
                DOKUMAN_GOSTER: true
            };

            $scope.DokumanKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Dokuman klasör listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.DokumanKlasorListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriterDokumanTipi = {
                LISTE: false
            };

            $scope.DokumanTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanTipi.DokumanTipiGetData($scope.AramaKriterDokumanTipi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman tipi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman tipi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {

                        $scope.DokumanTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DokumanFarkliKaydet = function (InfoDokumanFarkliKaydet, frmDokumanFarkli) {
                $scope.formCalistirildiDokumanFarkliKaydet = true;
                if (frmDokumanFarkli.$valid) { } else {
                    $rootScope.focusToInvalid(frmDokumanFarkli);
                    return;
                }
                var promiseGet = srvDokumanBaslik.RevFarkliKaydet(InfoDokumanFarkliKaydet);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Doküman farklı kaydet işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman farklı kayıt işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman farklı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.DokumanFarkliKaydetKapat();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman farklı kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };
            $scope.KAYNAK_REV;
            $scope.HEDEF_REV;
            $scope.onayRevler = [];
            $scope.revSec = function (rev, baslikId) {
              //  var check = '#chk_REV' + rev;
                if ($('#chk_REV' + rev).is(':checked')) {
                    $('#chk_REV' + rev).prop('checked', true);
                    $scope.onayRevler.push({ rev, baslikId });
                } else {
                    $('#chk_REV' + rev).prop('checked', false);
                    angular.forEach($scope.onayRevler, function (value, key) {
                        if (value.rev == rev) {
                            $scope.onayRevler.splice(key, 1);
                        }
                    });
                }

                if ($scope.onayRevler.length > 2) {
                    $('#chk_REV' + rev).prop('checked', false);
                    angular.forEach($scope.onayRevler, function (value, key) {
                        if (value.rev == rev) {
                            $scope.onayRevler.splice(key, 1);
                        }
                    });
                }

                $scope.KAYNAK_REV = Math.min.apply(Math, $scope.onayRevler.map(function (item) { return item.rev; }));
                if ($scope.KAYNAK_REV < Math.max.apply(Math, $scope.onayRevler.map(function (item) { return item.rev; }))) {
                    $scope.HEDEF_REV = Math.max.apply(Math, $scope.onayRevler.map(function (item) { return item.rev; }));
                } else {
                    $scope.HEDEF_REV = "";
                }
                
                
            };

            $scope.revKarsilastir = function () {
                
                if ($scope.HEDEF == "" || $scope.KAYNAK == "") {
                    mesajGoster('Dikkat', 'Karşılaştırma işlemi için iki tane revizyon kaydı seçmeniz gerekmektedir.', 'W');
                }
                if ($scope.HEDEF == "" || $scope.KAYNAK == "") {
                    mesajGoster('Dikkat', 'Sisteme yüklenen dokümanlar için karşılaştırma işlemi yapılamamaktadır.', 'W');
                }
                if ($scope.DokumanRevizyonListesi[0].DOKUMAN_CINSI_ID != $scope.dokumanCinsi.emfadokuman) {
                    mesajGoster('Dikkat', 'Sistemem yüklemiş olduğunuz dokümanların karşılaştırmasını yapılmamaktadır.', 'W');
                } else {
                    $state.go('dokuman.revizyonkarsilastirma', { dokumanID: $scope.dokumanID, kaynakRev: $scope.KAYNAK_REV, hedefRev: $scope.HEDEF_REV });
                }
               
            }

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };












        }]);

