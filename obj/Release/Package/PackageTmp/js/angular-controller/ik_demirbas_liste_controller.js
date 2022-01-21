angular.module('inspinia').controller(
    'ik_demirbas_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkDemirbas', 'srvGenel', 'srvRaporlar', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkDemirbas, srvGenel, srvRaporlar, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                IK_DEMIRBAS_SERI_NO: '',
                IK_DEMIRBAS_MARKA_ADI: '',
                IK_DEMIRBAS_MODEL_ADI: '',
                IK_DEMIRBAS_CINSI_ADI: '',
                DEMIRBAS_DURUMU_ID: '',
                IK_BIRIM_ADI: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkDemirbasGetData();
                $scope.DemirbasDurumuGetData();
            };

            $scope.IkDemirbasGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDemirbas.IkDemirbasGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbaş listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbaş listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkDemirbasListesi = gelen.data.Veri;
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
                        console.error('Demirbaş listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkDemirbasSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDemirbas.IkDemirbasSil(info.IK_DEMIRBAS_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbaş silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbaş silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Demirbaş silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkDemirbasListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.IkDemirbasGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Demirbaş silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.IkDemirbasSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.DemirbasDurumuGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getDemirbasDurumu();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbas durumu listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbas durumu listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.DemirbasDurumuListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Demirbaş durumu listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {


                $scope.AramaKriter = {
                    IK_DEMIRBAS_SERI_NO: null,
                    IK_DEMIRBAS_MARKA_ADI: null,
                    IK_DEMIRBAS_MODEL_ADI: null,
                    IK_DEMIRBAS_CINSI_ADI: null,
                    DEMIRBAS_DURUMU_ID: null,
                    IK_BIRIM_ADI: null,
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.IkDemirbasGetData($scope.AramaKriter);
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

            $scope.DemirbasFormuYazdir = function () {
                $scope.Kriter = {
                    IK_DEMIRBAS_MARKA_ADI: $scope.AramaKriter.IK_DEMIRBAS_MARKA_ADI,
                    IK_DEMIRBAS_MODEL_ADI: $scope.AramaKriter.IK_DEMIRBAS_MODEL_ADI,
                    IK_DEMIRBAS_SERI_NO: $scope.AramaKriter.IK_DEMIRBAS_SERI_NO,
                    DEMIRBAS_DURUMU_ID: $scope.AramaKriter.DEMIRBAS_DURUMU_ID,
                    IK_BIRIM_ADI: $scope.AramaKriter.IK_BIRIM_ADI,
                    IK_DEMIRBAS_CINSI_ADI: $scope.AramaKriter.IK_DEMIRBAS_CINSI_ADI
                };
                // $scope.modalGoster($scope.Kriter);
                $scope.yeniForm($scope.Kriter);
            };

            $scope.yeniForm = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDemirbas.DemirbasFormu(Kriter);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {

                        var browserCanPrint = (-1 != navigator.userAgent.indexOf('Chrome')) || (-1 != navigator.userAgent.indexOf('Safari'));

                        $scope.RaporData = { Dosya: gelen.data.FORM_ON_IZLEME, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf', ekUzantiIki: 'docx' };
                        $scope.modalInstanceDokuman = $modal.open({
                            templateUrl: 'views/common/modal_dokuman_viewer.html',
                            controller: 'ik_demirbas_liste_controller',
                            size: 'lg',
                            backdrop: 'static',
                            // windowClass: "animated fadeInDown",
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
                $scope.modalInstanceDokuman.dismiss('cancel');
            };

            //$scope.DemirbasFormuYazdir = function (durum) {
            //    if (durum === 0) {
            //        $scope.Kriter = {
            //            DURUM: 0,
            //            FileFormat: 'pdf'
            //        };
            //    }
            //    else {
            //        $scope.Kriter = {
            //            DURUM: 1,
            //            IK_DEMIRBAS_SERI_NO: $scope.AramaKriter.IK_DEMIRBAS_SERI_NO,
            //            IK_DEMIRBAS_MARKA_ADI: $scope.AramaKriter.IK_DEMIRBAS_MARKA_ADI,
            //            IK_DEMIRBAS_MODEL_ADI: $scope.AramaKriter.IK_DEMIRBAS_MODEL_ADI,
            //            IK_DEMIRBAS_CINSI_ADI: $scope.AramaKriter.IK_DEMIRBAS_CINSI_ADI,
            //            DEMIRBAS_DURUMU_ID: $scope.AramaKriter.DEMIRBAS_DURUMU_ID,
            //            IK_BIRIM_ADI: $scope.AramaKriter.IK_BIRIM_ADI,
            //            FileFormat: 'pdf'
            //        };
            //    }

            //    $scope.modalGoster($scope.Kriter);
            //};



            //$scope.modalGoster = function (Kriter) {
            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = srvRaporlar.rprDemirbasListesi(Kriter);
            //    promiseGet.then(function (gelen) {
            //        if (gelen.data.basariDurumu) {
            //            var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
            //            if (Kriter === undefined) {
            //                Kriter = $scope.AramaKriter;
            //            }
            //            $scope.RaporData = { Dosya: gelen.data.GeriDonusDeger, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf', ekUzantiIki: 'xls' };
            //            $scope.modalInstance = $modal.open({
            //                templateUrl: 'views/common/modal_rapor_pdf_viewer.html',
            //                //controller: 'ik_zimmet_liste_controller',
            //                size: 'lg',
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

            //$scope.modalDokumanGizle = function () {
            //    $scope.modalInstance.dismiss('cancel');
            //};

            //$scope.exportReport = function (browserFileURL, FileFormat) {
            //    $rootScope.sayfayukleniyor = true;
            //    $scope.Kriter.FileFormat = FileFormat;
            //    var promiseGet = srvRaporlar.rprDemirbasListesi($scope.Kriter);
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
        }]);

