angular.module('inspinia').controller(
    'proje_dogrulama_kriteri_grup_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeDogrulamaKriteriGrup', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeDogrulamaKriteriGrup, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                SayfaNo: 1,
                PROJE_ID: $scope.projeID,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeDogrulamaKriteriGrupGetData();
            }

            $scope.ProjeDogrulamaKriteriGrupGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDogrulamaKriteriGrup.ProjeDogrulamaKriteriGrupGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri grup listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri grup listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeDogrulamaKriteriGrupListesi = gelen.data.Veri;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri grup listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeDogrulamaKriteriGrupSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDogrulamaKriteriGrup.ProjeDogrulamaKriteriGrupSil(info.PROJE_DOGRULAMA_KRITERI_GRUP_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri grup silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri grup silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Doğrulama kriteri grup silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeDogrulamaKriteriGrupGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri grup silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                        if ('true' == value) {
                            $scope.ProjeDogrulamaKriteriGrupSil($scope.secilenKayit);
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

