angular.module('inspinia').controller(
    'proje_plani_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog',  'srvGenel', 'srvProjePlani', 'srvProjePersonel', 'srvProjePlaniPlanIlgili', '$timeout', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjePlani, srvProjePersonel, srvProjePlaniPlanIlgili, $timeout, Ayarlarim) {
            $scope.projeID = $stateParams.projeID;
            $scope.projePlanID = $stateParams.projePlanID;
            // $scope.taskNo = $stateParams.taskNo;
            $scope.AramaKriter = {
                UST_PROJE_PLANI_ID: null,
                PROJE_PLANI_ID: $stateParams.projePlanID,
                PROJE_ID: $scope.projeID,
                LISTE: false
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                
                $scope.ProjePlaniGetData();
                
                if ($scope.projePlanID > 0) {
                    $scope.ProjePlaniSelect();
                    $scope.ProjePlaniPlanIlgiliGetData();
                }


            };

            $scope.ProjePlaniSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniSelect($scope.projePlanID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjePlani = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            

            $scope.InfoProjePlaniOnay = {
                PROJE_PLANI_ID: null,
                PROJE_ID: null,
                IS_DURUMU_ID: null
            };

            $scope.ProjePlaniOnay = function (durum) {
                $rootScope.sayfayukleniyor = true;
                $scope.InfoProjePlaniOnay.IS_DURUMU_ID = durum;
                $scope.InfoProjePlaniOnay.PROJE_ID = $scope.projeID;
                $scope.InfoProjePlaniOnay.PROJE_PLANI_ID = $scope.projePlanID;
                var promiseGet = srvProjePlani.ProjePlaniOnay($scope.InfoProjePlaniOnay);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Onaylama işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjePlaniSelect();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePlaniEkleGuncelle = function (InfoProjePlani) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePlani = true;
                if ($scope.frmProjePlani.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiProjePlani = false;
                    $rootScope.focusToInvalid($scope.frmProjePlani);
                    return;
                }
                InfoProjePlani.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjePlani.ProjePlaniEkleGuncelle(InfoProjePlani);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Plan kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.projePlanID = gelen.data.returnKayitNo;
                        $state.go('proje.projelerkayit.plan.projeplanikayit', { projePlanID: $scope.projePlanID });
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePlaniGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePlaniListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            //Proje Planı İlgili

            $scope.AramaKriterIlgili = {
                PROJE_PLANI_ID: $stateParams.projePlanID,
                PROJE_ID: $scope.projeID,
                PROJE_PERSONEL_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true

            };

            $scope.ProjePlaniPlanIlgiliGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlaniPlanIlgili.ProjePlaniPlanIlgiliGetData($scope.AramaKriterIlgili);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İlgili listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İlgili listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiProjePlanIlgili = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePlaniPlanIlgiliListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İlgili listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePlaniPlanIlgiliSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlaniPlanIlgili.ProjePlaniPlanIlgiliSil(info.PROJE_PLANI_PLAN_ILGILI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'İlgili silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('ilgili silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "İlgili silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjePlaniPlanIlgiliListesi.length == 1 && $scope.toplamKayitSayisiProjePlanIlgili > 10) {
                            $scope.AramaKriterIlgili.SayfaNo = $scope.AramaKriterIlgili.SayfaNo - 1;
                        }
                        $scope.ProjePlaniPlanIlgiliGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İlgili silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                
            };

            $scope.modalSilmeOnayiIlgili = function (InfoIlgili) {
                $scope.secilenKayit = InfoIlgili;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjePlaniPlanIlgiliSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ProjePlaniPlanIlgiliEkleGuncelle = function (InfoIlgili) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePlaniIlgili = true;
                if ($scope.frmProjeplaniplanilgili.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeplaniplanilgili);
                    return;
                }
                InfoIlgili.PROJE_ID = $scope.projeID;
                InfoIlgili.PROJE_PLANI_ID = $scope.projePlanID;
                var promiseGet = srvProjePlaniPlanIlgili.ProjePlaniPlanIlgiliEkleGuncelle(InfoIlgili, $state.projePlanID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'İlgili kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('İlgili kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "İlgili kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjePlaniPlanIlgiliGetData();
                        $scope.formCalistirildiProjePlaniIlgili = false;
                        InfoIlgili.PROJE_PERSONEL_ID = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İlgili kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            

            $scope.filtreTemizleIlgili = function () {
                $state.reload();
                $scope.AramaKriterIlgili = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PROJE_ID: $scope.projeID,
                    PROJE_PERSONEL_ADI: '',
                    PROJE_PLANI_ADI: '',
                    PROJE_PLANI_ID: $scope.projePlanID,
                    LISTE: true
                };
                $scope.ProjePlaniPlanIlgiliGetData($scope.AramaKriterIlgili);
            };

            
        }]);

