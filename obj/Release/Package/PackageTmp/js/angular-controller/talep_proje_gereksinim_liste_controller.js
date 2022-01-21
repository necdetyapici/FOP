angular.module('inspinia').controller(
'talep_proje_gereksinim_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvTalepProjeGereksinim', 'Ayarlarim',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvTalepProjeGereksinim, Ayarlarim) {
    $scope.Ayarlar = Ayarlarim;
    $scope.AramaKriter = {
        MUSTERI_ID:'',
        SayfaNo: 1,
        SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
    };
    $scope.$on('$stateChangeSuccess', function () {
        window.scrollTo(0, 0);
    });
    $scope.init = function () {
        $scope.TalepProjeGereksinimGetData();
    }

    $scope.TalepProjeGereksinimGetData = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvTalepProjeGereksinim.TalepProjeGereksinimGetData();
        promiseGet.then(function (gelen) {
            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            $scope.TalepProjeGereksinimListesi = gelen.data.Veri;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "TalepProjeGereksinim listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
            console.log('TalepProjeGereksinimGetData Hata:', hata);
        });
    };


    $scope.ignoreTurkish = function (item) {
        if (!$scope.txtArama) return true;
        var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
        var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
        return text.indexOf(search) > -1;
    };

    $scope.TalepProjeGereksinimSil = function (info) {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvTalepProjeGereksinim.TalepProjeGereksinimSil(info.TALEP_PROEJ_GEREKSINIM_ID);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu) {
                $scope.TalepProjeGereksinimGetData();
            }
            },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat',  "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                console.log('TalepProjeGereksinimSil Hata:', hata);
            });
            $rootScope.sayfayukleniyor = false;
    };

    $scope.modalSilmeOnayi = function (info) {
        $scope.secilenKayit = info;
        ngDialog.openConfirm({
            template: "views/common/modal_kayit_sil.html",
            scope: $scope
        }).then(
            function (value) {
                if ('true' == value) {
                    $scope.TalepProjeGereksinimSil($scope.secilenKayit);
                    $scope.secilenKayit = undefined;
                }
                else {
                    $scope.secilenKayit = undefined;
                    return;
                }
            }
        );
    };

}]);

