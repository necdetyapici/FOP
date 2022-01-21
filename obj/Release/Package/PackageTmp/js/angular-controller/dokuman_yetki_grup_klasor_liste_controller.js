angular.module('inspinia').controller(
    'dokuman_yetki_grup_klasor_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanYetkiGrupKlasor', 'srvDokumanKlasor', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanYetkiGrupKlasor, srvDokumanKlasor, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanYetkiGrupID = $stateParams.dokumanYetkiGrupID;
            $scope.AramaKriter = {
                DOKUMAN_KLASOR_ID: '',
                DOKUMAN_YETKI_GRUP_ID: $scope.dokumanYetkiGrupID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                //$scope.DokumanYetkiGrupKlasorGetData();
                if ($scope.dokumanYetkiGrupID > 0) {
                    $scope.DokumanKlasorAgacGetData();
                }
            }

            $scope.DokumanYetkiGrupKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorGetData();
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanYetkiGrupKlasorListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiGrupKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanYetkiGrupKlasorGetData Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanYetkiGrupKlasorSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorSil(info.DOKUMAN_YETKI_GRUP_KLASOR_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DokumanYetkiGrupKlasorSelect();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DokumanYetkiGrupKlasorSil Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.DokumanYetkiGrupKlasorSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.DokumanKlasorAgacGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorAgacGetData();
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
                                'data': $scope.treeData
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
                                $scope.klasorAdı = data.node.original.text;
                                $scope.DOKUMAN_KLASOR_ID = data.node.original.id;
                                $scope.AramaKriter.DOKUMAN_KLASOR_ID = data.node.original.id;
                                $scope.DokumanYetkiGrupKlasorSelect();

                            }
                        );
                        $('#tree').jstree('close_node', '1097');
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

            
            $scope.DokumanYetkiGrupKlasorSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorSelect($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.InfoYetkiKlasor = gelen.data;
                    if ($scope.InfoYetkiKlasor.DOKUMAN_YETKI_GRUP_KLASOR_ID == 0) {
                        $scope.InfoYetkiKlasor.DOKUMAN_KLASOR_ADI  = $scope.klasorAdı;
                    }

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiGrupKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanYetkiGrupKlasorGetData Hata:', hata);
                    });
            };

            $scope.DokumanYetkiGrupKlasorEkleGuncelle = function (InfoYetkiKlasor, frmYetkiGrupKlasor) {
                $scope.formCalistirildi = true;
                if (frmYetkiGrupKlasor.$valid) { } else {
                    $rootScope.focusToInvalid(frmYetkiGrupKlasor);
                    return;
                }
                InfoYetkiKlasor.DOKUMAN_KLASOR_ID = $scope.DOKUMAN_KLASOR_ID;
                InfoYetkiKlasor.DOKUMAN_YETKI_GRUP_ID = $scope.dokumanYetkiGrupID;
                var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorEkleGuncelle(InfoYetkiKlasor);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanYetkiGrupKlasorEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.DokumanYetkiGrupKlasorSelect();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanYetkiGrupKlasorEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

