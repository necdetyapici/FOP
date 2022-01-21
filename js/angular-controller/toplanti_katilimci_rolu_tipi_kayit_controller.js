angular.module('inspinia').controller(
    'toplanti_katilimci_rolu_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvToplantiKatilimciRoluTipi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvToplantiKatilimciRoluTipi) {
            $scope.ToplantiKatilimciRoluTipiID = $stateParams.ToplantiKatilimciRoluTipiID;
            $scope.kayıtTarihi = $stateParams.kayıtTarihi;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.ToplantiKatilimciRoluTipiID > 0)
                    $scope.ToplantiKatilimciRoluTipiSelect();
            }

            $scope.ToplantiKatilimciRoluTipiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvToplantiKatilimciRoluTipi.ToplantiKatilimciRoluTipiSelect($scope.ToplantiKatilimciRoluTipiID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Toplantı Katılımcı Rolu Tipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('ToplantiKatilimciRoluTipiSelect Hata:', hata);
                    });
            }

            $scope.ToplantiKatilimciRoluTipiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvToplantiKatilimciRoluTipi.ToplantiKatilimciRoluTipiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('ToplantiKatilimciRoluTipiEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('ToplantiKatilimciRoluTipiEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

