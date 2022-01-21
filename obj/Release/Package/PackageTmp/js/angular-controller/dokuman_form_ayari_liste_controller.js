angular.module('inspinia').controller(
    'dokuman_form_ayari_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanKlasor', 'srvDokumanFormAyari', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanKlasor, srvDokumanFormAyari, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            
            $scope.DokumanFormAyariTipiListesi = [];

            $scope.AramaKriter = {
                LISTE: true,
                DOKUMAN_ID: '',
                DOKUMAN_FORM_TIPI_ID: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.DokumanFormAyariGetData();
                $scope.DokumanFormTipiGetData();
                $scope.DokumanKlasorGetData();
            }

            $scope.DokumanFormAyariGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanFormAyari.DokumanFormAyariGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman Form Ayar listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman Form Ayar listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiDokumanAyari = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanFormAyariListesi = gelen.data.Veri;
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
                        console.log('DokumanFormAyariGetData Dokuman Form Ayar listesi yüklenirken hata oluştu. Hata:', hata);
                    });
            };

            $scope.DokumanFormTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanFormAyari.DokumanFormTipiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman Form Ayarı Tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman Form Ayarı Tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.DokumanFormTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman Form Ayarı Tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase(); //değiştirilmedi.
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DokumanFormAyariSil = function (InfoFormAyar) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanFormAyari.DokumanFormAyariSil(InfoFormAyar.DOKUMAN_FORM_AYARI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman Form Ayarı silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman Form Ayarı silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Dokuman Form Ayarı silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.DokumanFormAyariGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DokumanFormAyariSil Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoFormAyar) {
                $scope.secilenKayit = InfoFormAyar;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.DokumanFormAyariSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };



            $scope.DokumanFormAyariEkleGuncelle = function (InfoFormAyar, frmFormAyar) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmFormAyar.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvDokumanFormAyari.DokumanFormAyariEkleGuncelle(InfoFormAyar);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanFormAyariEkleGuncelle Kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.DokumanFormAyariGetData();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanFormAyariEkleGuncelle Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz. Hata:', errorPl);
                        $rootScope.sayfayukleniyor = false;
                    });
            }

            $scope.DokumanKlasorGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanKlasor.DokumanKlasorFormAyariGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanKlasorListesi = gelen.data.Veri;
                       
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman Form Ayarı Tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
        }]);

