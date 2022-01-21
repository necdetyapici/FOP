angular.module('inspinia').controller(
    'proje_surum_yonetim_stratejisi_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeSurumYonetimStratejisi', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeSurumYonetimStratejisi, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $scope.search = {};
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeSurumYonetimStratejisiGetData();
            }

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID
            };

            $scope.ProjeSurumYonetimStratejisiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurumYonetimStratejisi.ProjeSurumYonetimStratejisiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Sürüm yönetim stratejisi listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Sürüm yönetim stratejisi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                        $scope.ProjeSurumYonetimStratejisi = null;
                    } else {
                        $scope.ProjeSurumYonetimStratejisi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sürüm yönetim stratejisi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };



            $scope.ProjeSurumYonetimStratejisiSil = function (InfoSurumYonetimStratejisi) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeSurumYonetimStratejisi.ProjeSurumYonetimStratejisiSil(InfoSurumYonetimStratejisi.PROJE_SURUM_YONETIM_STRATEJISI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Sürüm yönetim stratejisi silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Sürüm yönetim stratejisi silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Sürüm yönetim stratejisi silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeSurumYonetimStratejisiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Sürüm yönetim stratejisi silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoSurumYonetimStratejisi) {
                $scope.secilenKayit = InfoSurumYonetimStratejisi;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeSurumYonetimStratejisiSil($scope.secilenKayit);
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

