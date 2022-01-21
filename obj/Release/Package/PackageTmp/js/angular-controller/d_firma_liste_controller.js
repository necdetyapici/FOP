angular.module('inspinia').controller(
    'd_firma_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDFirma', 'Ayarlarim', 'srvEntegrasyon',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDFirma, Ayarlarim, srvEntegrasyon) {

            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                FIRMA_ADI: '',
                FIRMA_EPOSTA: '',
                DURUM: 'aktif',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {

                $scope.DFirmaGetData();
            }

            $scope.DFirmaGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDFirma.DFirmaGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DFirmaListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DFirma listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DFirmaGetData Hata:', hata);
                    });
            };



            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };


            $scope.sirala = function (item) {

                $rootScope.sayfayukleniyor = true;
                if ($scope.listesirala != item) {

                    $scope.listesirala = item;
                    $scope.duzters = true;
                }
                else {
                    $scope.duzters = !$scope.duzters;
                }

                $rootScope.sayfayukleniyor = false;

            }

            $scope.DFirmaPasif = function (info) {

                if (info.DANISMANLIK_ADEDI) {
                    if (info.DANISMANLIK_ADEDI > 0) {
                        return;
                    }
                }


                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDFirma.DFirmaPasif(info.D_FIRMA_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DFirmaGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Pasif yapma işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DFirmaPasif Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.DFirmaAktif = function (info) {

                if (info.DANISMANLIK_ADEDI) {
                    if (info.DANISMANLIK_ADEDI > 0) {
                        return;
                    }
                }


                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDFirma.DFirmaAktif(info.D_FIRMA_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DFirmaGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Aktif yapma işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DFirmaAktif Hata:', hata);
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
                            $scope.DFirmaPasif($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    FIRMA_ADI: '',
                    FIRMA_EPOSTA: '',
                    DURUM: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $scope.DFirmaGetData($scope.AramaKriter);
            };

            $scope.deneme = function () {

                srvEntegrasyon.GetUserToken(1065);

            }

            $scope.deneme2 = function () {

                srvEntegrasyon.GetEntegrasyonAuth(3).then(function (gelen) {

                    let params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,addressbar=no,width=0,height=0,left=-1000,top=-1000';

                    // var url = gelen.data.URL.replace("{client_id}", window.applicationConfig.clientID);
                    // url = url.replace("{redirect_uri}", window.applicationConfig.redirectUri);
                    // url = url.replace("{scope}", window.applicationConfig.consentScopes);
                    // url = url.replace("{state}", gelen.data.Custom);

                    window.open(url, "Name", params);

                }, function (hata) {

                });



                // var a = "";



                // var url = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=" + window.applicationConfig.clientID + "&response_type=code&redirect_uri=" + window.applicationConfig.redirectUri + "&response_mode=query&scope=" + window.applicationConfig.consentScopes + "&state=12345"; 



                // msal.loginRedirect(window.applicationConfig.consentScopes);

                //var a = srvMSGraph.ConsentRequest();

                //a.then(function (gelen) {
                //    console.log(gelen);

                //}, function (hata) {
                //    console.log(hata);
                //});
            };

        }]);

