angular.module('inspinia').controller(
    'd_danismanlik_hizmet_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel) {
           
            $scope.dHizmetID = $stateParams.dHizmetID;
            $scope.Info = { D_DANISMANLIK_ID : 0 };


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.DanismanlikID = srvDDanismanlikHizmet.DanismanlikID;
                $scope.DanismanlikAlanID = srvDDanismanlikHizmet.DanismanlikAlanID;
                $scope.Info.D_DANISMANLIK_ID = $scope.DanismanlikID;

                $scope.DanismanlikSeviyeGetir();
                $scope.DenetimTuruGetir();

                if ($scope.dHizmetID > 0)
                    $scope.DDanismanlikHizmetSelect();
            }

            $scope.DDanismanlikHizmetSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlikHizmet.DDanismanlikHizmetSelect($scope.dHizmetID);

                promiseGet.then(function (gelen) {
                    $scope.Info = gelen.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DDanismanlikHizmet bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                        console.log('DDanismanlikHizmetSelect Hata:', hata);
                    });
            }

            $scope.DenetimTuruGetir = function () {
                $rootScope.sayfayukleniyor = true;
                srvDDanismanlikHizmet.DDenetimTuruGetir().then(function (gelen) {
                   
                    $scope.DenetimTurleri = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                }, function (hata) {
                    $rootScope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', "Denetim türü bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                    console.log('DDenetimTuru Hata:', hata);
                });
            }

            $scope.DanismanlikSeviyeGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promise = srvDDanismanlikHizmet.DDanismanlikAlaniSeviyeleriGetir($scope.DanismanlikAlanID);
                
                promise.then(function (gelen) {
                    $scope.SeviyeListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;


                }, function (hata) {

                    $rootScope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', "Danışmanlık seviye bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                    console.log('DDanismanlikAlaniSeviyeleriGetir Hata:', hata);
                });

          
            }            

            $scope.DDanismanlikHizmetEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmHizmet.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                var promiseGet = srvDDanismanlikHizmet.DDanismanlikHizmetEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DDanismanlikHizmetEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DDanismanlikHizmetEkleGuncelle Hata:', errorPl);
                    });
            }

        }]);

