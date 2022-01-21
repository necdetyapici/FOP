angular.module('inspinia').controller(
    'proje_risk_tehdit_gerceklesme_sayisi_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeRiskTehditGerceklesmeSayisi',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeRiskTehditGerceklesmeSayisi) {
            $scope.projeRiskTehditGerceklesmeSayisiID = $stateParams.projeRiskTehditGerceklesmeSayisiID;
            $scope.projeID = $stateParams.projeID;
            $scope.projeRiskID = $stateParams.projeRiskID;
            $scope.projeRiskNo = $scope.$parent.projeRiskNo;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriterListe = {
                LISTE: false
            };
            $scope.init = function () {
                $scope.OlcmeTuruGetData();
                if ($scope.projeRiskTehditGerceklesmeSayisiID > 0)
                    $scope.ProjeRiskTehditGerceklesmeSayisiSelect();
            }

            $scope.ProjeRiskTehditGerceklesmeSayisiSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRiskTehditGerceklesmeSayisi.ProjeRiskTehditGerceklesmeSayisiSelect($scope.projeRiskTehditGerceklesmeSayisiID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk tehdit gerçekleşme sayısı bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk tehdit gerçekleşme sayısı bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.InfoRiskTehditGerceklesmeSayisi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk tehdit gerçekleşme sayısı bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ProjeRiskTehditGerceklesmeSayisiEkleGuncelle = function (InfoRiskTehditGerceklesmeSayisi) {
                $scope.formCalistirildiRiskTehditGerceklesmeSayisi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frm_riskTehditGerceklesmeSayisi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frm_riskTehditGerceklesmeSayisi);
                    return;
                }
                InfoRiskTehditGerceklesmeSayisi.PROJE_RISK_ID = $scope.projeRiskID;
                InfoRiskTehditGerceklesmeSayisi.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeRiskTehditGerceklesmeSayisi.ProjeRiskTehditGerceklesmeSayisiEkleGuncelle(InfoRiskTehditGerceklesmeSayisi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiRiskTehditGerceklesmeSayisi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Risk tehdit gerçekleşme sayısı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        $scope.formCalistirildiRiskTehditGerceklesmeSayisi = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.OlcmeTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getOlcmeTuru();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Ölçme türü listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Ölçme türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
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

