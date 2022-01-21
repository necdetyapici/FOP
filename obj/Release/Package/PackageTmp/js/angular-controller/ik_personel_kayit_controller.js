angular.module('inspinia').controller(
    'ik_personel_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkPersonel', 'srvKullanici', 'srvIkPersonelBakmayaYukumluOlduguKisi', 'srvIkDepartman', 'srvIkBirim','srvIkUnvan', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkPersonel, srvKullanici, srvIkPersonelBakmayaYukumluOlduguKisi, srvIkDepartman, srvIkBirim, srvIkUnvan, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $stateParams.kullaniciID;

            $scope.IsCreate = 0;//1;
            $scope.altTab = 0;
            $scope.tab = 0;


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.setTab($scope.tab);
                $scope.setAltTab($scope.altTab);
                $scope.ilYukle();
                $scope.IkMedeniHalListesi = [{ IK_MEDENI_HAL: 1, IK_MEDENI_HAL_ADI: 'Evli' },
                { IK_MEDENI_HAL: 2, IK_MEDENI_HAL_ADI: 'Bekar' },
                { IK_MEDENI_HAL: 3, IK_MEDENI_HAL_ADI: 'Boşanmış' },
                { IK_MEDENI_HAL: 4, IK_MEDENI_HAL_ADI: 'Dul' }];

                $scope.KullaniciTipiYukle();
                $scope.KullaniciGetData();
                $scope.IkDepartmanGetData();
                $scope.IkYakinlikDerecesiGetData();
                $scope.IkBirimGetData();
                $scope.KanGrubuGetData();
                $scope.IkUnvanGetData();

                if ($scope.kullaniciID > 0) {
                    $scope.IkPersonelSelect();
                    $scope.IkPersonelBakmayaYukumluOlduguKisiGetData();
                    //    //$scope.IsCreate = 1;
                }
            };

            $scope.IkPersonelSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonel.IkPersonelSelect($scope.kullaniciID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonel = gelen.data;
                        $scope.IzinSuresiHesaplama($scope.InfoPersonel.KULLANICI.ISE_BASLAMA_TARIHI);

                        if ($scope.InfoPersonel.IK_PERSONEL_ID > 0) {
                            $scope.IsCreate = 1;
                            //InfoPersonelGenel değişkeni izinler masraf ve avans sayfalarında kullanıldığı için bu değişken kullnıldı.
                            //Örn; İzinler kayıt sayfası için departman yönetici adını ve id alıyoruz. İzinler sayfasında 
                            $scope.personelGenelIkYoneticiId = $scope.InfoPersonel.IK_YONETICI_ID;
                            $scope.personelGenelIkYoneticiKullaniciAdSoyad = $scope.InfoPersonel.IK_YONETICI_KULLANICI_AD_SOYAD;
                        }

                        if ($scope.InfoPersonel.IL_ID > 0)
                            $scope.getIlce();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('insankaynaklari.ikpersonellistesi');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Personel bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkPersonelEkleGuncelle = function (InfoPersonel, frm_Kullanici) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;

                if (frm_Kullanici.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frm_Kullanici);
                    return;
                }
                if (InfoPersonel.DEVIR_IZNI === null && InfoPersonel.IK_PERSONEL_ID === null) {
                    InfoPersonel.DEVIR_IZNI = $scope.toplamIzni;
                }
                var promiseGet = srvIkPersonel.IkPersonelEkleGuncelle(InfoPersonel);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.kullaniciID = gelen.data.returnKayitNo;
                        $state.go('insankaynaklari.ikpersonelkayit.ikpersonelkart', { 'kullaniciID': $scope.kullaniciID }, { reload: true });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.setTab = function (tabValue) {
                $scope.tab = tabValue;

                if (tabValue === 0) {
                    if ($state.current.name.indexOf('ikpersonelkart') !== -1) {
                        $scope.tab = 1;

                    }

                    if ($state.current.name.indexOf('ikpersonelekler') !== -1) {
                        $scope.tab = 2;
                    }

                    if ($state.current.name.indexOf('ikpersonelegitim') !== -1) {
                        $scope.tab = 3;
                    }

                    if ($state.current.name.indexOf('ikpersoneltoplantilistesi') !== -1) {
                        $scope.tab = 4;
                    }

                    if ($state.current.name.indexOf('ikpersoneldisgorevlistesi') !== -1) {
                        $scope.tab = 5;
                    }
                    if ($state.current.name.indexOf('ikpersonelizinlistesi') !== -1) {
                        $scope.tab = 6;
                    }
                    if ($state.current.name.indexOf('ikpersonelprojelistesi') !== -1) {
                        $scope.tab = 7;
                    }
                    if ($state.current.name.indexOf('ikpersonelgecmisfirmabilgilerilistesi') !== -1) {
                        $scope.tab = 8;
                    }
                    if ($state.current.name.indexOf('ikpersonelzimmetlistesi') !== -1) {
                        $scope.tab = 9;
                    }
                    if ($state.current.name.indexOf('ikpersonelokulegitimlistesi') !== -1) {
                        $scope.tab = 10;
                    }
                    if ($state.current.name.indexOf('ikpersonelavanslistesi') !== -1) {
                        $scope.tab = 11;
                    }
                    if ($state.current.name.indexOf('ikpersonelmasraflistesi') !== -1) {
                        $scope.tab = 12;
                    }
                }
                $scope.altTab = $state.current.data.altTab
                if ($scope.tab === 2 && !($scope.altTab > 1)) {
                    $scope.altTab = 1;
                }
                if ($scope.tab === 3 && !($scope.altTab > 1)) {
                    $scope.altTab = 13;
                }

            };

            $scope.setAltTab = function (altTabValue) {

                if ($state.current.data.altTab) {
                    $scope.altTab = $state.current.data.altTab;
                }
                if (altTabValue > 0) {
                    $scope.altTab = altTabValue;
                }
            };

            $scope.AramaKriterGenel = {
                LISTE: false
            };
            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterGenel);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesiGenel = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ilYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetIl = srvGenel.getIlIlce(0);

                promiseGetIl.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İl listesi yüklenirken bir hata ile oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İl listesi yüklenirken bir hata ile oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IlListesi = gelen.data;
                    }


                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İl listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.getIlce = function () {
                $rootScope.sayfayukleniyor = true;
                var IlId = $scope.InfoPersonel.IL_ID;

                if (IlId !== null) {
                    var promiseGetIl = srvGenel.getIlce(1, IlId);

                    promiseGetIl.then(function (gelen) {

                        $rootScope.sayfayukleniyor = false;
                        if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                            mesajGoster('Dikkat', 'İlçe listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                            console.error('İlçe listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                        } else {
                            $scope.IlceListesi = gelen.data;
                        }
                    },
                        function (hata) {
                            $rootScope.sayfayukleniyor = false;
                            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                            console.error('İlçe listesi yüklenirken bir hata oluştu. Hata:', hata);
                        });
                }
                else {
                    $scope.IlceListesi = null;
                    $rootScope.sayfayukleniyor = false;
                }

            };

            

            $scope.KullaniciTipiYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getKullaniciTipiListesi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı tipleri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı tipleri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.KullaniciTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı tipleri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkDepartmanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDepartman.IkDepartmanGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Departman listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Departman listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkDepartmanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Departman listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkBirimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkBirim.IkBirimGetData();
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Birim listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Birim listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkBirimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Birim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkUnvanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkUnvan.IkUnvanGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Ünvan listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Ünvan listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkUnvanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Ünvan listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KanGrubuGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getKanGrubu();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kan grubu listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kan grubu listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.KanGrubuListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kan grubu listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };





            $scope.resmiTemizle = function () {
                $scope.InfoPersonel.KULLANICI.AvatarBase64 = '';
            };

            $scope.modalInfoResmi = function () {
                $rootScope.modalInstance = $modal.open({
                    templateUrl: 'views/modal_info_resim.html',
                    size: 'lg',
                    windowClass: "animated fadeInUpBig",
                    backdrop: 'static', // dışarısı tıklanınca çıkmaması için
                    scope: $scope
                });
            };

            $scope.IkYakinlikDerecesiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIkYakinlikDerecesi();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yakınlık derecesi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yakınlık derecesi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkYakinlikDerecesiListesi = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yakınlık derecesi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            //Bakmaya Yükümlü Olduğu
            $scope.InfoBakmayaYukumlu = {};
            $scope.IkBakmayaYukumluOlduguKisiEkleGuncelle = function (InfoBakmayaYukumlu, frmIkBakmaklaYukumlu) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiBakmayaYukumlu = true;
                if (frmIkBakmaklaYukumlu.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmIkBakmaklaYukumlu);
                    return;
                }
                InfoBakmayaYukumlu.KULLANICI_ID = $scope.kullaniciID;
                var promiseGet = srvIkPersonelBakmayaYukumluOlduguKisi.IkPersonelBakmayaYukumluOlduguKisiEkleGuncelle(InfoBakmayaYukumlu);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bakmaya yükümlü kişi kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bakmaya yükümlü kişi kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Bakmaya yükümlü kişi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.IkPersonelBakmayaYukumluOlduguKisiGetData();
                        $scope.InfoBakmayaYukumlu.AD_SOYAD = null;
                        $scope.InfoBakmayaYukumlu.DOGUM_TARIHI = null;
                        $('#txtYAKINININ_DOGUM_TARIHI').val(null);
                        $scope.InfoBakmayaYukumlu.IK_YAKINLIK_DERECESI_ID = null;
                        $scope.formCalistirildiBakmayaYukumlu = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bakmaya yükümlü kişi kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriterBakmayaYukumlu = {
                KULLANICI_ID: $scope.kullaniciID,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.IkPersonelBakmayaYukumluOlduguKisiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelBakmayaYukumluOlduguKisi.IkPersonelBakmayaYukumluOlduguKisiGetData($scope.AramaKriterBakmayaYukumlu);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bakmaya yükümlü kişi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bakmaya yükümlü kişi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiBakmayaYukumlu = gelen.data.ToplamKayitSayisi;
                        $scope.IkPersonelBakmayaYukumluListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bakmaya yükümlü kişi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkPersonelBakmayaYukumluOlduguKisiSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelBakmayaYukumluOlduguKisi.IkPersonelBakmayaYukumluOlduguKisiSil(info.IK_PERSONEL_BAKMAYA_YUKUMLU_OLDUGU_KISI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bakmaya yükümlü kişi silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bakmaya yükümlü kişi silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('Dikkat', "Bakmay yükümlü kişi silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.IkPersonelBakmayaYukumluOlduguKisiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bakmaya yükümlü kişi silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };


            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.IkPersonelBakmayaYukumluOlduguKisiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            //Bakmaya Yükümlü Olduğu Son

            //Personel hakkettiği bütün izinleri hesaplama
            $scope.IzinSuresiHesaplama = function (tarih) {
                var guncelZaman = new Date();
                var iseBaslamaTarih = new Date(tarih);
                var fark = guncelZaman.getFullYear() - iseBaslamaTarih.getFullYear();
                if (((guncelZaman.getDate() - iseBaslamaTarih.getDate()) >= 0 && (guncelZaman.getMonth() - iseBaslamaTarih.getMonth()) >= 0) || ((guncelZaman.getDate() - iseBaslamaTarih.getDate()) <= 0 && (guncelZaman.getMonth() - iseBaslamaTarih.getMonth()) > 0) && fark > 0) {
                    fark = fark;
                }
                else {
                    fark = fark - 1;
                }
                if (fark >= 1 && fark < 5) {
                    $scope.toplamIzni = fark * 14;
                }
                else if (fark >= 5 && fark < 15) {
                    $scope.toplamIzni = (4 * 14) + ((fark - 4) * 20);
                }
                else if (fark >= 15) {
                    $scope.toplamIzni = (4 * 14) + (10 * 20) + ((fark - 14) * 26);
                }
                else {
                    $scope.toplamIzni = 0;
                }
            };
            //Personel hakkettiği bütün izinleri hesaplama
        }]);