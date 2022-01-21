//Sayfa oluşturulurken toplantı kayıt sayfasında toplantıya katılacak olan personel için oluşturuldu.
// Ama bu sayfa insan kaynakları personel içindeki toplantı menüsünde personelin katıldığı toplantıları listelemek için kullanılıyor.
angular.module('inspinia').controller(
    'ik_personel_toplanti_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvToplantiTuru', 'srvToplantiKatilimci', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvToplantiTuru,srvToplantiKatilimci, srvGenel, Ayarlarim) {
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                KULLANICI_ID: $scope.kullaniciID,
                TOPLANTI_ID: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                TOPLANTI_ADI: '',
                TOPLANTI_YERI: '',
                TOPLANTI_TARIHI: '',
                TOPLANTI_TURU_ID: '',
                LISTE: true
            };
            $scope.AramaKriterListe = {
                KULLANICI_ID: $scope.kullaniciID,
                TOPLANTI_ID: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                TOPLANTI_ADI: '',
                TOPLANTI_YERI: '',
                TOPLANTI_TARIHI: '',
                TOPLANTI_TURU_ID: '',
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ToplantiKatilimciGetData();
                $scope.ToplantiTuruGetData();

                //if ($scope.kullaniciID > 0) {
                //    $scope.ToplantiTuruGetData();
                //}
            };

            $scope.ToplantiKatilimciGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiKatilimci.ToplantiKatilimciGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Personel toplantı listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel toplantı listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ToplantiKatilimciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel toplantı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //insan kaynakları personel toplantı sayfasında kullanılıyor
            $scope.ToplantiTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiTuru.ToplantiTuruGetData();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Toplantı türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ToplantiTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Toplantı türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };



            $scope.filtreTemizle = function () {
                angular.element("#txtTOPLANTI_ADI")[0].value = null;
                angular.element("#txtTOPLANTI_YERI")[0].value = null;
                angular.element("#sel_TOPLANTI_TURU_ID")[0].value = null;
                $scope.AramaKriter = {
                    KULLANICI_ID: $scope.kullaniciID,
                    TOPLANTI_ID: '',
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    TOPLANTI_ADI: '',
                    TOPLANTI_YERI: '',
                    TOPLANTI_TURU_ID: '',
                    LISTE: true
                };
                $('#txtTOPLANTI_TARIHI').val(null);
                $scope.ToplantiKatilimciGetData($scope.AramaKriter);
            };

        }]);

