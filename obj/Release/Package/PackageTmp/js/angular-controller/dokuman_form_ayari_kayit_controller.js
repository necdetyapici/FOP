angular.module('inspinia').controller(
    'dokuman_form_ayari_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanFormAyari',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanFormAyari) {
            $scope.dokumanFormAyariID = $stateParams.dokumanFormAyariID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.DokumanFormTipiListesi = [];

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.dokumanFormAyariID > 0)
                    $scope.DokumanFormAyariSelect();
                $scope.DokumanFormTipiGetData();
            }

            $scope.DokumanFormTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.DokumanFormTipiSelect();

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dokuman form tipleri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dokuman form tipleri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.DokumanFormTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dokuman form tipleri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });


            }

            $scope.DokumanFormAyariSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanFormAyari.DokumanFormAyariSelect($scope.dokumanFormAyariID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanFormAyari bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DokumanFormAyariSelect Hata:', hata);
                    });
            }

            $scope.DokumanFormAyariEkleGuncelle = function (InfoFormAyar, frmFormAyar) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvDokumanFormAyari.DokumanFormAyariEkleGuncelle(InfoFormAyar);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanFormAyariEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanFormAyariEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

