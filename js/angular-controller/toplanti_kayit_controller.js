angular.module('inspinia').controller(
    'toplanti_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvToplanti', 'srvToplantiKatilimci','srvToplantiKatilimciRoluTipi', 'srvKullanici',  'srvToplanti','Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvToplanti, srvToplantiKatilimci, srvToplantiKatilimciRoluTipi,  srvKullanici, srvToplanti, Ayarlarim) {
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
            $scope.Ayarlar = Ayarlarim;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.ToplantiKatilimciGetData();
                $scope.KullaniciGetData();
                $scope.ToplantiGetData();
                $scope.ToplantiKatilimciRoluTipiGetData();
                $scope.karar = false;

                $scope.ToplantiKatilimciListeVeri = [];

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

            $scope.ToplantiKatilimciAramaKriterListe = {
                TOPLANTI_ID: $scope.toplantiID,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true,
                FILTER: true
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
                        $state.go('toplanti.listesi');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
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


            $scope.InfoKatilimciListe = {
                KULLANICI_ID: null,
                AD_SOYAD: null,
                TOPLANTI_KATILIMCI_TELEFON_NO: null,
                TOPLANTI_KATILIMCI_E_POSTA: null

            };

            $scope.ToplantiKatilimciEkleGuncelle = function (InfoKatilimciListe) {

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

            $scope.ToplantiKatilimciListesiKaydet = function () {
                $scope.$modalInstanceToplantiKatilimci.dismiss('cancel');
            };

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



            $scope.ToplantiKatilimciListesiGeri = function () {
                $scope.$modalInstanceToplantiKatilimci.dismiss('cancel');
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

            $scope.ToplantiKatilimciRoluTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiKatilimciRoluTipi.ToplantiKatilimciRoluTipiGetData();
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

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

        }]);

