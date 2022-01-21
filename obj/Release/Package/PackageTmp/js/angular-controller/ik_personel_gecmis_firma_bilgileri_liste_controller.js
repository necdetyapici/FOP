angular.module('inspinia').controller(
    'ik_personel_gecmis_firma_bilgileri_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkPersonelGecmisFirmaBilgileri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkPersonelGecmisFirmaBilgileri, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                KULLANICI_ID: $scope.kullaniciID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ADI: '',
                IK_PERSONEL_GECMIS_FIRMA_BILGILERI_BASLANGIC_TARIHI: '',
                IK_PERSONEL_GECMIS_FIRMA_BILGILERI_AYRILMA_TARIHI: '',
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkPersonelGecmisFirmaBilgileriGetData();
            };

            $scope.IkPersonelGecmisFirmaBilgileriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelGecmisFirmaBilgileri.IkPersonelGecmisFirmaBilgileriGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel geçmiş firma bilgileri listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel geçmiş firma bilgileri listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkPersonelGecmisFirmaBilgileriListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel geçmiş firma bilgileri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkPersonelGecmisFirmaBilgileriSil = function (InfoPersonelGecmisFirma) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelGecmisFirmaBilgileri.IkPersonelGecmisFirmaBilgileriSil(InfoPersonelGecmisFirma.IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel geçmiş firma bilgileri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel geçmiş firma bilgileri silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Personel geçmiş firma bilgileri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkPersonelGecmisFirmaBilgileriListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.IkPersonelGecmisFirmaBilgileriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel geçmiş firma bilgileri silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoPersonelGecmisFirma) {
                $scope.secilenKayit = InfoPersonelGecmisFirma;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.IkPersonelGecmisFirmaBilgileriSil($scope.secilenKayit);
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
                    MUSTERI_ID: '',
                    KULLANICI_ID: $scope.kullaniciID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ADI: null,
                    IK_PERSONEL_GECMIS_FIRMA_BILGILERI_BASLANGIC_TARIHI: '',
                    IK_PERSONEL_GECMIS_FIRMA_BILGILERI_AYRILMA_TARIHI: '',
                    LISTE: true
                };
                $('#txtIK_PERSONEL_GECMIS_FIRMA_BILGILERI_BASLANGIC_TARIHI').value = null;
                $('#txtIK_PERSONEL_GECMIS_FIRMA_BILGILERI_AYRILMA_TARIHI').value = null;

                $scope.IkPersonelGecmisFirmaBilgileriGetData($scope.AramaKriter);
            };

        }]);

