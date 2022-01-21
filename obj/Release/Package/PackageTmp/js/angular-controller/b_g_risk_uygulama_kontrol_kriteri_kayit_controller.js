angular.module('inspinia').controller(
    'b_g_risk_uygulama_kontrol_kriteri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvBGRiskUygulamaKontrolKriteri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvBGRiskUygulamaKontrolKriteri) {
            $scope.kayitNo = $stateParams.kayitNo;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.kayitNo > 0)
                    $scope.BGRiskUygulamaKontrolKriteriSelect();
            }

            $scope.BGRiskUygulamaKontrolKriteriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRiskUygulamaKontrolKriteri.BGRiskUygulamaKontrolKriteriSelect($scope.kayitNo);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk uygulama kontrol kriteri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
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
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.BGRiskUygulamaKontrolKriteriEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frm_bgRiskUygulamaKontrolKriteri.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frm_bgRiskUygulamaKontrolKriteri);
                    return;
                }
                var promiseGet = srvBGRiskUygulamaKontrolKriteri.BGRiskUygulamaKontrolKriteriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Bilgi güvenliği risk uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Bilgi güvenliği risk uygulama kontrol kriteri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $scope.formCalistirildi = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bilgi güvenliği risk uygulama kontrol kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

        }]);

