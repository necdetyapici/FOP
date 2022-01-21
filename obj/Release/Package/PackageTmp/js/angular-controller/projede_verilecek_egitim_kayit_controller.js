angular.module('inspinia').controller(
    'projede_verilecek_egitim_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjedeVerilecekEgitim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjedeVerilecekEgitim) {
            $scope.projeID = $stateParams.projeID;
            $scope.verilecekEgitimNo = $stateParams.verilecekEgitimNo;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.verilecekEgitimNo > 0)
                    $scope.ProjedeVerilecekEgitimSelect();
            }
            $scope.AramaKriter = {

                LISTE: false
            };

            $scope.ProjedeVerilecekEgitimSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjedeVerilecekEgitim.ProjedeVerilecekEgitimSelect($scope.verilecekEgitimNo);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Projede verilecek eğitim bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Projede verilecek eğitim bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoProjedeVerilecekEgitim = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Projede verilecek eğitim bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjedeVerilecekEgitimEkleGuncelle = function (InfoProjedeVerilecekEgitim) {
                $scope.formCalistirildiProjedeVerilecekEgitim = true;
                if ($scope.frmProjedeVerilecekEgitim.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjedeVerilecekEgitim);
                    return;
                }
                var promiseGet = srvProjedeVerilecekEgitim.ProjedeVerilecekEgitimEkleGuncelle(InfoProjedeVerilecekEgitim);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjedeVerilecekEgitim = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Projede verilecek eğitim kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Projede verilecek eğitim kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Projede verilecek eğitim kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $scope.formCalistirildiProjedeVerilecekEgitim = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Projede verilecek eğitim kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

        }]);

