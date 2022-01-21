angular.module('inspinia').controller(
'ik_demirbas_cinsi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkDemirbasCinsi',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkDemirbasCinsi) {
    $scope.IkDemirbasCinsiID = $stateParams.IkDemirbasCinsiID;
    $scope.kayıtTarihi = $stateParams.kayıtTarihi;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.IkDemirbasCinsiID>0)
           $scope.IkDemirbasCinsiSelect();
    }

    $scope.IkDemirbasCinsiSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvIkDemirbasCinsi.IkDemirbasCinsiSelect($scope.IkDemirbasCinsiID);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "Demirbaş Cinsi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            console.log('IkDemirbasCinsiSelect Hata:', hata);
        });
    }

    $scope.IkDemirbasCinsiEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvIkDemirbasCinsi.IkDemirbasCinsiEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                console.error('IkDemirbasCinsiEkleGuncelle Hata:', gelen.data.mesaj);
            }
            else {
                mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            }
        },
        function (errorPl) {
            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            console.error('IkDemirbasCinsiEkleGuncelle Hata:', errorPl);
        });
    }

}]);

