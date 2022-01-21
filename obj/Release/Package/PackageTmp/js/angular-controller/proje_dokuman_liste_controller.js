angular.module('inspinia').controller(
    'proje_dokuman_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeDokuman', 'srvGenel','srvProjeDokumanDosyaTipi', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeDokuman, srvGenel, srvProjeDokumanDosyaTipi, Ayarlarim) {
            $scope.projeID = $stateParams.projeID;
            $scope.Ayarlar = Ayarlarim;

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                LISTE: true,
                MUSTERI_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                DOKUMAN_ADI: '',
                PROJE_DOKUMAN_DOSYA_TIPI_ID: ''
            };

            $scope.InfoProjeDokuman = {
                PROJE_DOKUMAN_ID: null,
                PROJE_ID: '',
                DOKUMAN_ADI: '',
                DOKUMAN_DOSYA: '',
                DOKUMAN_DOSYA_TIPI: '',
                DOKUMAN_DOSYA_BOYUTU: '',
                PROEJE_DOKUMAN_DOSYA_TIPI_ID: ''
            };


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeDokumanGetData();
                $scope.ProjeDokumanDosyaTipiGetData();
                $scope.handleFileSelect = function (evt) {
                    var file = evt[0];
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        $scope.$apply(function ($scope) {
                            $scope.InfoProjeDokuman.DOKUMAN_ADI = file.name;
                            $scope.InfoProjeDokuman.DOKUMAN_DOSYA = evt.target.result;
                            $scope.InfoProjeDokuman.DOKUMAN_DOSYA_TIPI = file.type;
                            $scope.InfoProjeDokuman.DOKUMAN_DOSYA_BOYUTU = file.size;
                        });
                    };
                    reader.readAsDataURL(file);
                };
            }

            $scope.ProjeDokumanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDokuman.ProjeDokumanGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Doküman listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeDokumanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Doküman listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeDokumanSil = function (InfoProjeDokuman) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDokuman.ProjeDokumanSil(InfoProjeDokuman.PROJE_DOKUMAN_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Doküman silme işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.ProjeDokumanListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeDokumanGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Doküman silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayi = function (InfoProjeDokuman) {
                $scope.secilenKayit = InfoProjeDokuman;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeDokumanSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.ProjeDokumanEkleGuncelle = function (InfoProjeDokuman) {
                $scope.formCalistirildiProjeDokuman = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmProjeDokuman.$valid && InfoProjeDokuman.DOKUMAN_ADI.length > 0) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmProjeDokuman);
                    return;
                }
                InfoProjeDokuman.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeDokuman.ProjeDokumanEkleGuncelle(InfoProjeDokuman);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildiProjeDokuman = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Doküman kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doküman kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeDokumanGetData();
                        $scope.InfoProjeDokuman.PROJE_DOKUMAN_DOSYA_TIPI_ID = null;
                        $scope.projeDokumanSifirla();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Doküman kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }


            $scope.ProjeDokumanDosyaTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDokumanDosyaTipi.ProjeDokumanDosyaTipiGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Dosya tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Dosya tipi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.ProjeDokumanDosyaTipiListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I')
                        console.error('Dosya tipi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });

            }

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    PROJE_ID: $scope.projeID,
                    LISTE: true,
                    MUSTERI_ID: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    DOKUMAN_ADI: null,
                    PROJE_DOKUMAN_DOSYA_TIPI_ID: null
                };
                $scope.ProjeDokumanGetData($scope.AramaKriter);
            }



            $scope.ProjeDokumanGoster = function (projeDokumanID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDokuman.ProjeDokumanSelect(projeDokumanID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Proje döküman bilgileri yüklenirken bir hata oluştu. Hata:' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Proje döküman bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        $scope.RaporData = { Dosya: gelen.data.PROJE_DOKUMAN_URL, canPrint: browserCanPrint, ekUzanti: 'pdf' };
                        $rootScope.sayfayukleniyor = false;
                        $scope.modalInstanceEkGoster = $modal.open({
                            templateUrl: 'views/common/modal_rapor_pdf_viewer.html',
                            size: 'lg',
                            scope: $scope
                        });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Proje döküman bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceEkGoster.dismiss('cancel');
            };



            $scope.projeDokumanSifirla = function () {
                $scope.InfoProjeDokuman.DOKUMAN_ADI = null;
                $scope.InfoProjeDokuman.DOKUMAN_DOSYA = null;
                $scope.InfoProjeDokuman.DOKUMAN_DOSYA_TIPI = null;
                $scope.InfoProjeDokuman.DOKUMAN_DOSYA_BOYUTU = null;
            }

        }]);

