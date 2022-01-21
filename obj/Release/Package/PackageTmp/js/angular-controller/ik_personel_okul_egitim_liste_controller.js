angular.module('inspinia').controller(
    'ik_personel_okul_egitim_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkPersonelOkulEgitim', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkPersonelOkulEgitim, srvGenel, Ayarlarim) {
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                KULLANICI_ID: $scope.kullaniciID,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                IK_PERSONEL_OKUL_EGITIM_MEZUN_OLUNAN_OKUL_ADI: '',
                IK_PERSONEL_OKUL_EGITIM_PERSONEL_MEZUN_OLUNAN_BOLUM_ADI: '',
                OKUL_DURUM_TIPI_ID: '',
                OKUL_TURU_ID: '',
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.OkulDurumTipiGetData();
                $scope.OkulTuruGetData();
                $scope.IkPersonelOkulEgitimGetData();

            };

            $scope.IkPersonelOkulEgitimGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelOkulEgitim.IkPersonelOkulEgitimGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel okul eğitimi listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel okul eğitimi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkPersonelOkulEgitimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel okul eğitimi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_PERSONEL_OKUL_EGITIM_MEZUN_OLUNAN_OKUL_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkPersonelOkulEgitimSil = function (InfoPersonelOkulEgitim) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelOkulEgitim.IkPersonelOkulEgitimSil(InfoPersonelOkulEgitim.IK_PERSONEL_OKUL_EGITIM_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel okul eğitimi silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel okul eğitimi silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Personel okul eğitimi silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkPersonelOkulEgitimListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.IkPersonelOkulEgitimGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel okul eğitimi silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (InfoPersonelOkulEgitim) {
                $scope.secilenKayit = InfoPersonelOkulEgitim;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.IkPersonelOkulEgitimSil($scope.secilenKayit);
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
                    KULLANICI_ID: $scope.kullaniciID,
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    IK_PERSONEL_OKUL_EGITIM_MEZUN_OLUNAN_OKUL_ADI: null,
                    IK_PERSONEL_OKUL_EGITIM_PERSONEL_MEZUN_OLUNAN_BOLUM_ADI: null,
                    OKUL_DURUM_TIPI_ID: null,
                    OKUL_TURU_ID: null,
                    LISTE: true
                };
                $scope.IkPersonelOkulEgitimGetData($scope.AramaKriter);
            };

            $scope.OkulDurumTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getOkulDurumTipi();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Okul durum tipi listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Okul durum tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.OkulDurumTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Okul durum tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.OkulTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getOkulTuru();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Okul türü listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Okul türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.OkulTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Okul türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

