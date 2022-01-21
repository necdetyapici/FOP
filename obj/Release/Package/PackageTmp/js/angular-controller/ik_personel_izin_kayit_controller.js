angular.module('inspinia').controller(
    'ik_personel_izin_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', '$filter', 'ngDialog', 'srvGenel', 'srvIkPersonelIzin', 'srvIkPersonel', 'Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, $filter, ngDialog, srvGenel, srvIkPersonelIzin, srvIkPersonel, Constants, Ayarlarim) {
            $scope.ikPersonelIzinID = $stateParams.ikPersonelIzinID;
            $scope.kullaniciID = $stateParams.kullaniciID;
            // $scope.kalanYillikIzin = 0;
            $scope.Ayarlar = Ayarlarim;
            $scope.IzinTuru = Constants.IZIN_TURU;
            $scope.IzinDurumu = Constants.IZIN_DURUMU;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false,
                FILTER: true,
                KULLANICI_ID: ''
            };

            $scope.init = function () {
                $scope.IzinTuruGetData();

                if ($scope.ikPersonelIzinID > 0) {
                    $scope.IkPersonelIzinSelect();
                }

            };
            $scope.AramaKriterIzinRapor = {

                KULLANICI_ID: $scope.kullaniciID,
                LISTE: false
            };



            $scope.IkPersonelIzinSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelIzin.IkPersonelIzinSelect($scope.ikPersonelIzinID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel izin bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel izin bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonelIzin = gelen.data;
                        $scope.personelGenelIkYoneticiId = $scope.InfoPersonelIzin.DEPARTMAN_YONETICI_KULLANICI_ID;
                        $scope.personelGenelIkYoneticiKullaniciAdSoyad = $scope.InfoPersonelIzin.DEPARTMAN_YONETICI_KULLANICI_AD_SOYAD;
                        $scope.InfoPersonelIzin.izinSuresi = $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI_ADI;
                        $scope.IzinHesapla($scope.InfoPersonelIzin);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel izin bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkPersonelIzinKayitOnKontrol = function (InfoPersonelIzin) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiPersonelIzin = true;
                if ($scope.frmPersonelIzin.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmPersonelIzin);
                    return;
                }

                //Personelin kalan izni çekilecek buraya
                $scope.kalanIzin = $scope.InfoPersonel.DEVIR_IZNI - (InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI / $scope.InfoPersonelIzinHesaplama.MUSTERI_CALISMA_SAATI);
                if (InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.YillikIzin && $scope.kalanIzin < 0) {
                    $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI = $scope.InfoPersonelIzinHesaplama.IK_PERSONEL_IZIN_SURESI;
                    $scope.HakEdilmeyenYillikIzinOnayi();
                }
                else if (InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.KullanilamayanYillikIzin) {
                    if ($scope.kalanIzin > 0) {
                        $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI = $scope.InfoPersonelIzin.izinSuresi * $scope.InfoPersonelIzinHesaplama.MUSTERI_CALISMA_SAATI;
                        $scope.IkPersonelKullanilmayanIzinUcreti();
                    } else {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Kullanılmayan yıllık izin ücreti hakkınız bulunmamaktadır. ", 'W');
                        return;
                    }
                    $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI = InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI;
                    $scope.formCalistirildiPersonelIzin = false;

                } else {
                    $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI = InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI;
                    $scope.IkPersonelIzinEkleGuncelle($scope.InfoPersonelIzin);
                }
            };

            $scope.IkPersonelIzinEkleGuncelle = function (InfoPersonelIzin) {
                $rootScope.sayfayukleniyor = true;
                InfoPersonelIzin.KULLANICI_ID = $scope.kullaniciID;
                InfoPersonelIzin.DEPARTMAN_YONETICI_KULLANICI_ID = $scope.personelGenelIkYoneticiId;
                var promiseGet = srvIkPersonelIzin.IkPersonelIzinEkleGuncelle(InfoPersonelIzin);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel izin kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel izin kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel izin kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if (InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.YillikIzin && $scope.kalanIzin < 0) {
                            $scope.$modalInstanceYillikIzin.close();
                        }
                        if (InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.KullanilamayanYillikIzin) {
                            $scope.$modalInstanceKullanilmayanYillikIzinUcreti.close();
                        }
                        $scope.ikPersonelIzinID = gelen.data.returnKayitNo;
                        $scope.IkPersonelIzinSelect();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel izin kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IzinTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIzinTuru();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İzin türü listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İzin türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IzinTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İzin türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.IzinTurDegistirme = function () {
                $scope.InfoPersonelIzin.IZIN_YILI = null;
                $scope.InfoPersonelIzin.IZINDE_BULUNACAGI_YER = null;
                $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI = null;
                $scope.InfoPersonelIzin.IZIN_TALEP_NEDENI = null;
                $('#txtIK_PERSONEL_IZIN_BASLANGIC_TARIHI').val(null);
                $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_BASLANGIC_TARIHI = null;
                $('#txtIK_PERSONEL_IZIN_BITIS_TARIHI').val(null);
                $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_BITIS_TARIHI = null;
                $('#txtIK_PERSONEL_ISE_BASLANGIC_TARIHI').val(null);
                $scope.InfoPersonelIzin.IK_PERSONEL_ISE_BASLANGIC_TARIHI = null;
                $scope.InfoPersonelIzin.INSAN_KAYNAKLARI_YONETICI_KULLANICI_ID = null;
                $scope.InfoPersonelIzin.GENEL_MUDUR_KULLANICI_ID = null;
                $scope.InfoPersonelIzin.MUHASEBE_YONETICISI_ID = null;
                $scope.InfoPersonelIzin.izinSuresi = null;

                if ($scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.DogumIzin || $scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.EvlilikIzin || $scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.VefatIzin || $scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.BabalikIzin) {
                    $scope.bitisTarihiPasif = true;
                } else {
                    $scope.bitisTarihiPasif = false;
                }

                //if ($scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.KullanilamayanYillikIzin) {
                //    $scope.IkPersonelIzinHesaplama();
                //}


            };

            $scope.HakEdilmeyenYillikIzinOnayi = function () {
                $rootScope.sayfayukleniyor = false;
                $scope.$modalInstanceYillikIzin = $modal.open({
                    templateUrl: 'views/common/modal_hak_edilmeyen_yillik_izin_onayi.html',
                    backdrop: 'static',
                    scope: $scope
                });
            };

            $scope.GeriIkPersonelYillikIzin = function () {
                $scope.$modalInstanceYillikIzin.close();
            };

            $scope.IkPersonelKullanilmayanIzinUcreti = function () {
                $rootScope.sayfayukleniyor = false;
                $scope.$modalInstanceKullanilmayanYillikIzinUcreti = $modal.open({
                    templateUrl: 'views/common/modal_izin_ucreti_talebi.html',
                    backdrop: 'static',
                    scope: $scope
                });
            };

            $scope.GeriIkPersonelYillikIzinUcreti = function () {
                $scope.$modalInstanceKullanilmayanYillikIzinUcreti.close();
            };

            $scope.AramaKriterIzinHesapla = {
                IZIN_TURU_ID: '',
                IK_PERSONEL_IZIN_BASLANGIC_TARIHI: '',
                IK_PERSONEL_IZIN_BITIS_TARIHI: ''
            };

            $scope.IzinHesapla = function (InfoPersonelIzin) {
                $scope.AramaKriterIzinHesapla.IZIN_TURU_ID = InfoPersonelIzin.IZIN_TURU_ID;
                $scope.AramaKriterIzinHesapla.IK_PERSONEL_IZIN_BASLANGIC_TARIHI = null;
                $scope.AramaKriterIzinHesapla.IK_PERSONEL_IZIN_BITIS_TARIHI = null;
                if (InfoPersonelIzin.IK_PERSONEL_IZIN_BASLANGIC_TARIHI != null && (InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.DogumIzin || InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.EvlilikIzin || InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.VefatIzin || InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.BabalikIzin)) {
                    $scope.AramaKriterIzinHesapla.IK_PERSONEL_IZIN_BASLANGIC_TARIHI = InfoPersonelIzin.IK_PERSONEL_IZIN_BASLANGIC_TARIHI;
                    $scope.IkPersonelIzinHesaplama();
                }

                if (InfoPersonelIzin.IK_PERSONEL_IZIN_BASLANGIC_TARIHI != null && InfoPersonelIzin.IK_PERSONEL_IZIN_BITIS_TARIHI != null && InfoPersonelIzin.IZIN_TURU_ID != $scope.IzinTuru.KullanilamayanYillikIzin) {
                    $scope.AramaKriterIzinHesapla.IK_PERSONEL_IZIN_BASLANGIC_TARIHI = InfoPersonelIzin.IK_PERSONEL_IZIN_BASLANGIC_TARIHI;
                    $scope.AramaKriterIzinHesapla.IK_PERSONEL_IZIN_BITIS_TARIHI = InfoPersonelIzin.IK_PERSONEL_IZIN_BITIS_TARIHI;
                    $scope.IkPersonelIzinHesaplama();
                }

                if (InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.KullanilamayanYillikIzin) {
                    $scope.IkPersonelIzinHesaplama();
                }
            }

            $scope.IkPersonelIzinHesaplama = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelIzin.IkPersonelIzinHesaplama($scope.AramaKriterIzinHesapla);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel izin bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel izin bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonelIzinHesaplama = gelen.data;
                        if ($scope.ikPersonelIzinID == 0) {
                            $scope.InfoPersonelIzin.izinSuresi = $scope.InfoPersonelIzinHesaplama.IK_PERSONEL_IZIN_SURESI_ADI;
                        }
                        
                        $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_SURESI = $scope.InfoPersonelIzinHesaplama.IK_PERSONEL_IZIN_SURESI;
                        if ($scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.DogumIzin || $scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.EvlilikIzin || $scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.VefatIzin || $scope.InfoPersonelIzin.IZIN_TURU_ID == $scope.IzinTuru.BabalikIzin) {
                            $scope.InfoPersonelIzin.IK_PERSONEL_IZIN_BITIS_TARIHI = $scope.InfoPersonelIzinHesaplama.IK_PERSONEL_IZIN_BITIS_TARIHI;
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel izin bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkPersonelIzinOnaylama = function (InfoPersonelIzinOnay) {
                $rootScope.sayfayukleniyor = true;
                

                var promiseGet = srvIkPersonelIzin.IzinOnaylama(InfoPersonelIzinOnay);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel izin onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel izin onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel izin onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if (InfoPersonelIzinOnay.IZIN_DURUMU_ID == $scope.IzinDurumu.Reddedildi) {
                            $scope.GeriIzinReddet();
                        }
                        $scope.IkPersonelIzinGetData($scope.AramaKriter);
                        //else {
                        //    $scope.IkPersonelIzinGetData($scope.AramaKriter);
                        //}
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel izin onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

        }]);


