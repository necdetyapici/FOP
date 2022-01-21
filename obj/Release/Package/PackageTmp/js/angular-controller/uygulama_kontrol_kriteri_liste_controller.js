angular.module('inspinia').controller(
    'uygulama_kontrol_kriteri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvUygulamaKontrolKriteri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvUygulamaKontrolKriteri, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.uygulamaKontrolKriteriGrupID = $stateParams.uygulamaKontrolKriteriGrupID;
            $scope.uygulamaKontrolKriteriGrupAdi = $stateParams.uygulamaKontrolKriteriGrupAdi;
            $scope.AramaKriter = {
                UYGULAMA_KONTROL_KRITERI_GRUP_ID: $scope.uygulamaKontrolKriteriGrupID,
                UYGULAMA_KONTROL_KRITERI_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.UygulamaKontrolKriteriGetData();
            }

            $scope.UygulamaKontrolKriteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteri.UygulamaKontrolKriteriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu.Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.UygulamaKontrolKriteriListesi = gelen.data.Veri;
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
                        console.error('Uygulama kontrol kriteri listesi yüklenirken bir hata oluştu.Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.UygulamaKontrolKriteriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteri.UygulamaKontrolKriteriSil(info.UYGULAMA_KONTROL_KRITERI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Uygulama kontrol kriteri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.UygulamaKontrolKriteriListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.UygulamaKontrolKriteriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri silme işlemi sırasında bir hata oluştu. Hata: ', hata);
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
                            $scope.UygulamaKontrolKriteriSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.UygulamaKontrolKriteriEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $scope.sayfayukleniyor = true;
                if ($scope.frmUygulamaKontrolKriteri.$valid) { } else {
                    $scope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmUygulamaKontrolKriteri);
                    return;
                }

                Info.UYGULAMA_KONTROL_KRITERI_GRUP_ID = $scope.uygulamaKontrolKriteriGrupID;
                var promiseGet = srvUygulamaKontrolKriteri.UygulamaKontrolKriteriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    $scope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Uygulama kontrol kriteri kayıt işleminiz başarılı bir şekilde gerçekleşmiştir.", "S");
                        $scope.UygulamaKontrolKriteriGetData();
                        $scope.Info.UYGULAMA_KONTROL_KRITERI_NO = null;
                        $scope.Info.UYGULAMA_KONTROL_KRITERI_ADI = null;
                        $scope.Info.UYGULAMA_KONTROL_KRITERI_KONTROL_ACIKLAMA = null;
                    }
                },
                    function (hata) {
                        $scope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.filtreTemizle = function () {
                //$scope.Info.UYGULAMA_KONTROL_KRITERI_ADI = null;
                $scope.AramaKriter = {
                    UYGULAMA_KONTROL_KRITERI_GRUP_ID: $scope.uygulamaKontrolKriteriGrupID,
                    UYGULAMA_KONTROL_KRITERI_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.UygulamaKontrolKriteriGetData($scope.AramaKriter);
            }

        }]);

