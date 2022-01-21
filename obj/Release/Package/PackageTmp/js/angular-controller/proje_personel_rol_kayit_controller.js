angular.module('inspinia').controller(
    'proje_personel_rol_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel','srvPersonelTipi', 'srvProjePersonelRol', 'srvProjePersonel','srvPersonelTipi', 'srvProjeRol',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvPersonelTipi, srvProjePersonelRol, srvProjePersonel, srvPersonelTipi, srvProjeRol) {
            $scope.projeID = $stateParams.projeID;
            $scope.projePersonelRolID = $stateParams.projePersonelRolID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };

            $scope.init = function () {
                //$scope.ProjePersonelGetData();
                $scope.ProjeRolGetData();
                if ($scope.projePersonelRolID > 0)
                    $scope.ProjePersonelRolSelect();
            };

            $scope.ProjePersonelRolSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePersonelRol.ProjePersonelRolSelect($scope.projePersonelRolID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel rol bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel rol bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjePersonelRol = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel rol bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePersonelRolEkleGuncelle = function (InfoProjePersonelRol) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePersonelRol = true;
                if ($scope.frmProjePersonelRol.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjePersonelRol);
                    return;
                }
                InfoProjePersonelRol.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjePersonelRol.ProjePersonelRolEkleGuncelle(InfoProjePersonelRol);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel rol kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel rol kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel rol kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel rol kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeRolGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRol.ProjeRolGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Rol listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Rol listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisiProjeRol = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeRolListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rol listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


        }]);

