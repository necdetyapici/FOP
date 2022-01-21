angular.module('inspinia').controller(
    'varlik_olasilik_etki_degeri_tipi_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvVarlikOlasilikEtkiDegeriTipi', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvVarlikOlasilikEtkiDegeriTipi, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.VarlikOlasilikEtkiDegeriTipiGetData();
            }

            $scope.VarlikOlasilikEtkiDegeriTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvVarlikOlasilikEtkiDegeriTipi.VarlikOlasilikEtkiDegeriTipiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık olasılık değeri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık olasılık değeri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.VarlikOlasilikEtkiDegeriTipiListesi = gelen.data.Veri;
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
                        console.error('Varlık olasılık değeri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.VarlikOlasilikEtkiDegeriTipiSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvVarlikOlasilikEtkiDegeriTipi.VarlikOlasilikEtkiDegeriTipiSil(info.VARLIK_OLASILIK_ETKI_DEGERI_TIPI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık olasılık değeri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık olasılık değeri silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Varlık olasılık değeri silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.VarlikOlasilikEtkiDegeriTipiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Varlık olasılık değeri silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.VarlikOlasilikEtkiDegeriTipiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

        }]);

