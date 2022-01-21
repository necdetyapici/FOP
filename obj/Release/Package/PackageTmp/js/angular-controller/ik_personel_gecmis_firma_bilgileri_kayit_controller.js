angular.module('inspinia').controller(
    'ik_personel_gecmis_firma_bilgileri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkPersonelGecmisFirmaBilgileri', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkPersonelGecmisFirmaBilgileri, Ayarlarim) {
            $scope.ikPersonelGecmisFirmaBilgileriID = $stateParams.ikPersonelGecmisFirmaBilgileriID;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.Ayarlar = Ayarlarim;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.init = function () {
                if ($scope.ikPersonelGecmisFirmaBilgileriID > 0)
                    $scope.IkPersonelGecmisFirmaBilgileriSelect();
            };

            $scope.IkPersonelGecmisFirmaBilgileriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelGecmisFirmaBilgileri.IkPersonelGecmisFirmaBilgileriSelect($scope.ikPersonelGecmisFirmaBilgileriID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel geçmiş firma bilgisi yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel geçmiş firma bilgisi yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoPersonelGecmisFirma = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel geçmiş firma bilgisi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkPersonelGecmisFirmaBilgileriEkleGuncelle = function (InfoPersonelGecmisFirma) {
                $scope.formCalistirildiPersonelGecmisFirma = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmPersonelGecmisFirmaBilgileri.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmPersonelGecmisFirmaBilgileri);
                    return;
                }

                InfoPersonelGecmisFirma.KULLANICI_ID = $scope.kullaniciID;
                var promiseGet = srvIkPersonelGecmisFirmaBilgileri.IkPersonelGecmisFirmaBilgileriEkleGuncelle(InfoPersonelGecmisFirma);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel geçmiş firma bilgileri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel geçmiş firma bilgileri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel geçmiş firma bilgileri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel geçmiş firma bilgileri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

        }]);

