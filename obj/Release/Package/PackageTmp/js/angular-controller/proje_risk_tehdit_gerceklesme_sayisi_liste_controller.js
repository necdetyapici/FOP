angular.module('inspinia').controller(
    'proje_risk_tehdit_gerceklesme_sayisi_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeRiskTehditGerceklesmeSayisi', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeRiskTehditGerceklesmeSayisi, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $scope.projeRiskID = $stateParams.projeRiskID;
            $scope.projeRiskNo = $scope.$parent.projeRiskNo;
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                PROJE_ID: $scope.projeID,
                PROJE_RISK_ID: $scope.projeRiskID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true,
                OLCME_TURU_ADI: ''
            };
            $scope.AramaKriterListe = {
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeRiskTehditGerceklesmeSayisiGetData();
                $scope.OlcmeTuruGetData();
            }

            $scope.ProjeRiskTehditGerceklesmeSayisiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRiskTehditGerceklesmeSayisi.ProjeRiskTehditGerceklesmeSayisiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk tehdit gerçekleşme sayısı listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        Console.error('Risk tehdit gerçekleşme sayısı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeRiskTehditGerceklesmeSayisiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk tehdit gerçekleşme sayısı listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeRiskTehditGerceklesmeSayisiSil = function (InfoRiskTehditGerceklesmeSayisi) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeRiskTehditGerceklesmeSayisi.ProjeRiskTehditGerceklesmeSayisiSil(InfoRiskTehditGerceklesmeSayisi.PROJE_RISK_TEHDIT_GERCEKLESME_SAYISI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk tehdit gerçekleşme sayısı silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk tehdit gerçekleşme sayısı silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "Risk tehdit gerçekleşme sayısı silme işlemi başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeRiskTehditGerceklesmeSayisiListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeRiskTehditGerceklesmeSayisiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk tehdit gerçekleşme sayısı silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoRiskTehditGerceklesmeSayisi) {
                $scope.secilenKayit = InfoRiskTehditGerceklesmeSayisi;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeRiskTehditGerceklesmeSayisiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ProjeRiskTehditGerceklesmeSayisiEkleGuncelle = function (InfoRiskTehditGerceklesmeSayisi, frm_riskTehditGerceklesmeSayisi) {
                $scope.formCalistirildiRiskTehditGerceklesmeSayisi = true;
                $rootScope.sayfayukleniyor = true;
                if (frm_riskTehditGerceklesmeSayisi.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid(frm_riskTehditGerceklesmeSayisi);
                    return;
                }

                InfoRiskTehditGerceklesmeSayisi.PROJE_RISK_ID = $scope.projeRiskID;
                InfoRiskTehditGerceklesmeSayisi.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeRiskTehditGerceklesmeSayisi.ProjeRiskTehditGerceklesmeSayisiEkleGuncelle(InfoRiskTehditGerceklesmeSayisi);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiRiskTehditGerceklesmeSayisi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Risk tehdit gerçekleşme sayısı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        //angular.element("#txtTEHDIT_GERCEKLESME_SAYISI")[0].value = null;
                        angular.element("#txtTEHDIT_GERCEKLESME_TARIHI")[0].value = null;

                        InfoRiskTehditGerceklesmeSayisi.TEHDIT_GERCEKLESME_SAYISI = null;
                        InfoRiskTehditGerceklesmeSayisi.TEHDIT_GERCEKLESME_TARIHI = null;
                        InfoRiskTehditGerceklesmeSayisi.OLCME_TURU_ID = null;
                        $scope.ProjeRiskTehditGerceklesmeSayisiGetData();
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

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    MUSTERI_ID: '',
                    PROJE_ID: $scope.projeID,
                    PROJE_RISK_ID: $scope.projeRiskID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true,
                    OLCME_TURU_ADI: null
                };
                $scope.ProjeRiskTehditGerceklesmeSayisiGetData($scope.AramaKriter);
            }

        }]);

