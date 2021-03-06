angular.module('inspinia').controller(
'ik_dosya_tipi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkDosyaTipi',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkDosyaTipi) {
    $scope.IkDosyaTipiID = $stateParams.IkDosyaTipiID;
    $scope.kayıtTarihi = $stateParams.kayıtTarihi;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.IkDosyaTipiID>0)
           $scope.IkDosyaTipiSelect();
    }

    $scope.IkDosyaTipiSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvIkDosyaTipi.IkDosyaTipiSelect($scope.IkDosyaTipiID);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "IkDosyaTipi bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            console.log('IkDosyaTipiSelect Hata:', hata);
        });
    }

    $scope.IkDosyaTipiEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvIkDosyaTipi.IkDosyaTipiEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                console.error('IkDosyaTipiEkleGuncelle Hata:', gelen.data.mesaj);
            }
            else {
                mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            }
        },
        function (errorPl) {
            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            console.error('IkDosyaTipiEkleGuncelle Hata:', errorPl);
        });
    }

}]);

