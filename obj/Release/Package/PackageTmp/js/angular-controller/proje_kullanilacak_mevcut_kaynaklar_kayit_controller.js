angular.module('inspinia').controller(
    'proje_kullanilacak_mevcut_kaynaklar_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeKullanilacakMevcutKaynaklar',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeKullanilacakMevcutKaynaklar) {
            $scope.projeID = $stateParams.projeID;
            $scope.kullanilacakmevcutkaynaklarNo = $stateParams.kullanilacakmevcutkaynaklarNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {

                LISTE: false
            };
            $scope.init = function () {
                if ($scope.kullanilacakmevcutkaynaklarNo > 0)
                    $scope.ProjeKullanilacakMevcutKaynaklarSelect();
            }

            $scope.ProjeKullanilacakMevcutKaynaklarSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeKullanilacakMevcutKaynaklar.ProjeKullanilacakMevcutKaynaklarSelect($scope.kullanilacakmevcutkaynaklarNo);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kullanılacak mevcut kaynak bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Kullanılacak mevcut kaynak bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjeKullanilacakMevcutKaynaklar = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanılacak mevcut kaynak bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeKullanilacakMevcutKaynaklarEkleGuncelle = function (InfoProjeKullanilacakMevcutKaynaklar) {
                $scope.formCalistirildiKullanilacakMevcutKaynaklar = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeKullanilacakMevcutKaynaklar.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeKullanilacakMevcutKaynaklar);
                    return;
                }

                var promiseGet = srvProjeKullanilacakMevcutKaynaklar.ProjeKullanilacakMevcutKaynaklarEkleGuncelle(InfoProjeKullanilacakMevcutKaynaklar);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kullanılacak mevcut kaynak kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Kullanılacak mevcut kaynak kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Kullanılacak mevcut kaynak kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');

                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Kullanılacak mevcut kaynak kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

           

        }]);

