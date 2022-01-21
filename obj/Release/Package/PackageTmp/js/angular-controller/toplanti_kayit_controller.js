angular.module('inspinia').controller(
    'toplanti_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvToplantiKatilimciRoluTipi', 'srvToplantiTuru', 'srvToplanti', 'srvToplantiGundem', 'srvToplantiGundemiHavuzu', 'srvToplantiKatilimci', 'srvProjeGereksinim', 'srvKullaniciProje', 'srvTalepProje', 'srvProjeler', 'srvProjeIterasyon', 'srvToplantiGundemTalepProje', 'srvKullanici', 'srvProjeModul', 'srvToplantiGundemiTuru', 'srvToplanti', 'srvToplantiDokuman', 'srvSurec', 'srvTalepSiniflandirmaTipi','srvToplantiYeri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvToplantiKatilimciRoluTipi, srvToplantiTuru, srvToplanti, srvToplantiGundem, srvToplantiGundemiHavuzu, srvToplantiKatilimci, srvProjeGereksinim, srvKullaniciProje, srvTalepProje, srvProjeler, srvProjeIterasyon, srvToplantiGundemTalepProje, srvKullanici, srvProjeModul, srvToplantiGundemiTuru, srvToplanti, srvToplantiDokuman, srvSurec, srvTalepSiniflandirmaTipi, srvToplantiYeri, Ayarlarim) {
            $scope.options = {
                height: 150,
                toolbar: [
                    ['style', ['bold', 'italic', 'underline', 'clear']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                    ["table", ["table"]]
                ]
            };
            $scope.toplantiID = $stateParams.toplantiID;
            $scope.ToplantiYeriID = $stateParams.ToplantiYeriID;
            $scope.Ayarlar = Ayarlarim;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.ToplantiTuruGetData();
                $scope.ToplantiKatilimciGetData();
                $scope.KullaniciGetData();
                $scope.ToplantiGetData();
                $scope.ToplantiKatilimciRoluTipiGetData();
                $scope.ToplantiYeriGetData();
                $scope.ToplantiGundemGetData();
                $scope.KullaniciProjeGetData();
                $scope.karar = false;
                $scope.ToplantiGundemiTuruGetData();

                $scope.ToplantiKatilimciListeVeri = [];

                if ($scope.toplantiID > 0) {
                    $scope.ToplantiSelect();
                    $scope.ToplantiGundemTalepProjeGetData();
                    $scope.ToplantiDokumanGetData();
                    $scope.handleFileSelect = function (evt) {
                        var file = evt[0];
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            $scope.$apply(function ($scope) {
                                $scope.InfoToplantiDokuman.DOKUMAN_ADI = file.name;
                                $scope.InfoToplantiDokuman.DOKUMAN_DOSYA = evt.target.result;
                                $scope.InfoToplantiDokuman.DOKUMAN_DOSYA_TIPI = file.type;
                                $scope.InfoToplantiDokuman.DOKUMAN_DOSYA_BOYUTU = file.size;
                            });
                        };
                        reader.readAsDataURL(file);
                    };
                }

            };

            $scope.AramaKriter = {
                TOPLANTI_ADI: '',
                TOPLANTI_ID: $scope.toplantiID,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true,
                FILTER: true
            };

            $scope.AramaKriterKullanici = {
                LISTE: false,
                PROJE_ID: '',
                FILTER: true,
                KULLANICI_ID: $scope.$storage.KULLANICI_ID
            };
            $scope.AramaKriterPersonelToplanti = {
                KULLANICI_AD_SOYAD: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: false
            };
            $scope.AramaKriterGereksinim = {
                LISTE: true,
                PROJE_ID: '',
            };

            $scope.AramaKriterIterasyon = {
                LISTE: false,
                PROJE_ID: ''
            };

            $scope.AramaKriterProblem = {
                PROJE_ACILIYET_ETKI_SONUC: ''
            };
            $scope.AramaKriterDegisiklik = {
                PROJE_ACILIYET_ETKI_SONUC: ''
            };
            $scope.ToplantiKatilimciAramaKriterListe = {
                TOPLANTI_ID: $scope.toplantiID,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true,
                FILTER: true
            };

            $scope.AramaKriterDokuman = {
                TOPLANTI_ID: $scope.toplantiID,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true,
                FILTER: true
            };

            $scope.ToplantiGündemiHavuzuAramaKriter = {
                GUNDEM: true,
                LISTE: false
            };

            $scope.ToplantiGundemAramaKriter = {
                LISTE: true,
                TOPLANTI_ID: $scope.toplantiID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };


            $scope.ToplantiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplanti.ToplantiSelect($scope.toplantiID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Toplantı bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Toplantı bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoToplanti = gelen.data;
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
                        console.error('Toplantı bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            //Toplantı Kaydı alınıyor
            $scope.ToplantiEkleGuncelle = function (InfoToplanti) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmToplanti.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmToplanti);
                    return;
                }

                if ($scope.ToplantiListeKatilimci.length === 0 && $scope.toplantiID === 0) {
                    mesajGoster('Dikkat', "Toplantıya katılımcı eklemeden kayıt işlemi yapamazsınız.", 'W');
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid();
                    return;
                }
                var Info = {
                    InfoToplanti: InfoToplanti,
                    ToplantiListeKatilimci: $scope.ToplantiListeKatilimci,
                    ToplantiKayitGundemListesi: $scope.ToplantiKayitGundemListesi
                };

                var promiseGet = srvToplanti.ToplantiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Toplantı kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Toplantı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Toplantı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.toplantiID = gelen.data.returnKayitNo;
                        $state.go('toplanti.toplantikayit', { toplantiID: $scope.toplantiID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ToplantiYeriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiYeri.ToplantiYeriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Toplantı yeri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Toplantı yeri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiYeriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı yeri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ToplantiTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiTuru.ToplantiTuruGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Toplantı türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterPersonelToplanti);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriterKullanici);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kullanıcı proje listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Kullanıcı proje listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı proje listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });

            };

            $scope.ToplantiKatilimciRoluTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiKatilimciRoluTipi.ToplantiKatilimciRoluTipiGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Katılımcı rolü tipi listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Katılımcı rolü tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiKatilimciRoluTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Katılımcı rolü tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoKatilimciListe = {
                KULLANICI_ID: null,
                TOPLANTI_KATILIMCI_ROLU_TIPI_ID: null,
                AD_SOYAD: null,
                TOPLANTI_KATILIMCI_TELEFON_NO: null,
                TOPLANTI_KATILIMCI_E_POSTA: null

            };

            $scope.ToplantiKatilimciEkleGuncelle = function (InfoKatilimciListe) {
                //$scope.formKatilimciCalistirildi = true;
                //if ($scope.frmKatilimciListe.$valid) { } else {
                //    $rootScope.focusToInvalid($scope.frmKatilimciListe);
                //    return;
                //}


                var promiseGet = srvToplantiKatilimci.ToplantiKatilimciEkleGuncelle(InfoKatilimciListe);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Katılımcı kayıt işlemi sırasında bir hata oluştu." + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Katılımcı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Katılımcı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ToplantiKatilimciGetData();
                        $scope.InfoKatilimciListe.KULLANICI_ID = null;
                        $scope.formKatilimciCalistirildi = false;
                        //angular.element("#cmbKULLANICI_ID")[0].value = 0;
                        $scope.InfoKatilimciListe.TOPLANTI_KATILIMCI_ROLU_TIPI_ID = null;

                    }

                },
                    function (hata) {
                        $scope.formKatilimciCalistirildi = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı katılımcı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $scope.InfoKatilimciListesiSifirlama();
            };

            $scope.ToplantiKatilimciGetData = function () {
                $scope.tab = 2;
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiKatilimci.ToplantiKatilimciGetData($scope.ToplantiKatilimciAramaKriterListe);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Katılımcı listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Katılımcı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiToplantiKatilimci = gelen.data.ToplamKayitSayisi;
                        $scope.ToplantiKatilimciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı katılımcı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ToplantiKatilimciSil = function (infoToplantiKatilimci) {
                if ($scope.toplantiID > 0) {
                    $rootScope.sayfayukleniyor = true;
                    var promiseGet = srvToplantiKatilimci.ToplantiKatilimciSil(infoToplantiKatilimci.TOPLANTI_KATILIMCI_ID);
                    promiseGet.then(function (gelen) {
                        $rootScope.sayfayukleniyor = false;
                        if (gelen.data.basariDurumu === false) {
                            mesajGoster('Dikkat', 'Katılımcı silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                            console.error('Katılımcı silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                        } else {
                            mesajGoster("İşlem tamam", "Katılımcı silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                            if ($scope.toplamKayitSayisiToplantiKatilimci > 10 && $scope.ToplantiKatilimciListesi.length == 1) {
                                $scope.ToplantiKatilimciAramaKriterListe.SayfaNo = $scope.ToplantiKatilimciAramaKriterListe.SayfaNo - 1;
                            }
                            $scope.ToplantiKatilimciGetData();
                            //$scope.ToplantiKatilimciGetDataListe();
                            //$scope.KullaniciGetData();
                        }
                    },
                        function (hata) {
                            $rootScope.sayfayukleniyor = false;
                            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                            console.error('Katılımcı silme işlemi sırasında bir hata oluştu. Hata:', hata);
                        });

                } else {

                    var index = $scope.ToplantiListeKatilimci.indexOf(infoToplantiKatilimci);
                    if (index !== -1)
                        $scope.ToplantiListeKatilimci.splice(index, 1); // 2 indeksindeki 1 elemanı yani 5'i siler.
                }

            };

            $scope.modalSilmeOnayiToplantiKatilimci = function (infoToplantiKatilimci) {
                $scope.secilenKayit = infoToplantiKatilimci;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ToplantiKatilimciSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ToplantiListeKatilimci = [];

            $scope.InfoToplantiKatilimci = {
                INDEX_ID: null,
                KULLANICI_ID: null,
                AD_SOYAD: '',
                TOPLANTI_KATILIMCI_ROLU_TIPI_ID: '',
                TOPLANTI_KATILIMCI_ROLU_TIPI_ADI: '',
                TOPLANTI_KATILIMCI_E_POSTA: '',
                TOPLANTI_KATILIMCI_TELEFON_NO: '',
                KATILIMCI_DURUM: ''


            };

            //Katılımcı eklemek için modal açılıyor
            $scope.ToplantiKatilimciEkle = function () {
                $scope.$modalInstanceToplantiKatilimci = $modal.open({
                    templateUrl: 'views/common/modal_toplanti_katilimci_ekle.html',
                    size: 'lg',
                    scope: $scope
                });


            };

            //Katılımcıları listeye ekleyip modalı kapatıyor.
            $scope.ToplantiKatilimciListesiKaydet = function () {
                $scope.$modalInstanceToplantiKatilimci.dismiss('cancel');
            };
            // Toplantı İlişki Ekle

            //$scope.ToplantiIliskiEkle = function () {
            //    $scope.frmToplantiIliskiHata = '';
            //    $scope.formToplantiIliskiCalistirildi = false;
            //    $scope.$modalInstanceToplantiIliski = $modal.open({
            //        templateUrl: 'views/common/modal_toplanti_iliski_ekle.html',
            //        size: 'lg',
            //        scope: $scope
            //    });


            //};

            //$scope.ToplantiIliskiKaydet = function () {
            //    $scope.$modalInstanceToplantiIliski.dismiss('cancel');
            //};

            //$scope.ToplantiIliskiEkleGuncelle = function (Info, frmToplantiIliski) {
            //    $scope.formToplantiIliskiCalistirildi = true;
            //    if (frmToplantiIliski.$valid) { } else {
            //        $rootScope.focusToInvalid(frmToplantiIliski);
            //        return;
            //    }
            //    var promiseGet = srvToplanti.ToplantiIliskiEkleGuncelle(Info);
            //    promiseGet.then(function (gelen) {
            //        if (gelen.data.basariDurumu == false) {
            //            //mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
            //            $scope.frmToplantiIliskiHata = gelen.data.mesaj + '!!!';
            //            console.error('ToplantiIliskiEkleGuncelle Hata:', gelen.data.mesaj);
            //        }
            //        else {
            //            mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            //        }
            //    },
            //        function (errorPl) {
            //            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            //            console.error('ToplantiYeriEkleGuncelle Hata:', errorPl);
            //        });
            //}
            // Toplantı Yeri

            $scope.ToplantiYeriEkle = function () {
                $scope.frmToplantiYeriHata = '';
                $scope.formToplantiYeriCalistirildi = false;
                $scope.$modalInstanceToplantiYeri = $modal.open({
                    templateUrl: 'views/common/modal_toplanti_yeri_ekle.html',
                    size: 'lg',
                    scope: $scope
                });


            };

            $scope.ToplantiYeriListesiKaydet = function () {
                $scope.$modalInstanceToplantiYeri.dismiss('cancel');
            };

            $scope.ToplantiYeriEkleGuncelle = function (Info, frmToplantiYeri) {
                $scope.formToplantiYeriCalistirildi = true;
                if (frmToplantiYeri.$valid) { } else {
                    $rootScope.focusToInvalid(frmToplantiYeri);
                    return;
                }
                var promiseGet = srvToplantiYeri.ToplantiYeriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        //mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        $scope.frmToplantiYeriHata = gelen.data.mesaj + '!!!';
                        console.error('ToplantiYeriEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.ToplantiYeriListesiKaydet();
                        $scope.ToplantiYeriGetData();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('ToplantiYeriEkleGuncelle Hata:', errorPl);
                    });
            }

            //Toplantı kaydı atılırken html tarafından dışarıdan katılımcı eklenirse katılımcı durumu false eğer sistemdeki kullanıcı seçilip kayıt edilirse true ifadesi gönderiliyor.
            //durumlara göre alan kontrolleri yapılıyor.
            //İlk kayıtta katılımcı eğer sistemden kaydediliyorsa kullanıcı id ve rol dizi olarak gönderiliyor ve dizide ad alanları ve id ler gönderiliyor
            //Dışarıdan alanda rol alanı dizi şekilinde gönderiliyor.
            //Oluşturulan katılımcı değişkenine alanlar atılıyor.
            //Alanlara değerler atılırken kullanıcı id, adsoyad, eposta ve telefon alanları durum kontrollerine göre değer atılmaktadır. 
            //Alanlardan 
            //Eğer toplantı id < 0 dan ise 
            $scope.ToplantiKatilimciListesineEkle = function (InfoToplantiKatilimci, frmToplantiKatilimci) {
                if (InfoToplantiKatilimci.KATILIMCI_DURUM) { //katılımcı durum true ise sistemdeki kullanıcılar eklencek false dışarıdan kullanıcı
                    $scope.formCalistirildiToplantiKatilimci = true;
                    if (frmToplantiKatilimci.$valid) { } else {
                        $rootScope.focusToInvalid(frmToplantiKatilimci);
                        return;
                    }

                } else {
                    $scope.formCalistirildiToplantiDisaridanKatilimci = true;
                    if (frmToplantiKatilimci.$valid) { } else {
                        $rootScope.focusToInvalid(frmToplantiKatilimci);
                        return;
                    }

                }

                var InfoYeniToplantiKatilimci = {
                    KULLANICI_ID: InfoToplantiKatilimci.KATILIMCI_DURUM === false ? null : InfoToplantiKatilimci.KULLANICI_ID[0],
                    AD_SOYAD: InfoToplantiKatilimci.KATILIMCI_DURUM === false ? InfoToplantiKatilimci.AD_SOYAD : InfoToplantiKatilimci.KULLANICI_ID[1],
                    TOPLANTI_KATILIMCI_ROLU_TIPI_ID: InfoToplantiKatilimci.TOPLANTI_KATILIMCI_ROLU_TIPI_ID[0],
                    TOPLANTI_KATILIMCI_ROLU_TIPI_ADI: InfoToplantiKatilimci.TOPLANTI_KATILIMCI_ROLU_TIPI_ID[1],
                    TOPLANTI_KATILIMCI_E_POSTA: InfoToplantiKatilimci.KATILIMCI_DURUM === false ? InfoToplantiKatilimci.TOPLANTI_KATILIMCI_E_POSTA : null,
                    TOPLANTI_KATILIMCI_TELEFON_NO: InfoToplantiKatilimci.KATILIMCI_DURUM === false ? InfoToplantiKatilimci.TOPLANTI_KATILIMCI_TELEFON_NO : null,
                    TOPLANTI_ID: $scope.toplantiID
                };

                if ($scope.toplantiID > 0) {

                    $scope.ToplantiKatilimciEkleGuncelle(InfoYeniToplantiKatilimci);
                }
                else {
                    var kontrol = 0;
                    angular.forEach($scope.ToplantiListeKatilimci, function (value, key) {
                        if (InfoYeniToplantiKatilimci.KULLANICI_ID != null && value.KULLANICI_ID == InfoYeniToplantiKatilimci.KULLANICI_ID) {
                            mesajGoster('Dikkat', "Eklediğiniz katılımcı kaydını bir daha ekleyemezsiniz.", 'E');
                            console.error('Eklediğiniz katılımcı kaydını bir daha ekleyemezsiniz.');
                            kontrol += 1;
                        }
                    });

                    if (kontrol == 0) {
                        $scope.ToplantiListeKatilimci.push(InfoYeniToplantiKatilimci);
                    }
                }

                if (InfoToplantiKatilimci.KATILIMCI_DURUM === false) {
                    $scope.$modalInstanceDisaridanKatilimciEkle.dismiss('cancel');
                }

                $scope.InfoKatilimciListesiSifirlama();
            };

            //Modal da her bir yeni kayıtta değişkeni sıfırlıyor.
            $scope.InfoKatilimciListesiSifirlama = function () {
                $scope.formCalistirildiToplantiKatilimci = false;
                $scope.formCalistirildiToplantiDisaridanKatilimci = false;
                $scope.InfoToplantiKatilimci.INDEX_ID = null;
                $scope.InfoToplantiKatilimci.KULLANICI_ID = null;
                $scope.InfoToplantiKatilimci.AD_SOYAD = null;
                $scope.InfoToplantiKatilimci.KATILIMCI_AD_SOYAD = null;
                $scope.InfoToplantiKatilimci.TOPLANTI_KATILIMCI_ROLU_TIPI_ID = null;
                $scope.InfoToplantiKatilimci.TOPLANTI_KATILIMCI_ROLU_TIPI_ADI = null;
                $scope.InfoToplantiKatilimci.TOPLANTI_KATILIMCI_E_POSTA = null;
                $scope.InfoToplantiKatilimci.TOPLANTI_KATILIMCI_TELEFON_NO = null;

            };



            //katılımcı ekleme modalındaki ger itetikliyor burayı
            $scope.ToplantiKatilimciListesiGeri = function () {
                //$scope.ToplantiListeKatilimci = [];
                $scope.$modalInstanceToplantiKatilimci.dismiss('cancel');
            };


           

            //Toplantı gündem ekle

            $scope.GundemEkle = function (toplantiTuruId) {
                if (!(toplantiTuruId > 0)) {
                    mesajGoster('Dikkat', "Toplantıya gündem eklemek için toplantı türünü belirtiniz.", 'W');
                    return;
                }

                //Info.TOPLANTI_TURU_ID = $scope.Info.TOPLANTI_TURU_ID;
                $scope.ToplantiGündemiHavuzuAramaKriter.TOPLANTI_TURU_ID = toplantiTuruId;
                $scope.ToplantiGundemiHavuzuGetData();
                $scope.$modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_gundem_ekle.html',
                    scope: $scope
                });

                $scope.$modalInstance.result.then(function () {
                    $scope.ToplantiGundemGetData($scope.ToplantiGundemAramaKriter);
                    $scope.formCalistirildiToplantiGundemHavuzuGerekce = false;
                }, function (data) {

                });

            };

            $scope.ToplantiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplanti.ToplantiGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        Console.error('Toplantı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ToplantiListesi = gelen.data.Veri;
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
                        console.error('Toplantı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.Geri = function () {
                $scope.$modalInstance.close();
            };

            $scope.YeniKayıtGeri = function () {
                $scope.$modalInstance.dismiss('cancel');
            };

            $scope.ToplantiGundemiHavuzuGetData = function (ToplantiGündemiHavuzuAramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiHavuzu.ToplantiGundemiHavuzuGetData($scope.ToplantiGündemiHavuzuAramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gündem havuzu listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gündem havuzu listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ToplantiGundemiHavuzuListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gündem havuzu listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //Toplantı gündem alanı
            $scope.ToplantiGundemGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundem.ToplantiGundemGetData($scope.ToplantiGundemAramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gündem listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gündem listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiToplantiGundem = gelen.data.ToplamKayitSayisi;
                        $scope.ToplantiGundemListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gündem listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });

            };

            

            $scope.InfoToplantiKayitGundem = {};
            $scope.ToplantiKayitGundemListesi = [];
            $scope.ToplantiGundemEkle = function (InfoToplantiGundem, frmToplantiGundem) {
                $scope.formCalistirildiToplantiGundemHavuzuGerekce = true;
                //$rootScope.sayfayukleniyor = true;
                //$scope.formCalistirildiGundemEkle = true;
                if (frmToplantiGundem.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmToplantiGundem);
                    return;
                }
                if ($scope.toplantiID > 0) {
                    $scope.ToplantiGundemEkleGuncelle(InfoToplantiGundem);

                } else {
                    $rootScope.sayfayukleniyor = false;
                    $scope.ToplantiKayitGundemListesi = InfoToplantiGundem;
                    $scope.YeniKayıtGeri();
                }
            };

            $scope.ToplantiGundemEkleGuncelle = function (InfoToplantiGundem) {
                $rootScope.sayfayukleniyor = true;
                var InfoToplantiGundemBagli = {
                    InfoToplantiGundem: InfoToplantiGundem,
                    TOPLANTI_ID: $scope.toplantiID
                    //InfoYeniToplantiGundem: $scope.InfoYeniToplantiGundem
                };
                var promiseGet = srvToplantiGundem.ToplantiGundemEkleGuncelle(InfoToplantiGundemBagli);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Gündem havuzu kayıt işlemi sırasında bir hata oluştu." + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gündem havuzu kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Gündem havuzu kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        //$scope.ToplantiGundemGetData($scope.ToplantiGundemAramaKriter);
                        $scope.ToplantiGundemGetData();
                        $scope.Geri();
                        //$scope.ToplantiGundemiHavuzuGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı gündemi havuzu kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.ToplantiGundemDurumu = function (InfoToplantiGundemDurum) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiToplantiGundemKarar = true;
                var promiseGet = srvToplantiGundem.ToplantiGundemDurum(InfoToplantiGundemDurum);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Gündem karar işlemi sırasında bir hata oluştu." + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gündem karar işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Gündem karar işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        //$scope.ToplantiGundemGetData($scope.ToplantiGundemAramaKriter);
                        $scope.ToplantiGundemGetData();
                        $scope.GeriGundemKarar();
                        //$scope.ToplantiGundemiHavuzuGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gündem karar işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };



            $scope.ToplantiGundemSil = function (infoToplantiGundem) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundem.ToplantiGundemSil(infoToplantiGundem.TOPLANTI_GUNDEM_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gündem silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gündem silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam', "Gündem silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ToplantiGundemGetData();
                        $scope.ToplantiGundemiHavuzuGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gündem silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.modalSilmeOnayiToplantiGundem = function (infoToplantiGundem) {
                $scope.secilenKayit = infoToplantiGundem;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ToplantiGundemSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };



            $scope.GeriGundemKarar = function () {
                $scope.$modalInstanceKarar.dismiss('cancel');
            };


            $scope.GundemKarar = function (InfoToplantiGundem) {
                $scope.InfoToplantiGundem = InfoToplantiGundem;
                $scope.$modalInstanceKarar = $modal.open({
                    templateUrl: 'views/common/modal_gundem_karar.html',
                    scope: $scope
                });
                $scope.$modalInstanceKarar.result.then(function () {
                }, function (data) {
                    $scope.formCalistirildiToplantiGundemKarar = false;
                });
            };

            // Gündem ekleme işlemlerin son

            //Yeni gündem havuzu ve gündem ekleme
            $scope.ToplantiGundemiTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiTuru.ToplantiGundemiTuruGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gündem türü listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gündem türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiGundemiTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gündem türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.YeniGundemEkle = function () {
                $scope.$modalInstanceYeniGundem = $modal.open({
                    templateUrl: 'views/common/modal_yeni_gundem_ekle.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.YeniGundemGeri = function () {
                $scope.$modalInstanceYeniGundem.dismiss('cancel');
            };

            $scope.ToplantiGundemiHavuzuEkleGuncelle = function (InfoToplantiYeniGundem, frmToplantiGundemHavuzu) {
                if (frmToplantiGundemHavuzu.$valid) { } else {
                    $rootScope.focusToInvalid(frmToplantiGundemHavuzu);
                    return;
                }
                InfoToplantiYeniGundem.TOPLANTI_ID = $scope.toplantiID;
                InfoToplantiYeniGundem.TOPLANTI_TURU_ID = $scope.InfoToplanti.TOPLANTI_TURU_ID;
                var promiseGet = srvToplantiGundemiHavuzu.ToplantiGundemiHavuzuEkleGuncelle(InfoToplantiYeniGundem);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Yeni gündem kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yeni gündem kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Yeni gündem kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ToplantiGundemGetData();
                        $scope.YeniGundemGeri();
                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yeni gündem kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            // Toplantı gündem alanı son

            //Toplantı talep ekleme
            $scope.TalepBilgileriSifirla = function () {
                $scope.InfoGundemTalep = {
                    TALEP_TIPI_ID: null,
                    PROJE_ID: null,
                    PROJE_ITERASYON_ID: null,
                    PROJE_GEREKSINIM_ID: null,
                    PROJE_GEREKSINIM_ADI: null,
                    KULLANICI_ID: null,
                    TALEP_SAHIBI_KULLANICI_ADI: null,
                    TALEP_PROJE_KONU: null,
                    //TALEP_ONGORULEN_ZAMAN: null,
                    TALEP_PLANLANAN_BASLANGIC_TARIHI: null,
                    TALEP_PLANLANAN_BITIS_TARIHI: null,
                    TALEP_PROJE_SUREC_LOG_ACIKLAMA: null,
                    TALEP_PROJE_ACIKLAMA: null,
                    InfoDfi: null,
                    InfoProblem: null,
                    InfoDegisiklik: null,
                    InfoYeniDokumanListesi: [],
                    TalepGereksinimListesi: []
                };
                $scope.TalepProjeIlgiListesi = [];
            };

            $scope.GundemTalepEkle = function (toplantiGundemId) {
                $scope.TalepTipiGetData();
                $scope.KullaniciProjeGetData();
                //$scope.TalepSahibiGetData();
                $scope.KurumKullanıcı();
                $scope.toplantiGundemID = toplantiGundemId;
                $scope.TalepBilgileriSifirla();

                $scope.$modalInstanceGundemTalep = $modal.open({
                    templateUrl: 'views/common/modal_gundem_talep_ekle.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.GundemTalepEkleGeri = function () {
                $scope.$modalInstanceGundemTalep.dismiss('cancel');
            };



            $scope.TalepTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepTipi();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep tipi listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.TalepListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeGereksinimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterGereksinim.PROJE_ID = $scope.InfoGundemTalep.PROJE_ID;
                var promiseGet = srvProjeGereksinim.ProjeGereksinimGetData($scope.AramaKriterGereksinim);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ProjeGereksinimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };




            $scope.TalepTipi = function (talepTipiId) {
                $scope.talepTipiId = talepTipiId;

                if (talepTipiId === 1 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.InfoGundemTalep.InfoDfi = null;
                    $scope.SurecGetData();
                }

                if (talepTipiId === 2 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.InfoGundemTalep.InfoProblem = null;
                    $scope.TalepSiniflandirmaTipiGetData();
                    $scope.ProjeEtkiGetData();
                    $scope.ProjeAciliyetGetData();
                }


                if (talepTipiId === 3 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.InfoGundemTalep.InfoDegisiklik = null;
                    $scope.TalepSiniflandirmaTipiGetData();
                    $scope.ProjeEtkiGetData();
                    $scope.ProjeAciliyetGetData();
                }

                if ((talepTipiId == 3 || talepTipiId == 6 || talepTipiId == 7) && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.InfoGundemTalep.SurecAdi = "Analiz";
                }

                if (talepTipiId === 8) {
                    $scope.InfoTalep.PROJE_ITERASYON_ID = null;
                }

                if ((talepTipiId === 2 || talepTipiId === 3 || talepTipiId === 6) && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.talepTipiGereksinimDurumu = true;
                }
                else {
                    $scope.talepTipiGereksinimDurumu = false;
                }

                $scope.InfoGundemTalep.PROJE_GEREKSINIM_ID = null;
                $scope.InfoGundemTalep.PROJE_GEREKSINIM_ADI = null;
                $scope.InfoProblemHesap = null;
                $scope.InfoDegisiklikHesap = null;

            };

            $scope.ProjeSec = function () {
                if ($scope.$storage.IS_KURUM_MUSTERI_KULLANICI !== true && $scope.talepTipiId !== 8) {
                    $scope.ProjeIterasyonGetData();
                    //$scope.ProjeGereksinimGetData();
                    $scope.ProjeModulGetData();
                }
                if ($scope.$storage.IS_KURUM_MUSTERI_KULLANICI === true) {
                    $scope.KullaniciProjelerSelect();
                }
            };

            $scope.AramaKriterProjeModul = {
                PROJE_ID: '',
                LISTE: false
            };

            $scope.ProjeModulGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterProjeModul.PROJE_ID = $scope.InfoGundemTalep.PROJE_ID;
                var promiseGet = srvProjeModul.ProjeModulGetData($scope.AramaKriterProjeModul);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Modül listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Modül listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeModulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Modül listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KullaniciProjelerSelect = function () {
                $rootScope.sayfayukleniyor = true;

                var promiseGet = srvKullaniciProje.KullaniciProjeSelect($scope.InfoGundemTalep.PROJE_ID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProje = gelen.data;
                        $scope.InfoGundemTalep.KULLANICI_ID = $scope.InfoProje.PROJE_YONETICISI_ID;
                        $scope.InfoGundemTalep.TALEP_SAHIBI_KULLANICI_ADI = $scope.InfoProje.PROJE_YONETICISI_ADI;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.GereksinimOnay = function (gereksinim_Id, gereksinim_Adi) {
                //$scope.InfoGundemTalep.PROJE_GEREKSINIM_ID = gereksinim_Id;
                //$scope.InfoGundemTalep.PROJE_GEREKSINIM_ADI = gereksinim_Adi;
                var GereksinimListe = {
                    PROJE_GEREKSINIM_ID: gereksinim_Id,
                    PROJE_GEREKSINIM_ADI: gereksinim_Adi
                };

                var kontrol = $scope.InfoGundemTalep.TalepGereksinimListesi.findIndex(x => x.PROJE_GEREKSINIM_ID === gereksinim_Id);
                if (kontrol > -1) {
                    mesajGoster('Dikkat', 'Aynı gereksinimi iki kez ekleyemezsiniz.', 'W');
                    return;
                } else {

                    $scope.InfoGundemTalep.TalepGereksinimListesi.push(GereksinimListe);
                }
                $scope.$modalInstanceGereksinimSec.dismiss('cancel');
            };

            $scope.TalepGereksinimListeGoster = function () {
                $scope.TalepGereksinimListesi = $scope.InfoGundemTalep.TalepGereksinimListesi; // modal talep kayıt sayfasında kullanılmaktadır. Ortak kullanıldığı için burada modaldaki kullanılan değişkene göre atama yapılmaktadır.
                $scope.filtreTemizleGereksinim();
                $scope.$modalInstanceGereksinimListe = $modal.open({
                    templateUrl: 'views/common/modal_talep_gereksinim_liste.html',
                    size: 'lg',
                    scope: $scope
                });

            };

            $scope.TalepGereksinimListeGeri = function () {
                $scope.$modalInstanceGereksinimListe.dismiss('cancel');
            };

            $scope.TalepProjeGereksinimSil = function (infoTalepGereksinim) {
                
                angular.forEach($scope.InfoGundemTalep.TalepGereksinimListesi, function (valueTalepGereksinim, keyTalepGereksinim) {
                        if (valueTalepGereksinim.PROJE_GEREKSINIM_ID === infoTalepGereksinim.PROJE_GEREKSINIM_ID) {
                            $scope.InfoGundemTalep.TalepGereksinimListesi.splice(keyTalepGereksinim, 1);
                        }
                    });
            };

            $scope.modalSilmeOnayiTalepProjeGereksinim = function (infoTalepGereksinim) {
                $scope.secilenKayit = infoTalepGereksinim;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeGereksinimSil($scope.secilenKayit); // Diziden silme işlemi gerçekleşmektedir.
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.GereksinimSec = function () {
                $scope.filtreTemizleGereksinim();
                $scope.$modalInstanceGereksinimSec = $modal.open({
                    templateUrl: 'views/common/modal_talep_gereksinim_sec.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.GereksinimGeri = function () {
                $scope.$modalInstanceGereksinimSec.dismiss('cancel');
            };


            //$scope.GereksinimTemizle = function () {
            //    $scope.InfoGundemTalep.PROJE_GEREKSINIM_ID = null;
            //    $scope.InfoGundemTalep.PROJE_GEREKSINIM_ADI = null;
            //};

            $scope.filtreTemizleGereksinim = function () {
                $scope.AramaKriterGereksinim = {
                    LISTE: true,
                    //PROJE_ID: '', // proje sıfırlanmıyacak
                    PROJE_GEREKSINIM_NO: null,
                    PROJE_GEREKSINIM_ADI: null,
                    PROJE_ITERASYON_ID: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: 5
                };
                $scope.ProjeGereksinimGetData();
            };


            $scope.ProjeIterasyonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriterIterasyon.PROJE_ID = $scope.InfoGundemTalep.PROJE_ID;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonGetData($scope.AramaKriterIterasyon);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İterasyon listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjeIterasyonListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KurumKullanıcı = function () {
                if ($scope.talepProjeID === "" && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === true) {
                    $scope.kurumDurumu = true;
                } else if ($scope.talepProjeID === "" && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.kurumDurumu = false;
                } else if ($scope.talepProjeID > 0 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === true) {
                    $scope.kurumDurumu = false;
                }
                else if ($scope.talepProjeID > 0 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    $scope.kurumDurumu = false;
                }
            };

            $scope.InfoTalepIlgili = {};

            $scope.TalepIlgiliEkle = function () {
                $scope.InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI = null;
                $scope.InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI_AD_SOYAD = null;
                if ($scope.talepProjeID === 0) {
                    $scope.YeniTalepIlgiliListesi = [];
                }

                $scope.$modalInstanceTalepIlgili = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_ilgili_ekle.html',
                    size: 'sm',
                    scope: $scope
                });
            };

            $scope.GeriTalepIlgili = function () {
                $scope.formCalistirildiTalepProjeIlgili = false;
                $scope.$modalInstanceTalepIlgili.dismiss('cancel');
            };

            $scope.TalepProjeIlgiListesi = [];

            $scope.TalepIlgiliEkleOnKontrol = function (InfoTalepIlgili, frmTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepProjeIlgili = true;
                if (frmTalepIlgili.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTalepIlgili);
                    return;
                }

                var kontrol = true;
                //if ($scope.TalepProjeIlgiListesi.length > 0) {
                angular.forEach($scope.TalepProjeIlgiListesi, function (value, key) {
                    if (value.TALEP_PROJE_ILGI_KULLANICI_ID === InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID) {
                        kontrol = false;
                    }
                });
                $rootScope.sayfayukleniyor = false;
                if (kontrol) {
                    var InfoYeniTalepIlgili = {
                        TALEP_PROJE_ILGI_KULLANICI_ID: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.KULLANICI_ID,
                        AvatarBase64: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.AvatarBase64,
                        CINSIYET: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.CINSIYET,
                        TALEP_PROJE_ILGI_KULLANICI_AD_SOYAD: InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI.AD_SOYAD
                    };
                    $scope.TalepProjeIlgiListesi.push(InfoYeniTalepIlgili);
                }

                $scope.GeriTalepIlgili();
            };

            $scope.TalepProjeIlgiSil = function (infoTalepIlgili) {
                angular.forEach($scope.TalepProjeIlgiListesi, function (valueilgili, keyilgili) {
                    if (valueilgili.TALEP_PROJE_ILGI_KULLANICI_ID === infoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI_ID) {
                        $scope.TalepProjeIlgiListesi.splice(keyilgili, 1);
                    }
                });
            };

            $scope.modalSilmeOnayiTalepIlgili = function (infoTalepIlgili) {
                $scope.secilenKayit = infoTalepIlgili;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.TalepProjeIlgiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            //Toplantı Gündemlerine Özgü talep ekleme işlemlemleri yapılmaktadır.
            $scope.GundemTalepEkleGuncelle = function (InfoToplantiTalep, frmToplantiGundemTalepProje) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiGundemTalep = true;

                if (frmToplantiGundemTalepProje.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmToplantiGundemTalepProje);
                    return;
                }

                if (($scope.talepTipiId === 6 || $scope.talepTipiId === 3) && InfoToplantiTalep.TalepGereksinimListesi.length === 0 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false && $scope.formCalistirildiGundemTalep) {
                    $rootScope.sayfayukleniyor = false;
                    return;
                }

                if ($scope.talepTipiId === 2 && $scope.$storage.IS_KURUM_MUSTERI_KULLANICI === false) {
                    InfoToplantiTalep.InfoProblem.PROJE_ACILIYET_ETKI_SONUC_ID = $scope.InfoProblemHesap.PROJE_ACILIYET_ETKI_SONUC_ID;
                }
                if ($scope.talepTipiId === 3) {
                    InfoToplantiTalep.InfoDegisiklik.PROJE_ACILIYET_ETKI_SONUC_ID = $scope.InfoDegisiklikHesap.PROJE_ACILIYET_ETKI_SONUC_ID;
                }

                //InfoToplanti.TALEP_TIPI_ID = $scope.talepTipi;
                InfoToplantiTalep.TALEP_DURUM_TIPI_ID = 4;
                InfoToplantiTalep.InfoTalepIlgili = $scope.TalepProjeIlgiListesi;
                InfoToplantiTalep.TOPLANTI_GUNDEM_ID = $scope.toplantiGundemID;

                var promiseGet = srvTalepProje.TalepProjeEkleGuncelle(InfoToplantiTalep);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiGundemTalep = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Gündem talep kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gündem talep kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Gündem talep kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.formCalistirildiGundemTalep = false;
                        $scope.TalepBilgileriSifirla();
                        $scope.ToplantiGundemTalepProjeGetData();
                        $scope.$modalInstanceGundemTalep.close();
                    }
                },
                    function (hata) {
                        $scope.formCalistirildiGundemTalep = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gündem talep kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.SurecGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvSurec.SurecGetData();
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Sürüm listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Sürüm listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.SurecListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sürüm listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepSiniflandirmaTipiGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepSiniflandirmaTipi.TalepSiniflandirmaTipiGetData();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Sınıflandırma listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Sınıflandırma listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepSiniflandirmaListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sınıflandırma listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.ProjeEtkiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeEtkiGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Etki listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Etki listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjeEtkiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etki listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeAciliyetGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeAciliyetGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Aciliyet listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Aciliyet listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjeAciliyetListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Aciliyet listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeAciliyetEtkiSonucHesapGetData = function (PROJE_ETKI_ID, PROJE_ACILIYET_ID) {
                var AramaKriterEtkiSonucHesap = {
                    PROJE_ETKI_ID: PROJE_ETKI_ID,
                    PROJE_ACILIYET_ID: PROJE_ACILIYET_ID
                };
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getProjeAciliyetEtkiSonucHesapGetData(AramaKriterEtkiSonucHesap);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Aciliyet etki sonuç bilgileri yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Aciliyet etki sonuç bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        if ($scope.talepTipiId === 2) {
                            $scope.InfoProblemHesap = gelen.data;
                        }
                        if ($scope.talepTipiId === 3) {
                            $scope.InfoDegisiklikHesap = gelen.data;
                        }
                        //$scope.InfoProblemDegisiklikHesap = gelen.data;
                        //$scope.etkiSonucId = $scope.ProjeAciliyetEtkiSonucListesi[0].PROJE_ACILIYET_ETKI_SONUC_ID;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Aciliyet etki sonuç bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };






            $scope.InfoToplantiGundemTalepProje = {
                TOPLANTI_GUNDEM_ID: ''
            };

            $scope.ToplantiGundemTalepProjeAramaKriterListesi = {
                TOPLANTI_ID: $scope.toplantiID,
                LISTE: false
            };

            //Toplantı gundeme eklenen talep listtesi çakiliyor
            $scope.ToplantiGundemTalepProjeGetData = function (InfoToplantiGundemTalepProje) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemTalepProje.ToplantiGundemTalepProjeGetData($scope.ToplantiGundemTalepProjeAramaKriterListesi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gündem talep listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        Console.error('Gündem talep listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ToplantiGundemTalepProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gündem talep listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.TalepGoster = function (talepler, toplantiGundemId) {
                if (talepler) {
                    $scope.ToplantiGundemTalepProjeGetData(toplantiGundemId);
                }
            };

            //dışarıdan katılımcı ekleme modal ını çağırıyor
            $scope.DisaridanKatilimciEkle = function () {
                $scope.$modalInstanceDisaridanKatilimciEkle = $modal.open({
                    templateUrl: 'views/common/modal_toplanti_disaridan_katilimci_ekle.html',
                    size: 'lg',
                    scope: $scope
                });
            };

            $scope.DisaridanKatilimciGeri = function () {
                $scope.$modalInstanceDisaridanKatilimciEkle.dismiss('cancel');
            };


            $scope.InfoToplantiDokuman = {
                TOPLANTI_DOKUMAN_ID: null,
                TOPLANTI_ID: $scope.toplantiID,
                DOKUMAN_ADI: '',
                DOKUMAN_DOSYA: '',
                DOKUMAN_DOSYA_TIPI: '',
                DOKUMAN_DOSYA_BOYUTU: ''
            }


            $scope.ToplantiDokumanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiDokuman.ToplantiDokumanGetData($scope.AramaKriterDokuman);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Toplantı doküman listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        Console.error('Toplantı doküman listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiToplantiDokuman = gelen.data.ToplamKayitSayisi;
                        $scope.ToplantiDokumanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı doküman listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ToplantiDokumanEkleGuncelle = function (InfoToplantiDokuman) {
                $scope.formCalistirildiToplantiDokuman = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmToplantiDokuman.$valid && InfoToplantiDokuman.DOKUMAN_ADI.length > 0) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmToplantiDokuman);
                    return;
                }
                InfoToplantiDokuman.TOPLANTI_ID = $scope.toplantiID;
                var promiseGet = srvToplantiDokuman.ToplantiDokumanEkleGuncelle(InfoToplantiDokuman);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiToplantiDokuman = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Doküman kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ToplantiDokumanGetData();
                        $scope.ToplantiDokumanSifirla();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.ToplantiDokumanSifirla = function () {
                $scope.InfoToplantiDokuman.TOPLANTI_DOKUMAN_ID = null;
                $scope.InfoToplantiDokuman.TOPLANTI_ID = $scope.toplantiID;
                $scope.InfoToplantiDokuman.DOKUMAN_ADI = null;
                $scope.InfoToplantiDokuman.DOKUMAN_DOSYA = null;
                $scope.InfoToplantiDokuman.DOKUMAN_DOSYA_TIPI = null
                $scope.InfoToplantiDokuman.DOKUMAN_DOSYA_BOYUTU = null;
            }

            $scope.ToplantiDokumanSil = function (InfoToplantiDokuman) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiDokuman.ToplantiDokumanSil(InfoToplantiDokuman.TOPLANTI_DOKUMAN_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Toplantı doküman silme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı doküman silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Toplantı doküman silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ToplantiDokumanGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Toplantı doküman silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };


            $scope.modalSilmeOnayiToplantiDokuman = function (InfoToplantiDokuman) {
                $scope.secilenKayit = InfoToplantiDokuman;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ToplantiDokumanSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ToplantiDokumanGoster = function (toplantiDokumanID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiDokuman.ToplantiDokumanSelect(toplantiDokumanID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Toplantı doküman bilgileri yüklenirken bir hata oluştu. Hata:' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Toplantı doküman bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        $scope.RaporData = { Dosya: gelen.data.TOPLANTI_DOKUMAN_URL, canPrint: browserCanPrint, ekUzanti: 'pdf' };
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
                        console.error('Toplantı doküman bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceEkGoster.dismiss('cancel');
            };


        }]);

