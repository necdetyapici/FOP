angular.module('inspinia').controller(
    'b_g_risk_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvBGRisk', 'srvRiskIslemeStratejisi', 'srvBGAciklik', 'srvBGRiskTehdit', 'srvEtkiDegeri', 'srvOlasilikDegeri', 'srvVarlikDegeri', 'srvVarlikOlasilikEtkiDegeriSonuc', 'srvUygulamaKontrolKriteri','srvSurec', 'srvKullanici',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvBGRisk, srvRiskIslemeStratejisi, srvBGAciklik, srvBGRiskTehdit, srvEtkiDegeri, srvOlasilikDegeri, srvVarlikDegeri, srvVarlikOlasilikEtkiDegeriSonuc, srvUygulamaKontrolKriteri,srvSurec,srvKullanici) {
            $scope.bgRiskID = $stateParams.bgRiskID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                OLASILIK_ETKI_DEGERI_SONUC: '',
                LISTE: false
            };

            $scope.AramaKriterListe = {
                FILTER: true,
                LISTE: false
            };

            $scope.AramaKriterUygulamaKontrolKriteri = {
                UYGULAMA_KONTROL_KRITERI_RISK: false,
                LISTE: false
            };
            $scope.init = function () {
                $scope.EtkiDegeriGetData();
                $scope.OlasilikDegeriGetData();
                $scope.VarlikDegeriGetData();
                $scope.SurecGetData();
                $scope.UygulamaKontrolKriteriGetData();
                $scope.BGRiskSorumluGetData();
                if ($scope.bgRiskID == 0) {
                    $scope.bgRiskDegerlendirmeTarih = new Date;
                }
                if ($scope.bgRiskID > 0) {
                    $scope.BGRiskSelect();
                }
                $scope.BGAciklikGetData();
                $scope.RiskIslemeStratejisiGetData();
            }

            $scope.BGRiskSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRisk.BGRiskSelect($scope.bgRiskID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk kayıt bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk kayıt bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
                        //$scope.VarlikPuaniHesapla($scope.Info.VARLIK_GIZLILIK_KATSAYISI_ID, $scope.Info.VARLIK_BUTUNLUK_KATSAYISI_ID, $scope.Info.VARLIK_ERISEBILIRLIK_KATSAYISI_ID);
                        $scope.RiskPuaniHesapla($scope.Info.OLASILIK_DEGERI_ID, $scope.Info.ETKI_DEGERI_ID);
                        $scope.VarlikOlasilikEtkiDegeriSonucGetData();
                        $scope.bgRiskNoTarih = $scope.Info.B_G_RISK_NO;
                        $scope.bgRiskDegerlendirmeTarih = $scope.Info.RISK_DEGERLENDIRME_TARIHI;
                        if ($scope.Info.B_G_ACIKLIK_ID > 0) {
                            $scope.BGRiskTehditGetData();
                        }
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
                        console.error('Bilgi güvenliği risk kayıt bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.BGRiskEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmBGRisk.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmBGRisk);
                    return;
                }
                if ($scope.bgRiskID > 0) {
                    Info.B_G_RISK_NO_DEGERI = Info.B_G_RISK_NO;
                }
                Info.VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ID = $scope.VarlikOlasilikEtkiDegeriSonucListesi[0].VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ID;
                Info.RISK_DEGERLENDIRME_TARIHI = $scope.bgRiskDegerlendirmeTarih;
                var promiseGet = srvBGRisk.BGRiskEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Bilgi güvenliği kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.bgRiskID = gelen.data.returnKayitNo;
                        $scope.BGRiskSelect();
                        $scope.uygulamaKontrol = true;
                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.BGAciklikGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGAciklik.BGAciklikGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.BGAciklikListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.BGRiskTehditGetData = function () {
                $rootScope.sayfayukleniyor = true;
                if ($scope.Info.B_G_ACIKLIK_ID != $scope.aciklik && $scope.aciklik != null) {
                    $scope.Info.B_G_RISK_TEHDIT_ID = null;
                }
                $scope.aciklik = $scope.Info.B_G_ACIKLIK_ID;
                var aciklik_Id = $scope.Info.B_G_ACIKLIK_ID;
                if (aciklik_Id == null || aciklik_Id == undefined) {
                    aciklik_Id = 0;
                }
                var promiseGet = srvBGRiskTehdit.BGRiskTehditTanimlamaSelect(aciklik_Id);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk tehdit listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk tehdit listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.BGRiskTehditListesi = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk tehdit listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //SrvGenel hatalarına bakılmadı
            $scope.SurecGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvSurec.SurecGetData();
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Süreç listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Süreç listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.SurecListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Süreç listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.RiskIslemeStratejisiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvRiskIslemeStratejisi.RiskIslemeStratejisiGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk işleme strateji listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk işleme strateji listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.RiskIslemeStratejisiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk işlememe strateji listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.EtkiDegeriGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkiDegeri.EtkiDegeriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etki değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Etki değeri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.EtkiDegeriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etki değeri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.OlasilikDegeriGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Olasılık değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Olasılık değeri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.OlasilikDegeriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Olasılık değeri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.VarlikDegeriGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvVarlikDegeri.VarlikDegeriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık değeri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.VarlikDegeriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Varlık değeri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.RiskPuaniHesapla = function (OLASILIK_DEGERI_ID, ETKI_DEGERI_ID) {
                $scope.olasilikDegeri = 0;
                $scope.etkiDegeri = 0;
                angular.forEach($scope.OlasilikDegeriListesi, function (value, key) {
                    if (value.OLASILIK_DEGERI_ID == OLASILIK_DEGERI_ID) {
                        $scope.olasilikDegeri = value.OLASILIK_DEGERI_KATSAYISI;
                    }
                });
                angular.forEach($scope.EtkiDegeriListesi, function (value, key) {
                    if (value.ETKI_DEGERI_ID == ETKI_DEGERI_ID) {
                        $scope.etkiDegeri = value.ETKI_DEGERI_KATSAYISI;
                    }
                });
                if ($scope.Info.B_G_RISK_ID > 0) {
                    $scope.riskhesap = $scope.olasilikDegeri * $scope.etkiDegeri * $scope.Info.VARLIK_DEGERI;
                }
                else {
                    $scope.riskhesap = $scope.olasilikDegeri * $scope.etkiDegeri * $scope.varlikhesabi;
                }


                if ($scope.riskhesap > 0) {
                    $scope.AramaKriter.OLASILIK_ETKI_DEGERI_SONUC = $scope.riskhesap;
                    $scope.VarlikOlasilikEtkiDegeriSonucGetData();

                }


            };

            $scope.VarlikPuaniHesapla = function (VARLIK_GIZLILIK_KATSAYISI_ID, VARLIK_BUTUNLUK_KATSAYISI_ID, VARLIK_ERISEBILIRLIK_KATSAYISI_ID) {
                $scope.gizlilikKatSayi = 0;
                $scope.butunlukKatSayi = 0;
                $scope.erisebilirlikKaySayi = 0;
                angular.forEach($scope.VarlikDegeriListesi, function (value, key) {
                    if (value.VARLIK_DEGERI_ID == VARLIK_GIZLILIK_KATSAYISI_ID) {
                        $scope.gizlilikKatSayi = value.VARLIK_DEGERI_CARPAN_KATSAYISI;
                    }
                });
                angular.forEach($scope.VarlikDegeriListesi, function (value, key) {
                    if (value.VARLIK_DEGERI_ID == VARLIK_BUTUNLUK_KATSAYISI_ID) {
                        $scope.butunlukKatSayi = value.VARLIK_DEGERI_CARPAN_KATSAYISI;
                    }
                });
                angular.forEach($scope.VarlikDegeriListesi, function (value, key) {
                    if (value.VARLIK_DEGERI_ID == VARLIK_ERISEBILIRLIK_KATSAYISI_ID) {
                        $scope.erisebilirlikKaySayi = value.VARLIK_DEGERI_CARPAN_KATSAYISI;
                    }
                });
                $scope.varlikhesabi = ($scope.gizlilikKatSayi + $scope.butunlukKatSayi + $scope.erisebilirlikKaySayi) / 3;
                $scope.RiskPuaniHesapla($scope.Info.OLASILIK_DEGERI_ID, $scope.Info.ETKI_DEGERI_ID);
                $scope.Info.VARLIK_DEGERI = $scope.varlikhesabi;
            };

            $scope.VarlikOlasilikEtkiDegeriSonucGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;

                var promiseGet = srvVarlikOlasilikEtkiDegeriSonuc.VarlikOlasilikEtkiDegeriSonucGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık olasılık etki değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık olasılık etki değeri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.VarlikOlasilikEtkiDegeriSonucListesi = gelen.data.Veri;
                        if ($scope.VarlikOlasilikEtkiDegeriSonucListesi[0].VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ADI != undefined) {
                            $scope.Info.VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ADI = $scope.VarlikOlasilikEtkiDegeriSonucListesi[0].VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ADI;
                        }
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Varlık olasılık etki değeri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.UygulamaKontrolKriteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteri.UygulamaKontrolKriteriGetData($scope.AramaKriterUygulamaKontrolKriteri);
                promiseGet.then(function (gelen) {
                    //  $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.UygulamaKontrolKriteriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
            $scope.uygulamaKontrolDegistir = function () {
                $scope.uygulamaKontrol = true;
            }

            $scope.BGRiskSorumluGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Sorumlu kişi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Sorumlu kişi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.BgRiskSorumluListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sorumlu kişi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

