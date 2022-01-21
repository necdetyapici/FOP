angular.module('inspinia').controller(
    'varlik_olasilik_etki_degeri_sonuc_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvVarlikOlasilikEtkiDegeriSonuc',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvVarlikOlasilikEtkiDegeriSonuc) {
            $scope.kayitNo = $stateParams.kayitNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.kayitNo > 0)
                    $scope.VarlikOlasilikEtkiDegeriSonucSelect();
            }
            $scope.VarlikOlasilikEtkiDegeriSonucSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvVarlikOlasilikEtkiDegeriSonuc.VarlikOlasilikEtkiDegeriSonucSelect($scope.kayitNo);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık olasılık etki değeri sonuç bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık değeri olasılık etki değeri sonuç bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                        console.error('Varlık olasılık etki değeri sonuç bilgilieri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.VarlikOlasilikEtkiDegeriSonucEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.form.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvVarlikOlasilikEtkiDegeriSonuc.VarlikOlasilikEtkiDegeriSonucEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Varlık olasılık etki değeri sonuç kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Varlık olasılık etki değeri sonuç kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Varlık olasılık etki değeri sonuç kayıt işleminiz başarılı bir şekilde yapılmıştır.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Varlık olasılık etki değeri sonuç kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

