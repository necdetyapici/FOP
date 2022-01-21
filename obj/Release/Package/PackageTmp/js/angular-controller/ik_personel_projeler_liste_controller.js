angular.module('inspinia').controller(
    'ik_personel_projeler_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvProjeTuru', 'srvKullaniciProje', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeTuru, srvKullaniciProje, srvGenel, Ayarlarim) {

            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.AramaKriter = {
                KULLANICI_ID: $scope.kullaniciID,
                PROJE_ADI: '',
                PROJE_TURU_ID: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.KullaniciProjeGetData();
                $scope.ProjeTuruGetData();
            };

            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Personel proje listesi yüklenirken bir hata oluştu. " + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel projele listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.KullaniciProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel proje listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTuru.ProjeTuruGetData();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Personel proje listesi yüklenirken bir hata oluştu. " + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel proje listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ProjeTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel proje listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                angular.element("#txtPROJE_ADI")[0].value = null;
                angular.element("#sel_PROJE_TURU_ID")[0].value = null;

                $scope.AramaKriter = {
                    KULLANICI_ID: $scope.kullaniciID,
                    PROJE_ADI: '',
                    PROJE_TURU_ID: '',
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.KullaniciProjeGetData($scope.AramaKriter);
            };

        }]);

