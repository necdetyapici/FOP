angular.module('inspinia').controller(
    'ik_egitim_veren_kurum_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkEgitimVerenKurum',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkEgitimVerenKurum) {
            $scope.ikEgitimVerenKurumID = $stateParams.ikEgitimVerenKurumID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.ikEgitimVerenKurumID > 0)
                    $scope.IkEgitimVerenKurumSelect();
            }
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.IkEgitimVerenKurumSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkEgitimVerenKurum.IkEgitimVerenKurumSelect($scope.ikEgitimVerenKurumID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim veren vurum bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim veren vurum bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }                       
                        console.error('Eğitim veren vurum bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkEgitimVerenKurumEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmEgitimVerenKurum.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmEgitimVerenKurum);
                    return;
                }
                var promiseGet = srvIkEgitimVerenKurum.IkEgitimVerenKurumEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Eğitim veren kurum kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Eğitim veren kurum kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Eğitim veren kurum kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Eğitim veren kurum kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

        }]);

