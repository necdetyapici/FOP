angular.module('inspinia').controller(
    'ik_is_basvurulari_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkIsBasvurulari', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkIsBasvurulari, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                IK_IS_BASVURULARI_ADI: '',
                IK_IS_BASVURULARI_SOYADI: '',
                IK_DEPARTMAN_ADI: '',
                IS_BASVURULARI_DURUM_TIPI_ID: '',
                IK_IS_BASVURULARI_DEGERLENDIRME_PUANI: '',
                IK_IS_BASVURULARI_RANDEVU_TARIHI: '',
                LISTE: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkIsBasvurulariGetData();
                $scope.IsBasvurulariDurumTipiGetData();
            }

            $scope.IkIsBasvurulariGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulari.IkIsBasvurulariGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuruları listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        Console.error('İş başvuruları listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkIsBasvurulariListesi = gelen.data.Veri;
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
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
                        console.error('İş başvuruları listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkIsBasvurulariSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulari.IkIsBasvurulariSil(info.IK_IS_BASVURULARI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuru silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvuru silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "İş başvuruları silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkIsBasvurulariListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.IkIsBasvurulariGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuru silme işlemi sırasında bir hata oluştu. Hata: ', hata);
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
                            $scope.IkIsBasvurulariSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.IsBasvurulariDurumTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIsBasvurulariDurumTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuruları listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        Console.error('İş başvuruları durum tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IsBasvurulariDurumTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuruları durum tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    IK_IS_BASVURULARI_ADI: null,
                    IK_IS_BASVURULARI_SOYADI: null,
                    IK_DEPARTMAN_ADI: null,
                    IK_IS_BASVURULARI_DURUM_TIPI_ID: null,
                    IK_IS_BASVURULARI_DEGERLENDIRME_PUANI: null,
                    LISTE: true,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $('#txtIK_IS_BASVURULARI_RANDEVU_TARIHI').val(null);
                $scope.IkIsBasvurulariGetData($scope.AramaKriter);
            }

        }]);

