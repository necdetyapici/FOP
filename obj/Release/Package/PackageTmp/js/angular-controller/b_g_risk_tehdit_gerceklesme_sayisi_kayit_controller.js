angular.module('inspinia').controller(
    'b_g_risk_tehdit_gerceklesme_sayisi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvBGRiskTehditGerceklesmeSayisi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvBGRiskTehditGerceklesmeSayisi) {
            $scope.bgRiskTehditGerceklesmeSayisiID = $stateParams.bgRiskTehditGerceklesmeSayisiID;
            $scope.bgRiskID = $stateParams.bgRiskID;
            $scope.bgRiskNo = $stateParams.bgRiskNo;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.OlcmeAramaKriter = {
                LISTE: false
            };

            $scope.init = function () {
                if ($scope.bgRiskTehditGerceklesmeSayisiID > 0)
                    $scope.BGRiskTehditGerceklesmeSayisiSelect();
            }

            $scope.BGRiskTehditGerceklesmeSayisiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRiskTehditGerceklesmeSayisi.BGRiskTehditGerceklesmeSayisiSelect($scope.bgRiskTehditGerceklesmeSayisiID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt bilgileri yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
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
                        console.error('Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.BGRiskTehditGerceklesmeSayisiEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmBGRiskTehditGerceklesmeSayisi.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmBGRiskTehditGerceklesmeSayisi);
                    return;
                }
                var promiseGet = srvBGRiskTehditGerceklesmeSayisi.BGRiskTehditGerceklesmeSayisiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem Tamam", "Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.OlcmeTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getOlcmeTuru();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Ölçme türü listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Ölçme türü listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].mesaj);
                    } else {
                        $scope.OlcmeTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Ölçme türü listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

        }]);

