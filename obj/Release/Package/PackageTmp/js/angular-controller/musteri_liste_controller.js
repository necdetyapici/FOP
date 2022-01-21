angular.module('inspinia').controller(
    'musteri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvMusteri', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvMusteri, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                MUSTERI_ADI: '',
                LISTE: true,
                MUSTERI_E_POSTA: '',
                MUSTERI_IL_ID: '',
                MUSTERI_ILCE_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.MusteriGetData();
                $scope.ilYukle();
            };

            $scope.MusteriGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMusteri.MusteriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Müşteri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Müşteri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.MusteriListesi = gelen.data.Veri;
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
                        console.error('Müşteri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            function removeTurkish(value) {
                return value
                    .replace(/ç/g, 'c')
                    .replace(/Ç/g, 'c')
                    .replace(/ı/g, 'i')
                    .replace(/İ/g, 'i')
                    .replace(/ğ/g, 'g')
                    .replace(/Ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/Ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/Ş/g, 's')
                    .replace(/ö/g, 'o')
                    .replace(/Ö/g, 'o');
            }



            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.MUSTERI_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.MusteriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMusteri.MusteriSil(info.MUSTERI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Müşteri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Müşteri silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Müşteri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.MusteriListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.MusteriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.MusteriSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ilYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetIl = srvGenel.getIlIlce(0);

                promiseGetIl.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İl listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İl listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
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
                var musteriIlId = $scope.AramaKriter.MUSTERI_IL_ID;

                if (musteriIlId !== null) {
                    var promiseGetIl = srvGenel.getIlce(1, musteriIlId);

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

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    MUSTERI_ADI: null,
                    MUSTERI_E_POSTA: null,
                    MUSTERI_IL_ID: null,
                    MUSTERI_ILCE_ID: null
                };
                $scope.MusteriGetData($scope.AramaKriter);
            };
        }]);

