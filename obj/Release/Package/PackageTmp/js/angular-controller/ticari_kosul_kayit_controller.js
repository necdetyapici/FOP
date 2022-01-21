angular.module('inspinia').controller(
'ticari_kosul_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTicariKosul',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTicariKosul) {
    $scope.TicariKosulID = $stateParams.TicariKosulID;
    $scope.kayıtTarihi = $stateParams.kayıtTarihi;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.TicariKosulID>0)
           $scope.TicariKosulSelect();
    }

    $scope.TicariKosulSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvTicariKosul.TicariKosulSelect($scope.TicariKosulID);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "Ticari Koşul bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            console.log('TicariKosulSelect Hata:', hata);
        });
    }

    $scope.TicariKosulEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvTicariKosul.TicariKosulEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                console.error('TicariKosulEkleGuncelle Hata:', gelen.data.mesaj);
            }
            else {
                mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            }
        },
        function (errorPl) {
            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            console.error('TicariKosulEkleGuncelle Hata:', errorPl);
        });
    }

}]);

