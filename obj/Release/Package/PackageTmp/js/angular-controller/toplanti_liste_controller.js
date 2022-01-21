angular.module('inspinia').controller(
    'toplanti_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvToplanti', 'srvGenel', 'srvRaporlar','srvToplantiYeri','srvToplantiTuru','Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvToplanti, srvGenel, srvRaporlar, srvToplantiYeri, srvToplantiTuru, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterListe = {
                TOPLANTI_ADI: '',
                TOPLANTI_YERI: '',
                TOPLANTI_TURU_ID: '',
                TOPLANTI_TARIHI: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.AramaKriter = {
                TOPLANTI_ADI: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ToplantiGetData();
                $scope.ToplantiTuruGetData();
                $scope.ToplantiYeriGetData();
            }

            $scope.ToplantiGetData = function (AramaKriterListe) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplanti.ToplantiGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        Console.error('Toplantı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ToplantiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Toplantı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.TOPLANTI_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ToplantiSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplanti.ToplantiSil(info.TOPLANTI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı silme işlemi sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Toplantı silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam', 'Toplantı silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.', 'S');
                        if ($scope.ToplantiListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriterListe.SayfaNo = $scope.AramaKriterListe.SayfaNo - 1;
                        }
                        $scope.ToplantiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ToplantiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ToplantiTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiTuru.ToplantiTuruGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ToplantiYeriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiYeri.ToplantiYeriGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı yeri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı yeri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiYeriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı yeri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $state.reload();
                $scope.AramaKriterListe = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    TOPLANTI_ADI: '',
                    TOPLANTI_YERI: '',
                    TOPLANTI_TURU_ID: '',
                    TOPLANTI_TARIHI: '',
                    LISTE: true
                };
                $scope.ToplantiGetData($scope.AramaKriterListe);
            }

            $scope.ToplantiTutanagiYazdir = function (Toplanti_Id) {
                $scope.Kriter = {
                    TOPLANTI_ID: Toplanti_Id,
                    FileFormat: 'pdf'
                };
                $scope.yeniForm($scope.Kriter);
            };

            //$scope.modalGoster = function (Kriter) {
            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = srvRaporlar.rprToplantiTutanagiFormu(Kriter);
            //    promiseGet.then(function (gelen) {
            //        if (gelen.data.basariDurumu) {
            //            //var browserCanPrint = (-1 != navigator.userAgent.indexOf('Chrome')) || (-1 != navigator.userAgent.indexOf('Safari')) || (-1 != navigator.userAgent.indexOf('Trident')) || (-1 != navigator.userAgent.indexOf('MSIE')) || (-1 != navigator.userAgent.indexOf('MSIE 6')) || (-1 != navigator.userAgent.indexOf('MSIE 7')) || (-1 != navigator.userAgent.indexOf('MSIE 8')) || (-1 != navigator.userAgent.indexOf('MSIE 9')) || (-1 != navigator.userAgent.indexOf('MSIE 10'));
            //            var browserCanPrint = (-1 != navigator.userAgent.indexOf('Chrome')) || (-1 != navigator.userAgent.indexOf('Safari'));
            //            if (Kriter == undefined) {
            //                Kriter = $scope.AramaKriter;
            //            }
            //            $scope.RaporData = { Dosya: gelen.data.GeriDonusDeger, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf', ekUzantiIki: 'doc' }
            //            $scope.modalInstanceDokuman = $modal.open({
            //                templateUrl: 'views/common/modal_rapor_pdf_viewer.html',
            //                controller: 'toplanti_liste_controller',
            //                size: 'lg',
            //                backdrop: 'static',
            //                windowClass: "animated fadeInDown",
            //                scope: $scope
            //            });
            //        }
            //        else
            //            mesajGoster('Dikkat', gelen.data.mesaj, 'E');

            //        $rootScope.sayfayukleniyor = false;
            //    },
            //        function (hata) {
            //            $rootScope.sayfayukleniyor = false;
            //            basvuruMesajGoster('Dikkat', Kriter.belge + " yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
            //            console.log(Kriter.belge + 'Hata:', hata);
            //        });
            //};

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceDokuman.dismiss('cancel');
            };

            //$scope.exportReport = function (browserFileURL, FileFormat) {
            //    $rootScope.sayfayukleniyor = true;
            //    $scope.Kriter.FileFormat = FileFormat;
            //    var promiseGet = srvRaporlar.rprToplantiTutanagiFormu($scope.Kriter);
            //    promiseGet.then(function (gelen) {
            //        if (gelen.data.basariDurumu) {
            //            var anchor = angular.element('<a/>');
            //            anchor.attr({
            //                href: gelen.data.GeriDonusDeger,
            //                target: '_blank',
            //                download: gelen.data.mesaj
            //            })[0].click();
            //            mesajGoster('İşlem Başarılı', "Belge indirme işlemi başarıyla tamamlandı", 'S');
            //        }
            //        $rootScope.sayfayukleniyor = false;
            //    },
            //        function (hata) {
            //            $rootScope.sayfayukleniyor = false;
            //            mesajGoster('Dikkat', "Belge indirme işlemi sırasında bir hata oluştu. Hata: " + hata.data, 'W');
            //            console.log('Rapor Hata:', hata);
            //        });
            //};

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

            $scope.yeniForm = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplanti.ToplantiFormu(Kriter.TOPLANTI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        //var browserCanPrint = (-1 != navigator.userAgent.indexOf('Chrome')) || (-1 != navigator.userAgent.indexOf('Safari')) || (-1 != navigator.userAgent.indexOf('Trident')) || (-1 != navigator.userAgent.indexOf('MSIE')) || (-1 != navigator.userAgent.indexOf('MSIE 6')) || (-1 != navigator.userAgent.indexOf('MSIE 7')) || (-1 != navigator.userAgent.indexOf('MSIE 8')) || (-1 != navigator.userAgent.indexOf('MSIE 9')) || (-1 != navigator.userAgent.indexOf('MSIE 10'));
                        var browserCanPrint = (-1 != navigator.userAgent.indexOf('Chrome')) || (-1 != navigator.userAgent.indexOf('Safari'));
                        if (Kriter == undefined) {
                            Kriter = $scope.AramaKriter;
                        }
                        $scope.RaporData = { Dosya: gelen.data.FORM_ON_IZLEME, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf', ekUzantiIki: 'docx' };
                        $scope.modalInstanceDokuman = $modal.open({
                            templateUrl: 'views/common/modal_dokuman_viewer.html',
                            controller: 'toplanti_liste_controller',
                            size: 'lg',
                            backdrop: 'static',
                            windowClass: "animated fadeInDown",
                            scope: $scope
                        });

                    }
                    else
                        mesajGoster('Dikkat', gelen.data.mesaj, 'E');

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        basvuruMesajGoster('Dikkat', Kriter.belge + " yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log(Kriter.belge + 'Hata:', hata);
                    });
            };
        }]);

