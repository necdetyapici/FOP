angular.module('inspinia').controller(
    'd_danismanlik_hizmet_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvDDanismanlikHizmet','srvDanismanlikOrtak',  'Ayarlarim', 'SweetAlert',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvDDanismanlikHizmet, srvDanismanlikOrtak,  Ayarlarim, $SweetAlert) {
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                HIZMET_ADI: '',
                DANISMANLIK_ID: $stateParams.danismanlik,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };

            
            

            $scope.Info = { D_DANISMANLIK_ID: $stateParams.danismanlik };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
         /*       $scope.AramaKriter.DANISMANLIK_ID = srvDanismanlikOrtak.getHizmetID();*/
                $scope.DanismanlikGetir();

            }

            $scope.modalInit = function () {

                $scope.DanismanlikSeviyeGetir();
                $scope.DenetimTuruGetir();
                if ($scope.HizmetID > 0)
                    $scope.DDanismanlikHizmetSelect();

            }


            $scope.KayitAc = function (hizmetID) {
                $scope.Info = null;
                $scope.Info = { D_DANISMANLIK_ID: $stateParams.danismanlik };
                if (hizmetID) {
                    $scope.HizmetID = hizmetID
                }
                else {
                    $scope.HizmetID = 0;
                }

                $scope.modalInstance = $modal.open({
                    templateUrl: 'views/d_danismanlik_hizmet_kayit.html',
                    size: 'lg',
                    windowClass: "animated fadeInDownBig",
                    backdrop: 'static', // dışarısı tıklanınca çıkmaması için
                    scope: $scope,
                });
            }

            $scope.modalKapat = function () {
                $scope.modalInstance.dismiss('cancel');
            }

            $scope.DDanismanlikHizmetSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlikHizmet.DDanismanlikHizmetSelect($scope.HizmetID);

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

            $scope.DDanismanlikHizmetEkleGuncelle = function (Info, frmHizmet) {
                $scope.formCalistirildi = true;
                if (frmHizmet.$valid) { } else {
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
                        $scope.modalKapat();
                        $scope.filtreTemizle();
                    }

                    $scope.formCalistirildi = false;
                },
                    function (errorPl) {
                        mesajGoster('Dikkat', "Kayıt işlemi sırasında bir hata oluştu.Lütfen sistem yöneticisine haber veriniz.Hata: " + errorPl.data, 'W')
                        console.error('DDanismanlikHizmetEkleGuncelle Hata:', errorPl);
                        $scope.formCalistirildi = false;
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

            $scope.danismanlariGoster = function (id) {
                if ($scope.DanismanGoster) {
                    $scope.DanismanGoster = !$scope.DanismanGoster;

                    if ($scope.danismanlariGoster === true) {
                        $scope.Danismanlar = {};

                        for (var i = 0; i < DDanismanlikHizmetListesi.length; i++) {
                            if (DDanismanlikHizmetListesi[i].D_DANISMANLIK_HIZMET_ID == id) {
                                $scope.Danismanlar = DDanismanlikHizmetListesi[i].Danismanlar;
                            }
                        }

                    }
                    else {
                        $scope.Danismanlar = {};
                    }
                }
                else {
                    $scope.DanismanGoster = true;
                }
            }

            $scope.DanismanEkle = function () {

            }

            $scope.DanismanlikSeviyeGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promise = srvDDanismanlikHizmet.DDanismanlikAlaniSeviyeleriGetir($scope.Danismanlik.D_DANISMANLIK_ALANI_ID);

                promise.then(function (gelen) {
                    $scope.SeviyeListesi = gelen.data.Veri;



                }, function (hata) {


                    mesajGoster('Dikkat', "Danışmanlık seviye bilgileri yüklenirken bir hata oluştu.Hata: " + hata.data, 'W');
                    console.log('DDanismanlikAlaniSeviyeleriGetir Hata:', hata);
                });


            }

            $scope.DanismanlikGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promise = srvDDanismanlikHizmet.DanismanlikGetir($scope.AramaKriter.DANISMANLIK_ID);
                promise.then(function (gelen) {
                    $scope.Danismanlik = gelen.data;
                    $scope.DDanismanlikHizmetListesi = gelen.data.HizmetListesi;
                    $rootScope.sayfayukleniyor = false;
                }, function (hata) {
                    $rootScope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', "DDanismanlikHizmet listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                    console.log('DDanismanlikHizmetGetData Hata:', hata);
                });
            }

            $scope.DDanismanlikHizmetGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlikHizmet.DDanismanlikHizmetGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $scope.DDanismanlikHizmetListesi = gelen.data.Veri;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "DDanismanlikHizmet listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('DDanismanlikHizmetGetData Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.filtreTemizle = function () {
                $scope.AramaKriter.HIZMET_ADI = '';
                $scope.SayfaNo = 1;
                $scope.DDanismanlikHizmetGetData();

            };

            $scope.DDanismanlikHizmetSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDDanismanlikHizmet.DDanismanlikHizmetSil(info.D_DANISMANLIK_HIZMET_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        $scope.DDanismanlikHizmetGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Silme işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                        console.log('DDanismanlikHizmetSil Hata:', hata);
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
                        if ('true' == value) {
                            $scope.DDanismanlikHizmetSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.AktifPasifOnayi = function (info) {
                var mesaj = "";

                if (info.AKTIF)
                    mesaj = "pasif";
                else
                    mesaj = "aktif";

                mesaj = info.HIZMET_ADI + " hizmetini " + mesaj + "'e almak istediğinizden emin misiniz?";
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
                        var promiseGet = srvDDanismanlikHizmet.DHizmetAktifPasif(info);
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

        }]);

