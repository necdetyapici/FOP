angular.module('inspinia').controller(
    'toplanti_gundemi_havuzu_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel','srvToplantiTuru','srvToplantiGundemiTuru', 'srvToplantiGundemiHavuzu', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvToplantiTuru, srvToplantiGundemiTuru, srvToplantiGundemiHavuzu, Ayarlarim) {
            $scope.toplantiGundemiHavuzuID = $stateParams.toplantiGundemiHavuzuID;
            $scope.Ayarlar = Ayarlarim;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.ToplantiGundemiTuruGetData();
                $scope.ToplantiTuruGetData();


                if ($scope.toplantiGundemiHavuzuID > 0)
                    $scope.ToplantiGundemiHavuzuSelect();
            }

            $scope.AramaKriter = {
                TOPLANTI_GUNDEMI_HAVUZU_GUNDEM_GEREKCE: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: false
            };

            $scope.ToplantiGundemiHavuzuSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiHavuzu.ToplantiGundemiHavuzuSelect($scope.toplantiGundemiHavuzuID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı gündemi bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı gündemi bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
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
                        Console.error('Toplantı gündemi bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ToplantiGundemiHavuzuEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmToplantiGundemHavuzu.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmToplantiGundemHavuzu);
                    return;
                }
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiGundemiHavuzu.ToplantiGundemiHavuzuEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Toplantı gündem havuzu kayıt işlemi sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Toplantı gündem havuzu kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Toplantı gündem havuzu kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $scope.formCalistirildi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı gündem havuzu kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

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
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

        }]);

