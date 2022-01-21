angular.module('inspinia').controller(
'dokuman_baslik_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanBaslik',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanBaslik) {
    $scope.kayitNo = $stateParams.kayitNo;

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.init = function () {
        if ($scope.kayitNo>0)
           $scope.DokumanBaslikSelect();
    }

    $scope.DokumanBaslikSelect = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanBaslik.DokumanBaslikSelect($scope.kayitNo);

        promiseGet.then(function (gelen) {

            $rootScope.sayfayukleniyor = false;
            if (gelen.data.basariDurumu === false) {
                mesajGoster('Dikkat', 'Doküman başlık bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                console.error('Doküman başlık bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
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
                console.error('Doküman başlik bilgileri yüklenirken bir hata oluştu. Hata:', hata);
            });
    };

    $scope.DokumanBaslikEkleGuncelle = function (Info) {
        $rootScope.sayfayukleniyor = true;
        $scope.formCalistirildi = true;
        if ($scope.form.$valid) { } else
        {
            $rootScope.focusToInvalid();
            return;
        }
        var promiseGet = srvDokumanBaslik.DokumanBaslikEkleGuncelle(Info);
        promiseGet.then(function (gelen) {
            $rootScope.sayfayukleniyor = false
            if (gelen.data.basariDurumu === false) {
                mesajGoster('Dikkat', 'Doküman başlık kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                console.error('Doküman başlık kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
            }
            else {
                mesajGoster("İşlem tamam.", "Doküman başlık kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir. " + gelen.data.mesaj, "S");
            }
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
            console.error('Doküman başlık kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
        });
    }

}]);

