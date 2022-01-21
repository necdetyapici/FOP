angular.module('inspinia').controller(
    'masraf_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvMasraf', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvMasraf, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;

            $scope.AramaKriter = {
                LISTE: true,
                MASRAF_ADI: '',
                TALEP_EDEN_AD_SOYAD: '',
                BASLANGIC_TARIHI: '',
                BITIS_TARIHI: '',
                KULLANICI_ID: $scope.kullaniciID,
                ONAY: '',
                ONAYLANMAMIS: '',
                HEPSI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };


            $scope.init = function () {
                $scope.tabClick(1);

            };


            $scope.MasrafGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvMasraf.MasrafGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Onaylanmamış masraf listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Onaylanmamış masraf listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.MasrafListesi = gelen.data.Veri;
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
                        console.error('Onaylanmamış masraf listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });




            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };



            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    LISTE: true,
                    MASRAF_ADI: null,
                    TALEP_EDEN_AD_SOYAD: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $('#txtBASLANGIC_TARIHI').val(null);
                $('#txtBITIS_TARIHI').val(null);
                $scope.MasrafGetData($scope.AramaKriter);
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
                    LISTE: true,
                    MASRAF_ADI: null,
                    TALEP_EDEN_AD_SOYAD: null,
                    KULLANICI_ID: $scope.kullaniciID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $('#txtBASLANGIC_TARIHI').val(null);
                $('#txtBITIS_TARIHI').val(null);
            };

            $scope.tabClick = function (tab) {
                if (tab === 1) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabBir');
                    $scope.tab = 1;
                    $scope.AramaKriter.ONAYLANMAMIS = true;
                    $scope.AramaKriter.ONAY = false;
                    $scope.AramaKriter.HEPSI = false;
                    $scope.MasrafGetData($scope.AramaKriter);
                }
                if (tab === 2) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabIki');
                    $scope.tab = 2;
                    $scope.AramaKriter.ONAY = true;
                    $scope.AramaKriter.ONAYLANMAMIS = false;
                    $scope.AramaKriter.HEPSI = false;
                    $scope.MasrafGetData($scope.AramaKriter);

                }
                else if (tab === 3) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabUc');
                    $scope.tab = 3;
                    $scope.AramaKriter.ONAY = false;
                    $scope.AramaKriter.ONAYLANMAMIS = false;
                    $scope.AramaKriter.HEPSI = true;

                    $scope.MasrafGetData($scope.AramaKriter);
                }
            };

        }]);

