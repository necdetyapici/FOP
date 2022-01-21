angular.module('inspinia').controller(
    'proje_musteri_egitimi_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeMusteriEgitimi', 'srvProjePersonel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeMusteriEgitimi, srvProjePersonel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.search = {};
            $scope.projeID = $stateParams.projeID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeMusteriEgitimiGetData();
                $scope.PersonelYukle();
            }

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                EGITIM_VEREN_KISI_AD_SOYAD: '',
                EGITIM_ARACI: '',
                EGITIM_YERI: '',
                LISTE: true
            };

            $scope.ProjeMusteriEgitimiGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeMusteriEgitimi.ProjeMusteriEgitimiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Müşteri eğitimi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Müşteri eğitimi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeMusteriEgitimiListesi = gelen.data.Veri;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri eğitimi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.EGITIM_VEREN_KISI_AD_SOYAD).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeMusteriEgitimiSil = function (InfoProjeMusteriEgitimi) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeMusteriEgitimi.ProjeMusteriEgitimiSil(InfoProjeMusteriEgitimi.PROJE_MUSTERI_EGITIMI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Müşteri eğitimi silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Müşteri eğitimi silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Müşteri eğitimi silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeMusteriEgitimiListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeMusteriEgitimiGetData();
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri eğitimi silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjeMusteriEgitimi) {
                $scope.secilenKayit = InfoProjeMusteriEgitimi;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeMusteriEgitimiSil($scope.secilenKayit);
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
                    EGITIM_VEREN_KISI_AD_SOYAD: null,
                    EGITIM_ARACI: null,
                    EGITIM_YERI: null,
                    PROJE_ID: $scope.projeID,
                    LISTE: true
                };
                $scope.ProjeMusteriEgitimiGetData($scope.AramaKriter);
            }

            $scope.PersonelYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;             

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitmen listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitmen listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitmen listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };
            $scope.InfoProjeMusteriEgitimi = {
                PROJE_PERSONEL_ID: '',
                EGITIM_ARACI: '',
                EGITIM_YERI: '',
                PROJE_ID: ''
            };
            $scope.ProjeMusteriEgitimiEkleGuncelle = function (InfoProjeMusteriEgitimi) {
                $scope.formProjeMusteriEgitimCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeMusteriEgitimi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeMusteriEgitimi);
                    return;
                }
                InfoProjeMusteriEgitimi.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeMusteriEgitimi.ProjeMusteriEgitimiEkleGuncelle(InfoProjeMusteriEgitimi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formProjeMusteriEgitimCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Müşteri eğitimi kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Müşteri eğitimi kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Müşteri eğitimi kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.InfoProjeMusteriEgitimi.PROJE_PERSONEL_ID = null;
                        angular.element("#txtEGITIM_YERI")[0].value = null;
                        $scope.InfoProjeMusteriEgitimi.EGITIM_ARACI = null;
                        $scope.InfoProjeMusteriEgitimi.EGITIM_YERI = null;
                        //angular.element("#cmbPROJE_PERSONEL_ID")[0].empty();
                        //angular.element("#txtEGITIM_ARACI")[0].text = null;
                        //$scope.InfoProjeMusteriEgitimi.EGITIM_YERI = null;
                        $scope.ProjeMusteriEgitimiGetData();

                    }
                },
                    function (hata) {
                        $scope.formProjeMusteriEgitimCalistirildi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

        }]);

