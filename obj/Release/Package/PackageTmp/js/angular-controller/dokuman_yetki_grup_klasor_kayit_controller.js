angular.module('inspinia').controller(
'dokuman_yetki_grup_klasor_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanYetkiGrupKlasor',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanYetkiGrupKlasor) {
    $scope.kayitNo = $stateParams.kayitNo;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.kayitNo>0)
           $scope.DokumanYetkiGrupKlasorSelect();
    }

    $scope.DokumanYetkiGrupKlasorSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorSelect($scope.kayitNo);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "DokumanYetkiGrupKlasor bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            console.log('DokumanYetkiGrupKlasorSelect Hata:', hata);
        });
    }

    $scope.DokumanYetkiGrupKlasorEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvDokumanYetkiGrupKlasor.DokumanYetkiGrupKlasorEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                console.error('DokumanYetkiGrupKlasorEkleGuncelle Hata:', gelen.data.mesaj);
            }
            else {
                mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            }
        },
        function (errorPl) {
            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            console.error('DokumanYetkiGrupKlasorEkleGuncelle Hata:', errorPl);
        });
    }

}]);

