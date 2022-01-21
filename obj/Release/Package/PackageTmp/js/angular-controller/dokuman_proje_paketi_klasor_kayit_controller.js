angular.module('inspinia').controller(
    'dokuman_proje_paketi_klasor_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanProjePaketiKlasor', 'srvDokuman',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanProjePaketiKlasor, srvDokuman) {
            $scope.dokumanProjePaketiKlasorID = $stateParams.dokumanProjePaketiKlasorID;
            $scope.dokumanProjePaketiGrupID = $stateParams.dokumanProjePaketiGrupID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.dokumanProjePaketiKlasorID > 0) {
                    $scope.DokumanGetData();
                    $scope.DokumanProjePaketiKlasorDosyaGetData();
                    $scope.DokumanProjePaketiKlasorSelect();
                }
                   
            }

            $scope.DokumanProjePaketiKlasorSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorSelect($scope.dokumanProjePaketiKlasorID);

                promiseGet.then(function (gelen) {
                    $scope.InfoProjePaketiKlasor = gelen.data;
                    $scope.InfoProjePaketiKlasor.DOKUMAN = [$scope.InfoProjePaketiKlasor.DOKUMAN_ID, $scope.InfoProjePaketiKlasor.ADI];
                     
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiKlasor bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DokumanProjePaketiKlasorSelect Hata:', hata);
                    });
            }

            $scope.DokumanProjePaketiKlasorEkleGuncelle = function (InfoProjePaketiKlasor, frmPaketKlasor) {
                $scope.formCalistirildiProjePaketiKlasor = true;
                if (frmPaketKlasor.$valid) { } else {
                    $rootScope.focusToInvalid(frmPaketKlasor);
                    return;
                }
                InfoProjePaketiKlasor.DOKUMAN_PROJE_PAKETI_GRUP_ID = $scope.dokumanProjePaketiGrupID;
                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorEkleGuncelle(InfoProjePaketiKlasor);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DokumanProjePaketiKlasorEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DokumanProjePaketiKlasorEkleGuncelle Hata:', errorPl);
                    });
            }

            $scope.AramaKriterProjeKlasorDosya = {
                LISTE: false,
                DOKUMAN_KLASOR_TIPI: true,
                DOKUMAN_PROJE_PAKETI_GRUP_ID: $scope.dokumanProjePaketiGrupID

            }

            $scope.DokumanProjePaketiKlasorDosyaGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanProjePaketiKlasor.DokumanProjePaketiKlasorGetData($scope.AramaKriterProjeKlasorDosya);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DokumanProjePaketiKlasorDosyaListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanProjePaketiKlasorGetData Hata:', hata);
                    });
            };

            $scope.AramaKriterDokuman = {
                LISTE: false,
                YAYIN: false
            }
            $scope.DokumanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokuman.DokumanGetData($scope.AramaKriterDokuman);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doküman listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doküman listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DokumanProjePaketiKlasor listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DokumanProjePaketiKlasorGetData Hata:', hata);
                    });
            };

            $scope.dokumanSec = function () {
                $scope.InfoProjePaketiKlasor.ADI = $scope.InfoProjePaketiKlasor.DOKUMAN[1];
                $scope.InfoProjePaketiKlasor.DOKUMAN_ID = $scope.InfoProjePaketiKlasor.DOKUMAN[0];
            };

            $scope.tipiDegistir = function () {
                if ($scope.InfoProjePaketiKlasor.DOKUMAN_KLASOR_TIPI === true) {
                    $scope.InfoProjePaketiKlasor.ADI = null;
                    $scope.InfoProjePaketiKlasor.DOKUMAN_ID = null;
                    $scope.InfoProjePaketiKlasor.DOKUMAN = null;
                    $scope.InfoProjePaketiKlasor.UST_DOKUMAN_PROJE_PAKETI_KLASOR_ID = null;
                }
            };
        }]);

