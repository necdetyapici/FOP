angular.module('inspinia').controller(
    'proje_gereksinim_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGereksinimTuru', 'srvGereksinimTipi','srvGenel', 'srvProjeGereksinim', 'srvProjeIterasyon', 'srvProjeModul',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGereksinimTuru, srvGereksinimTipi, srvGenel, srvProjeGereksinim, srvProjeIterasyon, srvProjeModul) {
            $scope.projeID = $stateParams.projeID;
            $scope.projeGereksinimID = $stateParams.projeGereksinimID;
            //$scope.projeGereksinimNo = $stateParams.projeGereksinimNo;
            $scope.TALEP_TIPI_ADI = 'Geliştirme';
            $scope.TALEP_SUREC_ADI = 'Analiz';
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });


            $scope.init = function () {
                $scope.GereksinimTuruGetData();
                $scope.GereksinimTipiGetData();
                $scope.ProjeIterasyonGetData();
                $scope.ProjeModulGetData();
                //$scope.TalepSahibiGetData();
                if ($scope.projeGereksinimID > 0) {
                    $scope.ProjeGereksinimSelect();
                }


            };

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };

            $scope.AramaKriterTalep = {
                LISTE: false,
                PROJE_ID: ''
            };

            $scope.ProjeGereksinimSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeGereksinim.ProjeGereksinimSelect($scope.projeGereksinimID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjeGereksinim = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.ProjeGereksinimEkleGuncelle = function (InfoProjeGereksinim) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjeGereksinim = true;
                if ($scope.frmProjeGereksinim.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeGereksinim);
                    return;
                }
                if (InfoProjeGereksinim.PROJE_GEREKSINIM_ID === undefined) {
                    InfoProjeGereksinim.TalepProjeIlgiListesi = $scope.TalepProjeIlgiListesi;
                    InfoProjeGereksinim.InfoYeniDokumanListesi = $scope.InfoYeniDokumanListesi;
                }
                InfoProjeGereksinim.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeGereksinim.ProjeGereksinimEkleGuncelle(InfoProjeGereksinim);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Gereksinim kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.projeGereksinimID = gelen.data.returnKayitNo;
                        $scope.ProjeGereksinimSelect();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.GereksinimTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGereksinimTuru.GereksinimTuruGetData();

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.GereksinimTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.GereksinimTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGereksinimTipi.GereksinimTipiGetData();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.GereksinimTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.ProjeIterasyonGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeIterasyon.ProjeIterasyonGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İterasyon listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ProjeIterasyonListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İterasyon listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ProjeModulGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeModul.ProjeModulGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje modül listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeModulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //Talep ılgili
            $scope.InfoTalepIlgili = {};

            $scope.TalepIlgiliEkle = function () {
                $scope.InfoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI = null;
                $scope.$modalInstanceTalepIlgili = $modal.open({
                    templateUrl: 'views/common/modal_talep_proje_ilgili_ekle.html',
                    windowClass: 'tooltip',
                    size: 'sm',
                    scope: $scope
                });
            };

            $scope.GeriTalepIlgili = function () {
                $scope.formCalistirildiTalepProjeIlgili = false;
                $scope.$modalInstanceTalepIlgili.dismiss('cancel');
            };

            $scope.TalepProjeIlgiListesi = [];
            $scope.InfoYeniDokumanListesi = [];

            $scope.TalepIlgiliEkleOnKontrol = function (InfoTalepIlgili, frmTalepIlgili) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiTalepProjeIlgili = true;
                if (frmTalepIlgili.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frmTalepIlgili);
                    return;
                }

                var kontrol = true;
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
                $rootScope.sayfayukleniyor = true;
                angular.forEach($scope.TalepProjeIlgiListesi, function (valueilgili, keyilgili) {
                    if (valueilgili.TALEP_PROJE_ILGI_KULLANICI_ID === infoTalepIlgili.TALEP_PROJE_ILGI_KULLANICI_ID) {
                        $rootScope.sayfayukleniyor = false;
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

        }]);

