angular.module('inspinia').controller(
    'dokuman_revizyon_karsilastir_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDokumanBaslik',  'Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDokumanBaslik, Constants, Ayarlarim) {
            $scope.dokumanID = $stateParams.dokumanID;
            $scope.kaynakRev = $stateParams.kaynakRev;
            $scope.hedefRev = $stateParams.hedefRev;

            $scope.Ayarlar = Ayarlarim;
            $scope.dokumanCinsi = Constants.DOKUMAN_CINSI;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.InfoDokumanKarsilastirma = {
                KAYNAK_ACIKLAMA: '',
                HEDEF_ACIKLAMA: ''
            };
            $scope.init = function () {
                $scope.DokumanRevizyonKarsilastirGetData();
            };

            $scope.AramaKriter = {
                DOKUMAN_ID: $scope.dokumanID,
                KAYNAK_REV: $scope.kaynakRev,
                HEDEF_REV: $scope.hedefRev
            };

            $scope.DokumanRevizyonKarsilastirGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanBaslik.DokumanRevizyonKarsilastirGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $scope.InfoDokumanKarsilastirma = gelen.data;
                    document.getElementById('kaynakonizleme').innerHTML = $scope.InfoDokumanKarsilastirma.KAYNAK_ACIKLAMA;
                    document.getElementById('hedefonizleme').innerHTML = $scope.InfoDokumanKarsilastirma.HEDEF_ACIKLAMA;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doküman revizyon listesi yüklenirken bir hata oluştu.Hata:', hata);
                    });
            };

           

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };
        }]);

