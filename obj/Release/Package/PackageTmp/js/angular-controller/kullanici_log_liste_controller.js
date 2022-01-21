angular.module('inspinia').controller(
    'kullanici_log_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvKullaniciLog', 'Ayarlarim', 'srvGenel',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvKullaniciLog, Ayarlarim, srvGenel) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                BASLANGIC_TARIH: '',
                BITIS_TARIH: '',
                AD_SOYAD: '',
                FORM_ID: '',
                KULLANICI_ISLEM_TURU_ID: '',
                ACIKLAMA: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.KullaniciLogGetData();
                $scope.kullaniciIslemTuruYukle();
                //$scope.formYukle();
            };

            $scope.KullaniciLogGetData = function (AramaKriter) {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciLog.KullaniciLogGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı log listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı log listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.KullaniciLogListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Kullanıcı log listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.AD_SOYAD).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.kullaniciIslemTuruYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getKullaniciIslemTuruListesi();

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Kullanıcı işlem türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Kullanıcı işlem türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.KullaniciIslemTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı işlem türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    AD_SOYAD: null,
                    FORM_ID: '',
                    KULLANICI_ISLEM_TURU_ID: null,
                    ACIKLAMA: null
                };
                $('#txtBASLANGIC_TARIHI').val(null);
                $('#txtBITIS_TARIHI').val(null);

                $scope.KullaniciLogGetData($scope.AramaKriter);
            };


        }]);

