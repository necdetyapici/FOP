//Sayfa oluşturulurken insan kaynakları eğitim sayfasında eğitime katılacak olan personel için oluşturuldu.
// Ama bu sayfa insan kaynakları personel içindeki eğitim menüsünde personelin eğitimlerini listelemek için kullanılıyor.
angular.module('inspinia').controller(
    'ik_personel_egitim_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkEgitimPersonel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkEgitimPersonel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.AramaKriter = {
                IK_PERSONEL_ID: '',
                IK_EGITIM_ID: '',
                MUSTERI_ID: '',
                KULLANICI_ID: $scope.kullaniciID,
                KULLANICI_AD_SOYAD: '',
                IK_EGITIM_ADI: '',
                IK_EGITIM_BASLANGIC_TARIHI: '',
                IK_EGITIM_BITIS_TARIHI: '',
                IK_EGITIM_VEREN_KURUM_ADI: '',
                IK_EGITIM_EGITMEN_ADI: '',
                IK_EGITIM_KONU: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkEgitimPersonelGetData();
            };

            $scope.IkEgitimPersonelGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimPersonel.IkEgitimPersonelGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Personel eğitim listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel eğitim listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkEgitimPersonelListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel eğitim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_EGITIM_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };



            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    IK_PERSONEL_ID: '',
                    IK_EGITIM_ID: '',
                    MUSTERI_ID: '',
                    KULLANICI_ID: $scope.kullaniciID,
                    KULLANICI_AD_SOYAD: '',
                    IK_EGITIM_ADI: null,
                    IK_EGITIM_VEREN_KURUM_ADI: null,
                    IK_EGITIM_EGITMEN_ADI: null,
                    IK_EGITIM_KONU: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $('#txtIK_EGITIM_BASLANGIC_TARIHI').val(null);
                $('#txtIK_EGITIM_BITIS_TARIHI').val(null);
                $scope.IkEgitimPersonelGetData($scope.AramaKriter);
            };

        }]);

