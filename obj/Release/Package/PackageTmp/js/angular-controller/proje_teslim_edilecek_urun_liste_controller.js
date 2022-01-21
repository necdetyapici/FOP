angular.module('inspinia').controller(
    'proje_teslim_edilecek_urun_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeTeslimEdilecekUrun', 'srvProjePersonel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeTeslimEdilecekUrun, srvProjePersonel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.search = {};
            $scope.projeID = $stateParams.projeID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeTeslimEdilecekUrunGetData();

            }
            $scope.AramaKriterListe = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };
            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                TESLIM_EDILECEK_URUN_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.ProjeTeslimEdilecekUrunGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTeslimEdilecekUrun.ProjeTeslimEdilecekUrunGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teslim edilecek ürün listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Teslim edilecek ürün listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeTeslimEdilecekUrunListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teslim edilecek ürün listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.TESLIM_EDILECEK_URUN_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeTeslimEdilecekUrunSil = function (InfoTeslimEdilecekUrun) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTeslimEdilecekUrun.ProjeTeslimEdilecekUrunSil(InfoTeslimEdilecekUrun.PROJE_TESLIM_EDILECEK_URUN_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teslim edilecek ürün silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teslim edilecek ürün silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Teslim edilecek ürün silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeTeslimEdilecekUrunListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeTeslimEdilecekUrunGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teslim edilecek ürün silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoTeslimEdilecekUrun) {
                $scope.secilenKayit = InfoTeslimEdilecekUrun;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeTeslimEdilecekUrunSil($scope.secilenKayit);
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
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    TESLIM_EDILECEK_URUN_ADI: null,
                    PROJE_ID: $scope.projeID,
                    LISTE: true
                };
                $scope.ProjeTeslimEdilecekUrunGetData($scope.AramaKriter);
            }

            $scope.AramaKriterTeslimedilecekUrun = {

                LISTE: false
            };



            $scope.ProjeTeslimEdilecekUrunEkleGuncelle = function (InfoTeslimEdilecekUrun, Durum) {
                $scope.formCalistirildiTeslimEdilecekUrun = true;

                if ($scope.frmProjeTeslimEdilecekUrun.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeTeslimEdilecekUrun);
                    return;
                }
                $rootScope.sayfayukleniyor = true;
                if (Durum == true) {
                    InfoTeslimEdilecekUrun.TESLIM_EDILECEK_URUN_DURUM = true;
                }
                else {
                    InfoTeslimEdilecekUrun.TESLIM_EDILECEK_URUN_DURUM = false;
                }
                InfoTeslimEdilecekUrun.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeTeslimEdilecekUrun.ProjeTeslimEdilecekUrunEkleGuncelle(InfoTeslimEdilecekUrun);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiTeslimEdilecekUrun = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Teslim edilecek ürün kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teslim edilecek ürün kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Teslim edilecek ürün kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjeTeslimEdilecekUrunGetData();
                        angular.element("#txtTESLIM_EDILECEK_URUN_ADI")[0].value = null;
                        angular.element("#txtTESLIM_EDILECEK_URUN_TESLIM_TARIHI")[0].value = null;
                        $scope.InfoTeslimEdilecekUrun.PROJE_PERSONEL_URUN_SAHIBI_KULLANICI_ID = null;
                        $scope.InfoTeslimEdilecekUrun.TESLIM_EDILECEK_URUN_TESLIM_TARIHI = null;
                        $scope.InfoTeslimEdilecekUrun.TESLIM_EDILECEK_URUN_ADI = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teslim edilecek ürün kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeTeslimEdilecekUrunEkleGuncelleDurum = function (InfoTeslimEdilecekUrun, Durum) {
                if (Durum == true) {
                    InfoTeslimEdilecekUrun.TESLIM_EDILECEK_URUN_DURUM = true;
                }
                else {
                    InfoTeslimEdilecekUrun.TESLIM_EDILECEK_URUN_DURUM = false;
                }
                InfoTeslimEdilecekUrun.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeTeslimEdilecekUrun.ProjeTeslimEdilecekUrunEkleGuncelle(InfoTeslimEdilecekUrun);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Teslim edilecek ürün durum kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teslim edilecek ürün durum kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Teslim edilecek ürün durum kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjeTeslimEdilecekUrunGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teslim edilecek ürün durum kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }


        }]);

