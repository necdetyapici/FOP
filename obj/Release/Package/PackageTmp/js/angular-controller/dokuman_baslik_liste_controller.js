angular.module('inspinia').controller(
    'dokuman_baslik_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanBaslik', 'srvDokumanKlasor', 'srvDokumanTipi', 'SweetAlert', 'srvKullanici', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanBaslik, srvDokumanKlasor, srvDokumanTipi, $SweetAlert, srvKullanici, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanId = $stateParams.dokumanID;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });



            $scope.init = function () {
                //$scope.DokumanGetData();
                $scope.InfoBaslik = {};
                $scope.DokumanBaslikSelect();
                $scope.KullaniciListesiniGetir();
            };
            $scope.DokumanKullaniciAciklama = "";
            $scope.dokumanKontrol = false;

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanBaslikSelect = function () {
                var Kriter = { DOKUMAN_ID: $scope.dokumanId };
                var promiseGet = srvDokumanBaslik.DokumanBaslikSelect(Kriter);
                promiseGet.then(function (gelen) {

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {

                        $scope.SignalRBaglanti();
                        $scope.InfoBaslik = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.SignalRBaglanti = function () {
                $scope.messagehub = $.connection.editorHub;


                tinymce.activeEditor.on('Change', function (e) {
                    if ($scope.dokumanKontrol == true) {
                        var metin = tinymce.activeEditor.getBody().innerHTML;
                        $scope.messagehub.invoke("BroadcastText", metin);
                    }
                });


                //$scope.change = function (contents) {

                //    $scope.messagehub.invoke("BroadcastText", contents);
                //}


                $scope.messagehub.client.ReceiveText = function (list) {
                    tinymce.activeEditor.getBody().innerHTML = list;

                    //var editor2 = document.getElementsByClassName("note-editable")[0];

                    //editor2.innerHTML = list;

                    //// $scope.InfoBaslik.ACIKLAMA = list;


                    //$('#summereditor').summernote('saveRange');
                    ////$('#summereditor').summernote('restoreRange');
                    //$('#summereditor').summernote('focus');
                }

                $scope.messagehub.client.dokumanGroup = function (list) {
                    $scope.DokumanKullaniciListesi = list;
                    for (var i = 0; i < $scope.DokumanKullaniciListesi.length; i++) {
                        if ($scope.DokumanKullaniciListesi[0].KULLANICI_ID != $scope.$storage.KULLANICI_ID && $scope.DokumanKullaniciListesi.length > 0) {
                            //tiny mce kapalı konumda olucak.
                            tinymce.activeEditor.on('focus', function (e) {
                                tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                                $scope.DokumanKullaniciAciklama = "Doküman üzerinde " + $scope.DokumanKullaniciListesi[0].AD_SOYAD + " çalışmaktadır. Güncelleme işlemi yapamazsınız.";
                            });
                        }
                        else if ($scope.DokumanKullaniciListesi[0].KULLANICI_ID == $scope.$storage.KULLANICI_ID && $scope.DokumanKullaniciListesi.length > 0) {
                            //swetalert çıkartıp kullanıcının dokumanın üzerinde olmasını sağlıyacağız.

                            $scope.DokumanKullaniciAciklama = "Doküman üzerinde " + $scope.$storage.AD_SOYAD + " çalışmaktadır.";
                            tinymce.activeEditor.on('focus', function (e) {
                                tinymce.activeEditor.getBody().setAttribute('contenteditable', true);
                            });
                            $SweetAlert.swal({
                                title: "Doküman Kullanımı!",
                                text: "Doküman üzerinde değişiklik yapabilirsiniz.",
                                type: "success"
                            });
                        }
                    }
                    


                    $scope.$apply();
                }

                $scope.messagehub.client.hata = function (hata, hataexmessage) {

                    mesajGoster('Dikkat', 'Doküman yüklenirken bir hata oluştu.' + hata, 'E');
                    console.error('Doküman başlık kayıt işlemi sırasında bir hata oluştu.Hata:', hataexmessage);
                    $.connection.hub.qs = { benzersizId: $scope.InfoBaslik.BENZERSIZ_ID };
                    $.connection.hub.stop();
                }

                $scope.$on('$stateChangeStart', function (e, toState, toParams, fromState, fromParams) {
                    $.connection.hub.stop();
                    clearInterval($rootScope.dokumanTimer);
                });

                //messagehub.client.baslikSelect = function (info) {
                //    //var editor2 = document.getElementsByClassName("note-editable")[0];
                //    //editor2.innerHTML = info.ACIKLAMA;
                //    $scope.InfoBaslik = info;
                //    $scope.InfoBaslik.ACIKLAMA = info.ACIKLAMA;
                //    $scope.$apply();
                //}

                //  messagehub.invoke("GroupChange", $scope.InfoBaslik.BENZERSIZ_ID, $scope.tipiID);

                $.connection.hub.qs = { dokumanId: $scope.dokumanId, musteriId: $scope.$storage.MUSTERI_ID, kullaniciId: $scope.$storage.KULLANICI_ID };
                $.connection.hub.start().done(function () { $scope.dokumanKontrol = true; console.log("Dokümana bağlantı başarılı bir şekilde sağlandı.") }).fail(function () { console.log("hata") });
                //$.connection.hub.disconnected();
            }

            $scope.DokumanBaslikEkleGuncelle = function (InfoBaslik) {

                $rootScope.sayfayukleniyor = true;
                InfoBaslik.DOKUMAN_ID = $scope.dokumanId;

                //var edit = tinymce.activeEditor.getWin();
                //console.log(tinymce.activeEditor.getWin());
                //console.log(edit.document.body.parentElement.outerHTML);

                //InfoBaslik.ACIKLAMA = edit.document.body.parentElement.outerHTML;
                var promiseGet = srvDokumanBaslik.DokumanBaslikEkleGuncelle(InfoBaslik);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman başlık kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman başlık kayıt işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman başlık kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman başlık kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
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
                        $scope.Kullanici = [];
                        angular.forEach($scope.KullaniciListesi, function (value, key) {
                            $scope.Kullanici.push(value.AD_SOYAD);
                        });
                        $scope.Kullanici;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.RevAl = function (InfoBaslik) {

                $rootScope.sayfayukleniyor = true;
                InfoBaslik.DOKUMAN_ID = $scope.dokumanId;
                var promiseGet = srvDokumanBaslik.RevAl(InfoBaslik);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman revizyon alma işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman revizyon alma işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman başlık kayıt edilmiştir ve revizyon alınmıştır.", "S");

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman revizyon alma işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.tinymceOptions = {
                language: 'tr_TR',
                //table_tab_navigation: false,
                theme: 'modern',
                plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount  imagetools contextmenu colorpicker textpattern uploadimage  tutucu basliklar  pagebreak loop , paste',
                toolbar1: 'formatselect undo redo| bold italic strikethrough forecolor backcolor sizeselect  fontselect  fontsizeselect | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | uploadimage tutucu basliklar  addcomment pagebreak | loop',
                image_advtab: true,
                mentions: {
                    source: [
                        { name: 'Tyra Porcelli' },
                        { name: 'Brigid Reddish' },
                        { name: 'Ashely Buckler' },
                        { name: 'Teddy Whelan' }
                    ]
                },
                //templates: [
                //    { title: 'Test template 1', content: 'Test 1' },
                //    { title: 'Test template 2', content: 'Test 2' }
                //],
                content_css: [
                    '../css/tinymce/fontgoogleapisLato300300i400400i.css',
                    '../css/tinymce/codeopen.css'
                ],
                height: '842',
                theme_advanced_resize_horizontal: false,
                //content_css: "font-awesome/css/font-awesome.css",
                setup: function (editor) {
                    //Focus the editor on load
                    //$timeout(function () { editor.focus(); });

                    editor.on("init", function () {
                        var a = editor.getWin();
                        a.frameElement.style.display = "inline-block";
                        $('.mce-edit-area').css({ "width": "21cm", "margin": "auto", "background-color": "gray" });
                        $("<div id='emfa'></div>").insertBefore($('.mce-edit-area'));
                    });
                    editor.on("focus", function () {
                        var klass = tinymce.activeEditor.getDoc().getElementsByClassName("xloop");
                        var doc = tinymce.activeEditor.getDoc();
                        for (var i = 0; i < klass.length; i++) {
                            var divKontrol = doc.getElementById(klass[i].id);
                            if (divKontrol) {

                                var div = document.createElement('div');
                                div.className = "xloopChild";
                                div.setAttribute("contenteditable", false);
                                var button = document.createElement('button');
                                button.id = "tutucu" + klass[i].id;
                                //button.className = "btn btn-white btn-sm";
                                button.setAttribute("style", "color: inherit !important;background: white!important; border: 1px solid #e7eaec!important; padding: 0px 9px 0px 10px !important");
                                button.append("Kapat");
                                button.className = "btnstyle";
                                button.setAttribute("contenteditable", false);
                                button.setAttribute("data-id", klass[i].id);
                                button.onclick = function () {
                                    // var id = button.getAttribute("data-id");
                                    //var xloop = doc.getElementById(id);
                                    var xloop = this.parentElement.parentElement;
                                    xloop.removeChild(xloop.firstChild);
                                    if (xloop) {
                                        var prev = xloop.previousSibling;
                                        if (prev) {
                                            if (prev.childNodes.length == 0 || (prev.childNodes.length == 1 && prev.childNodes[0].nodeType == Node.TEXT_NODE && prev.childNodes[0].data == "")) {
                                                prev.parentNode.removeChild(prev);
                                            }
                                        }
                                        var next = xloop.nextSibling;
                                        if (next) {
                                            if (next.childNodes.length == 0 || (next.childNodes.length == 1 && next.childNodes[0].nodeType == Node.TEXT_NODE && next.childNodes[0].data == "")) {
                                                next.parentNode.removeChild(next);
                                            }
                                        }
                                        for (var j = 0; j < xloop.childNodes.length; j++) {
                                            var icerik = xloop.childNodes[j].cloneNode(true);
                                            xloop.parentNode.insertBefore(icerik, xloop);
                                        }
                                        xloop.parentNode.removeChild(xloop);
                                        var tinyclass = doc.getElementById("sel-mce_0");

                                        tinyclass.parentElement.removeChild(tinyclass);
                                    }
                                }
                                //button.appendChild(buttonI);
                                div.appendChild(button);

                                var span = document.createElement('span');
                                span.setAttribute("contenteditable", false);
                                span.append("Tutucu #" + klass[i].id);
                                div.append(span);
                                div.style.color = "red";
                                div.id = "baslik" + klass[i].id;
                                var maindiv = doc.getElementById(klass[i].id);
                                maindiv.insertBefore(div, maindiv.childNodes[0]);
                            }

                        }

                    });

                    editor.on("blur", function () {
                        var klass = tinymce.activeEditor.getDoc().getElementsByClassName("xloopChild");
                        var alanlar = [];
                        for (var k = 0; k < klass.length; k++) {
                            alanlar.push(klass[k].id);

                        }

                        for (var i = 0; i < alanlar.length; i++) {

                            var elem = tinymce.activeEditor.getDoc().getElementById(alanlar[i]);
                            if (elem) {
                                elem.parentElement.removeChild(elem);
                            }

                            //klass[i].parentElement.removeChild(klass[i]);




                        }

                    });
                }
            };



            //$scope.options = {
            //    //height: 1600,
            //    //minHeight: null,
            //    //maxHeight: null,
            //    disableResizeEditor: true,
            //    focus: false,
            //    toolbar: [
            //        ['edit', ['undo', 'redo']],
            //        ['headline', ['style']],
            //        ['style', ['bold', 'italic', 'underline', 'clear']],
            //        ['fontface', ['fontname']],
            //        ['textsize', ['fontsize']],
            //        ['fontclr', ['color']],
            //        ['alignment', ['ul', 'ol', 'paragraph']],
            //        ['height', ['height']],
            //        ['table', ['table']],
            //        ['insert', ['picture', 'video']],
            //        ['view', ['fullscreen', 'codeview']],
            //        ['help', ['help']],
            //        ['emfaFont', ['emfaStrikethrough', 'emfaSubscript', 'emfaSuperscript']],
            //        ['misc', ['emfa', 'emfaHR', 'emfaBasliklar', 'emfaTutucu', 'emfadocx', 'emfasave', ['print']]],
            //        ['paperSize', ['paperSize']],
            //        ['pagebreak', ['pagebreak']],
            //    ],

            //    //popover: {
            //    //    link: [],
            //    //    air: []
            //    //},
            //    hint: {
            //        //mentions: $scope.KullaniciListesiniGetir(),
            //        match: /\B@(\w*)$/,
            //        //users: function (keyword, callback) {
            //        //    $scope.KullaniciListesiniGetir();
            //        //},
            //        search: function (keyword, callback) {
            //            callback($.grep($scope.Kullanici, function (item) {

            //                return item.toLowerCase().indexOf(keyword) == 0;
            //            }));
            //        },
            //        content: function (item) {
            //            return '@' + item;
            //        }
            //    },
            //    print: {
            //        'stylesheetUrl': 'http://localhost:49811/css/bootstrap.min.css',
            //        'stylesheetUrl1': 'http://localhost:49811/css/plugins/summernotenew/summernote.css',
            //        'stylesheetUrl2': 'http://localhost:49811/css/plugins/summernotenew/summernote-lite.css'
            //    }
            //};

            //$scope.summernoteinit = function () {

            //    $('.note-frame').removeClass('note-document');
            //    $('.note-editing-area').removeClass('a0').removeClass('a1').removeClass('a2').removeClass('a3').removeClass('a4').removeClass('a5');
            //    $('.note-editing-area').css({ 'height': '900px' });
            //    $('.note-frame').addClass('note-document');
            //    $('.note-editing-area').addClass('a4');
            //    $('.note-editable').css({ 'width': '595px', 'height': '842px', 'right': '0px', 'left': '0px' });

            //    $("<div id='emfa'></div>").insertAfter($('.note-toolbar'));

            //}




            $scope.DokumanFarkliKaydetAc = function () {
                $scope.InfoDokumanFarkliKaydet = { DOKUMAN_TIP_KONTROL: true };
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
                InfoDokumanFarkliKaydet.DOKUMAN_ID = $scope.dokumanId;
                InfoDokumanFarkliKaydet.DOKUMAN_CALISMA_ALANIM_ACIKLAMA = $scope.InfoBaslik.ACIKLAMA;
                var promiseGet = srvDokumanBaslik.DokumanCalismaAlanimFarkliKaydet(InfoDokumanFarkliKaydet);
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

            $scope.DokumanEnSonRevDonSwert = function () {

                $SweetAlert.swal({
                    title: "Doküman en son revizyon konumuna getirilirken içerik silinecek emin misiniz.?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Evet",
                    cancelButtonText: "Hayır",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            $SweetAlert.swal({
                                title: "Tammalandı.",
                                text: " Doküman en son revizyon konumuna gelmiştir.",
                                type: "success",
                            }, function () {

                                $scope.DokumanEnSonRevDon();
                            });

                        } else {
                            $SweetAlert.swal({
                                title: "İptal",
                                text: "Doküman en son revizyon alma işlemi iptal edilmiştir.",
                                type: "error",
                            }, function () {

                            });

                        }
                    });
            }

            $scope.DokumanEnSonRevDon = function () {
                var promiseGet = srvDokumanBaslik.DokumanEnSonRevDon($scope.dokumanId);
                promiseGet.then(function (gelen) {

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoBaslik = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.DokumanRevizyonListesiAc = function () {
                $scope.DokumanRevizyonGetData();
                $scope.$modalInstanceDokumanRevizyonListesi = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_revizyon_liste.html',
                    scope: $scope
                });
            };

            $scope.DokumanRevizyonListesiKapat = function () {
                $scope.$modalInstanceDokumanRevizyonListesi.dismiss('cancel');
            };

            $scope.AramaKriterRevizyonListe = {
                DOKUMAN_ID: $scope.dokumanId
            };

            $scope.DokumanRevizyonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanBaslik.DokumanRevizyonGetData($scope.AramaKriterRevizyonListe);
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


            $scope.revGeriYukleSwert = function (rev) {

                $SweetAlert.swal({
                    title: "Seçilen revizyonu yüklenirken şuana kadar yazmış olduklarınız bilgiler silinecek. Seçilen revizyon yüklensin mi?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Evet",
                    cancelButtonText: "Hayır",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            $SweetAlert.swal({
                                title: "Tammalandı.",
                                text: " Seçilen revizyon başarılı bir şekilde yüklenmiştir.",
                                type: "success",
                            }, function () {

                                $scope.revGeriYukle(rev);
                            });

                        } else {
                            $SweetAlert.swal({
                                title: "İptal",
                                text: "Geri yükleme işlemi iptal edilmiştir.",
                                type: "error",
                            }, function () {

                            });

                        }
                    });
            }


            $scope.revGeriYukle = function (rev) {
                var InfoRevGeriYukle = { DOKUMAN_ID: $scope.dokumanId, REV: rev }
                var promiseGet = srvDokumanBaslik.RevGeriYukle(InfoRevGeriYukle);
                promiseGet.then(function (gelen) {

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoBaslik = gelen.data;
                        $scope.DokumanRevizyonListesiKapat();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $rootScope.dokumanTimer = setInterval(function () {
                if ($scope.DokumanKullaniciListesi[0].KULLANICI_ID == $scope.$storage.KULLANICI_ID) {
                    $scope.DokumanBaslikEkleGuncelle($scope.InfoBaslik);
                }

                console.log("Doküman otomatik olarak kaydedildi.");
            }, 600000);


          
        }]);

