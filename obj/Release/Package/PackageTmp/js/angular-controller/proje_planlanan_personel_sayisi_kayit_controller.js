angular.module('inspinia').controller(
    'proje_planlanan_personel_sayisi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog','srvPersonelTipi', 'srvGenel', 'srvProjePlanlananPersonelSayisi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvPersonelTipi, srvGenel, srvProjePlanlananPersonelSayisi) {
            $scope.projeID = $stateParams.projeID;
            $scope.projePlanlananPersonelSayisiID = $stateParams.projePlanlananPersonelSayisiID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                $scope.PersonelTipiGetData();

                if ($scope.projePlanlananPersonelSayisiID > 0)
                    $scope.ProjePlanlananPersonelSayisiSelect();
            };

            $scope.ProjePlanlananPersonelSayisiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlanlananPersonelSayisi.ProjePlanlananPersonelSayisiSelect($scope.projePlanlananPersonelSayisiID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Planlanan personel sayısı bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Planlanan personel sayısı bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjePlanlananPersonelSayisi = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Planlanan personel sayısı bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePlanlananPersonelSayisiEkleGuncelle = function (InfoProjePlanlananPersonelSayisi) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePlanlananPersonelSayisi = true;
                if ($scope.frmProjePlanlananPersonelSayisi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjePlanlananPersonelSayisi);
                    return;
                }
                InfoProjePlanlananPersonelSayisi.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjePlanlananPersonelSayisi.ProjePlanlananPersonelSayisiEkleGuncelle(InfoProjePlanlananPersonelSayisi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Planlanan personel sayısı kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Planlanan personel sayısı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Planlanan personel sayısı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Planlanan personel sayısı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.PersonelTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvPersonelTipi.PersonelTipiGetData();

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel tipi listesi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.PersonelTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

