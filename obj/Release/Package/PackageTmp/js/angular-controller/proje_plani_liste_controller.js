angular.module('inspinia').controller(
    'proje_plani_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjePlani', 'Ayarlarim', 'srvProjePlaniPlanOnKosul',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjePlani, Ayarlarim, srvProjePlaniPlanOnKosul) {
            $state.projeID = $stateParams.projeID;
            $scope.Ayarlar = Ayarlarim;


            $scope.projePlaniTaskNo = 0;
            $scope.AramaKriter = {
                UST_PROJE_PLANI_ID: null,
                PROJE_ID: $scope.projeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 50,
                TASK_NO: '',
                TASK_ADI: '',
                LISTE: true
            };

            $scope.AramaKriterOnKosul = {
                PROJE_ID: $scope.projeID,
                PROJE_PLANI_ID: '',
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {

                $scope.ProjePlaniGetData();
                //  $scope.ProjePlaniPlanIlgiliGetData();
                $scope.ProjePlaniPlanOnKosulGetData();
            };



            $scope.ProjePlaniGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W')
                        console.error('Plan listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjePlaniListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.TASK_NO).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjePlaniSil = function (InfoProjePlani) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniSil(InfoProjePlani.PROJE_PLANI_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Plan silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjePlaniListesi.length == 1 && $scope.toplamKayitSayisi > 50) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjePlaniGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayi = function (InfoProjePlani) {
                $scope.secilenKayit = InfoProjePlani;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.ProjePlaniSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };




            $scope.ProjePlaniPlanOnKosulGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlaniPlanOnKosul.ProjePlaniPlanOnKosulGetData($scope.AramaKriterOnKosul);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan ön koşul listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan ön koşul listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.ProjePlaniPlanOnKosulListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan ön koşul listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    TASK_NO: null,
                    TASK_ADI: null,
                    PROJE_ID: $scope.projeID,
                    LISTE: true
                };
                $scope.ProjePlaniGetData($scope.AramaKriter);
            };


        }]);

