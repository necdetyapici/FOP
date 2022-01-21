angular.module('inspinia').controller(
    'avans_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvAvans','srvAvansTuru', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvAvans, srvAvansTuru, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;

            $scope.AramaKriter = {
                LISTE: true,
                AVANS_ADI: '',
                TALEP_EDEN_AD_SOYAD: '',
                TALEP_TARIHI: '',
                AVANS_TURU_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                ONAY: null,
                ONAYLANMAMIS: true,
                HEPSI: null
            }; 

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.tabClick(1);
                $scope.AvansGetData();
                $scope.AvansTuruGetData();
            };



            $scope.AvansGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvans.AvansGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Onaylanmamış avans listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Onaylanmamış avans listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.AvansListesi = gelen.data.Veri;
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
                        console.error('Onaylanmamış avans listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };



            $scope.AvansTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvansTuru.AvansTuruGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Avans türü listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Avans türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.AvansTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Avans türü listesi yüklenirken bir hata oluştu. Hata:', hata);
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
                    LISTE: true,
                    AVANS_ADI: null,
                    TALEP_EDEN_AD_SOYAD: null,
                    AVANS_TURU_ID: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    ONAYLANMAMIS: null,
                    ONAY: null,
                    HEPSI: null
                };
                $('#txtTALEP_TARIHI').val(null);
            };

            $scope.tabClick = function (tab) {
                if (tab === 1) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabBir');
                    $scope.tab = 1;
                    $scope.AramaKriter.ONAYLANMAMIS = true;
                    $scope.AvansGetData();

                }
                if (tab === 2) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabIki');
                    $scope.tab = 2;
                    $scope.AramaKriter.ONAY = true;
                    $scope.AvansGetData();
                }
                else if (tab === 3) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabUc');
                    $scope.tab = 3;
                    $scope.AramaKriter.HEPSI = true;
                    $scope.AvansGetData();

                }
            };


        }]);

