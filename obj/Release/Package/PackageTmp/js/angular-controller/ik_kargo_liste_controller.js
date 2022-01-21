angular.module('inspinia').controller(
    'ik_kargo_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkKargo','srvKargoSirketi', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkKargo, srvKargoSirketi, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterListe = {
                MUSTERI_ID: '',
                IK_KARGO_GONDEREN: '',
                IK_KARGO_GONDERILEN: '',
                KARGO_SIRKETI_ID: '',
                KARGO_GONDERI_TIPI_ID: '',
                IK_KARGO_GONDERIM_TARIHI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkKargoGetData();
                $scope.KargoSirketiGetData();
                $scope.KargoGonderiTipiGetData();
            }

            $scope.IkKargoGetData = function (AramaKriterListe) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkKargo.IkKargoGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', "Kargo listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Kargo listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkKargoListesi = gelen.data.Veri;
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
                        console.error('Kargo listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_KARGO_GONDEREN).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkKargoSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkKargo.IkKargoSil(info.IK_KARGO_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kargo silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Kargo silme işlemi sırasında beklenmedik bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam', "Kargo silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkKargoListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriterListe.SayfaNo = $scope.AramaKriterListe.SayfaNo - 1;
                        }
                        $scope.IkKargoGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kargo silme işlemi sırasında beklenmedik bir hata oluştu. Hata: ', hata);
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
                            $scope.IkKargoSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.KargoSirketiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKargoSirketi.KargoSirketiGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kargo şirketi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Kargo şirketi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.KargoSirketiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kargo şirketi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.KargoGonderiTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getKargoGonderiTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kargo gönderi tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Kargo gönderi tipi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.KargoGonderiTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kargo gönderi tipi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriterListe = {
                    MUSTERI_ID: '',
                    IK_KARGO_GONDEREN: null,
                    IK_KARGO_GONDERILEN: null,
                    KARGO_SIRKETI_ID: null,
                    KARGO_GONDERI_TIPI_ID: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $('#txtIK_KARGO_GONDERIM_TARIHI').val(null);
                $scope.IkKargoGetData($scope.AramaKriterListe);
            }
        }]);

