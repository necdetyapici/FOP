angular.module('inspinia').controller(
    'kullanici_controller', ['$scope', '$http', '$state', '$stateParams', '$document', '$window', '$log', '$localStorage', '$sessionStorage', '$rootScope', '$modal', 'ngDialog', 'srvKullanici', 'srvGenel', 'Constants',  'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $document, $window, $log, $localStorage, $sessionStorage, $rootScope, $modal, ngDialog, srvKullanici, srvGenel, Constants, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanFormTipi = Constants.DOKUMAN_FORM_TIPI;
            $scope.AramaKriter = {
                LISTE: true,
                AD_SOYAD: '',
                KULLANICI_ADI: '',
                KULLANICI_TIPI_ID: '',
                CINSIYET: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                
                $scope.tabClick(1);
                $scope.kullaniciTipiYukle();
            };


            $scope.KullaniciListesiGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriter);

                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;

                    if (pl.data.Veri.length > 0 && pl.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı listesi yüklenirken bir hata oluştu.' + pl.data.Veri[0].mesaj, pl.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata:', pl.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                        $scope.KullaniciListesi = pl.data.Veri;
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
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalPasiflestirmeOnayi = function (Kullanici) {
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_aktif_pasif.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if (value === "true") {
                            $scope.kullaniciPasiflestir(Kullanici);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.kullaniciPasiflestir = function (Kullanici) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciPasiflestir(Kullanici);
                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;
                    if (pl.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı pasifleştirme işlemi sırasında bir hata oluştu.' + pl.data.mesaj, pl.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı pasifleştirme işlemi sırasında bir hata oluştu. Hata:', pl.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Kullanıcı pasifleştirme işlemi başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.KullaniciListesiGetData($scope.AramaKriter);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı pasifleştirme işlemi sırasın hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalAktiflestirmeOnayi = function (Kullanici) {
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_aktif_pasif.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if (value === "true") {
                            $scope.kullaniciAktiflestir(Kullanici);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.kullaniciAktiflestir = function (Kullanici) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciAktiflestir(Kullanici);
                promiseGet.then(function (pl) {
                    if (pl.data.Hata === true) {
                        mesajGoster('Dikkat', 'Kullanıcı aktifleştirme işlemi sırasında bir hata oluştu.' + pl.data.mesaj, pl.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı aktifleştirme işlemi sırasında bir hata oluştu. Hata:', pl.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Kullanıcı aktifleştirme işlemi başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.KullaniciListesiGetData($scope.AramaKriter);
                    }
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı aktifleştirme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciTipiYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getKullaniciTipiListesi();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı tipleri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı tipleri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.KullaniciTipiListesi = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı tipleri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.tinymceOptions = {

                language: 'tr_TR',
                theme: 'modern',
                plugins: 'print fullpage noneditable',

                noneditable_leave_contenteditable: true,
                menubar: "file",
                toolbar: false,

                removed_menuitems: 'newdocument',
                content_css: [
                    '../css/tinymce/fontgoogleapisLato300300i400400i.css',
                    '../css/tinymce/codeopen.css'
                ],
                height: '842',

                setup: function (editor) {

                    editor.on("init", function () {
                        $('.mce-edit-area').css({ "width": "21cm", "margin": "auto", "background-color": "gray" });
                    });
                    editor.on("focus", function () {
                        tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                    });
                }
            };

            $scope.KullaniciPersonelFormuYazdir = function (formTipi) {
                $scope.Kriter = {
                    DOKUMAN_FORM_TIPI: formTipi

                };
                $scope.modalGoster($scope.Kriter);
            };

            $scope.modalGoster = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = null;
                promiseGet = srvKullanici.KullaniciPersonelFormu(Kriter);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                     
                        $scope.RaporData = { Dosya: gelen.data.FORM_ON_IZLEME, AramaKriter: Kriter, ekUzanti: 'pdf' };
                        $scope.modalInstance = $modal.open({
                            templateUrl: 'views/common/modal_dokuman_viewer.html',
                            controller: 'kullanici_controller',
                            size: 'lg',
                            scope: $scope
                        });
                    }
                    else
                        mesajGoster('Dikkat', gelen.data.mesaj, 'E');

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        basvuruMesajGoster('Dikkat', Kriter.belge + " yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log(Kriter.belge + 'Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstance.dismiss('cancel');
            };

            

            

            $scope.KullaniciListesiFiltreleme = function () {
                if ($scope.tab == 1) {
                    $scope.KullaniciListesiGetData($scope.AramaKriter);
                }
                if ($scope.tab == 2) {
                    $scope.LDAPKullaniciGetData($scope.AramaKriter);
                }
                
            }
            $scope.filtreTemizle = function () {
                switch ($scope.tab) {
                    case 1:
                        $scope.tabClick(1);
                        break;
                    default:
                        $scope.tabClick(2);
                        break;
                }
            };

            $scope.temizleFiltre = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    AD_SOYAD: '',
                    KULLANICI_ADI: '',
                    KULLANICI_TIPI_ID: '',
                    CINSIYET: ''
                };
            };

            $scope.tabClick = function (tab) {
                if (tab === 1) {
                   $scope.temizleFiltre();
                    $scope.$broadcast('tabBir');
                    $scope.tab = 1;
                    $scope.KullaniciListesiGetData($scope.AramaKriter);
                }
                if (tab === 2) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabIki');
                    $scope.tab = 2;
                    $scope.LDAPKullaniciGetData($scope.AramaKriter);

                }
                
            };

            $scope.LDAPKullaniciGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.LDAPKullaniciGetData($scope.AramaKriter);

                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;

                    if (pl.data.Veri.length > 0 && pl.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı listesi yüklenirken bir hata oluştu.' + pl.data.Veri[0].mesaj, pl.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata:', pl.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                        $scope.LDAPKullaniciListesi = pl.data.Veri;
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
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciKaydet = function (Kullanici) {
                $rootScope.sayfayukleniyor = true;
                Kullanici.MUSTERI_ID = $scope.$storage.MUSTERI_ID;
                Kullanici.ISE_BASLAMA_TARIHI = Kullanici.ISE_BASLAMA_TARIHI_LDAP;
                var promiseGet = srvKullanici.KullaniciKaydet(Kullanici);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.LDAPKullaniciGetData();
                        mesajGoster("İşlem tamam.", "Kullanıcı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.kullaniciLdapDurumuGuncelle = function (Kullanici) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciLdapDegistir(Kullanici);
                promiseGet.then(function (pl) {
                    if (pl.data.Hata === true) {
                        mesajGoster('Dikkat', 'Kullanıcı aktifleştirme işlemi sırasında bir hata oluştu.' + pl.data.mesaj, pl.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı aktifleştirme işlemi sırasında bir hata oluştu. Hata:', pl.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Kullanıcı aktifleştirme işlemi başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.KullaniciListesiGetData($scope.AramaKriter);
                    }
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı aktifleştirme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };
        }]);