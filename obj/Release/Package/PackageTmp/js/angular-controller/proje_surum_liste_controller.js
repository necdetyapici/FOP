angular.module('inspinia').controller(
    'proje_surum_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeSurum', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeSurum, Ayarlarim) {
            $scope.projeID = $stateParams.projeID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                PROJE_SURUM_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeSurumGetData();
            }

            $scope.ProjeSurumGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurum.ProjeSurumGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Proje sürüm listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.ProjeSurumListesi = gelen.data.Veri;
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.PROJE_SURUM_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeSurumSil = function (InfoProjeSurum) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurum.ProjeSurumSil(InfoProjeSurum.PROJE_SURUM_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Proje sürüm silme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Proje sürüm silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeSurumListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeSurumGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje sürüm silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjeSurum) {
                $scope.secilenKayit = InfoProjeSurum;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeSurumSil($scope.secilenKayit);
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
                    PROJE_ID: $scope.projeID,
                    PROJE_SURUM_ADI: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.ProjeSurumGetData($scope.AramaKriter);
            }

            $scope.ProjeSurumEkleGuncelle = function (InfoProjeSurum) {
                $scope.formCalistirildiProjeSurum = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeSurum.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeSurum);
                    return;
                }
                InfoProjeSurum.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeSurum.ProjeSurumEkleGuncelle(InfoProjeSurum);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiProjeSurum = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Proje sürüm kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Proje sürüm kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Proje sürüm kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeSurumGetData();
                        angular.element("#txtPROJE_SURUM_ADI")[0].value = null;
                        angular.element("#ITERASYON_DURUM_TIPI_ADI")[0].value = null;
                        $scope.InfoProjeSurum.PROJE_SURUM_ADI = null;
                        $scope.InfoProjeSurum.PROJE_ITERASYON_ADI = null;
                        $scope.InfoProjeSurum.PROJE_ITERASYON_BITIS_TARIHI = null;
                        $scope.InfoProjeSurum.PROJE_ITERASYON_BASLANGIC_TARIHI = null;
                        $scope.InfoProjeSurum.ITERASYON_DURUM_TIPI_ID = null;



                    }
                },
                    function (hata) {
                        $scope.formCalistirildiProjeSurum = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje sürüm kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }
        }]);

