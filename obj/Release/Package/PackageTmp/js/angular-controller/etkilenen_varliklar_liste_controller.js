angular.module('inspinia').controller(
    'etkilenen_varliklar_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvEtkilenenVarliklar', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvEtkilenenVarliklar, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                ETKILENEN_VARLIKLAR_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.EtkilenenVarliklarGetData();
            }

            $scope.EtkilenenVarliklarGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkilenenVarliklar.EtkilenenVarliklarGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkilenen varlık listesi yüklenirken bir hata oluştu' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkilenen varlık listesi yüklenirken bir hata oluştu Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.EtkilenenVarliklarListesi = gelen.data.Veri;
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
                        console.error('Etkilenen varlık listesi yüklenirken bir hata oluştu Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ETKILENEN_VARLIKLAR_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.EtkilenenVarliklarSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvEtkilenenVarliklar.EtkilenenVarliklarSil(info.ETKILENEN_VARLIKLAR_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkilenen varlık silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkilenen varlık silme işlemi sırasında bir hata oluştu. Hata:', hata.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Etkilenen varlık silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.EtkilenenVarliklarListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.EtkilenenVarliklarGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkilenen varlık silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.EtkilenenVarliklarSil($scope.secilenKayit);
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
                    ETKILENEN_VARLIKLAR_ADI: null,
                    LISTE: true
                };
                $scope.EtkilenenVarliklarGetData($scope.AramaKriter);
            }

            $scope.EtkilenenVarliklarEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmEtkilenenVarlik.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmEtkilenenVarlik);
                    return;
                }
                var promiseGet = srvEtkilenenVarliklar.EtkilenenVarliklarEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Etkilenen varlıklar kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Etkilenen varlıklar kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Etkilenen varlık kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.EtkilenenVarliklarGetData();
                        $scope.Info.ETKILENEN_VARLIKLAR_ADI = null;
                        $scope.formCalistirildi = false;
                        //angular.element("#txtETKILENEN_VARLIKLAR_ADI")[0].value = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Etkilenen varlıklar kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }
        }]);

