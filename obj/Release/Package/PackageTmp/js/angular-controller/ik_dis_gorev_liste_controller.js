angular.module('inspinia').controller(
    'ik_dis_gorev_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkDisGorev','srvUlasimSekliTipi', 'srvGenel', 'srvKullanici', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkDisGorev, srvUlasimSekliTipi, srvGenel, srvKullanici, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            //$scope.kullaniciID = $stateParams.kullaniciID;
            $scope.AramaKriter = {
                ATANAN_KULLANICI_ID: $scope.$storage.KULLANICI_ID,
                ATAYAN_KULLANICI_ID: '',
                GOREV_ADI: '',
                GOREV_YERI: '',
                BASLANGIC_TARIHI: '',
                BITIS_TARIHI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.AramaKriterListe = {
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                //$scope.IkDisGorevGetData();
                $scope.KullaniciGetData();
                $scope.UlasimSekliTipiGetData();
                $scope.tabClick(1);
            };

            $scope.IkDisGorevGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDisGorev.IkDisGorevGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dış görev listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dış görev listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkDisGorevListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dış görev listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_DIS_GOREV_GOREVI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkDisGorevSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDisGorev.IkDisGorevSil(info.IK_DIS_GOREV_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dış görev silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dış görev silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Dış görev silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.IkDisGorevGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dış görev silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.IkDisGorevSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.UlasimSekliTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUlasimSekliTipi.UlasimSekliTipiGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Ulaşım şekli listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Ulaşım şekli listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.UlasimSekliTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Ulaşım şekli listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                switch ($scope.tab) {
                    case 1:
                        $scope.tabClick(1);
                        break;
                    case 2:
                        $scope.tabClick(2);
                        break;
                    default:
                        $scope.tabClick(3);
                        break;
                }
            };

            $scope.temizleFiltre = function () {
                $scope.AramaKriter = {
                    ATANAN_KULLANICI_ID: null,
                    ATAYAN_KULLANICI_ID: null,
                    GOREV_ADI: null,
                    GOREV_YERI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $('#txtBASLANGIC_TARIHI').val(null);
                $('#txtBITIS_TARIHI').val(null);
            };

            $scope.tabClick = function (tab) {
                if (tab === 1) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabBir');
                    $scope.tab = 1;
                    $scope.AramaKriter.ATANAN_KULLANICI_ID = $scope.$storage.KULLANICI_ID;
                    $scope.IkDisGorevGetData();

                }
                if (tab === 2) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabIki');
                    $scope.tab = 2;
                    $scope.AramaKriter.ATAYAN_KULLANICI_ID = $scope.$storage.KULLANICI_ID;
                    $scope.IkDisGorevGetData();
                }
                else if (tab === 3) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabUc');
                    $scope.tab = 3;
                    $scope.IkDisGorevGetData();

                }
            };

            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);