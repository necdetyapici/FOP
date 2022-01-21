angular.module('inspinia').controller(
    'ik_is_basvurulari_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvIkIsBasvurulari', 'srvIkIsBasvurulariGorusmeler', 'srvIkIsBasvurulariGorusmelerEkler','srvIkDepartman','Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvIkIsBasvurulari, srvIkIsBasvurulariGorusmeler, srvIkIsBasvurulariGorusmelerEkler, srvIkDepartman, Ayarlarim) {
            $scope.ikIsBasvurulariID = $stateParams.ikIsBasvurulariID;
            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriterIsbasvurulari = {
                IK_IS_BASVURULARI_ID: $scope.ikIsBasvurulariID,
                IK_IS_BASVURULARI_GORUSME_TARIHI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: false
            };
            $scope.AramaKriterListeIsbasvurulari = {
                IK_IS_BASVURULARI_ID: $scope.ikIsBasvurulariID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.AramaKriterIsbasvurulariGorusmeEkler = {
                IK_IS_BASVURULARI_ID: $scope.ikIsBasvurulariID,
                IK_IS_BASVURU_GORUSMELER_DOSYA_ADI: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };

            $scope.InfoIsBasvurusuGorusmelerEkler = {
                IK_IK_IS_BASVURULARI_GORUSMELER_EKLER_ID: null,
                IK_DOSYA_TIPI_ID: '',
                IK_IS_BASVURULARI_ID: '',
                IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_ADI: '',
                IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_BOYUTU: '',
                IK_IS_BASVURULARI_GORUSMELER_EKLER_DOSYA: '',
                IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_TIPI: '',
                DosyaBase64: ''
            };

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.IkDepartmanGetData();
                $scope.IsBasvurulariDurumTipiGetData();
                $scope.IkIsBasvurulariGorusmelerGetData();
                $scope.IkDosyaTipiGetData();
                $scope.IkIsBasvurulariGorusmelerEklerGetData();
                if ($scope.ikIsBasvurulariID > 0) {
                    $scope.IkIsBasvurulariSelect();
                    $scope.handleFileSelect = function (evt) {
                        var file = evt[0];
                        var reader = new FileReader();
                        reader.onload = function (evt) {
                            $scope.$apply(function ($scope) {
                                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_ADI = file.name;
                                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_BOYUTU = file.size;
                                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_TIPI = file.type;
                                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURULARI_GORUSMELER_EKLER_DOSYA = evt.target.result;
                            });
                        };
                        reader.readAsDataURL(file);
                    };
                    
                }
            }

            $scope.IkIsBasvurulariSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulari.IkIsBasvurulariSelect($scope.ikIsBasvurulariID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuru kayıt bilgileri yüklenirken bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvuru kayıt bilgileri yüklenirken bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        $scope.Info = gelen.data;
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
                        console.error('İş başvuru kayıt bilgileri yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }


            $scope.IkIsBasvurulariEkleGuncelle = function (Info) {
                $scope.formCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                if ($scope.frmIsBasvurulari.$valid) { } else {
                    $rootScope.sayfayukleniyor = false;
                    $rootScope.focusToInvalid($scope.frmIsBasvurulari);
                    return;
                }
                var promiseGet = srvIkIsBasvurulari.IkIsBasvurulariEkleGuncelle(Info);
                promiseGet.then(function (gelen) {
                    $scope.formCalistirildi = false;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuru kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvuru kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "İş başvuru kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ikIsBasvurulariID = gelen.data.returnKayitNo;
                        $state.go('insankaynaklari.ikisbasvurularikayit', { ikIsBasvurulariID: $scope.ikIsBasvurulariID });
                    }
                },
                    function (hata) {
                        $scope.formCalistirildi = false;
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuru kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            }

            $scope.IkDepartmanGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkDepartman.IkDepartmanGetData();
                promiseGet.then(function (gelen) {
                    //      $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Departman listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Departman listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkDepartmanListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Departman listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IsBasvurulariDurumTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIsBasvurulariDurumTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş Başvurusu Durum Tipi listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvurusu durum tipi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IsBasvurulariDurumTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvurusu durum tipi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });

            };


            $scope.IkIsBasvurulariGorusmelerGetData = function (AramaKriterListeIsbasvurulari) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulariGorusmeler.IkIsBasvurulariGorusmelerGetData($scope.AramaKriterListeIsbasvurulari);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuruları görüşmeler listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvuruları görüşmeler listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkIsBasvurulariGorusmelerListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuruları görüşmeler listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };
            $scope.InfoIkIsBasvurulariGorusmeler = {
                IK_IS_BASVURULARI_ID: '',
                IK_IS_BASVURULARI_GORUSME_TARIHI: null,
                IK_IS_BASVURULARI_GORUSME_ACIKLAMA: ''
            };

            $scope.IkIsBasvurulariGorusmelerEkleGuncelle = function (InfoIkIsBasvurulariGorusmeler) {
                $scope.formIkIsBasvurulariGorusmelerCalistirildi = true;
                if ($scope.frmIkIsBasvurulariGorusmeler.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmIkIsBasvurulariGorusmeler);
                    return;
                }
                InfoIkIsBasvurulariGorusmeler.IK_IS_BASVURULARI_ID = $scope.ikIsBasvurulariID;
                var promiseGet = srvIkIsBasvurulariGorusmeler.IkIsBasvurulariGorusmelerEkleGuncelle(InfoIkIsBasvurulariGorusmeler);
                promiseGet.then(function (gelen) {
                    $scope.formIkIsBasvurulariGorusmelerCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuruları görüşmeler kayıt işlemi sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('İş başvuruları görüşmeler kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "İş başvurusu görüşme kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.IkIsBasvurulariGorusmelerGetData();
                        angular.element("#txtIK_IS_BASVURULARI_GORUSME_TARIHI")[0].value = null;
                        //$scope.InfoIkIsBasvurulariGorusmeler.IK_IS_BASVURULARI_GORUSME_TARIHI = null;
                        $scope.InfoIkIsBasvurulariGorusmeler.IK_IS_BASVURULARI_GORUSME_TARIHI = null;
                        $scope.InfoIkIsBasvurulariGorusmeler.IK_IS_BASVURULARI_GORUSME_ACIKLAMA = null;

                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuruları görüşmeler kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.IkIsBasvurulariGorusmelerSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulariGorusmeler.IkIsBasvurulariGorusmelerSil(info.IK_IS_BASVURULARI_GORUSMELER_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvurusu görüşme silme işlemi sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvurusu görüşme silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem Tamam', "İş başvurusu görüşme silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkIsBasvurulariGorusmelerListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriterListeIsbasvurulari.SayfaNo = $scope.AramaKriterListeIsbasvurulari.SayfaNo - 1;
                        }
                        $scope.IkIsBasvurulariGorusmelerGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvurusu görüşme silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiIsBasvurulariGorusmeler = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.IkIsBasvurulariGorusmelerSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.IkDosyaTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIkDosyaTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Dosya tipi listesi yüklenirken bir hata oluştu. ' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Dosya tipi listesi yüklenirken bir hata oluştu. Hata: ', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IkDosyaTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Dosya tipi listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };

            $scope.IkIsBasvurulariGorusmelerEklerGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulariGorusmelerEkler.IkIsBasvurulariGorusmelerEklerGetData($scope.AramaKriterIsbasvurulariGorusmeEkler);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuruları gürüşme ekleri listesi yüklenirken bir hata oluştu. ' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvuruları gürüşme ekleri listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiGorusmeEkler = gelen.data.ToplamKayitSayisi;
                        $scope.IkIsBasvurulariGorusmelerEklerListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuruları gürüşme ekleri listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            };


            $scope.IkIsBasvurulariGorusmelerEklerEkleGuncelle = function (InfoIsBasvurusuGorusmelerEkler) {
                $scope.formIkIsBasvurulariGorusmelerEklerCalistirildi = true;

                if ($scope.frmIsBasvurulariGorusmeEkler.$valid && $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_ADI.length > 0) { } else {
                    $rootScope.focusToInvalid($scope.frmIsBasvurulariGorusmeEkler);
                    return;
                }
                InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURULARI_ID = $scope.ikIsBasvurulariID;
                var promiseGet = srvIkIsBasvurulariGorusmelerEkler.IkIsBasvurulariGorusmelerEklerEkleGuncelle(InfoIsBasvurusuGorusmelerEkler);
                promiseGet.then(function (gelen) {
                    $scope.formIkIsBasvurulariGorusmelerEklerCalistirildi = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuruları görüşme ekleri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('İş başvuruları görüşme ekleri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "İş başvuruları görüşme ekleri kayıt işleminiz başarılı bir şekilde gerçekleşmiştir.", 'S');
                        $scope.IkIsBasvurulariGorusmelerEklerGetData();
                        $scope.InfoIsBasvurusuGorusmelerEkler.IK_DOSYA_TIPI_ID = null;
                        $scope.isBasvurulariGorusmeEklerDosyaDokumanSifirla();
                    }
                },
                    function (hata) {
                        $scope.formIkIsBasvurulariGorusmelerEklerCalistirildi = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuruları görüşme ekleri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.IkIsBasvurulariGorusmelerEklerSil = function (InfoIsBasvurusuGorusmelerEkler) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulariGorusmelerEkler.IkIsBasvurulariGorusmelerEklerSil(InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURULARI_GORUSMELER_EKLER_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'İş başvuruları görüşme ekleri silme işleminiz sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('İş başvuruları görüşme ekleri silme işleminiz sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', "İş başvuruları görüşme ekleri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkIsBasvurulariGorusmelerEklerListesi.length == 1 && $scope.toplamKayitSayisiGorusmeEkler > 10) {
                            $scope.AramaKriterIsbasvurulariGorusmeEkler.SayfaNo = $scope.AramaKriterIsbasvurulariGorusmeEkler.SayfaNo - 1;
                        }
                        $scope.IkIsBasvurulariGorusmelerEklerGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İş başvuruları görüşme ekleri silme işleminiz sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiIsBasvurulariGorusmelerEkler = function (InfoIsBasvurusuGorusmelerEkler) {
                $scope.secilenKayit = InfoIsBasvurusuGorusmelerEkler;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.IkIsBasvurulariGorusmelerEklerSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.filtreTemizleGorusme = function () {

                $scope.AramaKriterListeIsbasvurulari = {
                    IK_IS_BASVURULARI_ID: $scope.ikIsBasvurulariID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $('#txtIK_IS_BASVURULARI_GORUSME_TARIH').val(null);
                $scope.IkIsBasvurulariGorusmelerGetData($scope.AramaKriterListeIsbasvurulari);
            }

            $scope.filtreTemizleEkler = function () {
                angular.element("#txtIK_IS_BASVURULARI_GORUSME_EKLER_ADI").value = null;
                $scope.AramaKriterIsbasvurulariGorusmeEkler = {
                    IK_IS_BASVURULARI_ID: $scope.ikIsBasvurulariID,
                    IK_IS_BASVURU_GORUSMELER_DOSYA_ADI: '',
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };

                $scope.IkIsBasvurulariGorusmelerEklerGetData($scope.AramaKriterIsbasvurulariGorusmeEkler);
            }


            $scope.IkIsBasvurulariGorusmeEklerDosyaGoster = function (ikIsBasvurulariGorusmeEklerDosyaID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkIsBasvurulariGorusmelerEkler.IkIsBasvurulariGorusmelerEklerSelect(ikIsBasvurulariGorusmeEklerDosyaID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'İş başvuruları görüşme ekler dosya bilgileri yüklenirken bir hata oluştu. Hata:' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('İş başvuruları görüşme ekler dosya bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        var browserCanPrint = (-1 !== navigator.userAgent.indexOf('Chrome')) || (-1 !== navigator.userAgent.indexOf('Safari'));
                        $scope.RaporData = { Dosya: gelen.data.IK_IS_BASVURULARI_GORUSMELER_EKLER_URL, canPrint: browserCanPrint, ekUzanti: 'pdf' };
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
                        console.error('İş başvuruları görüşme ekler dosya bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceEkGoster.dismiss('cancel');
            };

            $scope.isBasvurulariGorusmeEklerDosyaDokumanSifirla = function () {
                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_ADI = null;
                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_BOYUTU = null;
                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURU_GORUSMELER_EKLER_DOSYA_TIPI = null;
                $scope.InfoIsBasvurusuGorusmelerEkler.IK_IS_BASVURULARI_GORUSMELER_EKLER_DOSYA = null;
            }

        }]);

