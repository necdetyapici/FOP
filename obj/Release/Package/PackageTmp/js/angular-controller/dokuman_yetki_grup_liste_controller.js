angular.module('inspinia').controller(
    'dokuman_yetki_grup_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanYetkiGrup', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanYetkiGrup, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                ADI: '',
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.DokumanYetkiGrupGetData();
            }

            $scope.DokumanYetkiGrupGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrup.DokumanYetkiGrupGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanYetkiGrupListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanYetkiGrup listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanYetkiGrupGetData Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanYetkiGrupSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanYetkiGrup.DokumanYetkiGrupSil(info.DOKUMAN_YETKI_GRUP_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DokumanYetkiGrupGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DokumanYetkiGrupSil Hata:', hata);
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
                            $scope.DokumanYetkiGrupSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.DokumanYetkiGrupEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmYetkiGrup.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmYetkiGrup);
                    return;
                }
                var promiseGet = srvDokumanYetkiGrup.DokumanYetkiGrupEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanYetkiGrupEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.DokumanYetkiGrupGetData();
                        $scope.Info.ADI = null;
                        $scope.formCalistirildi = false;
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanYetkiGrupEkleGuncelle Hata:', errorPl);
                    });
            }


            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    ADI: null,
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.DokumanYetkiGrupGetData($scope.AramaKriter);
            }
        }]);

