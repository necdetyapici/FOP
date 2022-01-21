angular.module('inspinia').controller(
    'dokuman_proje_paketi_grup_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanProjePaketiGrup', 'srvDokumanProjePaketiKlasor', 'srvDokuman','Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanProjePaketiGrup, srvDokumanProjePaketiKlasor, srvDokuman, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanProjePaketiGrupID = $stateParams.dokumanProjePaketiGrupID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.dokumanProjePaketiGrupID > 0) {
                    $scope.DokumanProjePaketiGrupSelect();
                    $scope.DokumanProjePaketiKlasorGetData();
                    $scope.DokumanProjePaketiKlasorDosyaGetData();
                    $scope.DokumanGetData();
                    $scope.InfoProjePaketiKlasor={ };
                }
                    
            }

            $scope.DokumanProjePaketiGrupSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanProjePaketiGrup.DokumanProjePaketiGrupSelect($scope.dokumanProjePaketiGrupID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiGrup bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DokumanProjePaketiGrupSelect Hata:', hata);
                    });
            }

            $scope.DokumanProjePaketiGrupEkleGuncelle = function (Info, frmPaketGrup) {
                $scope.formCalistirildi = true;
                if (frmPaketGrup.$valid) { } else {
                    $rootScope.focusToInvalid(frmPaketGrup);
                    return;
                }
                var promiseGet = srvDokumanProjePaketiGrup.DokumanProjePaketiGrupEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanProjePaketiGrupEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        
                        $scope.formCalistirildi = false;
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanProjePaketiGrupEkleGuncelle Hata:', errorPl);
                    });
            }

            $scope.AramaKriterProjeKlasor = {
                LISTE: true,
                DOKUMAN_KLASOR_TIPI: false,
                UST_DOKUMAN_PROJE_PAKETI_KLASOR_ID: '',
                ADI: '',
                DOKUMAN_PROJE_PAKETI_GRUP_ID: $scope.dokumanProjePaketiGrupID,
                 SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            }

            $scope.filtreTemizleProeKlasor = function () {

                $scope.AramaKriterProjeKlasor = {
                    LISTE: true,
                    UST_DOKUMAN_PROJE_PAKETI_KLASOR_ID: '',
                    ADI: '',
                    DOKUMAN_KLASOR_TIPI: false,
                    DOKUMAN_PROJE_PAKETI_GRUP_ID: $scope.dokumanProjePaketiGrupID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.DokumanProjePaketiKlasorGetData($scope.AramaKriterProjeKlasor);
            }

            $scope.DokumanProjePaketiKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorGetData($scope.AramaKriterProjeKlasor);
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisiProjePaketiKlasor = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanProjePaketiKlasorListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanProjePaketiKlasorGetData Hata:', hata);
                    });
            };

            $scope.AramaKriterProjeKlasorDosya = {
                LISTE: false,
                DOKUMAN_KLASOR_TIPI: true,
                DOKUMAN_PROJE_PAKETI_GRUP_ID: $scope.dokumanProjePaketiGrupID

            }

            $scope.DokumanProjePaketiKlasorDosyaGetData = function () {
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

            $scope.AramaKriterDokuman = {
                LISTE: false,
                YAYIN: true //ileri zamanlarda güncellemede düzeltilecek.
            }
            $scope.DokumanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanGetData($scope.AramaKriterDokuman);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanProjePaketiKlasorGetData Hata:', hata);
                    });
            };

            $scope.dokumanSec = function () {
                $scope.InfoProjePaketiKlasor.ADI = $scope.InfoProjePaketiKlasor.DOKUMAN[1];
                $scope.InfoProjePaketiKlasor.DOKUMAN_ID = $scope.InfoProjePaketiKlasor.DOKUMAN[0];
            };

            $scope.tipiDegistir = function () {
                if ($scope.InfoProjePaketiKlasor.DOKUMAN_KLASOR_TIPI === true) {
                    $scope.InfoProjePaketiKlasor.ADI = null;
                    $scope.InfoProjePaketiKlasor.DOKUMAN_ID = null;
                    $scope.InfoProjePaketiKlasor.DOKUMAN = null;
                    $scope.InfoProjePaketiKlasor.UST_DOKUMAN_PROJE_PAKETI_KLASOR_ID = null;
                }
            };

            $scope.DokumanProjePaketiKlasorEkleGuncelle = function (InfoProjePaketiKlasor, frmPaketKlasor) {
                $scope.formCalistirildiProjePaketiKlasor = true;
                if (frmPaketKlasor.$valid) { } else {
                    $rootScope.focusToInvalid(frmPaketKlasor);
                    return;
                }
                InfoProjePaketiKlasor.DOKUMAN_PROJE_PAKETI_GRUP_ID = $scope.dokumanProjePaketiGrupID;
                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorEkleGuncelle(InfoProjePaketiKlasor);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanProjePaketiKlasorEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.formCalistirildiProjePaketiKlasor = false;
                        $scope.DokumanProjePaketiKlasorGetData();
                        $scope.DokumanProjePaketiKlasorDosyaGetData();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanProjePaketiKlasorEkleGuncelle Hata:', errorPl);
                    });
            }

            $scope.DokumanProjePaketiKlasorSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorSil(info.DOKUMAN_PROJE_PAKETI_KLASOR_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DokumanProjePaketiKlasorGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DokumanProjePaketiKlasorSil Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiProjePaketKlasor = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.DokumanProjePaketiKlasorSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.DokumanProjePaketiKlasorAktifPasif = function (InfoDokumanProjePaketiKlasor) {

                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorAktifPasif(InfoDokumanProjePaketiKlasor);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje paketi klasor veya dokuman onay işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje paketi klasor veya dokuman onay işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Proje paketi klasor veya dokuman onay işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.DokumanProjePaketiKlasorGetData();
                        $scope.DokumanProjePaketiKlasorDosyaGetData();
                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje paketi klasor veya dokuman onay işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };
        }]);

