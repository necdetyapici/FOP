angular.module('inspinia').controller(
    'd_firma_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel','srvDanismanlikOrtak', 'srvDFirma',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDanismanlikOrtak, srvDFirma) {
            $scope.dFirmaID = $stateParams.dFirmaID;
            $scope.Info = { AvatarBase64: '' };
            $scope.Res = { kirpilmisResim: '' };
            $scope.tab = 0;
            $scope.hizmetGizli = false;
            $scope.SonDanismanlikID = 0;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

           
            $scope.init = function () {
                $scope.ilYukle();

                if ($scope.dFirmaID > 0) {
                    $scope.DFirmaSelect();
                    $scope.tab = 1;
                }
                    
                $scope.$on("hizmetAc",function (event,params) {
                
                    $scope.hizmetGizli = true;
                    $scope.setTab(3);
                    $scope.SonDanismanlikID = params;
                    $state.go("danismanlik.firmakayit.hizmetlistesi",{danismanlik : params });

                });
    

                /*$scope.setTab($scope.tab);*/
            }

        


            $scope.modalInit = function () {

                var handleFileSelect = function (evt) {
                    var file = evt.currentTarget.files[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.resmim = evt.target.result;
                        });
                    };
                    reader.readAsDataURL(file);
                };
                angular.element(document.querySelector('#firmalogo')).on('change', handleFileSelect);


            }

            $scope.DFirmaSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDFirma.DFirmaSelect($scope.dFirmaID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                    
                    if ($scope.Info.IL) {
                        $scope.getIlce();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Firma bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DFirmaSelect Hata:', hata);
                    });
            }

            $scope.resmiTemizle = function () {
                $scope.Info.LogoBase = '';

            }

            $scope.modalLogo = function () {
                $scope.modalInstance = $modal.open({
                    templateUrl: 'views/d_firma_kayit_logo.html',
                    size: 'lg',
                    windowClass: "animated fadeInUpBig",
                    backdrop: 'static', // dışarısı tıklanınca çıkmaması için
                    scope: $scope
                });
            }

            $scope.chooseImage = function () {
                $scope.Info.LogoBase = $scope.Res.kirpilmisResim;
                $scope.modalInstance.dismiss('cancel');
            }

            $scope.chooseImageInfo = function () {
                $scope.Info.LogoBase = $scope.Res.kirpilmisResim;
                // $parent.$scope.Info.AvatarBase64 = $scope.kirpilmisResim;
                $scope.modalInstance.dismiss('cancel');
            }

            $scope.closeModal = function () {
                $scope.modalInstance.dismiss('cancel');
            }


            $scope.ResimKaldir = function (Info) {

                if (Info.LogoBase) {
                    Info.LogoBase = undefined;
                }
            }

            $scope.ilYukle = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGetIl = srvGenel.getIlIlce(0);

                promiseGetIl.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İl listesi yüklenirken bir hata ile oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İl listesi yüklenirken bir hata ile oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IlListesi = gelen.data;
                    }


                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İl listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.getIlce = function () {
                $rootScope.sayfayukleniyor = true;
                var IlId = $scope.Info.IL;

                if (IlId !== null) {
                    var promiseGetIl = srvGenel.getIlce(1, IlId);

                    promiseGetIl.then(function (gelen) {

                        $rootScope.sayfayukleniyor = false;
                        if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                            mesajGoster('Dikkat', 'İlçe listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                            console.error('İlçe listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                        } else {
                            $scope.IlceListesi = gelen.data;
                        }
                    },
                        function (hata) {
                            $rootScope.sayfayukleniyor = false;
                            mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                            console.error('İlçe listesi yüklenirken bir hata oluştu. Hata:', hata);
                        });
                }
                else {
                    $scope.IlceListesi = null;
                    $rootScope.sayfayukleniyor = false;
                }

            };

            $scope.DFirmaEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmFirma.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmFirma);
                    return;
                }

                $scope.Res.kirpilmisResim = null;
                var promiseGet = srvDFirma.DFirmaEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.\n\nHata: " + gelen.data.mesaj, 'E')
                        console.error('DFirmaEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $state.go('danismanlik.firmalistesi');
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DFirmaEkleGuncelle Hata:', errorPl);
                    });
            }

            $scope.setTab = function (tabValue) {
               
                $scope.tab = tabValue;

                if (tabValue !== 3)
                {
                    $scope.hizmetGizli = false;
                }
                // if (tabValue === 0) {
                //     if ($state.current.name.indexOf('danismanlik.firmakayit.firmakart') !== -1) {
                //         $scope.tab = 2;

                //     }
                //     if ($state.current.name.indexOf('danismanlik.firmakayit.danismanliklistesi') !== -1) {
                //         $scope.tab = 1;
                //     }

                //     if ($state.current.name.indexOf('danismanlik.firmakayit.hizmetlistesi') !== -1) {
                //         $scope.tab = 3;
                //     }
                // }

                // $scope.altTab = $state.current.data.altTab;

                // if ($scope.tab === 2 && !($scope.altTab > 1)) {
                //     $scope.altTab = 1;
                // }
                // if ($scope.tab === 3 && !($scope.altTab > 1)) {
                //     $scope.altTab = 5;
                // }
                // if ($scope.tab === 4 && !($scope.altTab > 1)) {
                //     $scope.altTab = 31;
                // }
                // if ($scope.tab === 5 && !($scope.altTab > 1)) {
                //     $scope.altTab = 20;
                // }

            };
            // $scope.setAltTab = function (altTabValue) {

            //     if ($state.current.data.altTab) {
            //         $scope.altTab = $state.current.data.altTab;
            //     }
            //     if (altTabValue > 0) {
            //         $scope.altTab = altTabValue;
            //     }
            // };
        }]);

