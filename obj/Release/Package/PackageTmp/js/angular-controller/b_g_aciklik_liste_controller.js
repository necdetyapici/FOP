angular.module('inspinia').controller(
    'b_g_aciklik_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvBGAciklik', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvBGAciklik, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                B_G_ACIKLIK_ADI: '',
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.BGAciklikGetData();
            }

            $scope.BGAciklikGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGAciklik.BGAciklikGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği açıklık listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği açıklık listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.BGAciklikListesi = gelen.data.Veri;
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
                        console.error('Bilgi güvenliği açıklık listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.BGAciklikSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGAciklik.BGAciklikSil(info.B_G_ACIKLIK_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği açıklık silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği açıklık silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    } else {
                        mesajGoster('İşlem tamam.', "Bilgi güvenliği açıklık silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.BGAciklikListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.BGAciklikGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği açıklık silme işlemi sırasında bir hata oluştu.Hata:', hata);
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
                            $scope.BGAciklikSil($scope.secilenKayit);
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
                    B_G_ACIKLIK_ADI: null,
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.BGAciklikGetData($scope.AramaKriter);
            }

            $scope.BGAciklikEkleGuncelle = function (Info, frmAciklik) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmAciklik.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmAciklik);
                    return;
                }
                var promiseGet = srvBGAciklik.BGAciklikEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği açıklık kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği açıklık kayıt işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Bilgi güvenliği açıklık kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.BGAciklikGetData();
                        //angular.element("#txtB_G_ACIKLIK_ADI")[0].value = null;
                        $scope.Info.B_G_ACIKLIK_ADI = null;

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği açıklık kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            }

        }]);

