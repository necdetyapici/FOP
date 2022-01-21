angular.module('inspinia').controller(
'dokuman_yetki_grup_kullanici_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanYetkiGrupKullanici',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanYetkiGrupKullanici) {
    $scope.kayitNo = $stateParams.kayitNo;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.kayitNo>0)
           $scope.DokumanYetkiGrupKullaniciSelect();
    }

    $scope.DokumanYetkiGrupKullaniciSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanYetkiGrupKullanici.DokumanYetkiGrupKullaniciSelect($scope.kayitNo);

        promiseGet.then(function (gelen) {
            $scope.Info = gelen.data;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "DokumanYetkiGrupKullanici bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
            console.log('DokumanYetkiGrupKullaniciSelect Hata:', hata);
        });
    }

    $scope.DokumanYetkiGrupKullaniciEkleGuncelle = function (Info) {
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvDokumanYetkiGrupKullanici.DokumanYetkiGrupKullaniciEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                console.error('DokumanYetkiGrupKullaniciEkleGuncelle Hata:', gelen.data.mesaj);
            }
            else {
                mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
            }
        },
        function (errorPl) {
            mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
            console.error('DokumanYetkiGrupKullaniciEkleGuncelle Hata:', errorPl);
        });
    }

}]);

