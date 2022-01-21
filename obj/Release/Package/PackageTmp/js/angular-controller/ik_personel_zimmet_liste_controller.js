angular.module('inspinia').controller(
    'ik_personel_zimmet_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvRaporlar', 'srvIkZimmet', 'Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvRaporlar, srvIkZimmet, Constants, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.dokumanFormTipi = Constants.DOKUMAN_FORM_TIPI;
            $scope.AramaKriter = {
                IK_DEMIRBAS_ID: '',
                MUSTERI_ID: '',
                KULLANICI_ID: $scope.kullaniciID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                IK_DEMIRBAS_MARKA_ADI: '',
                IK_DEMIRBAS_MODEL_ADI: '',
                IK_DEMIRBAS_SERI_NO: '',
                IK_ZIMMET_TESLIM_ALAN_KISI_ADI: '',
                IK_ZIMMET_TESLIM_EDEN_KISI_ADI: '',
                LISTE: true
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkZimmetPersonelGetData();
            };

            $scope.IkZimmetPersonelGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkZimmet.IkZimmetGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', "Personel zimmet listesi yüklenirken bir hata oluştu." + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel zimmet listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkZimmetPersonelListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel zimmet listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IK_DEMIRBAS_MARKA_ADI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };



            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    IK_DEMIRBAS_ID: '',
                    MUSTERI_ID: '',
                    KULLANICI_ID: $scope.kullaniciID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    IK_DEMIRBAS_MARKA_ADI: null,
                    IK_DEMIRBAS_MODEL_ADI: null,
                    IK_DEMIRBAS_SERI_NO: null,
                    IK_ZIMMET_PERSONEL_TESLIM_ALAN_KISI_ADI: null,
                    IK_ZIMMET_PERSONEL_TESLIM_EDEN_KISI_ADI: null,
                    LISTE: true
                };
                $scope.IkZimmetPersonelGetData($scope.AramaKriter);
            };

            $scope.ZimmetFormuYazdir = function (id, formTipi) {
                $scope.Kriter = {
                    ID: id,
                    DOKUMAN_FORM_TIPI : formTipi
                };
                $scope.modalGoster($scope.Kriter);
            };

            $scope.modalGoster = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = null;
                promiseGet = srvIkZimmet.ZimmetFormu(Kriter);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        if (Kriter === undefined) {
                            Kriter = $scope.AramaKriter;
                        }
                        $scope.RaporData = { Dosya: gelen.data.FORM_ON_IZLEME, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf' };
                        $scope.modalInstance = $modal.open({
                            templateUrl: 'views/common/modal_dokuman_viewer.html',
                            controller: 'ik_personel_zimmet_liste_controller',
                            size: 'lg',
                            scope: $scope
                        });
                    }
                    else
                        mesajGoster('Dikkat', gelen.data.mesaj, 'E');

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        basvuruMesajGoster('Dikkat', Kriter.belge + " yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log(Kriter.belge + 'Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstance.dismiss('cancel');
            };

            $scope.tinymceOptions = {

                language: 'tr_TR',
                theme: 'modern',
                plugins: 'print fullpage noneditable',

                noneditable_leave_contenteditable: true,
                menubar: "file",
                toolbar: false,

                removed_menuitems: 'newdocument',
                content_css: [
                    '../css/tinymce/fontgoogleapisLato300300i400400i.css',
                    '../css/tinymce/codeopen.css'
                ],
                height: '842',

                setup: function (editor) {

                    editor.on("init", function () {
                        $('.mce-edit-area').css({ "width": "21cm", "margin": "auto", "background-color": "gray" });
                    });
                    editor.on("focus", function () {
                        tinymce.activeEditor.getBody().setAttribute('contenteditable', false);
                    });
                }
            };

            
        }]);

