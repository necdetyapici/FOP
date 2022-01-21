angular.module('inspinia').controller(
    'proje_plani_plan_on_kosul_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjePlaniPlanOnKosul', 'Ayarlarim', 'srvProjePlani',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjePlaniPlanOnKosul, Ayarlarim, srvProjePlani) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $scope.projePlanID = $stateParams.projePlanID;
            $scope.planTaskNo = $stateParams.planTaskNo;
            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                PROJE_PLANI_ID: $scope.projePlanID,
                PROJE_PLANI_PLAN_ON_KOSUL_PROJE_PLANI_TASK_NO: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.AramaKriterProjePlanOnKosul = {
                PROJE_ID: $scope.projeID,
                PROJE_PLANI_ID: $stateParams.projePlanID,
                LISTE: false
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.ProjePlaniPlanOnKosulGetData();
                $scope.ProjePlaniGetData();
            };

            $scope.ProjePlaniPlanOnKosulGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlaniPlanOnKosul.ProjePlaniPlanOnKosulGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan ön koşul listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan ön koşul listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisiProjePlanOnKosul = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePlaniPlanOnKosulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan ön koşul listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.PROJE_PLANI_PLAN_ON_KOSUL_PROJE_PLANI_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjePlaniPlanOnKosulSil = function (InfoProjePlaniOnKosul) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlaniPlanOnKosul.ProjePlaniPlanOnKosulSil(InfoProjePlaniOnKosul.PROJE_PLANI_PLAN_ON_KOSUL_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan ön koşul silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan ön koşul silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Plan ön koşul silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjePlaniPlanOnKosulListesi.length == 1 && $scope.toplamKayitSayisiProjePlanOnKosul > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjePlaniPlanOnKosulGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan ön koşul silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjePlaniOnKosul) {
                $scope.secilenKayit = InfoProjePlaniOnKosul;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjePlaniPlanOnKosulSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ProjePlaniPlanOnKosulEkleGuncelle = function (InfoProjePlaniOnKosul) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjePlaniOnKosul = true;
                if ($scope.frmProjePlaniOnKosul.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiProjePlaniOnKosul = false;
                    $rootScope.focusToInvalid($scope.frmProjePlaniOnKosul);
                    return;
                }
                InfoProjePlaniOnKosul.PROJE_ID = $scope.projeID;
                InfoProjePlaniOnKosul.PROJE_PLANI_ID = $scope.projePlanID;
                var promiseGet = srvProjePlaniPlanOnKosul.ProjePlaniPlanOnKosulEkleGuncelle(InfoProjePlaniOnKosul);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan ön koşul kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan ön koşul kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Plan ön koşul kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjePlaniPlanOnKosulGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan ön koşul kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePlaniGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniGetData($scope.AramaKriterProjePlanOnKosul);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjePlaniListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $state.reload();
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PROJE_PLANI_PLAN_ON_KOSUL_PROJE_PLANI_ADI: '',
                    PROJE_ID: $scope.projeID,
                    PROJE_PLANI_ID: $scope.projePlanID,
                    LISTE: true
                };
                $scope.ProjePlaniPlanOnKosulGetData($scope.AramaKriter);
            };

        }]);

