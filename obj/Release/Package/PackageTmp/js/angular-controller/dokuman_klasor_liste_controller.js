angular.module('inspinia').controller(
    'dokuman_klasor_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanKlasor', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanKlasor, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                ADI: '',
                UST_DOKUMAN_KLASOR_ID: '',
                MUSTERI_ID: '',
                DOKUMAN_GOSTER : false,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.DokumanKlasorGetData();
                $scope.DokumanUstKlasorGetData();
            }

            $scope.DokumanKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman klasör listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanKlasorListesi = gelen.data.Veri;
                        
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
                        console.error('Dokuman klasör listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AramaKriterUstKlasor = {
                DOKUMAN_GOSTER: true,
                LISTE: false
            }; 

            $scope.DokumanUstKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorGetData($scope.AramaKriterUstKlasor);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman üst klasör listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman üst klasör listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        {
                            $scope.UstDokumanKlasorListesi = gelen.data.Veri;
                        }

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman üst klasör listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanKlasorSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorSil(info.DOKUMAN_KLASOR_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman klasör silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Dokuman klasör silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Dokuman klasör silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.DokumanKlasorListesi.length === 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.DokumanKlasorGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman klasör silme işlemi sırasında bir hata oluştu.Hata:', hata);
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
                            $scope.DokumanKlasorSil($scope.secilenKayit);
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
                    ADI: null,
                    UST_DOKUMAN_KLASOR_ID: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    UstKlasor : false,
                    LISTE: true
                };
                $scope.DokumanKlasorGetData($scope.AramaKriter);
            };

            $scope.DokumanKlasorEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmDokumanKlasor.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmDokumanKlasor);
                    $rootScope.sayfayukleniyor = false;
                    return;
                }
                var promiseGet = srvDokumanKlasor.DokumanKlasorEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Dokuman klasör kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Dokuman klasör kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Dokuman klasör kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.DokumanKlasorGetData();
                        $scope.DokumanUstKlasorGetData();
                        $scope.Info.ADI = null;
                        $scope.Info.UST_DOKUMAN_KLASOR_ID = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman klasör kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

