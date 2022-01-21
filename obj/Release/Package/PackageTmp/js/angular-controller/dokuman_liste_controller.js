angular.module('inspinia').controller(
    'dokuman_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokuman', 'srvDokumanKlasor', 'srvDokumanTipi', 'srvKullaniciProje', 'srvKullanici', 'srvDokumanGozdenGecirmeKriteri', 'srvDokumanYayin', 'srvDokumanProjePaketiGrup', 'srvProjeModul', 'srvProjeIterasyon', 'srvGenel', 'srvDokumanTalep', 'Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokuman, srvDokumanKlasor, srvDokumanTipi, srvKullaniciProje, srvKullanici, srvDokumanGozdenGecirmeKriteri, srvDokumanYayin, srvDokumanProjePaketiGrup, srvProjeModul, srvProjeIterasyon, srvGenel, srvDokumanTalep, Constants, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanCinsi = Constants.DOKUMAN_CINSI;
            $scope.dokumanOnIzleme = Constants.DOKUMAN_ON_IZLEME;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                LISTE: false,
                YAYIN: true,
                SABLON_YAYIN: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.InfoDokumanYukle = {
                DOKUMAN_ID: null,
                ADI: '',
                DOKUMAN_DOSYA: '',
                DOKUMAN_DOSYA_TIPI: '',
                DOKUMAN_DOSYA_BOYUTU: ''
            };
           // $scope.InfoDokumanOnIzleme = { DOKUMAN_ON_IZLEME: '' };

            $scope.init = function () {
                $scope.DOKUMAN_CINSI_ID = null;
                $scope.treeData = [];
                // $scope.tree = $.jstree.reference('#tree');
                $scope.InfoDokuman = {};
                $scope.DokumanKlasorYetkiGetData();
                $scope.handleFileSelect = function (evt) {
                    var file = evt[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.InfoDokumanYukle.ADI = file.name;
                            $scope.InfoDokumanYukle.DOKUMAN_DOSYA = evt.target.result;
                            $scope.InfoDokumanYukle.DOKUMAN_DOSYA_TIPI = file.type;
                            $scope.InfoDokumanYukle.DOKUMAN_DOSYA_BOYUTU = file.size;
                        });
                    };
                    reader.readAsDataURL(file);
                };
            };


            $scope.DokumanSablonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanSablonListesi = gelen.data.Veri;
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
                        console.error('Doküman listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.DokumanKlasorYetkiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanKlasorYetkiGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length === 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman klasör listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.treeData = gelen.data.Veri;
                        $("#tree").jstree("destroy");
                        $("#tree").jstree({
                            "core": {
                                'data': $scope.treeData,
                                "check_callback": true
                            },
                            "plugins": ["types", "dnd"],
                            "types": {
                                "klasor": {
                                    'icon': "fa fa-folder"
                                },
                                "emfadokuman": {
                                    "icon": 'img/login/pict-logo16x16.png'
                                },
                                "png": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "jpeg": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "jpg": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "tiff": {
                                    "icon": "fa fa-file-picture-o"
                                },
                                "pdf": {
                                    "icon": "fa fa-file-pdf-o"
                                },
                                "xlsx": {
                                    "icon": "fa fa-file-excel-o"
                                },
                                "xls": {
                                    "icon": "fa fa-file-excel-o"
                                },
                                "doc": {
                                    "icon": "fa fa-file-word-o"
                                },
                                "docx": {
                                    "icon": "fa fa-file-word-o"
                                },
                                "ppt": {
                                    "icon": "fa fa-file-powerpoint-o"
                                },
                                "pptx": {
                                    "icon": "fa fa-file-powerpoint-o"
                                },
                                "zip": {
                                    "icon": "fa fa-file-archive-o"
                                },
                                "default": {
                                    "icon": "fa fa-file-text-o"
                                },
                            }
                        });
                        $("#tree").on("select_node.jstree",
                            function (evt, data) {
                                $scope.DOKUMAN_CINSI_ID = data.node.original.type_id;
                                $scope.DOKUMAN_CINSI_GOSTER = data.node.original.type_goster;
                                
                                
                                if (data.node.original.dokuman_klasor_id !== null) {
                                    $scope.DOKUMAN_KLASOR_ID = data.node.original.dokuman_klasor_id;
                                }
                                if (data.node.original.dokuman_id !== null) {

                                    $scope.DOKUMAN_ID = data.node.original.dokuman_id;


                                }
                                    else {
                                    $scope.InfoDokumanOnIzleme = null;
                                    document.getElementById('onizleme').innerHTML = null;
                                    $scope.DOKUMAN_ID = null;
                                }
                                $scope.DokumanOnIzleme(data.node.original.dokuman_id);


                            }
                        );
                        $("#tree").on("move_node.jstree", function (e, data) {
                            var InfoKlasorGuncelleme = { DOKUMAN_KLASOR_ID: data.node.id, UST_DOKUMAN_KLASOR_ID: data.node.parent, ADI: data.node.text };
                            $scope.DokumanKlasorEkleGuncelle(InfoKlasorGuncelleme, null);
                        });

                       
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
                        console.error('Doküman klasor yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };




            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanSil = function (dokumanKlasorId) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanSil(dokumanKlasorId);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                        
                    } else {
                        mesajGoster('İşlem tamam.', "Doküman silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.DokumanKlasorYetkiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman silme işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function () {
                $scope.secilenKayit = $scope.DOKUMAN_KLASOR_ID;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.DokumanSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            
            $scope.KlasorEkle = function () {
                $scope.DokumanKlasorGetData();
                $scope.$modalInstanceKlasorEkle = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_klasor_ekle.html',
                    scope: $scope

                });
            };


            $scope.KlasorEkleKapat = function () {
                $scope.$modalInstanceKlasorEkle.dismiss('cancel');
            };

            $scope.DokumanKlasorEkleGuncelle = function (InfoKlasor, frmKlasor) {
                if (frmKlasor !== null) {
                    $rootScope.sayfayukleniyor = true;
                    $scope.formCalistirildiKlasor = true;
                    if (frmKlasor.$valid) { } else {
                        $rootScope.focusToInvalid(frmKlasor);
                        $rootScope.sayfayukleniyor = false;
                        return;
                    }
                }

                var promiseGet = srvDokuman.DokumanKlasorEkleGuncelle(InfoKlasor);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Dokuman klasör kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                        $scope.DokumanKlasorYetkiGetData();
                    }
                    else {
                        if (frmKlasor !== null) {
                            mesajGoster("İşlem tamam.", "Dokuman klasör kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                            $scope.formCalistirildiKlasor = false;
                            $scope.KlasorEkleKapat();
                        }

                        $scope.DokumanKlasorYetkiGetData();

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman klasör kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };




            $scope.DokumanEkle = function () {
                $scope.DokumanKlasorGetData();
                //$scope.DokumanBaslikYaziTipiGetData();

                $scope.$modalInstanceDokumanEkle = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_olustur.html',
                    scope: $scope

                });
            };


            $scope.DokumanEkleKapat = function () {
                $scope.$modalInstanceDokumanEkle.dismiss('cancel');
            };

            

            $scope.tipDegistir = function (tip) {
                $scope.InfoDokuman.ADI = null;
                $scope.InfoDokuman.PROJE_ID = null;
                $scope.InfoDokuman.DOKUMAN_TIPI_ID = null;
                $scope.InfoDokuman.DOKUMAN_PROJE_PAKETI_GRUP_ID = null;
                $scope.dokumanTipiDegistir();
                if (tip === true) {
                    $scope.KullaniciProjeGetData();
                    $scope.DokumanProjePaketiGrupGetData();
                } else {
                    $scope.DokumanTipiGetData();
                }
            };

            $scope.dokumanTuruDegistir = function (turu) {
                //$scope.InfoDokuman.DOKUMAN_TURU = null;
                $scope.InfoDokuman.UST_DOKUMAN_ID = null;
                if (turu === 2) {
                    //Şablon get datası çekilecek.
                    $scope.DokumanSablonGetData();
                }
            };

            $scope.dokumanTipiDegistir = function () {
                $scope.InfoDokuman.DOKUMAN_TURU_ID = null;
                $scope.InfoDokuman.UST_DOKUMAN_ID = null;
            };

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

            $scope.DokumanEkleGuncelle = function (InfoDokuman, frmDokuman) {
                $scope.formCalistirildiDokuman = true;
                if (frmDokuman.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvDokuman.DokumanEkleGuncelle(InfoDokuman);
                promiseGet.then(function (gelen) {

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.DokumanKlasorYetkiGetData();
                        $scope.DokumanEkleKapat();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

           

            $scope.AramaKriterOnIzleme = {
                DOKUMAN_ID: ''
            };

            $scope.DokumanOnIzleme = function (dokumanid) {
                $scope.AramaKriterOnIzleme.DOKUMAN_ID = dokumanid;
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanOnIzleme($scope.AramaKriterOnIzleme);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false && dokumanid !== null) {
                        mesajGoster('Dikkat', 'Doküman ön izleme bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman ön izleme bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDokumanOnIzleme = gelen.data;
                        if ($scope.DOKUMAN_CINSI_GOSTER == true && $scope.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.klasor) {
                            $scope.InfoDokumanOnIzleme.DOKUMAN_ON_IZLEME = null;
                        }
                        
                        else if ($scope.DOKUMAN_CINSI_GOSTER == true && $scope.DOKUMAN_CINSI_ID == $scope.dokumanCinsi.emfadokuman) {
                            
                            $scope.DOKUMAN_ON_IZLEME = gelen.data.DOKUMAN_ON_IZLEME;
                        }
                        else if ($scope.DOKUMAN_CINSI_GOSTER == true && $scope.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.emfadokuman && $scope.DOKUMAN_CINSI_ID != $scope.dokumanCinsi.klasor) {
                            document.getElementById('pdf').src = gelen.data.DOKUMAN_ON_IZLEME;
                        }
                        else {
                            document.getElementById('imgpdf').src = gelen.data.DOKUMAN_ON_IZLEME; //path yolu gelecek.
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman ön izleme bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //$scope.WordOlarakIndir = function () {
            //    var a = document.createElement("a");
            //    document.body.appendChild(a);
            //    a.style = "display:none";
            //    a.href = "api/Dokuman/DokumanIndir?t=" + $rootScope.$storage.TOKEN.toString().split('=').join('_') + "&id=" + $scope.DOKUMAN_ID;             
            //    a.click();
            //    window.URL.revokeObjectURL(urll);

            //}
            //$scope.WordOlarakIndir2 = function () {
            //    var doc = {
            //        ID : $scope.DOKUMAN_ID,
            //        TYPE : "docx",
            //    };

            //    var promise = srvDokuman.DokumanIndir(doc);

            //    promise.then(function (gelen) {

            //        $rootScope.sayfayukleniyor = false;
            //        if (gelen.data.basariDurumu === false) {
            //            mesajGoster('Dikkat', 'Doküman ön izleme bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
            //            console.error('Doküman ön izleme bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
            //            return;
            //        }
                  
            //       // var content = headers["content-type"] || "application/octet-stream";
            //        var url = window.URL || window.webKitURL || window.mozURL || window.msURL;
            //        var b = gelen.data.GeriDonusDeger;

            //        if (url) {
            //            var blob = new Blob([b]);
            //            var urll = url.createObjectURL(blob);
            //            var a = document.createElement("a");
            //            document.body.appendChild(a);
            //            a.style = "display:none";
            //            a.href = urll;
            //            a.download = gelen.headers["DOSYA_ADI"];
            //            a.click();
            //            window.URL.revokeObjectURL(urll);
            //        }

            //    }, function (errorPI) {


            //    });
            //}

          

            //$scope.YayinAc = function () {
            //    $scope.InfoDokumanYayin = {};
            //    $scope.KullaniciListesiniGetir();
            //    $scope.DokumanGozdenGecirmeKriteriGetData();
            //    $scope.$modalInstanceDokumanYayinAc = $modal.open({
            //        templateUrl: 'views/common/modal_dokuman_yayin.html',
            //        scope: $scope
            //    });
            //};

            //$scope.YayinKapat = function () {
            //    $scope.$modalInstanceDokumanYayinAc.dismiss('cancel');
            //};


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

            $scope.DokumanTalepAc = function () {
                $scope.KullaniciProjeGetData();
                $scope.KullaniciGetData();
                $scope.SurecGetData();
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
            $scope.TalepProjeIlgiDokumanListesi = {};
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
                $scope.TalepProjeIlgiDokumanListesi = {};
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
                InfoDokumanDfi.DOKUMAN_ID = $scope.DOKUMAN_ID;
                InfoDokumanDfi.InfoYeniDokumanDfiListesi = $scope.InfoYeniDokumanDfiListesi;
                InfoDokumanDfi.TalepProjeIlgiDokumanListesi = $scope.TalepProjeIlgiDokumanListesi;
                var promiseGet = srvDokumanTalep.DokumanTalepEkleGuncelle(InfoDokumanDfi);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanTalepEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");

                        $scope.InfoDfiDokumanSifirlama();
                        $scope.DokumanDfiGeri();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanTalepEkleGuncelle Hata:', errorPl);
                    });
            }


            $scope.dokumanYukleSifirla = function () {
                $scope.InfoDokumanYukle.ADI = null;
                $scope.InfoDokumanYukle.DOKUMAN_DOSYA = null;
                $scope.InfoDokumanYukle.DOKUMAN_DOSYA_TIPI = null;
                $scope.InfoDokumanYukle.DOKUMAN_DOSYA_BOYUTU = null;
                $scope.InfoDokumanYukle.DOKUMAN_TIPI_ID = null;
                $scope.InfoDokumanYukle.DOSYA_KONUMU = null;
            }

            $scope.DokumanYukleEkleGuncelle = function (InfoDokumanYukle, frmDokumanYukle) {
                $scope.formCalistirildiDokumanYukle = true;
                $rootScope.sayfayukleniyor = true;
                if (frmDokumanYukle.$valid && InfoDokumanYukle.ADI.length > 0) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmDokumanYukle);
                    return;
                }
                InfoDokumanYukle.DOKUMAN_ID = $scope.DOKUMAN_ID;
                var promiseGet = srvDokuman.DokumanYukle(InfoDokumanYukle);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiDokumanYukle = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Doküman kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.DokumanKlasorYetkiGetData();
                        $scope.dokumanYukleSifirla();
                        $scope.DokumanYukleKapat();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.DokumanYukle = function (dokumanid) {
                $scope.dokumanYukleSifirla();
                if (dokumanid == null || dokumanid == undefined) {
                    $scope.DOKUMAN_ID = null;
                    $scope.DokumanKlasorGetData();
                    $scope.DokumanTipiGetData();
                }
                
                $scope.$modalInstanceDokumanYukle = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_yukle.html',
                    scope: $scope

                });
            };


            $scope.DokumanYukleKapat = function () {
                $scope.$modalInstanceDokumanYukle.dismiss('cancel');
            };


            

            $scope.DokumanIndirGetData = function (dokumanId) {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display:none";
                a.href = "api/Dokuman/DokumanIndir?t=" + $rootScope.$storage.TOKEN.toString().split('=').join('_') + "&DOKUMAN_ID=" + dokumanId;
                a.click();
                window.URL.revokeObjectURL(urll);
            }

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
        }]);

