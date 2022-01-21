angular.module('inspinia').controller(
    'ik_etkinlik_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkEtkinlik', 'srvIkIstirak', 'srvIkFirma', 'srvKullanici', 'srvIkEtkinlikPersonel', 'srvIkEtkinlikDosya', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkEtkinlik, srvIkIstirak, srvIkFirma, srvKullanici, srvIkEtkinlikPersonel, srvIkEtkinlikDosya, Ayarlarim) {
            $scope.ikEtkinlikID = $stateParams.ikEtkinlikID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterPersonelEtkinlik = {
                IK_ETKINLIK_ID: $scope.ikEtkinlikID,
                KULLANICI_AD_SOYAD: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: false,
                FILTER: true
            };

            $scope.AramaKriterListePersonelEtkinlik = {
                IK_ETKINLIK_ID: $scope.ikEtkinlikID,
                KULLANICI_AD_SOYAD: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true,
                FILTER: false
            };
            $scope.AramaKriterListeEtkinlikDosya = {
                IK_ETKINLIK_ID: $scope.ikEtkinlikID,
                IK_ETKINLIK_DOSYA_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.InfoEtkinlikDosya = {
                IK_ETKINLIK_DOSYA_ID: null,
                IK_ETKINLIK_ID: '',
                IK_ETKINLIK_DOSYA_ADI: '',
                IK_ETKINLIK_DOSYA_BOYUTU: '',
                IK_ETKINLIK_DOSYA_DOSYA: '',
                IK_ETKINLIK_DOSYA_TIPI: '',
                IK_ETKINLIK_DOSYA_ACIKLAMA: ''

            };


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });


            $scope.init = function () {
                $scope.IkIstirakGetData();
                $scope.IkFirmaGetData();
                $scope.IkEtkinlikPersonelGetData();
                $scope.ParaBirimiGetData();
                $scope.IkEtkinlikPersonelKatilimciGetData();
                $scope.KullaniciListesiniGetir();
                $scope.IkEtkinlikDosyaGetData();
                if ($scope.ikEtkinlikID > 0) {
                    $scope.IkEtkinlikSelect();
                    $scope.handleFileSelect = function (evt) {
                        var file = evt[0];
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            $scope.$apply(function ($scope) {
                                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_ADI = file.name;
                                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_BOYUTU = file.size;
                                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_TIPI = file.type;
                                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_DOSYA = evt.target.result;
                            });
                        };
                        reader.readAsDataURL(file);
                    };

                }
            }

            $scope.IkEtkinlikSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEtkinlik.IkEtkinlikSelect($scope.ikEtkinlikID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkinlik kaydı yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkinlik bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
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
                        console.error('Etkinlik bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }


            $scope.IkEtkinlikEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $scope.sayfayukleniyor = true;
                if ($scope.frmEtkinlik.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmEtkinlik);
                    return;
                }
                var promiseGet = srvIkEtkinlik.IkEtkinlikEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Etkinlik kayıt işlemi sırasında bir hata oluştu." + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkinlik kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Etkinlik kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ikEtkinlikID = gelen.data.returnKayitNo;
                        $state.go('insankaynaklari.iketkinlikkayit', { ikEtkinlikID: $scope.ikEtkinlikID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkinlik kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.IkIstirakGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIstirak.IkIstirakGetData($scope.AramaKriterPersonelEtkinlik);
                promiseGet.then(function (gelen) {
                    //   $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İştirak listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('İştirak listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.IkIstirakListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İştirak listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IkFirmaGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkFirma.IkFirmaGetData($scope.AramaKriterPersonelEtkinlik);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Firma listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Firma listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.IkFirmaListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Firma listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.ParaBirimiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getParaBirimi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Para birimi listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Para birimi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ParaBirimiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Para birimi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });

            }

            $scope.KullaniciListesiniGetir = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                //$scope.AramaKriterListePersonelEtkinlik = $scope.ikEgitimID;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterPersonelEtkinlik);

                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                    // $scope.KullaniciListesi = pl.data.Veri;

                    $scope.KullaniciListesi = [];
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Katılımcı listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Katılımcı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesiVeri = gelen.data.Veri;
                        if ($scope.IkEtkinlikPersonelKatilimciListesi.length != 0) {
                            angular.forEach($scope.IkEtkinlikPersonelKatilimciListesi, function (value, key) {
                                angular.forEach($scope.KullaniciListesiVeri, function (valuekullanici, keykullanici) {
                                    if (value.KULLANICI_ID == valuekullanici.KULLANICI_ID) {
                                        $scope.KullaniciListesiVeri.splice(keykullanici, 1);
                                        $scope.KullaniciListesi = $scope.KullaniciListesiVeri;
                                    }
                                });
                            });
                        }
                        else {
                            $scope.KullaniciListesi = $scope.KullaniciListesiVeri;
                        }
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Katılımcı listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }
            $scope.InfoEtkinlikPersonel = {
                IK_ETKINLIK_ID: '',
                KULLANICI_ID: ''
            }
            $scope.IkEtkinlikPersonelEkleGuncelle = function (InfoEtkinlikPersonel) {
                $rootScope.sayfayukleniyor = true;
                $scope.formEtkinlikPersonelCalistirildi = true;
                if ($scope.frmEtkinlikPersonel.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmEtkinlikPersonel);
                    return;
                }
                InfoEtkinlikPersonel.IK_ETKINLIK_ID = $scope.ikEtkinlikID;

                var promiseGet = srvIkEtkinlikPersonel.IkEtkinlikPersonelEkleGuncelle(InfoEtkinlikPersonel);
                promiseGet.then(function (gelen) {
                    $scope.formEtkinlikPersonelCalistirildi = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Etkinlik personel kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkinlik personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Etkinlik personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.InfoEtkinlikPersonel.KULLANICI_ID = null;
                        $scope.IkEtkinlikPersonelGetData();
                        $scope.IkEtkinlikPersonelKatilimciGetData();
                        $scope.KullaniciListesiniGetir();
                    }
                },
                    function (hata) {
                        $scope.formEtkinlikPersonelCalistirildi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkinlik personel kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.IkEtkinlikPersonelGetData = function (AramaKriterListePersonelEtkinlik) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEtkinlikPersonel.IkEtkinlikPersonelGetData($scope.AramaKriterListePersonelEtkinlik);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkinlik personel listesi yüklenirken bir hata oluştu. Hata: ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkinlik personel listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkEtkinlikPersonelListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkinlik personel listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IkEtkinlikPersonelKatilimciGetData = function (AramaKriterListePersonelEtkinlik) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEtkinlikPersonel.IkEtkinlikPersonelGetData($scope.AramaKriterPersonelEtkinlik);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkinlik personel katılımcı listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkinlik personel katılımcı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.IkEtkinlikPersonelKatilimciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj);
                        console.error('Etkinlik personel katılımcı listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IkEtkinlikPersonelSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEtkinlikPersonel.IkEtkinlikPersonelSil(info.IK_ETKINLIK_PERSONEL_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkinlik personel silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkinlik personel silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', 'Etkinlik personel silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.', 'S');
                        if ($scope.IkEtkinlikPersonelListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriterListePersonelEtkinlik.SayfaNo = $scope.AramaKriterListePersonelEtkinlik.SayfaNo - 1;
                        }
                        $scope.IkEtkinlikPersonelGetData();
                        $scope.IkEtkinlikPersonelKatilimciGetData();
                        $scope.KullaniciListesiniGetir();
                        //$state.reload();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkinlik personel silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });

            };

            $scope.modalSilmeOnayiEtkinlikPersonel = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.IkEtkinlikPersonelSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizlePersonel = function () {
                angular.element("#txtKULLANICI_AD_SOYAD").value = null;
                $scope.AramaKriterListePersonelEtkinlik = {
                    IK_ETKINLIK_ID: $scope.ikEtkinlikID,
                    KULLANICI_AD_SOYAD: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true,
                    FILTER: false
                };

                $scope.IkEtkinlikPersonelGetData($scope.AramaKriterListePersonelEtkinlik);
            }

            $scope.IkEtkinlikDosyaGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEtkinlikDosya.IkEtkinlikDosyaGetData($scope.AramaKriterListeEtkinlikDosya);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkinlik dosya listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        consele.error('Etkinlik dosya listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiIkEtkinlikDosya = gelen.data.ToplamKayitSayisi;
                        $scope.IkEtkinlikDosyaListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkinlik dosya listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkEtkinlikDosyaEkleGuncelle = function (InfoEtkinlikDosya) {
                $scope.formEtkinlikDosyaCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmEtkinlikDosya.$valid && $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_ADI.length > 0) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmEtkinlikDosya);
                    return;
                }
                InfoEtkinlikDosya.IK_ETKINLIK_ID = $scope.ikEtkinlikID;

                var promiseGet = srvIkEtkinlikDosya.IkEtkinlikDosyaEkleGuncelle(InfoEtkinlikDosya);
                promiseGet.then(function (gelen) {

                    $scope.formEtkinlikDosyaCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Etkinlik dosya kayıt işleminiz sırasında bir hata oluştu." + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Etkinlik dosya kayıt işleminiz sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                        $rootScope.sayfayukleniyor = false;
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Etkinlik dosya kayıt işleminiz başarılı bir şekilde gerçekleştirlmiştir.", 'S');
                        $scope.IkEtkinlikDosyaGetData();
                        $scope.etkinlikDosyaDokumanSifirla();
                        $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_ACIKLAMA = null;
                        $rootScope.sayfayukleniyor = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        $scope.formEtkinlikDosyaCalistirildi = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Etkinlik dosya kayıt işleminiz sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.IkEtkinlikDosyaSil = function (InfoEtkinlikDosya) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEtkinlikDosya.IkEtkinlikDosyaSil(InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkinlik dosya silme işleminiz sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkinlik dosya silme işleminiz sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem Tamam', 'Etkinlik dosya silme işleminiz başarı bir şekilde gerçekleştirilmiştir.', 'S');
                        if ($scope.IkEtkinlikDosyaListesi.length == 1 && $scope.toplamKayitSayisiIkEtkinlikDosya > 10) {
                            $scope.AramaKriterListeEtkinlikDosya.SayfaNo = $scope.AramaKriterListeEtkinlikDosya.SayfaNo - 1;
                        }
                        $scope.IkEtkinlikDosyaGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkinlik dosya silme işleminiz sırasında bir hata oluştu. Hata: ', hata);
                    });

            };

            $scope.modalSilmeOnayiEtkinlikDosya = function (InfoEtkinlikDosya) {
                $scope.secilenKayit = InfoEtkinlikDosya;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.IkEtkinlikDosyaSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizleDosya = function () {
                angular.element("#txtIK_ETKINLIK_DOSYA_ADI").value = null;
                $scope.AramaKriterListeEtkinlikDosya = {
                    IK_ETKINLIK_ID: $scope.ikEtkinlikID,
                    IK_ETKINLIK_DOSYA_ADI: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.IkEtkinlikDosyaGetData($scope.AramaKriterListeEtkinlikDosya);
            }

            $scope.IkEtkinlikDosyaGoster = function (ikEtkinlikDosyaID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEtkinlikDosya.IkEtkinlikDosyaSelect(ikEtkinlikDosyaID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Etkinlik dosya bilgileri yüklenirken bir hata oluştu. Hata:' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Etkinlik dosya bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        $scope.RaporData = { Dosya: gelen.data.IK_ETKINLIK_DOSYA_URL, canPrint: browserCanPrint, ekUzanti: 'pdf' };
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
                        console.error('Etkinlik dosya bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceEkGoster.dismiss('cancel');
            };


            $scope.etkinlikDosyaDokumanSifirla = function () {
                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_ADI = null;
                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_BOYUTU = null;
                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_TIPI = null;
                $scope.InfoEtkinlikDosya.IK_ETKINLIK_DOSYA_DOSYA = null;

            }

        }]);

