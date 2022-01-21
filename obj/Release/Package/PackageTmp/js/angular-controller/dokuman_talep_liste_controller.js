angular.module('inspinia').controller(
'dokuman_talep_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanTalep', 'Ayarlarim',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanTalep, Ayarlarim) {
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
        $scope.DokumanTalepGetData();
    }

    $scope.DokumanTalepGetData = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanTalep.DokumanTalepGetData();
        promiseGet.then(function (gelen) {
            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            $scope.DokumanTalepListesi = gelen.data.Veri;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "DokumanTalep listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
            console.log('DokumanTalepGetData Hata:', hata);
        });
    };


    $scope.ignoreTurkish = function (item) {
        if (!$scope.txtArama) return true;
        var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
        var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
        return text.indexOf(search) > -1;
    };

    $scope.DokumanTalepSil = function (info) {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanTalep.DokumanTalepSil(info.DOKUMAN_TALEP_ID);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu) {
                $scope.DokumanTalepGetData();
            }
            },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat',  "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                console.log('DokumanTalepSil Hata:', hata);
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
                    $scope.DokumanTalepSil($scope.secilenKayit);
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

