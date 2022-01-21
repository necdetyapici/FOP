angular.module('inspinia').controller(
    'proje_teknolojik_fizibilite_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeTeknolojikFizibilite', 'Ayarlarim', 'srvTeknolojikFizibilite',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeTeknolojikFizibilite, Ayarlarim, srvTeknolojikFizibilite) {
            $scope.Ayarlar = Ayarlarim;

            $scope.projeID = $stateParams.projeID;
            $scope.teknolojikFizibiliteNo = $stateParams.teknolojikFizibiliteNo;
           // $scope.PROJE_ID = $stateParams.kayitNo;

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: false
            };
            $scope.search = {};
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeTeknolojikFizibiliteGetData();
            };

            

            $scope.ProjeTeknolojikFizibiliteGetData = function () {

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTeknolojikFizibilite.ProjeTeknolojikFizibiliteGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Teknololojik fizibilite listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        if (gelen.data.length === 0) {
                            $scope.TeknolojikFizibiliteGetData();
                        }
                        else {
                            $scope.ProjeTeknolojikFizibiliteListesi = gelen.data;
                        }
                    }
                    
                    
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.TEKNOLOJIK_FIZIBILITE_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeTeknolojikFizibiliteSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTeknolojikFizibilite.ProjeTeknolojikFizibiliteSil(info.PROJE_TEKNOLOJIK_FIZIBILITE_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Teknolojik fiziblite silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Teknolojik fizibilite silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeTeknolojikFizibiliteGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                        if ('true' === value) {
                            $scope.ProjeTeknolojikFizibiliteSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                    );
            };

            $scope.TeknolojikFizibiliteGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Teknoloji fiziiblite listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                       
                        $scope.ProjeTeknolojikFizibiliteListesi  = gelen.data.Veri; // ilk yayıtta teknolojik fizibiliteden veriler çekilecek kayıt işleminden sonra proje teknolojik fizibiliteden veriler çeklilecek.
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.Info = {};
            $scope.ProjeTeknolojikFizibiliteEkleGuncelle = function (InfoProjeTeknolojikFizibilite) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiProjeTeknolojikFiziblite = true;
                $scope.Info.InfoProjeTeknolojikFizibilite = InfoProjeTeknolojikFizibilite;
                $scope.Info.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeTeknolojikFizibilite.ProjeTeknolojikFizibiliteEkleGuncelle($scope.Info);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Teknolojik fizibilite kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        //$state.reload();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };


        }]);

