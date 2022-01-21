angular.module('inspinia').controller(
'toplanti_gundem_talep_proje_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvToplantiGundemTalepProje', 'Ayarlarim',
function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvToplantiGundemTalepProje, Ayarlarim) {
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
        $scope.ToplantiGundemTalepProjeGetData();
    }

    $scope.ToplantiGundemTalepProjeGetData = function () {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvToplantiGundemTalepProje.ToplantiGundemTalepProjeGetData();
        promiseGet.then(function (gelen) {
            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
            $scope.ToplantiGundemTalepProjeListesi = gelen.data.Veri;
            $rootScope.sayfayukleniyor = false;
        },
        function (hata) {
            $rootScope.sayfayukleniyor = false;
            mesajGoster('Dikkat', "ToplantiGundemTalepProje listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
            console.log('ToplantiGundemTalepProjeGetData Hata:', hata);
        });
    };


    $scope.ignoreTurkish = function (item) {
        if (!$scope.txtArama) return true;
        var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
        var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
        return text.indexOf(search) > -1;
    };

    $scope.ToplantiGundemTalepProjeSil = function (info) {
        $rootScope.sayfayukleniyor = true;
        var promiseGet = srvToplantiGundemTalepProje.ToplantiGundemTalepProjeSil(info.TOPLANTI_GUNDEM_TALEP_PROJE_ID);
        promiseGet.then(function (gelen) {
            if (gelen.data.basariDurumu) {
                $scope.ToplantiGundemTalepProjeGetData();
            }
            },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat',  "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                console.log('ToplantiGundemTalepProjeSil Hata:', hata);
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
                    $scope.ToplantiGundemTalepProjeSil($scope.secilenKayit);
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

