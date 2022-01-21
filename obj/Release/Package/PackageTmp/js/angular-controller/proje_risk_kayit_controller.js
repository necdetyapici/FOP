angular.module('inspinia').controller(
    'proje_risk_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvSurec', 'srvGenel','srvRiskIslemeStratejisi', 'srvProjeRisk', 'srvRiskTuru', 'srvOlasilikDegeri', 'srvEtkiDegeri', 'srvProjePersonel',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvSurec,srvGenel, srvRiskIslemeStratejisi, srvProjeRisk, srvRiskTuru, srvOlasilikDegeri, srvEtkiDegeri, srvProjePersonel) {
            $scope.projeID = $stateParams.projeID;
            $scope.projeRiskID = $stateParams.projeRiskID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriterListe = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };
            $scope.init = function () {
                $scope.RiskTuruGetData();
                $scope.SurecGetData();
                $scope.TedbirOncesiOlasilikDegeriGetData();
                $scope.TedbirOncesiEtkiDegeriGetData();
                $scope.TedbirSonrasiOlasilikDegeriGetData();
                $scope.TedbirSonrasiEtkiDegeriGetData();
                $scope.RiskDerecesiGetData();
                $scope.RiskIslemeStratejisiGetData();
                $scope.ProjePersonelGetData();

                if ($scope.projeRiskID == 0) {
                    //$scope.projeRiskNoTarih = new Date;
                    $scope.projeRiskDegerlendirmeTarih = new Date;
                }
                if ($scope.projeRiskID > 0)
                    $scope.ProjeRiskSelect();
            }

            $scope.ProjeRiskSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRisk.ProjeRiskSelect($scope.projeRiskID);

                promiseGet.then(function (gelen) {
                    // $scope.projeRiskNoTarih = $scope.InfoProjeRisk.PROJE_RISK_NO;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjeRisk = gelen.data;
                        $scope.projeRiskDegerlendirmeTarih = $scope.InfoProjeRisk.RISK_DEGERLENDIRME_TARIHI;
                        $scope.RiskTuruGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeRiskEkleGuncelle = function (InfoProjeRisk) {
                $scope.formCalistirildiProjeRisk = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeRisk.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeRisk);
                    return;
                }

                InfoProjeRisk.PROJE_ID = $scope.projeID;
                //InfoProjeRisk.PROJE_RISK_NO = $scope.projeRiskNoTarih;
                InfoProjeRisk.RISK_DEGERLENDIRME_TARIHI = $scope.projeRiskDegerlendirmeTarih;
                //if ($scope.projeRiskID > 0) {
                //    InfoProjeRisk.PROJE_RISK_NO_DEGERI = InfoProjeRisk.PROJE_RISK_NO;
                //}
                var promiseGet = srvProjeRisk.ProjeRiskEkleGuncelle(InfoProjeRisk);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiProjeRisk = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Risk kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Risk kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.projeRiskID = gelen.data.returnKayitNo;
                        $scope.ProjeRiskSelect();
                    }
                },
                    function (hata) {
                        $scope.formCalistirilformCalistirildiProjeRiskdi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }



            $scope.RiskTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvRiskTuru.RiskTuruGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;                  
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk türü listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk türü listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.RiskTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk türü listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };



            $scope.SurecGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvSurec.SurecGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Süreç listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Süreç listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.SurecListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Süreç listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.TedbirOncesiOlasilikDegeriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.TedbirOncesiOlasilikDegeriListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Tedbir öncesi olasılık değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedbir öncesi olasılık değeri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.TedbirOncesiOlasilikDegeriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedbir öncesi olasılık değeri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.TedbirOncesiEtkiDegeriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkiDegeri.EtkiDegeriGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Tedbir öncesi etki değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedbir öncesi etki değeri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.TedbirOncesiEtkiDegeriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedbir öncesi etki değeri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.TedbirOncesiRiskPuaniHesapla = function (TEDBIR_ONCESI_OLASILIK_DEGERI_ID, TEDBIR_ONCESI_ETKI_DEGERI_ID) {
                angular.forEach($scope.TedbirOncesiOlasilikDegeriListesi, function (value, key) {
                    if (value.OLASILIK_DEGERI_ID == TEDBIR_ONCESI_OLASILIK_DEGERI_ID) {
                        $scope.tedbirOncesiOlasilikDegeri = value.OLASILIK_DEGERI_KATSAYISI;
                    }
                });
                angular.forEach($scope.TedbirOncesiEtkiDegeriListesi, function (value, key) {
                    if (value.ETKI_DEGERI_ID == TEDBIR_ONCESI_ETKI_DEGERI_ID) {
                        $scope.tedbirOncesiEtkiDegeri = value.ETKI_DEGERI_KATSAYISI;
                    }
                });
                $scope.tedbirOncesiRiskPuani = $scope.tedbirOncesiOlasilikDegeri * $scope.tedbirOncesiEtkiDegeri;
                $scope.InfoProjeRisk.TEDBIR_ONCESI_RISK_PUANI = $scope.tedbirOncesiRiskPuani;
            };

            $scope.TedbirSonrasiOlasilikDegeriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvOlasilikDegeri.OlasilikDegeriGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.TedbirSonrasiOlasilikDegeriListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Tedbir sonrası olasılık değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedbir sonrası olasılık değeri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedbir sonrası olasılık değeri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.TedbirSonrasiEtkiDegeriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkiDegeri.EtkiDegeriGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.TedbirSonrasiEtkiDegeriListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Tedbir sonrası etki değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedbir sonrası etki değeri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedbir sonrası etki değeri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.TedbirSonrasiRiskPuaniHesapla = function (TEDBIR_SONRASI_OLASILIK_DEGERI_ID, TEDBIR_SONRASI_ETKI_DEGERI_ID) {
                angular.forEach($scope.TedbirSonrasiOlasilikDegeriListesi, function (value, key) {
                    if (value.OLASILIK_DEGERI_ID == TEDBIR_SONRASI_OLASILIK_DEGERI_ID) {
                        $scope.tedbirSonrasiOlasilikDegeri = value.OLASILIK_DEGERI_KATSAYISI;
                    }
                });
                angular.forEach($scope.TedbirSonrasiEtkiDegeriListesi, function (value, key) {
                    if (value.ETKI_DEGERI_ID == TEDBIR_SONRASI_ETKI_DEGERI_ID) {
                        $scope.tedbirSonrasiEtkiDegeri = value.ETKI_DEGERI_KATSAYISI;
                    }
                });
                $scope.tedbirSonrasiRiskPuani = $scope.tedbirSonrasiOlasilikDegeri * $scope.tedbirSonrasiEtkiDegeri;
                $scope.InfoProjeRisk.TEDBIR_SONRASI_RISK_PUANI = $scope.tedbirSonrasiRiskPuani;
            };

            $scope.RiskDerecesiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getRiskDerecesi();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.RiskDerecesiListesi = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk derecesi listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk derecesi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk derecesi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.RiskIslemeStratejisiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvRiskIslemeStratejisi.RiskIslemeStratejisiGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.RiskIslemeStratejisiListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk işleme stratejisi listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk işleme stratejisi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk işleme stratejisi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.ProjePersonelGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.ProjePersonelListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje personel listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje personel listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


        }]);

