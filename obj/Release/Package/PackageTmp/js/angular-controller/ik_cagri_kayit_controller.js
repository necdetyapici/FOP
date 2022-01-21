angular.module('inspinia').controller(
    'ik_cagri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvKullanici', 'srvIkCagri', 'SweetAlert',  'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvKullanici, srvIkCagri, $SweetAlert, Ayarlarim) {
            $scope.ikCagriID = $stateParams.ikCagriID;
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $scope.$storage.KULLANICI_ID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.AramaKriter = {
                LISTE: false,
                FILTER: true
            };
            $scope.AramaKriterListePersonelCagri = {
                //IK_CAGRI_HIZMETI_ID: $scope.ikEtkinlikID,
                KULLANICI_AD_SOYAD: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: false,
                FILTER: false
            };
            $scope.init = function () {
                $scope.KullaniciListesiniGetir();

                if ($scope.ikCagriID > 0)
                    $scope.IkCagriSelect();
                else
                    $scope.cagriAcanKullaniciAdiSoyadi = $scope.$storage.AD_SOYAD;

            }

            $scope.IkCagriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkCagri.IkCagriSelect($scope.ikCagriID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Çağrı bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Çağrı bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
                        $scope.cagriAcanKullaniciAdiSoyadi = gelen.data.CAGRI_ACAN_KULLANICI_AD_SOYAD;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status == 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        } else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Çağrı bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkCagriEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                if ($scope.frmCagri.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmCagri);
                    return;
                }
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkCagri.IkCagriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Çağrı kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Çağrı kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem Tamam", "Çağrı kayıt işleminiz başarılı bir şekilde gerçekleştirlmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $scope.formCalistirildi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Çağrı kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.KullaniciListesiniGetir = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvKullanici.KullaniciGetData($scope.AramaKriterListePersonelCagri);

                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = pl.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Kullanıcı listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.KullaniciListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Kullanıcı listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkCagriOnaylama = function (InfoCagriOnay) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkCagri.IkCagriOnaylama(InfoCagriOnay);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Çağrı onaylama işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Çağrı onaylama işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem Tamam", "Çağrı onaylama işleminiz başarılı bir şekilde gerçekleştirlmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $scope.formCalistirildi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Çağrı onaylama işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            }

            $scope.cagriDurumAlert = function (InfoOnaylama) {

                $SweetAlert.swal({
                    title: "Çağrınız gizlensin mi mi?",
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Evet",
                    cancelButtonText: "Hayır",
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                    function (isConfirm) {
                        if (isConfirm) {
                            $SweetAlert.swal({
                                title: "Çağrınız gizli duruma getirilmiştir.",
                                text: " Artık çağrınızı sadece siz, yöneticiniz, PICT Yöneticisi ve Kurum yöneticiniz görebilecek.",
                                type: "success",
                            }, function () {
                                InfoOnaylama.CAGRI_DURUM = true;
                                $scope.IkCagriOnaylama(InfoOnaylama);
                            });

                        } else {
                            $SweetAlert.swal({
                                title: "Çağrınız gizlenmedi",
                                text: "Çağrınızı görme yetkisi olan herkes tarafından görünür duruma getirilmiştir.",
                                type: "error",
                            }, function () {
                                InfoOnaylama.CAGRI_DURUM = false;
                                $scope.IkCagriOnaylama(InfoOnaylama);
                            });

                        }
                    });


            };


        }]);

