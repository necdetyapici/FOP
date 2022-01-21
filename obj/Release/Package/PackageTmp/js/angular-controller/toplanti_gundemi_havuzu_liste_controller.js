angular.module('inspinia').controller(
    'toplanti_gundemi_havuzu_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvToplantiGundemiTuru','srvToplantiTuru', 'srvToplantiGundemiHavuzu', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvToplantiGundemiTuru, srvToplantiTuru, srvToplantiGundemiHavuzu, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterListe = {
                TOPLANTI_GUNDEMI_HAVUZU_GUNDEM_GEREKCE: '',
                TOPLANTI_GUNDEMI_TURU_ID: '',
                TOPLANTI_TURU_ID: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true,
                GUNDEM: false
            };
            $scope.AramaKriter = {
                TOPLANTI_GUNDEMI_HAVUZU_GUNDEM_GEREKCE: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ToplantiGundemiHavuzuGetData();
                $scope.ToplantiGundemiTuruGetData();
                $scope.karar = false;
                $scope.ToplantiTuruGetData();

            }

            $scope.ToplantiGundemiHavuzuGetData = function (AramaKriterListe) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiHavuzu.ToplantiGundemiHavuzuGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı gündem listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı gündem  listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ToplantiGundemiHavuzuListesi = gelen.data.Veri;
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
                        console.error('Toplantı gündem listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.TOPLANTI_GUNDEMI_TURU_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ToplantiGundemiHavuzuSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiHavuzu.ToplantiGundemiHavuzuSil(info.TOPLANTI_GUNDEMI_HAVUZU_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı gündem kayıt silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı gündem kayıt silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam', "Toplantı gündem kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ToplantiGundemiHavuzuListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriterListe.SayfaNo = $scope.AramaKriterListe.SayfaNo - 1;
                        }
                        $scope.ToplantiGundemiHavuzuGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı gündem kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
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
                        if ('true' == value) {
                            $scope.ToplantiGundemiHavuzuSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };
            $scope.ToplantiGundemiTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiTuru.ToplantiGundemiTuruGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı gündem türü listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı gündem türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiGundemiTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı gündem türü listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };
            $scope.ToplantiTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiTuru.ToplantiTuruGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı türü listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı türü  listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $state.reload();
                $scope.AramaKriterListe = {
                    TOPLANTI_GUNDEMI_HAVUZU_GUNDEM_GEREKCE: '',
                    TOPLANTI_GUNDEMI_TURU_ADI: '',
                    TOPLANTI_TURU_ID: '',
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.ToplantiGundemiHavuzuGetData($scope.AramaKriterListe);
            }



        }]);

