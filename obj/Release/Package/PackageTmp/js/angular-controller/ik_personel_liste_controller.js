angular.module('inspinia').controller(
    'ik_personel_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkPersonel', 'Ayarlarim', 'srvKullanici', 'Constants', 'srvGenel',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkPersonel, Ayarlarim, srvKullanici, Constants, srvGenel) {
            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanFormTipi = Constants.DOKUMAN_FORM_TIPI;
            $scope.AramaKriter = {
                KULLANICI_ID: '',
                KULLANICI_ADI: '',
                AD_SOYAD: '',
                // FILTER: true,
                //  PERSONEL: '',
                KULLANICI_TIPI_ID: '',
                CINSIYET: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkPersonelGetData();

                $scope.KullaniciTipiYukle();
            };

            $scope.IkPersonelGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonel.IkPersonelGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkPersonelListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.AD_SOYAD).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };


            $scope.modalPasiflestirmeOnayi = function (Info) {
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_aktif_pasif.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if (value === "true") {
                            $scope.kullaniciPasiflestir(Info);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.kullaniciPasiflestir = function (Info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciPasiflestir(Info);
                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;
                    if (pl.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel pasifleştirme işlemi sırasında bir hata oluştu.' + pl.data.mesaj, pl.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel pasifleştirme işlemi sırasında bir hata oluştu. Hata:', pl.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel pasifleştirme işlemi başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.IkPersonelGetData($scope.AramaKriter);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel pasifleştirme işlemi sırasında hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalAktiflestirmeOnayi = function (Info) {
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_aktif_pasif.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if (value === "true") {
                            $scope.kullaniciAktiflestir(Info);
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
                    $rootScope.sayfayukleniyor = false;
                    if (pl.data.Hata === true) {
                        mesajGoster('Dikkat', 'Personel aktifleştirme işlemi sırasında bir hata oluştu.' + pl.data.mesaj, pl.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel aktifleştirme işlemi sırasında bir hata oluştu. Hata:', pl.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel aktifleştirme işlemi başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.IkPersonelGetData($scope.AramaKriter);
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel aktifleştirme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    KULLANICI_ID: '',
                    KULLANICI_ADI: null,
                    AD_SOYAD: null,
                    FILTER: true,
                    KULLANICI_TIPI_ID: null,
                    CINSIYET: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.IkPersonelGetData($scope.AramaKriter);
            };

            $scope.KullaniciTipiYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getKullaniciTipiListesi();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.KullaniciTipiListesi = gelen.data;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı tipleri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı tipleri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
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

            $scope.KullaniciPersonelFormuYazdir = function (formTipi, kullaniciId) {
                $scope.Kriter = {
                    DOKUMAN_FORM_TIPI: formTipi,
                    KULLANICI_ID: kullaniciId

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
                            controller: 'ik_personel_liste_controller',
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
        }]);

