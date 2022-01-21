angular.module('inspinia').controller(
    'b_g_risk_tehdit_gerceklesme_sayisi_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvBGRiskTehditGerceklesmeSayisi', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvBGRiskTehditGerceklesmeSayisi, srvGenel, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.bgRiskID = $stateParams.bgRiskID;
            $scope.bgRiskNo = $stateParams.bgRiskNo;
            $scope.AramaKriter = {
                OLCME_TURU_ID: '',
                OLCME_TURU_ADI: '',
                B_G_RISK_ID: $scope.bgRiskID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.OlcmeAramaKriter = {
                LISTE: false
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.BGRiskTehditGerceklesmeSayisiGetData();
                $scope.OlcmeTuruGetData();
                $scope.BGRiskTehditGerceklesmeSayisiGetData();
            }

            $scope.BGRiskTehditGerceklesmeSayisiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRiskTehditGerceklesmeSayisi.BGRiskTehditGerceklesmeSayisiGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.lenght > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk tehdit gerçekleşme sayısı listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk tehdit gerçekleşme sayısı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.BGRiskTehditGerceklesmeSayisiListesi = gelen.data.Veri;
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
                        console.error('Risk tehdit gerçekleşme sayısı listesi yüklenirken bir hata oluştu. Hata: ', hata);

                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.BGRiskTehditGerceklesmeSayisiSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvBGRiskTehditGerceklesmeSayisi.BGRiskTehditGerceklesmeSayisiSil(info.B_G_RISK_TEHDIT_GERCEKLESME_SAYISI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Risk tehdit gerçekleşme sayısı silme işlemi sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Risk tehdit gerçekleşme sayısı silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem Tamam', "Risk tehdit gerçekleşme sayısı silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.BGRiskTehditGerceklesmeSayisiListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.BGRiskTehditGerceklesmeSayisiGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Risk tehdit gerçekleşme sayısı silme işlemi sırasında bir hata oluştu. Hata: ', hata);

                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.BGRiskTehditGerceklesmeSayisiSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };


            $scope.OlcmeTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getOlcmeTuru();
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Ölçme türü listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.mesaj);
                    } else {
                        $scope.OlcmeTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Ölçme türü listesi yüklenirkenbir hata oluştu. Hata: ', hata);
                    });
            };
            $scope.Info = {};

            $scope.BGRiskTehditGerceklesmeSayisiEkleGuncelle = function (Info, frm_bgRiskTehditGerceklesmeSayisi) {
                $scope.formCalistirildi = true;
                if (frm_bgRiskTehditGerceklesmeSayisi.$valid) { } else {
                    $rootScope.focusToInvalid(frm_bgRiskTehditGerceklesmeSayisi);
                    return;
                }
                Info.B_G_RISK_ID = $scope.bgRiskID;
                var promiseGet = srvBGRiskTehditGerceklesmeSayisi.BGRiskTehditGerceklesmeSayisiEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Bilgi güvenliği risk tehdit gerçekleşme sayısı kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.BGRiskTehditGerceklesmeSayisiGetData();
                        $scope.Info.TEHDIT_GERCEKLESME_SAYISI = null;
                        $scope.Info.TEHDIT_GERCEKLESME_TARIHI = null;
                        angular.element("#txtTEHDIT_GERCEKLESME_TARIHI")[0].value = '';
                        $scope.Info.OLCME_TURU_ID = null;
                        $scope.formCalistirildi = false;

                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Rİsk tehdit gerçekleşme sayısı kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.filtreTemizle = function () {
                $state.reload();
                $scope.AramaKriter = {
                    OLCME_TURU_ID: null,
                    OLCME_TURU_ADI: null,
                    B_G_RISK_ID: $scope.bgRiskID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $scope.BGRiskTehditGerceklesmeSayisiGetData($scope.AramaKriter);
            }


        }]);

