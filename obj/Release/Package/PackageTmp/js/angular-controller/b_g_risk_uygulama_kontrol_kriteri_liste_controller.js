angular.module('inspinia').controller(
    'b_g_risk_uygulama_kontrol_kriteri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvBGRiskUygulamaKontrolKriteri', 'srvUygulamaKontrolKriteriGrup', 'srvUygulamaKontrolKriteri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvBGRiskUygulamaKontrolKriteri, srvUygulamaKontrolKriteriGrup, srvUygulamaKontrolKriteri, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.bgRiskID = $stateParams.bgRiskID;
            $scope.bgRiskNo = $stateParams.bgRiskNo;

            $scope.AramaKriter = {
                B_G_RISK_ID: $scope.bgRiskID,
                UYGULAMA_KONTROL_KRITERI_ID: '',
                UYGULAMA_KONTROL_KRITERI_ADI: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.AramaKriterUygulamaKontrolKriteri = {
                UYGULAMA_KONTROL_GRUP: true,
                LISTE: false
            };
            $scope.AramaKriterUygulamaKontrolKriteriAltGrup = {
                UYGULAMA_KONTROL_GRUP: false,
                UYGULAMA_KONTROL_GRUP_ID: '',
                LISTE: false
            };
            $scope.AramaKriterKontrolKriter = {
                UYGULAMA_KONTROL_KRITERI_GRUP_ID: '',
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.BGRiskUygulamaKontrolKriteriGetData();
                $scope.UygulamaKontrolKriteriGrupGetData();
            }

            $scope.BGRiskUygulamaKontrolKriteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRiskUygulamaKontrolKriteri.BGRiskUygulamaKontrolKriteriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk uygulama kontrol kriter listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.BGRiskUygulamaKontrolKriteriListesi = gelen.data.Veri;
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
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.BGRiskUygulamaKontrolKriteriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRiskUygulamaKontrolKriteri.BGRiskUygulamaKontrolKriteriSil(info.B_G_RISK_UYGULAMA_KONTROL_KRITERI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk uygulama kontrol kriteri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri  silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Bilgi güvenliği risk uygulama kontrol kriteri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.BGRiskUygulamaKontrolKriteriListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.BGRiskUygulamaKontrolKriteriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.BGRiskUygulamaKontrolKriteriSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.UygulamaKontrolKriteriGrupGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupGetData($scope.AramaKriterUygulamaKontrolKriteri);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk uygulama kontrol kriteri grup listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri grup listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.UygulamaKontrolKriteriGrupListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri grup listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.UygulamaKontrolKriteriAltGrupGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                if ($scope.AramaKriterUygulamaKontrolKriteriAltGrup.UYGULAMA_KONTROL_GRUP_ID != $scope.Info.UYGULAMA_KONTROL_KRITERI_GRUP_ID) {
                    $scope.Info.UST_UYGULAMA_KONTROL_KRITERI_GRUP_ID = null;
                    $scope.Info.UYGULAMA_KONTROL_KRITERI_ID = null;
                    $scope.UygulamaKontrolKriteriListesi = null;
                }
                $scope.AramaKriterUygulamaKontrolKriteriAltGrup.UYGULAMA_KONTROL_GRUP_ID = $scope.Info.UYGULAMA_KONTROL_KRITERI_GRUP_ID;
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupGetData($scope.AramaKriterUygulamaKontrolKriteriAltGrup);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk uygulama kontrol kriteri alt grup listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        Console.error('Bilgi güvenliği risk uygulamak kontrol kriteri alt grup listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.UygulamaKontrolKriteriAltGrupListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri alt grup listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.UygulamaKontrolKriteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                if ($scope.AramaKriterKontrolKriter.UYGULAMA_KONTROL_KRITERI_GRUP_ID != $scope.Info.UST_UYGULAMA_KONTROL_KRITERI_GRUP_ID) {
                    $scope.Info.UYGULAMA_KONTROL_KRITERI_ID = null;
                }
                $scope.AramaKriterKontrolKriter.UYGULAMA_KONTROL_KRITERI_GRUP_ID = $scope.Info.UST_UYGULAMA_KONTROL_KRITERI_GRUP_ID;
                var promiseGet = srvUygulamaKontrolKriteri.UygulamaKontrolKriteriGetData($scope.AramaKriterKontrolKriter);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.lenght > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.UygulamaKontrolKriteriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.BGRiskUygulamaKontrolKriteriEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmBGRiskUygulamaKontrolKriteri.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmBGRiskUygulamaKontrolKriteri);
                    return;
                }
                Info.B_G_RISK_ID = $scope.bgRiskID;
                var promiseGet = srvBGRiskUygulamaKontrolKriteri.BGRiskUygulamaKontrolKriteriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriter kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriter kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Uygulama kontrol kriter kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.BGRiskUygulamaKontrolKriteriGetData();
                        $scope.Info.UYGULAMA_KONTROL_KRITERI_GRUP_ID = null;
                        $scope.Info.UST_UYGULAMA_KONTROL_KRITERI_GRUP_ID = null;
                        $scope.Info.UYGULAMA_KONTROL_KRITERI_ID = null;

                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    B_G_RISK_ID: $scope.bgRiskID,
                    UYGULAMA_KONTROL_KRITERI_ID: null,
                    UYGULAMA_KONTROL_KRITERI_ADI: null,
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.BGRiskUygulamaKontrolKriteriGetData($scope.AramaKriter);
            }

        }]);

