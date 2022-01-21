angular.module('inspinia').controller(
    'ik_firma_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkFirma', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkFirma, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                IK_FIRMA_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkFirmaGetData();
            }

            $scope.IkFirmaGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkFirma.IkFirmaGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Firma listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Firma listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkFirmaListesi = gelen.data.Veri;
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
                        console.error('Firma listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_FIRMA_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkFirmaSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkFirma.IkFirmaSil(info.IK_FIRMA_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Firma silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Firma silme işlemi sırasında bir hata oluştu. Hata:', hata.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Firma silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkFirmaListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.IkFirmaGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Firma silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.IkFirmaSil($scope.secilenKayit);
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
                    IK_FIRMA_ADI: null,
                    LISTE: true
                };
                $scope.IkFirmaGetData($scope.AramaKriter);
            }

            $scope.IkFirmaEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmFirma.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmFirma);
                    return;
                }
                var promiseGet = srvIkFirma.IkFirmaEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Firma kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Firma kayıt işlemi sırasında bir hata oluştu. Hata:', hata.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Firma kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.IkFirmaGetData();
                        angular.element("#txtIK_FIRMA_ADI")[0].value = null;
                        $scope.Info.IK_FIRMA_ADI = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Firma kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

