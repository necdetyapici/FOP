angular.module('inspinia').controller(
    'ik_cagri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkCagri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkCagri, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                CAGRI_ACAN_KULLANICI_ID: '',
                KULLANICI_ID: $scope.$storage.KULLANICI_ID,
                IK_CAGRI_HIZMETI_ARAYAN: '',
                IK_CAGRI_HIZMETI_ARANAN: '',
                IK_CAGRI_HIZMETI_TELEFON: '',
                IK_CAGRI_HIZMETI_GORUSME_KONUSU: '',
                LISTE: true,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.tabClick(1);

            }

            $scope.IkCagriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkCagri.IkCagriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Çağrı kayıt listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Çağrı kayıt listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkCagriListesi = gelen.data.Veri;
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
                        console.error('Çağrı kayıt listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkCagriSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkCagri.IkCagriSil(info.IK_CAGRI_HIZMETI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Çağrı kayıt silme işleminiz sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Çağrı silme işleminiz sırasında beklenmedik bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem Tamam', "Çağrı silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkCagriListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }

                        $scope.IkCagriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Çağrı silme işleminiz sırasında beklenmedik bir hata oluştu. Hata: ', hata);
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
                            $scope.IkCagriSil($scope.secilenKayit);
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
                    IK_CAGRI_HIZMETI_ARAYAN: null,
                    IK_CAGRI_HIZMETI_ARANAN: null,
                    IK_CAGRI_HIZMETI_TELEFON: null,
                    IK_CAGRI_HIZMETI_GORUSME_KONUSU: null,
                    LISTE: true
                };
                $scope.IkCagriGetData($scope.AramaKriter);
            }

            $scope.temizleFiltre = function () {
                $scope.AramaKriter = {
                    KULLANICI_ID: null,
                    CAGRI_ACAN_KULLANICI_ID: null,
                    IK_CAGRI_HIZMETI_ARAYAN: null,
                    IK_CAGRI_HIZMETI_ARANAN: null,
                    IK_CAGRI_HIZMETI_TELEFON: null,
                    IK_CAGRI_HIZMETI_GORUSME_KONUSU: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };

            };

            $scope.tabClick = function (tab) {
                if (tab === 1) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabBir');
                    $scope.tab = 1;
                    $scope.AramaKriter.KULLANICI_ID = $scope.$storage.KULLANICI_ID;
                    $scope.IkCagriGetData();

                }
                if (tab === 2) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabIki');
                    $scope.tab = 2;
                    $scope.AramaKriter.CAGRI_ACAN_KULLANICI_ID = $scope.$storage.KULLANICI_ID;
                    $scope.IkCagriGetData();
                }
                else if (tab === 3) {
                    $scope.temizleFiltre();
                    $scope.$broadcast('tabUc');
                    $scope.tab = 3;
                    $scope.IkCagriGetData();

                }
            };



        }]);

