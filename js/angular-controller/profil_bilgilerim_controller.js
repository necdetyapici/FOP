angular.module('inspinia').controller(
'profil_bilgilerim_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'srvGenel', 'ngDialog', 'srvKullanici','srvProfilBilgileri',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, srvGenel, ngDialog, srvKullanici, srvProfilBilgileri) {

    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });

    $scope.Kullanici = { AvatarBase64: '' };

    $scope.init = function () {
        $scope.kullaniciBilgileriniYukle();
    }

    $scope.kullaniciBilgileriniYukle = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvProfilBilgileri.GetData();

        promiseGet.then(function (gelen) {
            $rootScope.sayfayukleniyor = false;
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', 'Profil bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                console.error('Profil bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
            }
            else {
                $scope.Kullanici = gelen.data;
            }
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
            console.error('Profil bilgileri yüklenirken bir hata oluştu. Hata:', hata);
        });
    }

    $scope.profilKaydet = function (Kullanici) {
        $scope.formCalistirildi = true;

        if ($scope.form.$valid) { } else { return; }
        var promiseGet = srvProfilBilgileri.ProfilKaydet(Kullanici);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu == false) {
                mesajGoster('Dikkat', "Profil bilgileri güncellme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                $log.error('Profil bilgileri güncellme işlemi sırasında bir hata oluştu.', gelen.data.sistemMesaj);
            }
            else {
                //$scope.$storage.avatar = gelen.data.returnKayitNo;
                $scope.kullaniciBilgileriniYukle();
                mesajGoster("İşlem tamam.", "Profil bilgileri güncelleme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
            }
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
            console.error('Profil bilgileri güncelleme işlemi sırasında bir hata oluştu. Hata:', hata);
        });
    }
   
    $scope.resmiTemizle = function () {
        $scope.Kullanici.AvatarBase64 = '';
    }

    $scope.modalKullaniciResmi = function () {
        $rootScope.modalInstance = $modal.open({
            templateUrl: 'views/modal_kullanici_resim.html',
            size: 'lg',
            windowClass: "animated fadeInUpBig",
            backdrop: 'static', // dışarısı tıklanınca çıkmaması için
            scope: $scope,
        });
    }



}]);