angular.module('inspinia').controller(
    'proje_planlanan_personel_sayisi_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvPersonelTipi', 'srvProjePlanlananPersonelSayisi', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvPersonelTipi, srvProjePlanlananPersonelSayisi, srvGenel, Ayarlarim) {
            $scope.projeID = $stateParams.projeID;
            $scope.Ayarlar = Ayarlarim;
            $scope.search = {};
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                PERSONEL_TIPI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.init = function () {
                $scope.ProjePlanlananPersonelSayisiGetData();
                $scope.PersonelTipiGetData();
            };


            $scope.ProjePlanlananPersonelSayisiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlanlananPersonelSayisi.ProjePlanlananPersonelSayisiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Planlanan personel sayısı listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Planlanan personel sayısı listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePlanlananPersonelSayisiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Planlanan personel sayısı listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.PERSONEL_TIPI_ID).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjePlanlananPersonelSayisiSil = function (InfoProjePlanlananPersonelSayisi) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlanlananPersonelSayisi.ProjePlanlananPersonelSayisiSil(InfoProjePlanlananPersonelSayisi.PROJE_PLANLANAN_PERSONEL_SAYISI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Planlanan personel sayısı silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Planlanan personel sayısı silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Planlanan personel sayısı silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjePlanlananPersonelSayisiListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjePlanlananPersonelSayisiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Planlanan personel sayısı silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (InfoProjePlanlananPersonelSayisi) {
                $scope.secilenKayit = InfoProjePlanlananPersonelSayisi;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjePlanlananPersonelSayisiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.PersonelTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvPersonelTipi.PersonelTipiGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel tipi listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.PersonelTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PERSONEL_TIPI_ID: null,
                    PROJE_ID: $scope.projeID,
                    LISTE: true
                };
                $scope.ProjePlanlananPersonelSayisiGetData($scope.AramaKriter);
            };



            $scope.ProjePlanlananPersonelSayisiEkleGuncelle = function (InfoProjePlanlananPersonelSayisi) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePlanlananPersonelSayisi = true;
                if ($scope.frmProjePlanlananPersonelSayisi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjePlanlananPersonelSayisi);
                    return;
                }
                InfoProjePlanlananPersonelSayisi.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjePlanlananPersonelSayisi.ProjePlanlananPersonelSayisiEkleGuncelle(InfoProjePlanlananPersonelSayisi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Planlanan personel sayısı kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Planlanan personel sayısı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Planlanan personel sayısı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjePlanlananPersonelSayisiGetData();
                        $scope.formCalistirildiProjePlanlananPersonelSayisi = false;
                        $scope.Info.PERSONEL_TIPI_ID = null;
                        $scope.Info.SAYI = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Planlanan personel sayısı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }
        }]);

