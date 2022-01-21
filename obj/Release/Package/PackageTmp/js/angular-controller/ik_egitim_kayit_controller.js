angular.module('inspinia').controller(
    'ik_egitim_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkEgitim', 'srvIkEgitimVerenKurum', 'srvIkEgitimPersonel', 'srvKullanici', 'srvIkEgitimDosya','srvIkEgitimDosyaTipi', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkEgitim, srvIkEgitimVerenKurum, srvIkEgitimPersonel, srvKullanici, srvIkEgitimDosya, srvIkEgitimDosyaTipi, Ayarlarim) {
            $scope.ikEgitimID = $stateParams.ikEgitimID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterPersonelEgitim = {
                IK_EGITIM_ID: $scope.ikEgitimID,
                KULLANICI_AD_SOYAD: '',
                FILTER: true,
                LISTE: false,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.AramaKriterListePersonelEgitim = {
                IK_EGITIM_ID: $scope.ikEgitimID,
                KULLANICI_AD_SOYAD: '',
                FILTER: true,
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            $scope.AramaKriterListeEgitimDosya = {
                IK_EGITIM_ID: $scope.ikEgitimID,
                IK_EGITIM_DOSYA_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.InfoEgitimDosya = {
                IK_EGITIM_DOSYA_ID: null,
                IK_EGITIM_ID: '',
                IK_EGITIM_DOSYA_ADI: '',
                IK_EGITIM_DOSYA_DOSYA: '',
                IK_EGITIM_DOSYA_TIPI_ID: '',
                IK_EGITIM_DOSYA_DOSYA_TIPI: '',
                IK_EGITIM_DOSYA_BOYUTU: '',
                DosyaBase64: ''
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {


                $scope.IkEgitimVerenKurumGetData();
                $scope.IkEgitimPersonelGetData();
                $scope.IkEgitimDosyaTipiGetData();
                $scope.IkEgitimDosyaGetData();
                $scope.IkEgitimPersonelKatilimciGetData();
                $scope.KullaniciListesiniGetir();

                if ($scope.ikEgitimID > 0) {
                    $scope.IkEgitimSelect();
                    $scope.handleFileSelect = function (evt) {
                        var file = evt[0];
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            $scope.$apply(function ($scope) {
                                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_ADI = file.name;
                                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_DOSYA = evt.target.result;
                                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_DOSYA_TIPI = file.type;
                                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_BOYUTU = file.size;
                            });
                        };
                        reader.readAsDataURL(file);
                    };


                }
            }

            $scope.IkEgitimSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitim.IkEgitimSelect($scope.ikEgitimID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('insankaynaklari.ikegitimlistesi');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Eğitim bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkEgitimEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmEgitim.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmEgitim);
                    return;
                }
                var promiseGet = srvIkEgitim.IkEgitimEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Eğitim kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Eğitim kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ikEgitimID = gelen.data.returnKayitNo;
                        //$scope.IkEgitimSelect();
                        $state.go('insankaynaklari.ikegitimkayit', { ikEgitimID: $scope.ikEgitimID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkEgitimVerenKurumGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimVerenKurum.IkEgitimVerenKurumGetData($scope.AramaKriterPersonelEgitim);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Eğitim veren kurum listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Eğitim veren kurum listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.IkEgitimVerenKurumListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim veren kurum listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoEgitimPersonel = {
                KULLANICI_ID: '',
                IK_EGITIM_ID: ''
            };

            $scope.IkEgitimPersonelEkleGuncelle = function (InfoEgitimPersonel) {
                $rootScope.sayfayukleniyor = true;
                $scope.formEgitimPersonelCalistirildi = true;
                if ($scope.frmIkEgitimPersonel.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmIkEgitimPersonel);
                    return;
                }
                InfoEgitimPersonel.IK_EGITIM_ID = $scope.ikEgitimID;

                var promiseGet = srvIkEgitimPersonel.IkEgitimPersonelEkleGuncelle(InfoEgitimPersonel);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formEgitimPersonelCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Eğitim personel kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Eğitim personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.InfoEgitimPersonel.KULLANICI_ID = 0;
                        //$scope.AramaKriterListePersonelEgitim.IK_EGITIM_ID = $scope.ikEgitimID;
                        $scope.IkEgitimPersonelGetData();
                        $scope.IkEgitimPersonelKatilimciGetData();
                        $scope.KullaniciListesiniGetir();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim personel kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }
            $scope.IkEgitimPersonelGetData = function (AramaKriterListePersonelEgitim) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimPersonel.IkEgitimPersonelGetData($scope.AramaKriterListePersonelEgitim);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Eğitim personel listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Eğitim personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkEgitimPersonelListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim personel listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IkEgitimPersonelKatilimciGetData = function (AramaKriterListePersonelEgitim) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimPersonel.IkEgitimPersonelGetData($scope.AramaKriterPersonelEgitim);

                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.IkEgitimPersonelKatilimciListesi = gelen.data.Veri;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Eğitim katılımcı listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Eğitim katılımcı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.IkEgitimPersonelKatilimciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim katılımcı listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.KullaniciListesiniGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterPersonelEgitim);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                    $scope.KullaniciListesiVeri = gelen.data.Veri;
                    $scope.KullaniciListesi = [];
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Kullanıcı listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        if ($scope.IkEgitimPersonelKatilimciListesi.length != 0) {
                            angular.forEach($scope.IkEgitimPersonelKatilimciListesi, function (value, key) {
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
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkEgitimPersonelSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimPersonel.IkEgitimPersonelSil(info.IK_EGITIM_PERSONEL_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim personel silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim personel silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Eğitim personel silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkEgitimPersonelListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriterListePersonelEgitim.SayfaNo = $scope.AramaKriterListePersonelEgitim.SayfaNo - 1;
                        }
                        $scope.IkEgitimPersonelGetData();
                        $scope.IkEgitimPersonelKatilimciGetData();
                        $scope.KullaniciListesiniGetir();

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim personel silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiEgitimPersonel = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {


                            $scope.IkEgitimPersonelSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;

                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }

                );
            };

            $scope.IkEgitimDosyaTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimDosyaTipi.IkEgitimDosyaTipiGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Eğitim Dosya Tipi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Eğitim Dosya Tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkEgitimDosyaTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim dosya tipi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IkEgitimDosyaEkleGuncelle = function (InfoEgitimDosya) {
                $scope.formIkEgitimDosyaCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmEgitimDosya.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmEgitimDosya);
                    return;
                }
                InfoEgitimDosya.IK_EGITIM_ID = $scope.ikEgitimID;
                var promiseGet = srvIkEgitimDosya.IkEgitimDosyaEkleGuncelle(InfoEgitimDosya);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formIkEgitimDosyaCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Eğitim dosya kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim dosya kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Eğitim dosya kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_TIPI_ID = null;
                        $scope.egitimDosyaDokumanSifirla();
                        $scope.IkEgitimDosyaGetData();

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim dosya kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkEgitimDosyaGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimDosya.IkEgitimDosyaGetData($scope.AramaKriterListeEgitimDosya);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Eğitim dosya listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Eğitim dosya listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiEgitimDosya = gelen.data.ToplamKayitSayisi;
                        $scope.IkEgitimDosyaListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim dosya listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IkEgitimDosyaSil = function (InfoEgitimDosya) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimDosya.IkEgitimDosyaSil(InfoEgitimDosya.IK_EGITIM_DOSYA_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim dosya silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim dosya silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Eğitim dosya silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkEgitimDosyaListesi.length == 1 && $scope.toplamKayitSayisiEgitimDosya > 10) {
                            $scope.AramaKriterListeEgitimDosya.SayfaNo = $scope.AramaKriterListeEgitimDosya.SayfaNo - 1;
                        }
                        $scope.IkEgitimDosyaGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim personel silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiEgitimDosya = function (InfoEgitimDosya) {
                $scope.secilenKayit = InfoEgitimDosya;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.IkEgitimDosyaSil($scope.secilenKayit);
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
                $scope.AramaKriterListePersonelEgitim = {
                    IK_EGITIM_ID: $scope.ikEgitimID,
                    KULLANICI_AD_SOYAD: '',
                    FILTER: true,
                    LISTE: true,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };


                $scope.IkEgitimPersonelGetData($scope.AramaKriterListePersonelEgitim);
            }


            $scope.filtreTemizleDosya = function () {
                angular.element("#txtIK_EGITIM_DOSYA_ADI").value = null;
                $scope.AramaKriterListeEgitimDosya = {
                    IK_EGITIM_ID: $scope.ikEgitimID,
                    IK_EGITIM_DOSYA_ADI: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.IkEgitimDosyaGetData($scope.AramaKriterListeEgitimDosya);
            }

            $scope.IkEgitimDosyaGoster = function (ikEgitimDosyaID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimDosya.IkEgitimDosyaSelect(ikEgitimDosyaID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Eğitim dosya bilgileri yüklenirken bir hata oluştu. Hata:' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Eğitim dosya bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        $scope.RaporData = { Dosya: gelen.data.IK_EGITIM_DOSYA_URL, canPrint: browserCanPrint, ekUzanti: 'pdf' };
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
                        console.error('Eğitim dosya bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceEkGoster.dismiss('cancel');
            };


            $scope.egitimDosyaDokumanSifirla = function () {
                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_ADI = null;
                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_DOSYA = null;
                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_DOSYA_TIPI = null;
                $scope.InfoEgitimDosya.IK_EGITIM_DOSYA_BOYUTU = null;
            }



        }]);

