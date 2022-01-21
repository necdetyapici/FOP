angular.module('inspinia').controller(
    'proje_rol_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel','srvProjeMusteriTipi','srvPersonelTipi', 'srvProjeRol',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeMusteriTipi, srvPersonelTipi, srvProjeRol) {
            $scope.projeID = $stateParams.projeID;
            $scope.projeRolID = $stateParams.projeRolID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                $scope.PersonelTipiGetData();
                if ($scope.projeRolID > 0)
                    $scope.ProjeRolSelect();
            };


            $scope.ProjeRolSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRol.ProjeRolSelect($scope.projeRolID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Rol bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Rol bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjeRol = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rol bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeRolEkleGuncelle = function (InfoProjeRol) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjeRol = true;
                if ($scope.frmProjeRol.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeRol);
                    return;
                }
                InfoProjeRol.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeRol.ProjeRolEkleGuncelle(InfoProjeRol);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Rol kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Rol kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Rol kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (errorPl) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rol kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.PersonelTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvPersonelTipi.PersonelTipiGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
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

