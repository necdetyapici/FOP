angular.module('inspinia').controller(
    'duyuru_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDuyuru','srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDuyuru, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;

            $scope.DuyuruDurumuListesi = [{ DUYURU_DURUMU_ID: 1, DUYURU_DURUMU_ADI: 'Yayında' },
            { DUYURU_DURUMU_ID: 2, DUYURU_DURUMU_ADI: 'Hazırlanıyor' },
            { DUYURU_DURUMU_ID: 3, DUYURU_DURUMU_ADI: 'Kaldırıldı' }];

            $scope.AramaKriter = {
                LISTE: true,
                KONU: '',
                METNI: '',
                DUYURU_DURUMU_ID: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.DuyuruGetData();
                $scope.DuyuruDurumuGetData();
            }

            $scope.DuyuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDuyuru.DuyuruGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Duyuru listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Duyuru listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DuyuruListesi = gelen.data.Veri;
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
                        console.error('Duyuru listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DuyuruDurumuGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.DuyuruDurumuGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Duyuru Durumu listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Duyuru Durumu listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.DuyuruDurumuListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Duyuru Durumu listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.KONU).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DuyuruKaldir = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDuyuru.DuyuruKaldir(info.DUYURU_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Duyuru kaldırma işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Duyuru kaldırma işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Duyuru kaldırma işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');

                        $scope.DuyuruGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Duyuru kaldırma işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DuyuruYayinla = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDuyuru.DuyuruYayinla(info.DUYURU_ID)
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Duyuru Yayınlama İşlemi Sırasında Bir Hata Oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Duyuru Yayınlama İşlemi Sırasında Bir Hata Oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Duyuru Yayınlama İşlemi Başarılı Bir Şekilde Gerçekleştirilmiştir.", 'S');
                        $scope.DuyuruGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Duyuru Yayınlama İşlemi Sırasında Bir Hata Oluştu. Hata: ', hata);
                    });

            };


            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.DuyuruSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };


            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    KONU: null,
                    METNI: null,
                    DUYURU_DURUMU_ID: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.DuyuruGetData($scope.AramaKriter);
            };

            $scope.DuyuruEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvDuyuru.DuyuruEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DuyuruSelect Duyuru bilgileri guncelleme/ekleme hatası Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $state.go('yonetim.duyurulistesi');
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('Duyuru guncelleme/ekleme hatası Hata:', errorPl);
                    });
            }



        }]);

