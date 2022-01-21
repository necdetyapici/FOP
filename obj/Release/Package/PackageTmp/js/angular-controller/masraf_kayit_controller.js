angular.module('inspinia').controller(
    'masraf_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvMasraf', 'srvMasrafDetay', 'srvMasrafDetayEkler', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvMasraf, srvMasrafDetay, srvMasrafDetayEkler, Ayarlarim) {
            $scope.masrafID = $stateParams.masrafID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                FILTER: true,
                LISTE: false,
                KULLANICI_ID: $scope.$storage.KULLANICI_ID
            };

            $scope.init = function () {

                $scope.InfoPersonelMasraf = {};
                $scope.MasrafSelect();
   
                $scope.MasrafDetayEklerGetData();
            };

            $scope.AramaKriterMasrafDetay = {
                MASRAF_ID: $scope.masrafID,
                LISTE: false,
                BELGE_NO: '',
                BELGE_TARIHI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.AramaKriterMasrafDetayEkler = {
                MASRAF_ID: $scope.masrafID,
                LISTE: true,
                BELGE_NO: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.MasrafSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasraf.MasrafSelect($scope.masrafID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel masraf bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel masraf bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonelMasraf = gelen.data;
                        $scope.onayKontrol = $scope.InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID;
                        $scope.pasif = true;
                        $scope.MasrafDetayGetData();
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Personel masraf bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.MasrafDetayGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasrafDetay.MasrafDetayGetData($scope.AramaKriterMasrafDetay);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiMasrafDetay = gelen.data.ToplamKayitSayisi;
                        $scope.MasrafDetayListesi = gelen.data.Veri;
                        $scope.masrafToplam(gelen.data.Veri);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Masraf detay listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.filtreTemizleMasrafDetay = function () {

                $scope.AramaKriterMasrafDetay = {
                    MASRAF_ID: $scope.masrafID,
                    LISTE: true,
                    BELGE_NO: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $('#txtBELGE_TARIHI').val(null);
                $scope.MasrafDetayGetData($scope.AramaKriterMasrafDetay);
            };



            $scope.MasrafDetayEklerGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasrafDetayEkler.MasrafDetayEklerGetData($scope.AramaKriterMasrafDetayEkler);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay ekler listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay ekler listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiMasrafDetayEkler = gelen.data.ToplamKayitSayisi;
                        $scope.MasrafDetayEklerListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Masraf detay ekler listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };




            $scope.filtreTemizleMasrafDetayEkler = function () {
                $scope.AramaKriterMasrafDetayEkler = {
                    MASRAF_ID: $scope.masrafID,
                    LISTE: true,
                    BELGE_NO: null,
                    DOSYA_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.MasrafDetayEklerGetData($scope.AramaKriterMasrafDetayEkler);
            };

            $scope.masrafToplam = function (MasrafDetayListesi) {
                $scope.toplamMasraf = 0;
                $scope.onaylananMasraf = 0;
                $scope.reddedilenMasraf = 0;
                angular.forEach(MasrafDetayListesi, function (value, key) {
                    $scope.toplamMasraf = $scope.toplamMasraf + value.TUTAR;
                    if (value.DURUMU === true) {
                        $scope.onaylananMasraf = $scope.onaylananMasraf + value.TUTAR;
                    }
                    if (value.DURUMU === false) {
                        $scope.reddedilenMasraf = $scope.reddedilenMasraf + value.TUTAR;
                    }
                });
                $scope.onaylananMasraf = parseFloat($scope.onaylananMasraf).toFixed(2);
                $scope.reddedilenMasraf = parseFloat($scope.reddedilenMasraf).toFixed(2);
                $scope.masrafHarcama = $scope.InfoPersonelMasraf.ALINAN_AVANS_TUTARI - $scope.onaylananMasraf;
                $scope.masrafHarcama = parseFloat($scope.masrafHarcama).toFixed(2);
                if ($scope.masrafHarcama > 0) {
                    $scope.InfoPersonelMasraf.IADE_EDILECEK_TUTAR = $scope.masrafHarcama;
                    $scope.InfoPersonelMasraf.ODENECEK_TUTAR = 0;
                }
                else if ($scope.masrafHarcama < 0) {
                    $scope.InfoPersonelMasraf.ODENECEK_TUTAR = $scope.masrafHarcama;
                    $scope.InfoPersonelMasraf.IADE_EDILECEK_TUTAR = 0;
                }
                else {
                    $scope.InfoPersonelMasraf.ODENECEK_TUTAR = 0;
                    $scope.InfoPersonelMasraf.IADE_EDILECEK_TUTAR = 0;
                }
                $scope.toplamMasraf = parseFloat($scope.toplamMasraf).toFixed(2);

            };



            $scope.MasrafDetayRed = function (InfoPersonelMasrafDetayOnay) {
                $scope.InfoPersonelMasrafDetayOnay = InfoPersonelMasrafDetayOnay;
                $scope.InfoPersonelMasrafDetayOnay.RED_ACIKLAMA = null;
                $scope.modalInstanceMasrafDetayRed = $modal.open({
                    templateUrl: 'views/common/modal_masraf_detay_red.html',
                    controller: 'masraf_kayit_controller',
                    size: 'lg',
                    //windowClass: 'animated flipInY',
                    scope: $scope
                });
                $scope.modalInstanceMasrafDetayRed.result.then(function () {
                    $scope.MasrafDetayGetData();
                }, function (data) {
                });
            };

            //modal proje test senaryo test adim dosyasında başka yerde kullanıldığı için Geri olarak ismi kullanılıyor.
            $scope.MasrafDetayRedGeri = function () {
                $scope.modalInstanceMasrafDetayRed.close();
            };

            $scope.MasrafDetayOnay = function (InfoPersonelMasrafDetayOnay) {
                $rootScope.sayfayukleniyor = true;
                if (InfoPersonelMasrafDetayOnay.DURUMU === false) {
                    $scope.formCalistirildiPersonelMasrafDetayReddet = true;
                    if ($scope.frmPersonelMasrafDetayReddet.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $rootScope.focusToInvalid($scope.frmPersonelMasrafDetayReddet);
                        return;
                    }
                }
                InfoPersonelMasrafDetayOnay.IADE_EDILECEK_TUTAR = $scope.InfoPersonelMasraf.IADE_EDILECEK_TUTAR;
                InfoPersonelMasrafDetayOnay.ODENECEK_TUTAR = $scope.InfoPersonelMasraf.ODENECEK_TUTAR;
                InfoPersonelMasrafDetayOnay.MASRAF_ID = $scope.masrafID;
                var promiseGet = srvMasrafDetay.MasrafDetayOnay(InfoPersonelMasrafDetayOnay);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Masraf detay onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if (InfoPersonelMasrafDetayOnay.DURUMU === false) {
                            $scope.MasrafDetayRedGeri();
                        }
                        else {
                            $scope.MasrafDetayGetData();
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Masraf detay onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MasrafGozdenGecir = function () {
                $scope.$modalInstanceMasrafRed = $modal.open({
                    templateUrl: 'views/common/modal_masraf_gozden_gecir.html',
                    controller: 'masraf_kayit_controller',
                    size: 'lg',
                    //windowClass: 'animated flipInY',
                    scope: $scope
                });
            };

            
            $scope.MasrafGozdenGecirGeri = function () {
                $scope.$modalInstanceMasrafRed.dismiss('cancel');
            };


            $scope.MasrafRed = function () {
                $scope.$modalInstanceMasrafRed = $modal.open({
                    templateUrl: 'views/common/modal_masraf_red.html',
                    controller: 'masraf_kayit_controller',
                    size: 'lg',
                    //windowClass: 'animated flipInY',
                    scope: $scope
                });
            };

            //modal proje test senaryo test adim dosyasında başka yerde kullanıldığı için Geri olarak ismi kullanılıyor.
            $scope.MasrafRedGeri = function () {
                $scope.$modalInstanceMasrafRed.dismiss('cancel');
            };

            $scope.MasrafOnay = function (InfoPersonelMasraf) {
                $rootScope.sayfayukleniyor = true;
                if (InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID === 4) {
                    $scope.formCalistirildiPersonelMasrafReddet = true;
                    if ($scope.frmPersonelMasrafReddet.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $scope.InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID = $scope.onayKontrol;
                        $rootScope.focusToInvalid($scope.frmPersonelMasrafReddet);
                        return;
                    }
                }

                if (InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID === 2) {
                    $scope.formCalistirildiPersonelMasrafGG = true;
                    if ($scope.frmPersonelMasrafGG.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $scope.InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID = $scope.onayKontrol;
                        $rootScope.focusToInvalid($scope.frmPersonelMasrafGG);
                        return;
                    }
                }

                var promiseGet = srvMasraf.MasrafOnay(InfoPersonelMasraf);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel masraf onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel masraf onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                        $scope.InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID = $scope.onayKontrol;
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel masraf onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");

                        if (InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID === 4) {
                            $scope.MasrafRedGeri();
                        }


                        if (InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID === 2) {
                            $scope.MasrafGozdenGecirGeri();
                        }

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel masraf onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.IkPersonelMasrafDetayEklerGoster = function (ikPersonelMasrafDetayEklerID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasrafDetayEkler.MasrafDetayEklerSelect(ikPersonelMasrafDetayEklerID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel masraf detay ek bilgileri yüklenirken bir hata oluştu. Hata:' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel masraf detay ek bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        $scope.RaporData = { Dosya: gelen.data.MASRAF_DETAY_DOSYA_URL, canPrint: browserCanPrint, ekUzanti: 'pdf' };
                        $rootScope.sayfayukleniyor = false;
                        $scope.modalInstanceEkGoster = $modal.open({
                            templateUrl: 'views/common/modal_rapor_pdf_viewer.html',
                            size: 'lg',
                            scope: $scope
                        });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel ek yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceEkGoster.dismiss('cancel');
            };
        }]);

