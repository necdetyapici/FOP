angular.module('inspinia').controller(
'ik_unvan_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkUnvan',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkUnvan) {
    $scope.IkUnvanID = $stateParams.IkUnvanID;
    $scope.kayıtTarihi = $stateParams.kayıtTarihi;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.IkUnvanID>0)
           $scope.IkUnvanSelect();
    }

    $scope.IkUnvanSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvIkUnvan.IkUnvanSelect($scope.IkUnvanID);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "Unvan bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            console.log('IkUnvanSelect Hata:', hata);
        });
    }

    $scope.IkUnvanEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvIkUnvan.IkUnvanEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                console.error('IkUnvanEkleGuncelle Hata:', gelen.data.mesaj);
            }
            else {
                mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            }
        },
        function (errorPl) {
            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            console.error('IkUnvanEkleGuncelle Hata:', errorPl);
        });
    }

}]);

