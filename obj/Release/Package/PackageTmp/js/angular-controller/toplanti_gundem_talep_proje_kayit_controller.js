angular.module('inspinia').controller(
    'toplanti_gundem_talep_proje_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvToplantiGundemTalepProje', 'srvTalepProjeSurecLog', 'srvKullaniciProje','srvProjeGereksinim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvToplantiGundemTalepProje, srvTalepProjeSurecLog, srvKullaniciProje, srvProjeGereksinim) {
    $scope.toplantiGundemTalepProjeID = $stateParams.toplantiGundemTalepProjeID;
    $scope.toplantiID = $stateParams.toplantiID;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });



    $scope.AramaKriter = {
        MUSTERI_ID: '',
        SayfaNo: 1,
        SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
    };

    $scope.init = function () {
        $scope.TalepTipiGetData();

        $scope.TalepDogrulanmaDurumTipiGetData();
        $scope.KullaniciProjeGetData();
        $scope.ProjeGereksinimGetData();
        $scope.TalepSahibiGetData();
        if ($scope.toplantiGundemTalepProjeID > 0) {
            $scope.ToplantiGundemTalepProjeSelect();

        }

    }

    $scope.ToplantiGundemTalepProjeSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvToplantiGundemTalepProje.ToplantiGundemTalepProjeSelect($scope.toplantiGundemTalepProjeID);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "ToplantiGundemTalepProje bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            console.log('ToplantiGundemTalepProjeSelect Hata:', hata);
        });
    }

    $scope.ToplantiGundemTalepProjeEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvToplantiGundemTalepProje.ToplantiGundemTalepProjeEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                console.error('ToplantiGundemTalepProjeEkleGuncelle Hata:', gelen.data.mesaj);
            }
            else {
                mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            }
        },
        function (errorPl) {
            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            console.error('ToplantiGundemTalepProjeEkleGuncelle Hata:', errorPl);
        });
    }


    $scope.ToplantiGundemTalepProjeSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvToplantiGundemTalepProje.TalepProjeSelect($scope.toplantiGundemTalepProjeID);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $scope.TalepProjeSurecLogGetDataTestSurec();
            $scope.talepTipi = $scope.Info.TALEP_TIPI_ID;
            if ($scope.Info.TALEP_DURUM_TIPI_ID == 3) {
                $scope.talepKapaliDurumu = true;
                mesajGoster('Talebiniz kapalı olduğu için hiç bir işlem yapamazsınız.');
            }
            if ($scope.Info.TALEP_DURUM_TIPI_ID == 4) {
                mesajGoster('Talebinizi başlatmadan hiç bir işlem yapamazsınız.');
                $scope.talepKapaliDurumu = true;
            }
            $scope.KullaniciProjeGetData();
            $scope.TalepSahibi = $scope.Info.KULLANICI_ID;
            $rootScope.sayfayukleniyor = false;
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', "TalepProje bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                console.log('TalepProjeSelect Hata:', hata);
            });
    }

    $scope.TalepProjeSurecLogGetDataTestSurec = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvTalepProjeSurecLog.TalepProjeSurecLogGetData($scope.AramaKriterSurecLog);
        promiseGet.then(function (gelen) {
            //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            $scope.TalepProjeSurecLogListesiTestSurec = gelen.data.Veri;
            for (var i = 0; i < $scope.TalepProjeSurecLogListesiTestSurec.length; i++) {
                if ($scope.TalepProjeSurecLogListesiTestSurec[i].PROJE_AKIS_YENI_SUREC_DURUM_TIPI_ID == 5) {
                    $scope.talepTipiTestIsCreate = 1;
                    break;
                }
            }
            if ($scope.Info.TALEP_TIPI_ID == 4) {
                $scope.talepTipiTestIsCreate = 1;
            }
            $rootScope.sayfayukleniyor = false;
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', "TalepProjeSurecLog listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                console.log('TalepProjeSurecLogGetData Hata:', hata);
            });
    };


    $scope.TalepTipiGetData = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvGenel.getTalepTipi();
        promiseGet.then(function (gelen) {
            $scope.TalepListesi = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', "Toplantı Gündem Talep kayıt işleminde talep tipleri yüklenirken bir hata oluştu. Hata: " + hata.data, 'W');
                console.log('Toplantı Gündem Talep kayıtta talep tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
            });
    };

    $scope.KullaniciProjeGetData = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriter);
        promiseGet.then(function (gelen) {
            //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            $scope.KullaniciProjeListesi = gelen.data.Veri;
            $rootScope.sayfayukleniyor = false;
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', "KullaniciProje listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                console.log('KullaniciProjeGetData Hata:', hata);
            });
    };

    $scope.ProjeGereksinimGetData = function () {
        $rootScope.sayfayukleniyor = true;
        $scope.AramaKriterGereksinim.PROJE_ID = $scope.Info.PROJE_ID;
        var promiseGet = srvProjeGereksinim.ProjeGereksinimGetData($scope.AramaKriterGereksinim);
        promiseGet.then(function (gelen) {
            // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            $scope.ProjeGereksinimListesi = gelen.data.Veri;
            $rootScope.sayfayukleniyor = false;
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', "Proje proje işlemleri kayıt talep yönetim sistemi proje gereksinim listesi yüklenirken bir hata oluştu. Hata: " + hata.data.MessageDetail, 'W');
                console.log('Proje proje işlemleri kayıt talep yönetim sistemi proje gereksinim listesi yüklenirken bir hata oluştu. Hata:', hata);
            });
    };

    $scope.TalepSahibiGetData = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvGenel.getKullaniciListesi($scope.AramaKriter);
        promiseGet.then(function (pl) {
            //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
            $scope.TalepSahibiListesi = pl.data.Veri;
            $rootScope.sayfayukleniyor = false;
        },
            function (errorPl) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', "Toplantı toplantı kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata: " + errorPl.data, 'W')
                $log.error('Toplantı toplantı kayıt kullanıcı listesi yüklenirken bir hata oluştu. Hata:', errorPl);
            });
    }


}]);

