angular.module('inspinia').controller(
    'proje_gereksinim_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeGereksinim', 'srvProjeModul', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeGereksinim, srvProjeModul, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $state.projeGereksinimID = $stateParams.projeGereksinimID;

            $scope.AramaKriter = {
                PROJE_GEREKSINIM_NO: '',
                PROJE_ID: $scope.projeID,
                PROJE_GEREKSINIM_ADI: '',
                PROJE_MODUL_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 50,
                LISTE: true
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeGereksinimGetData();
                $scope.ProjeModulGetData();

            };

            $scope.ProjeGereksinimGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeGereksinim.ProjeGereksinimGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeGereksinimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.PROJE_GEREKSINIM_NO).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeGereksinimSil = function (InfoProjeGereksinim) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeGereksinim.ProjeGereksinimSil(InfoProjeGereksinim.PROJE_GEREKSINIM_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gereksinim silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gereksinim silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Gereksinim silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeGereksinimListesi.length == 1 && $scope.toplamKayitSayisi > 50) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeGereksinimGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gereksinim silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjeGereksinim) {
                $scope.secilenKayit = InfoProjeGereksinim;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjeGereksinimSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PROJE_GEREKSINIM_NO: null,
                    PROJE_ID: $scope.projeID,
                    PROJE_GEREKSINIM_ADI: null,
                    PROJE_MODUL_ID: null,
                    LISTE: true
                };
                $scope.ProjeGereksinimGetData($scope.AramaKriter);
            }

            $scope.ProjeModulGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeModul.ProjeModulGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje modül listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeModulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje modül listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

