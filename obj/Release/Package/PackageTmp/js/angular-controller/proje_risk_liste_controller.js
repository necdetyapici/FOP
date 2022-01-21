angular.module('inspinia').controller(
    'proje_risk_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeRisk', 'srvRaporlar', 'Constants','Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeRisk, srvRaporlar, Constants, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $scope.dokumanFormTipi = Constants.DOKUMAN_FORM_TIPI;
            $scope.projeRiskNo = 0;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                PROJE_ID: $scope.projeID,
                PROJE_RISK_NO: '',
                RISK_ADI: '',
                RISK_TURU_ADI: '',
                ARTIK_RISK_ONAYI: '',
                LISTE: true,
                RIKS_LOG: true,
                //GRUP_NO: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 50
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeRiskGetData();
                $scope.grupLogGoster = false;
            }

            $scope.projeRiskAta = function (riskNo) {
                $scope.projeRiskNo = riskNo;
            }

            $scope.ProjeRiskGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRisk.ProjeRiskGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {


                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        Console.error('Risk listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        if ($scope.AramaKriter.RIKS_LOG === true) {
                            $scope.ProjeRiskListesi = gelen.data.Veri;
                            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        }
                        else {
                            $scope.ProjeRiskLogListesi = gelen.data.Veri;
                            $scope.toplamKayitSayisiLog = gelen.data.ToplamKayitSayisi;
                        }

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.ProjeRiskLogGoster = function (riskNo) {
                $scope.seciliRiskNo = riskNo;
                $scope.grupLogGoster = true;
                $scope.AramaKriter.PROJE_RISK_NO = riskNo;
                $scope.AramaKriter.RIKS_LOG = false;
                $scope.ProjeRiskGetData();
            };

            $scope.ProjeRiskLogGizle = function () {
                $scope.grupLogGoster = false;
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeRiskSil = function (InfoProjeRisk) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRisk.ProjeRiskSil(InfoProjeRisk.PROJE_RISK_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Risk silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeRiskListesi.length == 1 && $scope.toplamKayitSayisi > 50) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeRiskGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });

            };

            $scope.modalSilmeOnayi = function (InfoProjeRisk) {
                $scope.secilenKayit = InfoProjeRisk;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeRiskSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    MUSTERI_ID: '',
                    PROJE_ID: $scope.projeID,
                    PROJE_RISK_NO: null,
                    RISK_ADI: null,
                    RISK_TURU_ADI: null,
                    RISK_TURU_TIPI_ADI: '',
                    ARTIK_RISK_ONAYI: '',
                    LISTE: true,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.ProjeRiskGetData($scope.AramaKriter);
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

            $scope.ProjeRiskFormuYazdir = function (durum, riskNo) {
                $scope.Kriter = {
                    PROJE_ID: $scope.projeID,
                    FileFormat: 'pdf',
                    PROJE_RISK_NO: riskNo,
                    DURUM: durum
                };
                $scope.modalGoster($scope.Kriter);
            };

            $scope.ProjeRiskFormuYazdir = function (formTipi, projeRiskNo) {
                $scope.Kriter = {
                    PROJE_ID: $scope.projeID,
                    DOKUMAN_FORM_TIPI: formTipi,
                    PROJE_RISK_ID: '',
                    PROJE_RISK_NO: projeRiskNo

                };
                $scope.modalGoster($scope.Kriter);
            };

            $scope.modalGoster = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = null;
                promiseGet = srvProjeRisk.ProjeRiskFormu(Kriter);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.RaporData = { Dosya: gelen.data.FORM_ON_IZLEME, AramaKriter: Kriter, ekUzanti: 'pdf' };
                        $scope.modalInstance = $modal.open({
                            templateUrl: 'views/common/modal_dokuman_viewer.html',
                            controller: 'proje_risk_liste_controller',
                            size: 'lg',
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

            $scope.modalDokumanGizle = function () {
                $scope.modalInstance.dismiss('cancel');
            };
            //$scope.modalGoster = function (Kriter) {
            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = null;
            //    if (Kriter.DURUM == '1') {
            //        promiseGet = srvRaporlar.rprProjeRiskFormu(Kriter);
            //    }
            //    else {
            //        promiseGet = srvRaporlar.rprProjeRiskGrupFormu(Kriter);
            //    }
                

            //    promiseGet.then(function (gelen) {
            //        if (gelen.data.basariDurumu) {
            //            var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
            //            if (Kriter === undefined) {
            //                Kriter = $scope.AramaKriter;
            //            }
            //            $scope.RaporData = { Dosya: gelen.data.GeriDonusDeger, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf', ekUzantiIki: 'xls' };
            //            $scope.modalInstance = $modal.open({
            //                templateUrl: 'views/common/modal_rapor_pdf_viewer.html',
            //                controller: 'proje_risk_liste_controller',
            //                size: 'lg',
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

            //$scope.modalDokumanGizle = function () {
            //    $scope.modalInstance.dismiss('cancel');
            //};

            //$scope.exportReport = function (browserFileURL, FileFormat) {
            //    $rootScope.sayfayukleniyor = true;
            //    $scope.Kriter.FileFormat = FileFormat;
            //    var promiseGet = srvRaporlar.rprProjeRiskFormu($scope.Kriter);
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

            $scope.ProjeRiskEkleGuncelle = function (InfoProjeRisk) {

                InfoProjeRisk.RISK_DEGERLENDIRME_TARIHI = new Date;
                InfoProjeRisk.PROJE_ID = $scope.projeID;
                InfoProjeRisk.PROJE_RISK_ID = 0;
                //InfoProjeRisk.PROJE_RISK_NO = $scope.projeRiskNoTarih;
                //InfoProjeRisk.RISK_DEGERLENDIRME_TARIHI = $scope.projeRiskDegerlendirmeTarih;
                //if ($scope.projeRiskID > 0) {
                //    InfoProjeRisk.PROJE_RISK_NO_DEGERI = InfoProjeRisk.PROJE_RISK_NO;
                //}
                var promiseGet = srvProjeRisk.ProjeRiskEkleGuncelle(InfoProjeRisk);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiProjeRisk = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Risk kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Risk kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Risk kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.projeRiskID = gelen.data.returnKayitNo;
                        $state.go('proje.projelerkayit.risk.projerisklistesi', { projeRiskID: $scope.projeRiskID });
                    }
                },
                    function (hata) {
                        $scope.formCalistirilformCalistirildiProjeRiskdi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }
        }]);

