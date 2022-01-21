angular.module('inspinia').controller(
    'ik_zimmet_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkZimmet', 'srvIkDemirbas', 'srvKullanici',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkZimmet, srvIkDemirbas, srvKullanici) {
            $scope.ikZimmetID = $stateParams.ikZimmetID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.Info = {
                IK_DEMIRBAS_ID: '',
                IK_ZIMMET_VERILME_TARIHI: '',
                IK_ZIMMET_IADE_TARIHI: null,
                IK_ZIMMET_TESLIM_EDEN_KISI_ID: '',
                IK_ZIMMET_TESLIM_ALAN_KISI_ID: ''
            };

            $scope.init = function () {
                
                $scope.KullaniciListesiniGetir();
                if ($scope.ikZimmetID > 0) {
                    $scope.IkZimmetSelect();
                }
                else {
                    $scope.IkDemirbasGetData();
                }
            };

            $scope.AramaKriter = {
                LISTE: false,
                FILTER: true,
                ZIMMET_DURUMU: true,
                IK_DEMIRBAS_ID: ''
            };
            $scope.IkZimmetSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkZimmet.IkZimmetSelect($scope.ikZimmetID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Zimmet bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Zimmet bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                        $scope.AramaKriter.IK_DEMIRBAS_ID = $scope.Info.IK_DEMIRBAS_ID;
                        $scope.IkDemirbasGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Zimmet bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkZimmetEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmZimmet.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmZimmet);
                    return;
                }
                //if (Info.IK_ZIMMET_IADE_TARIHI !== null && Info.IK_ZIMMET_IADE_ALAN_KISI_ID === null) {
                //    $rootScope.sayfayukleniyor = false;
                //    $rootScope.focusToInvalid($scope.frmZimmet);
                //    return;
                //}
                var promiseGet = srvIkZimmet.IkZimmetEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Zimmet kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Zimmet kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Zimmet kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir. " + gelen.data.mesaj, "S");
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Zimmet kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkDemirbasGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDemirbas.IkDemirbasGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Demirbaş listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Demirbaş listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkDemirbasListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Demirbaş listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };
            
            $scope.KullaniciListesiniGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriter);

                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;

                    //$scope.KullaniciListesiTeslinAlan = $scope.KullaniciListesi;
                    //asdf = $scope.KullaniciListesi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            


        }]);

