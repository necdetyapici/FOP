angular.module('inspinia').controller(
'dokuman_proje_paketi_klasor_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanProjePaketiKlasor', 'Ayarlarim',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanProjePaketiKlasor, Ayarlarim) {
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
        $scope.DokumanProjePaketiKlasorGetData();
    }

    $scope.DokumanProjePaketiKlasorGetData = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorGetData();
        promiseGet.then(function (gelen) {
            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            $scope.DokumanProjePaketiKlasorListesi = gelen.data.Veri;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "DokumanProjePaketiKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
            console.log('DokumanProjePaketiKlasorGetData Hata:', hata);
        });
    };


    $scope.ignoreTurkish = function (item) {
        if (!$scope.txtArama) return true;
        var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
        var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
        return text.indexOf(search) > -1;
    };

    $scope.DokumanProjePaketiKlasorSil = function (info) {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorSil(info.DOKUMAN_PROJE_PAKETI_KLASOR_ID);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu) {
                $scope.DokumanProjePaketiKlasorGetData();
            }
            },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat',  "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                console.log('DokumanProjePaketiKlasorSil Hata:', hata);
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
                    $scope.DokumanProjePaketiKlasorSil($scope.secilenKayit);
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

