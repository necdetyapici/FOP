angular.module('inspinia').controller(
    'ik_personel_masraf_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvMasraf', 'srvKullaniciProje', 'srvMasrafDetay', 'srvMasrafDetayEkler', 'srvIkPersonel', 'srvAvans', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvMasraf, srvKullaniciProje, srvMasrafDetay, srvMasrafDetayEkler, srvIkPersonel, srvAvans, Ayarlarim) {
            $scope.SeciliEtiketler = [];
            $scope.ikPersonelMasrafID = $stateParams.ikPersonelMasrafID;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                LISTE: false,
                KULLANICI_ID: $scope.kullaniciID
            };

            $scope.AramaKriterPersonelAvans = {
                LISTE: false,
                KULLANICI_ID: $scope.kullaniciID,
                MASRAF: true
            };

            $scope.init = function () {
                $scope.InfoPersonelMasraf = {};
                $scope.KullaniciProjeGetData();
                $scope.PersonelAvansGetData();
                $scope.MasrafDetayListesi = {};
                if ($scope.ikPersonelMasrafID > 0) {
                    $scope.MasrafSelect();
                    $scope.ParaBirimiGetData();
                    $scope.MasrafDetayGetData();
                    $scope.MasrafDetayEklerGetData();
                    $scope.handleFileSelect = function (evt) {
                        var file = evt[0];
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            $scope.$apply(function ($scope) {
                                $scope.InfoPersonelMasrafDetayEkler.DOSYA_ADI = file.name;
                                $scope.InfoPersonelMasrafDetayEkler.DOSYA_BOYUTU = file.size;
                                $scope.InfoPersonelMasrafDetayEkler.DOSYA_TIPI = file.type;
                                $scope.InfoPersonelMasrafDetayEkler.DOSYA = evt.target.result;
                            });
                        };
                        reader.readAsDataURL(file);
                    };

                } else {
                    $scope.InfoPersonelMasraf.TALEP_EDEN_KULLANICI_AD_SOYAD = $scope.$storage.AD_SOYAD;
                }

               

            };

            $scope.AramaKriterMasrafDetay = {
                MASRAF_ID: $scope.ikPersonelMasrafID,
                LISTE: false,
                BELGE_NO: '',
                BELGE_TARIHI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.AramaKriterMasrafDetayEkler = {
                MASRAF_ID: $scope.ikPersonelMasrafID,
                LISTE: true,
                BELGE_NO: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.MasrafSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasraf.MasrafSelect($scope.ikPersonelMasrafID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel masraf bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel masraf bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonelMasraf = gelen.data;
                        if (($scope.InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID === 1 || $scope.InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID === 4) && $scope.InfoPersonelMasraf.AVANS_ID > 0) {
                            $scope.InfoPersonelMasraf.AVANS_ID = [$scope.InfoPersonelMasraf.AVANS_ID, $scope.InfoPersonelMasraf.ALINAN_AVANS_TUTARI];
                        }
                        
                        $scope.pasif = true;
                        $scope.personelGenelIkYoneticiId = $scope.InfoPersonelMasraf.GOZDEN_GECIREN_KULLANICI_ID;
                        $scope.personelGenelIkYoneticiKullaniciAdSoyad = $scope.InfoPersonelMasraf.GOZDEN_GECIREN_KULLANICI_AD_SOYAD;


                        if ($scope.InfoPersonelMasraf.PROJE_ID) {
                            $scope.GetProjeEtiket($scope.InfoPersonelMasraf.PROJE_ID, false);
                        }
                       
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel masraf bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.GetProjeEtiket = function (projeID, sifirla) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeEtiketListesi(projeID)
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;

                    //let array = [];

                    //for (var i = 0; i < gelen.data.length; i++) {
                    //    array.push(gelen.data[i].ADI);
                    //}

                    $scope.ProjeEtiketListesi = gelen.data;

                    if (sifirla)
                        $scope.InfoPersonelMasraf.SeciliEtiketler = null;
                    //if (gelen.data.Veri.length == 0 && gelen.data.Veri[0].basariDurumu === false) {
                    //    mesajGoster('Dikkat', 'Proje Etiket listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                    //    console.error('Proje Etiket listesi yüklerken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    //} else {
                    //    $scope.ProjeEtiketListesi = gelen.data.Veri;
                    //}
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje Etiket listesi yüklerken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MasrafEkleGuncelle = function (InfoPersonelMasraf) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiPersonelMasraf = true;
                if ($scope.frmIkPersonelMasraf.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmIkPersonelMasraf);
                    return;
                }
                if (InfoPersonelMasraf.AVANS_ID !== null && InfoPersonelMasraf.AVANS_ID !== undefined) {
                    InfoPersonelMasraf.AVANS_ID = InfoPersonelMasraf.AVANS_ID[0];
                }
                else {
                    InfoPersonelMasraf.AVANS_ID = null;
                }
                
                InfoPersonelMasraf.TALEP_EDEN_KULLANICI_ID = $scope.kullaniciID;
                InfoPersonelMasraf.GOZDEN_GECIREN_KULLANICI_ID = $scope.personelGenelIkYoneticiId;               
                var promiseGet = srvMasraf.MasrafEkleGuncelle(InfoPersonelMasraf);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel masraf kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel masraf kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel masraf kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                       //  $scope.MasrafSelect();
                        if (InfoPersonelMasraf.AVANS_ID !== null) {
                            $scope.InfoPersonelMasraf.AVANS_ID = [InfoPersonelMasraf.AVANS_ID, InfoPersonelMasraf.ALINAN_AVANS_TUTARI];
                        }
                        $scope.ikPersonelMasrafID = gelen.data.returnKayitNo;
                        $state.go('insankaynaklari.ikpersonelkayit.ikpersonelmasrafkayit', { ikPersonelMasrafID: $scope.ikPersonelMasrafID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel masraf kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.etiketOlustur = function (yeniEtiket) {
                var item = {
                    PROJE_ETIKET_ID: -1,
                    ADI: yeniEtiket,
                    KULLANICI_ID: -1,
                    MUSTERI_ID: -1,
                    KAYIT_TARIHI: Date.now,
                    PROJE_ID: $scope.InfoPersonelMasraf.PROJE_ID

                };

                return item;
            }


            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje listesi yüklerken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje listesi yüklerken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ParaBirimiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getParaBirimi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Para birimi listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Para birimi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ParaBirimiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Para birimi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MasrafDetayGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasrafDetay.MasrafDetayGetData($scope.AramaKriterMasrafDetay);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay listesi yüklerken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiMasrafDetay = gelen.data.ToplamKayitSayisi;
                        $scope.MasrafDetayListesi = gelen.data.Veri;
                        $scope.masrafToplam($scope.MasrafDetayListesi);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Masraf detay listesi yüklerken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MasrafDetayEkleGuncelle = function (InfoPersonelMasrafDetay) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiMasrafDetay = true;
                if ($scope.frmPersonelMasrafDetay.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmPersonelMasrafDetay);
                    return;
                }
                InfoPersonelMasrafDetay.MASRAF_ID = $scope.ikPersonelMasrafID;
              
                var promiseGet = srvMasrafDetay.MasrafDetayEkleGuncelle(InfoPersonelMasrafDetay);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Masraf detay kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.MasrafDetayGetData();
                        $scope.formCalistirildiMasrafDetay = false;
                        InfoPersonelMasrafDetay.BELGE_NO = null;
                        $('#txtBELGE_TARIHI').val(null);
                        InfoPersonelMasrafDetay.TUTAR = null;
                        InfoPersonelMasrafDetay.ACIKLAMA = null;
                        InfoPersonelMasrafDetay.PARA_BIRIMI_ID = null;
                        InfoPersonelMasrafDetay.BELGE_TARIHI = null;

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Masraf detay kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MasrafDetaySil = function (InfoPersonelMasrafDetay) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasrafDetay.MasrafDetaySil(InfoPersonelMasrafDetay.MASRAF_DETAY_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Masraf detay silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.MasrafDetayListesi.length == 1 && $scope.toplamKayitSayisiMasrafDetay > 10) {
                            $scope.AramaKriterMasrafDetay.SayfaNo = $scope.AramaKriterMasrafDetay.SayfaNo - 1;
                        }
                        $scope.MasrafDetayGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Masraf detay silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.modalSilmeOnayiMasrafDetay = function (InfoMasrafDetay) {
                $scope.secilenKayit = InfoMasrafDetay;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.MasrafDetaySil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizleMasrafDetay = function () {
                $scope.AramaKriterMasrafDetay = {
                    MASRAF_ID: $scope.ikPersonelMasrafID,
                    LISTE: true,
                    BELGE_NO: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $('#txtBELGE_TARIH').val(null);
                $scope.MasrafGetData($scope.AramaKriterMasrafDetay);
            };

            $scope.InfoPersonelMasrafDetayEkler = {
                MASRAF_DETAY_EKLER_ID: null,
                MASRAF_DETAY_ID: '',
                MASRAF_ID: '',
                DOSYA_ADI: '',
                DOSYA_BOYUTU: '',
                DOSYA: '',
                DOSYA_TIPI: ''
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
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Masraf detay ekler listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.MasrafDetayEklerEkleGuncelle = function (InfoPersonelMasrafDetayEkler) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiPersonelMasrafDetayEkler = true;
                if ($scope.frmPersonelMasrafDetayEkler.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmPersonelMasrafDetayEkler);
                    return;
                }
                InfoPersonelMasrafDetayEkler.MASRAF_ID = $scope.ikPersonelMasrafID;
                var promiseGet = srvMasrafDetayEkler.MasrafDetayEklerEkleGuncelle(InfoPersonelMasrafDetayEkler);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay ekler kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay ekler kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Masraf detay ekler kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.MasrafDetayEklerGetData();
                        $scope.formCalistirildiPersonelMasrafDetayEkler = false;
                        $scope.InfoPersonelMasrafDetayEkler.MASRAF_DETAY_ID = null;
                        $scope.masrafDetayEklerDokumanSifirla();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Masraf detay ekler kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MasrafDetayEklerSil = function (InfoMasrafDetayEkler) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasrafDetayEkler.MasrafDetayEklerSil(InfoMasrafDetayEkler.MASRAF_DETAY_EKLER_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Masraf detay ekler silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Masraf detay ekler silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Masraf detay ekler silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.MasrafDetayEklerListesi.length == 1 && $scope.toplamKayitSayisiMasrafDetayEkler > 10) {
                            $scope.AramaKriterMasrafDetayEkler.SayfaNo = $scope.AramaKriterMasrafDetayEkler.SayfaNo - 1;
                        }
                        $scope.MasrafDetayEklerGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Masraf detay ekler silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.modalSilmeOnayiMasrafDetayEkler = function (InfoMasrafDetayEkler) {
                $scope.secilenKayit = InfoMasrafDetayEkler;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.MasrafDetayEklerSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizleMasrafDetayEkler = function () {

                $scope.AramaKriterMasrafDetayEkler = {
                    MASRAF_ID: $scope.ikPersonelMasrafID,
                    LISTE: true,
                    BELGE_NO: null,
                    DOSYA_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.MasrafDetayEklerGetData($scope.AramaKriterMasrafDetayEkler);
            };

            $scope.avansSec = function (avans) {
                if (avans !== null) {
                    $scope.InfoPersonelMasraf.AVANS_ID = [avans[0], avans[1]];
                    $scope.InfoPersonelMasraf.ALINAN_AVANS_TUTARI = avans[1];
                } else {
                    $scope.InfoPersonelMasraf.AVANS_ID = null;
                    $scope.InfoPersonelMasraf.ALINAN_AVANS_TUTARI = null;
                }
                
                $scope.masrafToplam($scope.MasrafDetayListesi);
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
                    $scope.InfoPersonelMasraf.IADE_EDILECEK_TUTAR = 0;
                    $scope.InfoPersonelMasraf.ODENECEK_TUTAR = 0;
                }
                $scope.toplamMasraf = parseFloat($scope.toplamMasraf).toFixed(2);
            };

            $scope.MasrafOnay = function (InfoPersonelMasraf) {
                $rootScope.sayfayukleniyor = true;

                $scope.InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID = 6;
                $scope.InfoPersonelMasraf.TALEP_EDEN_KULLANICI_ID = $scope.kullaniciID;

                var promiseGet = srvMasraf.MasrafOnay(InfoPersonelMasraf);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel masraf onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel masraf onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel masraf onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.MasrafSelect();
                        if (InfoPersonelMasraf.AVANS_MASRAF_DURUMU_ID === 4) {
                            $scope.MasrafRedGeri();
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

            $scope.masrafDetayEklerDokumanSifirla = function () {
                $scope.InfoPersonelMasrafDetayEkler.DOSYA_ADI = null;
                $scope.InfoPersonelMasrafDetayEkler.DOSYA_BOYUTU = null;
                $scope.InfoPersonelMasrafDetayEkler.DOSYA_TIPI = null;
                $scope.InfoPersonelMasrafDetayEkler.DOSYA = null;
            };

            $scope.PersonelAvansGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvans.AvansGetData($scope.AramaKriterPersonelAvans);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel avans listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel avans listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.PersonelAvansListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel avans listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }


        }]);

