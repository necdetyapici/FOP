angular.module('inspinia').controller(
    'proje_iterasyon_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeIterasyon', 'srvProjeSurum', 'srvGenel', 'srvProjeModul', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeIterasyon, srvProjeSurum, srvGenel, srvProjeModul, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                PROJE_ITERASYON_ADI: '',
                PROJE_ITERASYON_BASLANGIC_TARIHI: '',
                PROJE_ITERASYON_BITIS_TARIHI: '',
                PROJE_SURUM_ADI: '',
                PROJE_MODUL_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.AramaKriterModul = {
                PROJE_ID: $scope.projeID,
                MUSTERI_ID: '',
                MODUL_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeIterasyonGetData();
                $scope.ProjeSurumGetData();
                $scope.IterasyonDurumGetData();
                $scope.ProjeModulGetData();
            }

            $scope.ProjeIterasyonGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İterasyon listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeIterasyonListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeIterasyonSil = function (InfoProjeiterasyon) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonSil(InfoProjeiterasyon.PROJE_ITERASYON_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "İterasyon silme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İterasyon silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "İterasyon silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeIterasyonListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeIterasyonGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('İterasyon silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjeiterasyon) {
                $scope.secilenKayit = InfoProjeiterasyon;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeIterasyonSil($scope.secilenKayit);
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
                    PROJE_ID: $scope.projeID,
                    PROJE_ITERASYON_ADI: null,
                    PROJE_SURUM_ADI: null,
                    MODUL_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $("#txtPROJE_ITERASYON_BASLANGIC_TARIH").val(null);
                $("#txtPROJE_ITERASYON_BITIS_TARIH").val(null);
                $scope.ProjeIterasyonGetData($scope.AramaKriter);
            }

            $scope.ProjeIterasyonEkleGuncelle = function (InfoProjeiterasyon) {
                $scope.formCalistirildiProjeiterasyon = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeiterasyon.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeiterasyon);
                    return;
                }
                InfoProjeiterasyon.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonEkleGuncelle(InfoProjeiterasyon);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjeiterasyon = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "İterasyon kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İterasyon kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "İterasyon kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeIterasyonGetData();
                        //angular.element("#txtPROJE_ITERASYON_ADI")[0].value = null
                        angular.element("#txtPROJE_ITERASYON_BASLANGIC_TARIHI")[0].value = null
                        angular.element("#txtPROJE_ITERASYON_BITIS_TARIHI")[0].value = null
                        //angular.element("#cmbPROJE_MODUL_ID")[0].value = null
                        $scope.InfoProjeiterasyon.PROJE_SURUM_ID = null;
                        $scope.InfoProjeiterasyon.ITERASYON_DURUM_TIPI_ID = null;
                        $scope.InfoProjeiterasyon.PROJE_MODUL_ID = null;
                        $scope.InfoProjeiterasyon.PROJE_ITERASYON_ADI = null;
                        $scope.InfoProjeiterasyon.PROJE_ITERASYON_BASLANGIC_TARIHI = null;
                        $scope.InfoProjeiterasyon.PROJE_ITERASYON_BITIS_TARIHI = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('İterasyon kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.ProjeSurumGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurum.ProjeSurumGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje sürüm listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ProjeSurumListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Sürüm listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.IterasyonDurumGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIterasyonDurumTipi();

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje sürüm listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IterasyonDurumListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            }

            $scope.ProjeModulGetData = function (AramaKriterModul) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeModul.ProjeModulGetData($scope.AramaKriterModul);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje modül listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeModulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

