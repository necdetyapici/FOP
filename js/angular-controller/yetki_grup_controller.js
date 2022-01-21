angular.module('inspinia').controller(
    'yetki_grup_controller', ['$scope', '$http', '$state', '$stateParams', '$document', '$window', '$log', '$localStorage', '$sessionStorage', '$rootScope', '$modal', 'ngDialog', 'srvYetkilendirme', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $document, $window, $log, $localStorage, $sessionStorage, $rootScope, $modal, ngDialog, srvYetkilendirme, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                YETKI_GRUP_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.init = function () {
                $scope.yetkiGruplariListesiniGetir();
            };

            $scope.yetkiGruplariListesiniGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.getYetkiGruplariListesi($scope.AramaKriter);
                promiseGet.then(function (pl) {
                    $rootScope.sayfayukleniyor = false;
                    if (pl.data.Veri.length > 0 && pl.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grup listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grup listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                        $scope.YetkiGruplariListesi = pl.data.Veri;
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
                        console.error('Yetki grup listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
            function removeTurkish(value) {
                return value
                    .replace(/ç/g, 'c')
                    .replace(/Ç/g, 'c')
                    .replace(/ı/g, 'i')
                    .replace(/İ/g, 'i')
                    .replace(/ğ/g, 'g')
                    .replace(/Ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/Ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/Ş/g, 's')
                    .replace(/ö/g, 'o')
                    .replace(/Ö/g, 'o');
            }

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = removeTurkish(item.YETKI_GRUP_ADI).toLowerCase();
                var search = removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };


            $scope.modalSilmeOnayi = function (yetkiGrup) {
                $scope.secilenKayit = yetkiGrup.YETKI_GRUP_ID;

                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if (value === "true") {
                            $scope.YetkiGrubuSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };


            $scope.YetkiGrubuSil = function (yetkiGrupID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.YetkiGrubuSil(yetkiGrupID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grubu silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grubu silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Yetki grubu silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.YetkiGruplariListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.yetkiGruplariListesiniGetir();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yetki grubu silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };



            $scope.filtreTemizle = function () {
                angular.element("#txtYETKI_GRUP_ADI")[0].value = null;
                $scope.AramaKriter = {
                    YETKI_GRUP_ADI: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.yetkiGruplariListesiniGetir($scope.AramaKriter);
            };
        }]);