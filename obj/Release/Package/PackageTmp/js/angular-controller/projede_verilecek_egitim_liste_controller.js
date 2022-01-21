angular.module('inspinia').controller(
    'projede_verilecek_egitim_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjedeVerilecekEgitim', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjedeVerilecekEgitim, Ayarlarim) {
            $scope.projeID = $stateParams.projeID;
            $scope.search = {};
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjedeVerilecekEgitimGetData();
            }

            $scope.AramaKriter = {
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                PROJE_ID: $scope.projeID,
                VERILECEK_EGITIM: '',
                EGITIM_BASLANGIC_TARIH: '',
                EGITIM_BITIS_TARIH: '',
                LISTE: true
            };

            $scope.ProjedeVerilecekEgitimGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeVerilecekEgitim.ProjedeVerilecekEgitimGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Projede verilecek eğitim listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Projede verilecek eğitim listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjedeVerilecekEgitimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Projede verilecek eğitim listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.VERILECEK_EGITIM).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjedeVerilecekEgitimSil = function (InfoProjedeVerilecekEgitim) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeVerilecekEgitim.ProjedeVerilecekEgitimSil(InfoProjedeVerilecekEgitim.PROJEDE_VERILECEK_EGITIM_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Projede verilecek eğitim silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Projede verilecek eğitim silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Projede verilecek eğitim silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjedeVerilecekEgitimListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjedeVerilecekEgitimGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Projede verilecek eğitim silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjedeVerilecekEgitim) {
                $scope.secilenKayit = InfoProjedeVerilecekEgitim;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjedeVerilecekEgitimSil($scope.secilenKayit);
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
                    VERILECEK_EGITIM: '',
                    LISTE: true
                };
                $("#txtEGITIM_BITIS_TARIHI").val(null);
                $("#txtEGITIM_BASLANGIC_TARIHI").val(null);


                $scope.ProjedeVerilecekEgitimGetData($scope.AramaKriter);
            }

            $scope.ProjedeVerilecekEgitimEkleGuncelle = function (InfoProjedeVerilecekEgitim) {
                $scope.formCalistirildiProjedeVerilecekEgitim = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjedeVerilecekEgitim.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjedeVerilecekEgitim);
                    return;
                }
                InfoProjedeVerilecekEgitim.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjedeVerilecekEgitim.ProjedeVerilecekEgitimEkleGuncelle(InfoProjedeVerilecekEgitim);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjedeVerilecekEgitim = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Projede verilecek eğitim kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Projede verilecek eğitim kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Projede verilecek eğitim kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjedeVerilecekEgitimGetData();
                        $scope.InfoProjedeVerilecekEgitim.VERILECEK_EGITIM = null;
                        $scope.InfoProjedeVerilecekEgitim.EGITIM_BASLANGIC_TARIH = null;
                        $scope.InfoProjedeVerilecekEgitim.EGITIM_BITIS_TARIH = null;
                        angular.element("#txtVERILECEK_EGITIM")[0].value = null;
                        angular.element("#txtEGITIM_BASLANGIC_TARIH")[0].value = null;
                        angular.element("#txtEGITIM_BITIS_TARIH")[0].value = null;
                    }
                },
                    function (hata) {
                        $scope.formCalistirildiProjedeVerilecekEgitim = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Projede verilcek eğitim kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }


        }]);

