angular.module('inspinia').controller(
    'd_danismanlik_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDDanismanlik', '$controller','srvDanismanlikOrtak', 'SweetAlert',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDDanismanlik, $controller, srvDanismanlikOrtak,$SweetAlert) {
           
            $scope.AramaKriter = {
                FIRMA_ID: $stateParams.dFirmaID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 10
            };

            $scope.YeniDanismanlik = {
                DANISMANLIK_TURU: null,
                DANISMANLIK_ALAN: null,
            };

            $scope.Info = {
                D_DANISMANLIK_ALANI_ID: null,
                AKTIF: false,
                D_FIRMA_ID: $stateParams.dFirmaID
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.DDanismanlikTuruGetData();
                $scope.DDanismanlikGetData();


            }

            $scope.hizmetAc = function (danismanlikID) {
              
                $scope.$emit('hizmetAc', danismanlikID);
                
            };

            // $scope.hizmetAc = function (danismanlikID) {
            //     srvDanismanlikOrtak.setHizmetID(danismanlikID);
            //     $scope.def(danismanlikID);
                
            // }

            $scope.DDanismanlikGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlik.DDanismanlikGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DDanismanlikListesi = gelen.data.Veri;

                },
                    function (hata) {

                        mesajGoster('Dikkat', "Danismanlik listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DDanismanlikGetData Hata:', hata);
                    });

                $rootScope.sayfayukleniyor = false;
            };

            $scope.DanismanlikEkliMiKontrolEt = function (info) {
                if ($scope.DDanismanlikListesi) {

                    var list = $scope.DDanismanlikListesi;
                    for (var i = 0; i < list.length; i++) {
                        if (list[i].D_DANISMANLIK_ALANI_ID == info.D_DANISMANLIK_ALANI_ID)
                            return true;
                    }
                }

                return false;

            }

            $scope.DDanismanlikEkle = function (Info) {
                $scope.formCalistirildi = true;

                if ($scope.frmDanismanlik.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmDanismanlik);
                    return;
                }

                if ($scope.DanismanlikEkliMiKontrolEt(Info)) {
                    mesajGoster('Dikkat', "eklemeye çalıştığınız danışmanlık zaten bu firmaya ekli", 'E');
                    return;
                }

                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlik.DDanismanlikEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Hata: " + gelen.data.mesaj, 'E')
                        console.error('DDanismanlikEkleGuncelle Hata:', gelen.data.mesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Kayıt işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        $scope.DDanismanlikGetData();
                    }
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DDanismanlikEkleGuncelle Hata:', errorPl);
                    });
                $rootScope.sayfayukleniyor = false;
            };


            $scope.DDanismanlikTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlik.DDanismanlikTuruGetData();
                promiseGet.then(function (gelen) {

                    $scope.DDanismanlikTuruListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Danismanlik türleri yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DDanismanlikTuruGetData Hata:', hata);
                    });
            };

            $scope.DanismanlikTuruDegisti = function () {
                $rootScope.sayfayukleniyor = true;

                $scope.YeniDanismanlik.DANISMANLIK_ALAN = 0;

                if ($scope.DDanismanlikTuruListesi) {


                    for (var i = 0; i < $scope.DDanismanlikTuruListesi.length; i++) {

                        if ($scope.DDanismanlikTuruListesi[i].D_DANISMANLIK_TURU_ID === $scope.YeniDanismanlik.DANISMANLIK_TURU) {
                            $scope.DDanismanlikAlaniListesi = $scope.DDanismanlikTuruListesi[i].DanismanlikAlaniInfo;
                            break;
                        }
                    }

                    $rootScope.sayfayukleniyor = false;
                }
            };

            $scope.filtreTemizle = function () {
                $scope.YeniDanismanlik.DANISMANLIK_ALAN = null;
                $scope.YeniDanismanlik.DANISMANLIK_TURU = null;
            };

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.DDanismanlikSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlik.DDanismanlikSil(info.D_DANISMANLIK_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DDanismanlikGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DDanismanlikSil Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.AktifPasifOnayi = function (info) {
                var mesaj = "";

                if (info.AKTIF)
                    mesaj = "pasif";
                else
                    mesaj = "aktif";

                mesaj = info.DanismanlikAlaniInfo.ADI + " danışmanlığını " + mesaj + "'e almak istediğinizden emin misiniz?";
                $SweetAlert.swal({
                    title: "",
                    text: mesaj,
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Evet",
                    cancelButtonText: "Hayır",
                    closeOnConfirm: true,
                    closeOnCancel: true,

                }, function (value) {

                    if (value == true) {

                        $rootScope.sayfayukleniyor = true;
                        var promiseGet = srvDDanismanlik.DDanismanlikAktifPasif(info);
                        promiseGet.then(function (gelen) {
                            if (gelen.data.basariDurumu) {
                                info.AKTIF = !info.AKTIF;
                            }
                        },
                            function (hata) {
                                $rootScope.sayfayukleniyor = false;
                                mesajGoster('Dikkat', "Aktif/Pasif işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                                console.log('DDanismanlikAktifPasif Hata:', hata);
                            });
                        $rootScope.sayfayukleniyor = false;
                    }

                });
            };


            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.DDanismanlikSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

        }]);

