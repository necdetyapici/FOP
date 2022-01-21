angular.module('inspinia').controller(
    'ik_personel_ekler_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkPersonelEkler','srvIkDosyaTipi', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkPersonelEkler, srvIkDosyaTipi, Ayarlarim) {
            $scope.ikPersonelEklerID = $stateParams.ikPersonelEklerID;
            $scope.kullaniciID = $stateParams.kullaniciID;

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false
            };
            $scope.InfoIkPersonelEkler = {
                IK_PERSONEL_EKLER_ID: null,
                KULLANICI_ID: '',
                IK_PERSONEL_EKLER_DOSYA_ADI: '',
                IK_PERSONEL_EKLER_DOSYA: '',
                IK_DOSYA_TIPI_ID: '',
                IK_PERSONEL_EKLER_DOSYA_TIPI: '',
                IK_PERSONEL_EKLER_DOSYA_BOYUT: '',
                DosyaBase64: ''
            };

            $scope.init = function () {
                $scope.IkDosyaTipiGetData();

                //if ($scope.ikPersonelEklerID > 0) {
                //    $scope.IkPersonelEklerSelect();
                //}
                $scope.handleFileSelect = function (evt) {
                    var file = evt[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_ADI = file.name;
                            $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA = evt.target.result;
                            $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_TIPI = file.type;
                            $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_BOYUT = file.size;
                        });
                    };
                    reader.readAsDataURL(file);
                };

            };



            $scope.IkDosyaTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDosyaTipi.IkDosyaTipiGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Dosya tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Dosya tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkDosyaTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dosya tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IkPersonelEklerEkleGuncelle = function (InfoIkPersonelEkler) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiPersonelEkler = true;
                if ($scope.frmIkPersonelEkler.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmIkPersonelEkler);
                    return;
                }
                if (($scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_ADI === null || $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_ADI === "") && $scope.formCalistirildiPersonelEkler === true) {
                    $rootScope.sayfayukleniyor = false;
                    return;
                }

                InfoIkPersonelEkler.KULLANICI_ID = $scope.kullaniciID;
                var promiseGet = srvIkPersonelEkler.IkPersonelEklerEkleGuncelle(InfoIkPersonelEkler);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel ekler kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel ekler kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Personel ekler kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        angular.element("#fileKaldir").trigger('click');
                        $scope.formCalistirildiPersonelEkler = false;
                        $scope.InfoIkPersonelEkler.IK_DOSYA_TIPI_ID = null;
                        $scope.eklerDokumanSifirla();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel ekler kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.eklerDokumanSifirla = function () {
                $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_ADI = null;
                $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA = null;
                $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_TIPI = null;
                $scope.InfoIkPersonelEkler.IK_PERSONEL_EKLER_DOSYA_BOYUT = null;
            };


        }]);

