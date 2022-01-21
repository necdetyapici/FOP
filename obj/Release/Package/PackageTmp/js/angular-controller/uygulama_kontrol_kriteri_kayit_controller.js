angular.module('inspinia').controller(
    'uygulama_kontrol_kriteri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvUygulamaKontrolKriteri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvUygulamaKontrolKriteri) {
            $scope.uygulamaKontrolKriteriID = $stateParams.uygulamaKontrolKriteriID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.uygulamaKontrolKriteriID > 0)
                    $scope.UygulamaKontrolKriteriSelect();
            }

            $scope.UygulamaKontrolKriteriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvUygulamaKontrolKriteri.UygulamaKontrolKriteriSelect($scope.uygulamaKontrolKriteriID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri bilgileri yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
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
                        console.error('Uygulama kontrol kriteri bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.UygulamaKontrolKriteriEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmUygulamaKontrolKriteri.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmUygulamaKontrolKriteri);
                    return;
                }
                Info.UYGULAMA_KONTROL_KRITERI_GRUP_ID = $scope.Info.UYGULAMA_KONTROL_KRITERI_GRUP_ID;
                var promiseGet = srvUygulamaKontrolKriteri.UygulamaKontrolKriteriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Uygulama kontrol kriteri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

