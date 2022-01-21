angular.module('inspinia').controller(
    'proje_kullanilacak_mevcut_kaynaklar_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeKullanilacakMevcutKaynaklar', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeKullanilacakMevcutKaynaklar, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.search = {};

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeKullanilacakMevcutKaynaklarGetData();
            }

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                KAYNAK_ADI: '',
                KAYNAK_DURUM_ID: '',
                LISTE: true
            };

            $scope.ProjeKullanilacakMevcutKaynaklarGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeKullanilacakMevcutKaynaklar.ProjeKullanilacakMevcutKaynaklarGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kullanılacak mevcut kaynak listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Kullanılacak mevcut kaynak listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeKullanilacakMevcutKaynaklarListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanılacak mevcut kaynak listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.PROJE_KULLANILACAK_MEVCUT_KAYNAK_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeKullanilacakMevcutKaynaklarSil = function (InfoProjeKullanilacakMevcutKaynaklar) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeKullanilacakMevcutKaynaklar.ProjeKullanilacakMevcutKaynaklarSil(InfoProjeKullanilacakMevcutKaynaklar.PROJE_KULLANILACAK_MEVCUT_KAYNAK_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kullanılacak mevcut kaynak silme işlemi sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Kullanılacak mevcut kaynak silme işlemi sırasında bir hata oluştu. Hata: ');
                    } else {
                        mesajGoster('İşlem tamam.', 'Kullanılacak mevcut kaynak silme işlemi başarılı bir şekilde gerçekleştirilmiştir.', 'S');
                        if ($scope.ProjeKullanilacakMevcutKaynaklarListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeKullanilacakMevcutKaynaklarGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanılacak mevcut kaynak silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjeKullanilacakMevcutKaynaklar) {
                $scope.secilenKayit = InfoProjeKullanilacakMevcutKaynaklar;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeKullanilacakMevcutKaynaklarSil($scope.secilenKayit);
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
                    PROJE_ID: $scope.projeID,
                    KAYNAK_ADI: null,
                    KAYNAK_DURUM_ID: null,
                    LISTE: true
                };
                $scope.ProjeKullanilacakMevcutKaynaklarGetData($scope.AramaKriter);
            }



            $scope.ProjeKullanilacakMevcutKaynaklarEkleGuncelle = function (InfoProjeKullanilacakMevcutKaynaklar) {
                $scope.formCalistirildiKullanilacakMevcutKaynaklar = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeKullanilacakMevcutKaynaklar.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeKullanilacakMevcutKaynaklar);
                    return;
                }
                InfoProjeKullanilacakMevcutKaynaklar.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeKullanilacakMevcutKaynaklar.ProjeKullanilacakMevcutKaynaklarEkleGuncelle(InfoProjeKullanilacakMevcutKaynaklar);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiKullanilacakMevcutKaynaklar = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kullanılacak mevcut kaynak kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Kullanılacak mevcut kaynaklar kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Kullanılacak mevcut kaynak kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjeKullanilacakMevcutKaynaklarGetData();
                        $scope.InfoProjeKullanilacakMevcutKaynaklar.KAYNAK_DURUM_ID = null;
                        $scope.InfoProjeKullanilacakMevcutKaynaklar.KAYNAK_ADI = null;
                        $scope.InfoProjeKullanilacakMevcutKaynaklar.KULLANICILACAGI_YER = null;
                        $scope.InfoProjeKullanilacakMevcutKaynaklar.KULLANIMA_ALINMA_TARIHI = null;
                        angular.element("#txtKAYNAK_ADI")[0].value = null;
                        angular.element("#txtKULLANIMA_ALINMA_TARIHI")[0].value = null;
                        angular.element("#txtKULLANICILACAGI_YER")[0].value = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanılacak mevcut kaynak kayıt işleminiz sırasında bir hata oluştu. Hata: ', hata);
                    });
            }





        }]);

