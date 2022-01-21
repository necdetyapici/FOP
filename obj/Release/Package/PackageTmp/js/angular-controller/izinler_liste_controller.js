angular.module('inspinia').controller(
    'izinler_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvIkPersonelIzin', 'srvGenel','Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvIkPersonelIzin, srvGenel, Constants, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $scope.$storage.KULLANICI_ID;
            $scope.IzinTuru = Constants.IZIN_TURU;
            $scope.IzinDurumu = Constants.IZIN_DURUMU;
            $scope.AramaKriter = {
                IZIN_TURU_ID: '',
                IK_PERSONEL_IZIN_BASLANGIC_TARIHI: '',
                IK_PERSONEL_IZIN_BITIS_TARIHI: '',
                AD_SOYAD: '',
                KULLANICI_ID: $scope.kullaniciID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                ONAY: false,
                ONAYLANMAMIS: true,
                HEPSI: false
            };


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IzinTuruGetData();
                $scope.tabClick(1);
            };

            $scope.IkPersonelIzinGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelIzin.IkPersonelIzinGetData(AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İzinler listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İzinler listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkPersonelIzinListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('İzinler listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };




            $scope.IzinTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIzinTuru();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İzin türü listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İzin türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IzinTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İzin türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    MUSTERI_ID: '',
                    IZIN_TURU_ID: null,
                    IK_PERSONEL_IZIN_BASLANGIC_TARIHI: '',
                    IK_PERSONEL_IZIN_BITIS_TARIHI: '',
                    AD_SOYAD: null,
                    //KULLANICI_ID: $scope.kullaniciID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi

                };
                $('#txtIK_PERSONEL_IZIN_BASLANGIC_TARIHI').val(null);
                $('#txtIK_PERSONEL_IZIN_BITIS_TARIHI').val(null);
                $scope.IkPersonelIzinGetData($scope.AramaKriter);
            };


            $scope.IzinReddet = function (InfoPersonelIzinOnay) {
                $scope.InfoPersonelIzinOnay = InfoPersonelIzinOnay;
                $scope.modalInstanceIzinReddet = $modal.open({
                    templateUrl: 'views/common/modal_izin_reddet.html',
                    controller: 'izinler_liste_controller',
                    scope: $scope
                });
                $scope.modalInstanceIzinReddet.result.then(function () {
                    $scope.IkPersonelIzinGetData($scope.AramaKriter);
                }, function (data) {
                });
            };


            $scope.GeriIzinReddet = function () {
                $scope.modalInstanceIzinReddet.close();
            };


            $scope.temizleFiltre = function () {
                $scope.AramaKriter = {
                    MUSTERI_ID: '',
                    IZIN_TURU_ID: '',
                    IK_PERSONEL_IZIN_BASLANGIC_TARIHI: '',
                    IK_PERSONEL_IZIN_BITIS_TARIHI: '',
                    AD_SOYAD: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    ONAY: '',
                    ONAYLANMAMIS: '',
                    HEPSI: ''
                };
            };

            $scope.tabClick = function (tab) {
                if (tab === 1) {
                    $scope.temizleFiltre();
                    $scope.tab = 1;
                    $scope.AramaKriter.ONAYLANMAMIS = true;
                    $scope.AramaKriter.ONAY = false;
                    $scope.AramaKriter.HEPSI = false;
                    $scope.IkPersonelIzinGetData($scope.AramaKriter);
                }
                if (tab === 2) {
                    $scope.temizleFiltre();
                    $scope.tab = 2;
                    $scope.AramaKriter.ONAYLANMAMIS = false;
                    $scope.AramaKriter.HEPSI = false;
                    $scope.AramaKriter.ONAY = true;
                    $scope.IkPersonelIzinGetData($scope.AramaKriter);
                }
                else if (tab === 3) {
                    $scope.temizleFiltre();
                    $scope.tab = 3;
                    $scope.AramaKriter.ONAYLANMAMIS = false;
                    $scope.AramaKriter.ONAY = false;
                    $scope.AramaKriter.HEPSI = true;
                    $scope.IkPersonelIzinGetData($scope.AramaKriter);

                }
            };


            $scope.IkPersonelToplamIzinGetData = function (kullaniciId) {
                $rootScope.sayfayukleniyor = true;

                var promiseGet = srvIkPersonelIzin.IkPersonelToplamIzinGetData(kullaniciId);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Personel bütün izin bilgileri yüklenirken bir hata oluştu. Hata: " + gelen.data.mesaj, 'E');
                        console.error('Personel bütün izin bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        $scope.InfoPersonelToplamIzin = gelen.data;
                        $scope.PersonelIzinListeleGoster();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel bütün izin bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    }
                );
            };

            $scope.PersonelIzinListeleGoster = function () {
                $scope.$modalInstancePersonlIzinGoster = $modal.open({
                    templateUrl: 'views/common/modal_personel_izin_liste.html',
                    size: 'lg',
                    scope: $scope
                });

            };

            $scope.Geri = function () {
                $scope.$modalInstancePersonlIzinGoster.dismiss('cancel');
            };


            $scope.IkPersonelIzinOnaylama = function (InfoPersonelIzinOnay) {
                $rootScope.sayfayukleniyor = true;
                if (InfoPersonelIzinOnay.IZIN_DURUMU_ID === 5) {
                    $scope.formCalistirildiPersonelIzinReddet = true;
                    if ($scope.frmIkPersonelIzinReddet.$valid) { } else {
                        $rootScope.sayfayukleniyor = false;
                        $rootScope.focusToInvalid($scope.frmIkPersonelIzinReddet);
                        return;
                    }
                }

                var promiseGet = srvIkPersonelIzin.IzinOnaylama(InfoPersonelIzinOnay);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel izin onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel izin onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel izin onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if (InfoPersonelIzinOnay.IZIN_DURUMU_ID === 5) {
                            $scope.GeriIzinReddet();
                        }
                        $scope.IkPersonelIzinGetData($scope.AramaKriter);
                        //else {
                        //    $scope.IkPersonelIzinGetData($scope.AramaKriter);
                        //}
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel izin onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.IkPersonelIzinDetay = function (InfoPersonelIzinDetay) {
                $scope.InfoPersonelIzinDetay = InfoPersonelIzinDetay;
                $scope.modalInstanceIkPersonelIzinDetay = $modal.open({
                    templateUrl: 'views/common/modal_personel_izin_detay.html',
                    controller: 'izinler_liste_controller',
                    scope: $scope
                });
            };


            $scope.GeriIkPersonelIzinDetay = function () {
                $scope.modalInstanceIkPersonelIzinDetay.close();
            };


        }]);

