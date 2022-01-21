angular.module('inspinia').controller(
    'ik_dis_gorev_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel','srvUlasimSekliTipi', 'srvIkDisGorev', 'srvKullaniciProje', 'srvKullanici', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvUlasimSekliTipi, srvIkDisGorev, srvKullaniciProje, srvKullanici, Ayarlarim) {
            $scope.ikDisGorevID = $stateParams.ikDisGorevID;
            //$scope.kullaniciID = $stateParams.kullaniciID;
            $scope.Ayarlar = Ayarlarim;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };

            $scope.AramaKriterListe = {
                LISTE: false,
                KULLANICI_ID: $scope.$storage.KULLANICI_ID
            };

            $scope.init = function () {
                $scope.UlasimSekliTipiGetData();
                $scope.KullaniciGetData();
                $scope.KullaniciProjeGetData();
                if ($scope.ikDisGorevID > 0) {
                    $scope.IkDisGorevSelect();
                    $scope.InfoDisGorevOnay = {};
                } else {
                    $scope.atayanKullaniciAdSoyad = $scope.$storage.AD_SOYAD;
                }
                    
            };

            $scope.IkDisGorevSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDisGorev.IkDisGorevSelect($scope.ikDisGorevID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dış görev bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dış görev bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDisGorev = gelen.data;
                        $scope.atayanKullaniciAdSoyad = $scope.InfoDisGorev.ATAYAN_KULLANICI_AD_SOYAD;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dış görev bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkDisGorevEkleGuncelle = function (InfoDisGorev) {
                $scope.formCalistirildiDisGorev = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmDisGorev.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmDisGorev);
                    return;
                }
                var promiseGet = srvIkDisGorev.IkDisGorevEkleGuncelle(InfoDisGorev);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dış görev kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W')
                        console.error('Dış görev kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Dış görev kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ikDisGorevID = gelen.data.returnKayitNo;
                        $state.go('insankaynaklari.ikdisgorevkayit', { ikDisGorevID: $scope.ikDisGorevID });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dış görev kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.UlasimSekliTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUlasimSekliTipi.UlasimSekliTipiGetData();
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Ulaşım şekli listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Ulaşım şekli listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.UlasimSekliTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Ulaşım şekli listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KullaniciProjeGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullaniciProje.KullaniciProjeGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Proje listesi yüklenirken bir hata oluştu. " + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.KullaniciProjeListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.KullaniciGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                        $rootScope.sayfayukleniyor = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkDisGorevOnay = function () {
                $scope.InfoDisGorevOnay.IK_DIS_GOREV_ID = $scope.ikDisGorevID;
                var promiseGet = srvIkDisGorev.IkDisGorevOnay($scope.InfoDisGorevOnay);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dış görev onay işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W')
                        console.error('Dış görev onay işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Dış görev onay işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        if ($scope.InfoDisGorevOnay.IK_DIS_GOREV_DURUM_TIPI_ID === 4) {
                            $scope.GeriIkDisGorev();
                        }
                        $scope.IkDisGorevSelect();
                        
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dış görev onay işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AvansAc = function (post) {
                if (post === undefined || post === '') { return; }
                var url = $state.href('insankaynaklari.ikpersonelkayit.ikpersonelavanskayit', { kullaniciID: post.ATANAN_KULLANICI_ID });
                window.open(url, '_blank');
            }

            $scope.MasrafAc = function (post) {
                if (post === undefined || post === '') { return; }
                var url = $state.href('insankaynaklari.ikpersonelkayit.ikpersonelmasrafkayit', { kullaniciID: post.ATANAN_KULLANICI_ID });
                window.open(url, '_blank');
            }

            $scope.IkDisGorevRed = function () {
                $scope.modalIntanceDisGorevRed = $modal.open({
                    templateUrl: 'views/common/modal_ik_dis_gorev_reddet.html',
                    scope: $scope
                });
            };

            $scope.GeriIkDisGorev = function () {
                $scope.modalIntanceDisGorevRed.dismiss('cancel');
            };
        }]);

