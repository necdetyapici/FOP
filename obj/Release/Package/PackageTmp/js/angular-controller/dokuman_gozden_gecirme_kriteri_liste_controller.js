angular.module('inspinia').controller(
    'dokuman_gozden_gecirme_kriteri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanGozdenGecirmeKriteri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanGozdenGecirmeKriteri, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                KRITER_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.DokumanGozdenGecirmeKriteriGetData();
            };

            $scope.DokumanGozdenGecirmeKriteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriteri.DokumanGozdenGecirmeKriteriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanGozdenGecirmeKriteriListesi = gelen.data.Veri;
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
                        console.error('Gözden geçirme kriter listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanGozdenGecirmeKriteriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriteri.DokumanGozdenGecirmeKriteriSil(info.DOKUMAN_GOZDEN_GECIRME_KRITERI_ID);
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    } else {
                        mesajGoster('İşlem tamam.', "Gözdern geçirme kriter silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.DokumanGozdenGecirmeKriteriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriter silme işlemi sırasında bir hata oluştu.Hata:', hata);
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
                            $scope.DokumanGozdenGecirmeKriteriSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.DokumanGozdenGecirmeKriteriEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmKriter.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmKriter);
                    return;
                }
                var promiseGet = srvDokumanGozdenGecirmeKriteri.DokumanGozdenGecirmeKriteriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriteri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriteri kayıt işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.DokumanGozdenGecirmeKriteriGetData();
                        $scope.Info.KRITER_ADI = null;
                        $scope.formCalistirildi = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriter kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    KRITER_ADI: null,
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.DokumanGozdenGecirmeKriteriGetData($scope.AramaKriter);
            };
        }]);

