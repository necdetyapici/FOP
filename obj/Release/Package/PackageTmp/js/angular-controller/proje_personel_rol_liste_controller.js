angular.module('inspinia').controller(
    'proje_personel_rol_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjePersonelRol', 'srvProjePersonel','srvPersonelTipi', 'srvGenel', 'srvProjeRol', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjePersonelRol, srvProjePersonel, srvPersonelTipi, srvGenel, srvProjeRol, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.search = {};
            //$scope.calisanKullaniciID = $stateParams.kullaniciID;
            $scope.projeID = $stateParams.projeID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjePersonelGetData();
                $scope.TecrubeGetData();
                $scope.PersonelTipiGetData();
                $scope.ProjeRolGetData();
                $scope.PersonelProjeRolGetData();
                $scope.ProjePersonelRolGetData();

            };
            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                CALISAN_KULLANICI_AD_SOYAD: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };


            $scope.ProjePersonelGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiProjePersonel = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePersonelListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.CALISAN_KULLANICI_AD_SOYAD).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjePersonelSil = function (InfoProjePersonel) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonel.ProjePersonelSil(InfoProjePersonel.PROJE_PERSONEL_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje personel silme işlemi sırasında bir hata ile oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Personel silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjePersonelListesi.length == 1 && $scope.toplamKayitSayisiProjePersonel > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjePersonelGetData();
                        $scope.ProjePersonelGetDataGenel();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayiProjePersonel = function (InfoProjePersonel) {
                $scope.secilenKayit = InfoProjePersonel;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjePersonelSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.TecrubeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTecrube();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Tecrübe listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Tecrübe listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TecrubeListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tecrübe listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.ProjePersonelEkleGuncelle = function (InfoProjePersonel) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePersonel = true;
                if ($scope.frmProjePersonel.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjePersonel);
                    return;
                }
                InfoProjePersonel.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjePersonel.ProjePersonelEkleGuncelle(InfoProjePersonel);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjePersonelGetData();
                        $scope.ProjePersonelGetDataGenel();
                        $scope.formCalistirildiProjePersonel = false;
                        $scope.InfoProjePersonel.CALISAN_KULLANICI_ID = null;
                        $scope.InfoProjePersonel.TECRUBE_ID = null;
                        $scope.InfoProjePersonel.BASLAMA_TARIHI = null;
                        $('#txtBASLAMA_TARIHI').val('');
                        $('#txtAYRILMA_TARIHI').val('');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            //filtrelme fonksiyonu düzenlenecek.
            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PROJE_ID: $scope.projeID,
                    CALISAN_KULLANICI_AD_SOYAD: null,
                    LISTE: true
                };
                $scope.ProjePersonelGetData($scope.AramaKriter);
            };


            //Proje personel, proje rol ve proje personel rol sayflarını tek bir sayfa altında toplantı
            //html sayfası olarak proje_personel_ve_rol.html sayfası kullanıldı.
            //js controller olarak proje personel controller kullanıldı.

            //Proje Rol
            $scope.AramaKriterProjeRol = {
                PROJE_ID: $scope.projeID,
                PERSONEL_TIPI_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.ProjeRolGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRol.ProjeRolGetData($scope.AramaKriterProjeRol);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Rol listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Rol listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiProjeRol = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeRolListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rol listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.PersonelTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvPersonelTipi.PersonelTipiGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.PersonelTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeRolEkleGuncelle = function (InfoProjeRol) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjeRol = true;
                if ($scope.frmProjeRol.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeRol);
                    return;
                }
                InfoProjeRol.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeRol.ProjeRolEkleGuncelle(InfoProjeRol);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Rol kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Rol kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Proje rol kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjeRolGetData();
                        $scope.PersonelProjeRolGetData();
                        $scope.formCalistirildiProjeRol = false;
                        $scope.InfoProjeRol.PERSONEL_TIPI_ID = null;
                        $scope.InfoProjeRol.ROL_ACIKLAMA = null;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rol kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeRolSil = function (InfoProjeRol) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRol.ProjeRolSil(InfoProjeRol.PROJE_ROL_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Rol silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Rol silme işlemi sırasında bir hata ile oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Rol silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeRolListesi.length == 1 && $scope.toplamKayitSayisiProjeRol > 10) {
                            $scope.AramaKriterProjeRol.SayfaNo = $scope.AramaKriterProjeRol.SayfaNo - 1;
                        }
                        $scope.ProjeRolGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rol silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayiProjeRol = function (InfoProjeRol) {
                $scope.secilenKayit = InfoProjeRol;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjeRolSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizlePersonelRol = function () {

                $scope.AramaKriterProjeRol = {
                    PROJE_ID: $scope.projeID,
                    PERSONEL_TIPI_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.ProjeRolGetData($scope.AramaKriterProjeRol);
            };

            //Proje Personel Rol
            $scope.AramaKriterProjePersonelRol = {
                PROJE_ID: $scope.projeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                PERSONEL_AD_SOYAD: '',
                LISTE: true
            };

            $scope.ProjePersonelRolGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonelRol.ProjePersonelRolGetData($scope.AramaKriterProjePersonelRol);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel rol listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Persoenel rol listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiProjePersonelRol = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePersonelRolListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel rol bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //$scope.InfoProjePersonelRol = {
            //    PROJE_PERSONEL_ID: '',
            //    PROJE_ROL_ID: ''
            //};

            $scope.ProjePersonelRolEkleGuncelle = function (InfoProjePersonelRol) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePersonelRol = true;
                if ($scope.frmProjePersonelRol.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjePersonelRol);
                    return;
                }
                InfoProjePersonelRol.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjePersonelRol.ProjePersonelRolEkleGuncelle(InfoProjePersonelRol);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel rol kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel rol kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel rol kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjePersonelRolGetData();
                        $scope.formCalistirildiProjePersonelRol = false;
                        $scope.InfoProjePersonelRol.PROJE_PERSONEL_ID = null;
                        $scope.InfoProjePersonelRol.PROJE_ROL_ID = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel rol kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePersonelRolSil = function (InfoProjePersonelRol) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonelRol.ProjePersonelRolSil(InfoProjePersonelRol.PROJE_PERSONEL_ROL_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel rol silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel rol silme işlemi sırasında bir hata ile oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Personel rol silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjePersonelRolListesi.length == 1 && $scope.toplamKayitSayisiProjePersonelRol > 10) {
                            $scope.AramaKriterProjePersonelRol.SayfaNo = $scope.AramaKriterProjePersonelRol.SayfaNo - 1;
                        }
                        $scope.ProjePersonelRolGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel rol silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.modalSilmeOnayiProjePersonelRol = function (InfoProjePersonelRol) {
                $scope.secilenKayit = InfoProjePersonelRol;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjePersonelRolSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizleProjePersonelRol = function () {
                $scope.AramaKriterProjePersonelRol = {
                    PROJE_ID: $scope.projeID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PERSONEL_AD_SOYAD: null,
                    LISTE: true
                };
                $scope.ProjePersonelRolGetData($scope.AramaKriterProjePersonelRol);
            };

            $scope.PersonelProjeRolGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRol.ProjeRolGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Rol listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Rol listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiProjeRol = gelen.data.ToplamKayitSayisi;
                        $scope.PersonelProjeRolListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rol listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


        }]);

