angular.module('inspinia').controller(
    'teknolojik_fizibilite_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvTeknolojikFizibilite', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvTeknolojikFizibilite, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                LISTE: true,
                TEKNOLOJIK_FIZIBILITE_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.AramaKriterListe = {
                LISTE: false
            }
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.TeknolojikFizibiliteGetData();
                $scope.UstTeknolojikFizibiliteGetData();
            }

            $scope.TeknolojikFizibiliteGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;

                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teknolojik fizibilite listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.TeknolojikFizibiliteListesi = gelen.data.Veri;
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
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.UstTeknolojikFizibiliteGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Üst teknolojik fizibilite listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Üst teknolojik fizibilite listesi yüklenirken bir hata oluştu.Hata: ', gelen.data.Veri[0].sistemMesaj);

                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.UstTeknolojikFizibiliteListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Üst teknolojik fizibilite listesi yüklenirken bir hata oluştu.Hata: ', hata);
                    });
            };

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.TEKNOLOJIK_FIZIBILITE_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.TeknolojikFizibiliteSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteSil(info.TEKNOLOJIK_FIZIBILITE_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teknolojik fizibilite silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);

                    } else {
                        mesajGoster('İşlem tamam.', "Teknolojik fizibilite silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.TeknolojikFizibiliteListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.TeknolojikFizibiliteGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite silme işlemi sırasında bir hata oluştu. Hata: ', hata);
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
                            $scope.TeknolojikFizibiliteSil($scope.secilenKayit);
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
                    LISTE: true,
                    TEKNOLOJIK_FIZIBILITE_ADI: null
                };
                $scope.TeknolojikFizibiliteGetData($scope.AramaKriter);
            }

            $scope.TeknolojikFizibiliteEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmTeknolojikFizibilite.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmTeknolojikFizibilite);
                    return;
                }
                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteEkleGuncelle(Info);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Teknolojik fizibilite kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.TeknolojikFizibiliteGetData();
                        $scope.UstTeknolojikFizibiliteGetData();
                        $scope.Info.UST_TEKNOLOJIK_FIZIBILITE_ID = null;
                        $scope.Info.TEKNOLOJIK_FIZIBILITE_ADI = null;
                        $scope.formCalistirildi = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }


        }]);

