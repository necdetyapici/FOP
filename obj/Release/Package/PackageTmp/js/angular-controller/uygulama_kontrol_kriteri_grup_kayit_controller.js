angular.module('inspinia').controller(
    'uygulama_kontrol_kriteri_grup_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvUygulamaKontrolKriteriGrup',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvUygulamaKontrolKriteriGrup) {
            $scope.uygulamaKontrolKriteriGrupID = $stateParams.uygulamaKontrolKriteriGrupID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.UygulamaKontrolKriteriGrupGetData();
                if ($scope.uygulamaKontrolKriteriGrupID > 0)
                    $scope.UygulamaKontrolKriteriGrupSelect();
            }

            $scope.UygulamaKontrolKriteriGrupSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupSelect($scope.uygulamaKontrolKriteriGrupID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri grup bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri grup bilgileri yüklenirken bir hata oluştu.Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
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
                        console.error('Uygulama kontrol kriteri grup bilgileri yüklenirken bir hata oluştu.Hata: ', hata);
                    });
            }

            $scope.UygulamaKontrolKriteriGrupEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmUygulamaKontrolKriteriGrup.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmUygulamaKontrolKriteriGrup);
                    return;
                }
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri grup kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri grup kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Uygulama kontrol kriteri grup kayıt işleminiz başarılı bir şekilde gerçekleşmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri grup kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.UygulamaKontrolKriteriGrupGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteriGrup.UygulamaKontrolKriteriGrupGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri grup listesi kayıt işlemi sırasında bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri grup listesi kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.UygulamaKontrolKriteriGrupListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri grup listesi kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            };

        }]);

