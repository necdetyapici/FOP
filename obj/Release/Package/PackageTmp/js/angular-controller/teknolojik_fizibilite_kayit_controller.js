angular.module('inspinia').controller(
    'teknolojik_fizibilite_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvTeknolojikFizibilite',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvTeknolojikFizibilite) {
            $scope.teknolojikFizibiliteID = $stateParams.teknolojikFizibiliteID;

            //kayıt ekranın da istediğimiz kriterler var ise bu alanda kriterleri belirte biliriz.
            $scope.AramaKriter = {
                TEKNOLOJIK_FIZIBILITE_ADI: '',
                UST_TEKNOLOJIK_FIZIBILITE_ID: 1,
                LISTE: false
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            //sayfa ilk yüklemesini bu alanda yapmaktadır.
            $scope.init = function () {
                if ($scope.teknolojikFizibiliteID > 0)
                    $scope.TeknolojikFizibiliteSelect();
                //veri tabanından veri getirmek için init edilirken veriyi buraya yükleriz
                $scope.TeknolojikFizibiliteGetData();
            }

            $scope.TeknolojikFizibiliteSelect = function () {
                $rootScope.sayfayukleniyor = true;
                //alert($scope.teknolojikFizibiliteID);
                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteSelect($scope.teknolojikFizibiliteID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teknolojik fizibilite bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            $state.go('anasayfa');
                            mesajGoster('Dikkat', hata.data, 'I');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }               
                        console.error('Teknolojik fizibilite bilgileri yüklenirken bir hata oluştu. Hata:', hata);                       
                    });
            }

            //istediğimiz verileri aşağıki method ile çağırıyoruz.
            $scope.TeknolojikFizibiliteGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teknolojik fizibilite listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W')
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.TeknolojikFizibiliteListesi = gelen.data.Veri;
                        $rootScope.sayfayukleniyor = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.TeknolojikFizibiliteEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmTeknolojikFizibilite.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmTeknolojikFizibilite);
                    return;
                }
                var promiseGet = srvTeknolojikFizibilite.TeknolojikFizibiliteEkleGuncelle(Info);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Teknolojik fizibilite kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Teknolojik fizibilite kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                       
                    });
            }

        }]);

