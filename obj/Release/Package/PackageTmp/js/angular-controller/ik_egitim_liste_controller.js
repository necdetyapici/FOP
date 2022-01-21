angular.module('inspinia').controller(
    'ik_egitim_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkEgitim', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkEgitim, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                IK_EGITIM_ADI: '',
                IK_EGITIM_BASLANGIC_TARIHI: '',
                IK_EGITIM_BITIS_TARIHI: '',
                IK_EGITIM_VEREN_KURUM_ADI: '',
                IK_EGITIM_EGITMEN_ADI: '',
                IK_EGITIM_KONU: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkEgitimGetData();
            }

            $scope.IkEgitimGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitim.IkEgitimGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Eğitim listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Eğitim listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkEgitimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_EGITIM_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkEgitimSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitim.IkEgitimSil(info.IK_EGITIM_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Eğitim silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkEgitimListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.IkEgitimGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim silme işlemi sırasında bir hata oluştu. Hata: ', hata);
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
                            $scope.IkEgitimSil($scope.secilenKayit);
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
                    IK_EGITIM_ADI: null,
                    IK_EGITIM_VEREN_KURUM_ADI: null,
                    IK_EGITIM_EGITMEN_ADI: null,
                    IK_EGITIM_KONU: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $('#txtIK_EGITIM_BASLANGIC_TARIHI').val(null);
                $('#txtIK_EGITIM_BITIS_TARIHI').val(null);
                $scope.IkEgitimGetData($scope.AramaKriter);
            }

        }]);

