angular.module('inspinia').controller(
    'b_g_risk_tehdit_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvBGRiskTehdit', 'srvBGAciklik',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvBGRiskTehdit, srvBGAciklik) {
            $scope.bgRiskTehditID = $stateParams.bgRiskTehditID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriterListe = {
                LISTE: false
            };
            $scope.init = function () {
                $scope.BGAciklikGetData();
                if ($scope.bgRiskTehditID > 0)
                    $scope.BGRiskTehditSelect();
            }

            $scope.BGRiskTehditSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRiskTehdit.BGRiskTehditSelect($scope.bgRiskTehditID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk tehdit bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk tehdit bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
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
                        console.error('Bilgi güvenliği risk tehdit bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.BGRiskTehditEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmRiskTehdit.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmRiskTehdit);
                    return;
                }
                var promiseGet = srvBGRiskTehdit.BGRiskTehditEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk tehdit kayıt işleminde bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk tehdit kayıt işleminde bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Bilgi güvenliği risk tehdit kayıt işleminiz başarılı bir şekilde gerçekleşmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk tehdit kayıt işleminde bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.BGAciklikGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGAciklik.BGAciklikGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği açıklık listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği açıklık listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.BGAciklikListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği açıklık listesi yüklenirken bir hata oluştu. Hata: ', hata);

                    });
            };

        }]);

