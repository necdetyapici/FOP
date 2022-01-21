angular.module('inspinia').controller(
    'proje_tedarik_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeTedarik',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeTedarik) {
            $scope.projeID = $stateParams.projeID;
            $scope.tedarikNo = $stateParams.tedarikNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.tedarikNo > 0)
                    $scope.ProjeTedarikSelect();
            }
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.ProjeTedarikSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTedarik.ProjeTedarikSelect($scope.tedarikNo);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Tedarik bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedarik bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoTedarik = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedarik bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeTedarikEkleGuncelle = function (InfoTedarik) {
                $scope.formCalistirildiTedarik = true;
                if ($scope.frmTedarik.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmTedarik);
                    return;
                }
                var promiseGet = srvProjeTedarik.ProjeTedarikEkleGuncelle(InfoTedarik);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Tedarik kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedarik kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Tedarik kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                    $scope.formCalistirildiTedarik = false;
                    $rootScope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                    console.error('Tedarik kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                });
            }

        }]);

