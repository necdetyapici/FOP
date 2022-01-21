angular.module('inspinia').controller(
    'projede_egitim_alan_personel_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjedeEgitimAlanPersonel', 'srvProjePersonel', 'srvProjedeVerilecekEgitim', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjedeEgitimAlanPersonel, srvProjePersonel, srvProjedeVerilecekEgitim, Ayarlarim) {
            $scope.projeID = $stateParams.projeID;
            $scope.search = {};
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjedeEgitimAlanPersonelGetData();
                //$scope.personelYukle();
                $scope.verilecekEgitimYukle();
            }

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                PERSONEL_AD_SOYAD: '',
                LISTE: true
            };

            $scope.ProjedeEgitimAlanPersonelGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeEgitimAlanPersonel.ProjedeEgitimAlanPersonelGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim alan personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim alan personel listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjedeEgitimAlanPersonelListesi = gelen.data.Veri;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.PERSONEL_AD_SOYAD).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjedeEgitimAlanPersonelSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeEgitimAlanPersonel.ProjedeEgitimAlanPersonelSil(info.PROJE_EGITIM_ALAN_PERSONEL_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Eğitim alan personel silme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim alan personel silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Eğitim alan personel silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjedeEgitimAlanPersonelListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjedeEgitimAlanPersonelGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Eğitim alan personel silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.ProjedeEgitimAlanPersonelSil($scope.secilenKayit);
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
                    PERSONEL_AD_SOYAD: null,
                    LISTE: true
                };
                $scope.ProjedeEgitimAlanPersonelGetData($scope.AramaKriter);
            }

            //$scope.personelYukle = function () {
            //    $rootScope.sayfayukleniyor = true;
            //    var promiseGet = srvProjePersonel.ProjePersonelGetData($scope.AramaKriter);

            //    promiseGet.then(function (gelen) {

            //        $rootScope.sayfayukleniyor = false;
            //        if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
            //            mesajGoster('Dikkat', 'Proje sürüm listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
            //            console.error('Proje sürüm listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
            //        } else {
            //            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            //            $scope.ProjePersonelListesi = gelen.data.Veri;
            //        }
            //    },
            //        function (hata) {
            //            $rootScope.sayfayukleniyor = false;
            //            mesajGoster('Dikkat', "Proje proje işlemleri kayıt plan projede eğitim alan personel kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata: " + hata.data, 'W');
            //            console.log('Proje proje işlemleri kayıt plan projede eğitim alan personel kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata:', hata);
            //        });
            //}


            $scope.verilecekEgitimYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeVerilecekEgitim.ProjedeVerilecekEgitimGetData($scope.AramaKriter);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Verilecek eğitim listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Verilecek eğitim listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.verilecekEgitimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Verilecek eğitim listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.ProjedeEgitimAlanPersonelEkleGuncelle = function (Info) {
                $scope.formCalistirildiProjeEgitimAlanPersonel = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeEgitimAlanPersonel.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeEgitimAlanPersonel);
                    $rootScope.sayfayukleniyor = false;
                    return;
                }
                Info.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjedeEgitimAlanPersonel.ProjedeEgitimAlanPersonelEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjeEgitimAlanPersonel = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Eğitim alan personel kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim alan personel kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Eğitim alan personel kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjedeEgitimAlanPersonelGetData();
                        $scope.Info.PROJEDE_VERILECEK_EGITIM_ID = null;
                        $scope.Info.PROJE_PERSONEL_ID = null;
                    }
                },
                    function (hata) {
                        $scope.formCalistirildiProjeEgitimAlanPersonel = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Eğitim alan personel kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

