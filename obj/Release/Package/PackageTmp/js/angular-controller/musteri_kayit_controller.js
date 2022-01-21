angular.module('inspinia').controller(
    'musteri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvMusteri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvMusteri) {
            $scope.musteriID = $stateParams.musteriID;
            $scope.AramaKriter = {
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            var ilId = null;
            $scope.init = function () {
                $scope.ilYukle();

                if ($scope.musteriID > 0)
                    $scope.MusteriSelect();

            };

            $scope.MusteriSelect = function () {
                $rootScope.sayfayukleniyor = true;

                var promiseGet = srvMusteri.MusteriSelect($scope.musteriID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Müşteri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Müşteri bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                        if ($scope.Info.MUSTERI_IL_ID > 0)
                            $scope.getIlce();
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
                        console.error('Müşteri bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.MusteriEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmMusteri.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmMusteri);
                    return;
                }
                var promiseGet = srvMusteri.MusteriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Müşteri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Müşteri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Müşteri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Müşteri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ilYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetIl = srvGenel.getIlIlce(0);

                promiseGetIl.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İl listesi yüklenirken bir hata ile oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W')
                        console.error('İl listesi yüklenirken bir hata ile oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.IlListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İl listesi yüklenirken bir hata ile oluştu. Hata:', hata);
                    });
            };

            $scope.getIlce = function () {
                $rootScope.sayfayukleniyor = true;
                var musteriIlId = $scope.Info.MUSTERI_IL_ID;

                if (musteriIlId !== null) {
                    var promiseGetIl = srvGenel.getIlce(1, musteriIlId);
                    promiseGetIl.then(function (gelen) {
                        $scope.IlceListesi = gelen.data;
                        $rootScope.sayfayukleniyor = false;
                        if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                            mesajGoster('Dikkat', 'İlçe listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                            console.error('İlçe listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                        }
                    },
                        function (hata) {
                            $rootScope.sayfayukleniyor = false;
                            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                            console.error('İlçe listesi yüklenirken bir hata oluştu. Hata:', hata);
                        });
                }
                else {
                    $scope.IlceListesi = null;
                    $rootScope.sayfayukleniyor = false;
                }

            };



        }]);

