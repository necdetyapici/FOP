angular.module('inspinia').controller(
'dokuman_gozden_gecirme_kriter_adim_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanGozdenGecirmeKriterAdim',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanGozdenGecirmeKriterAdim) {
    $scope.kayitNo = $stateParams.kayitNo;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.kayitNo>0)
           $scope.DokumanGozdenGecirmeKriterAdimSelect();
    }

    $scope.DokumanGozdenGecirmeKriterAdimSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimSelect($scope.kayitNo);

        promiseGet.then(function (gelen) {
            $rootScope.sayfayukleniyor = false;
            if (gelen.data.basariDurumu === false) {
                mesajGoster('Dikkat', 'Gözden geçirme kriter adım bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                console.error('Gözden geçirme kriter adım bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
            }
            else {
                $scope.Info = gelen.data;
                $rootScope.sayfayukleniyor = false;
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
                console.error('Gözden geçirme kriter adım bilgileri yüklenirken bir hata oluştu. Hata:', hata);
            });
    };

    $scope.DokumanGozdenGecirmeKriterAdimEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu === false) {
                mesajGoster('Dikkat', 'Gözden geçirme kriter adım kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                console.error('Gözden geçirme kriter adım kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
            }
            else {
                mesajGoster("İşlem tamam.", "Gözden geçirme kriter adım kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir. " + gelen.data.mesaj, "S");
            }
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
            console.error('Gözden geçirme kriter adım kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
        });
    }

}]);

