angular.module('inspinia').controller(
    'dokuman_gozden_gecirme_kriteri_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvDokumanGozdenGecirmeKriteri', 'srvDokumanGozdenGecirmeKriterAdim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvDokumanGozdenGecirmeKriteri, srvDokumanGozdenGecirmeKriterAdim) {
            $scope.dokumanGozdenGecirmeKriteriID = $stateParams.dokumanGozdenGecirmeKriteriID;

            $scope.AramaKriterDokumanGozdenGecirmeAdim = {
                DOKUMAN_GOZDEN_GECIRME_KRITERI_ID: $scope.dokumanGozdenGecirmeKriteriID,
            }

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                if ($scope.dokumanGozdenGecirmeKriteriID > 0) {
                    $scope.DokumanGozdenGecirmeKriteriSelect();
                    $scope.DokumanGozdenGecirmeKriterAdimGetData();
                }
                    
            }

            $scope.DokumanGozdenGecirmeKriteriSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriteri.DokumanGozdenGecirmeKriteriSelect($scope.dokumanGozdenGecirmeKriteriID);

                promiseGet.then(function (gelen) {
                    
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.Info = gelen.data;
                        $rootScope.sayfayukleniyor = false;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            mesajGoster('Dikkat', hata.data, 'I');
                            $state.go('anasayfa');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Gözden geçirme kriter bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.DokumanGozdenGecirmeKriteriEkleGuncelle = function (Info) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildi = true;
                if ($scope.frmKriter.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmKriter);
                    return;
                }
                var promiseGet = srvDokumanGozdenGecirmeKriteri.DokumanGozdenGecirmeKriteriEkleGuncelle(Info);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Gözden geçirme kriter kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir. " + gelen.data.mesaj, "S");
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriter kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            

            $scope.DokumanGozdenGecirmeKriterAdimGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimGetData($scope.AramaKriterDokumanGozdenGecirmeAdim);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter adım listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter adım listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisiDokumanGozdenGecirmeKriterAdim = gelen.data.ToplamKayitSayisi;
                        $scope.DokumanGozdenGecirmeKriterAdimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriter adım listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DokumanGozdenGecirmeKriteriAdimEkle = function (dokumanGozdenGeciremeKriteriAdimID) {
                if (dokumanGozdenGeciremeKriteriAdimID > 0) {
                    $scope.DokumanGozdenGecirmeKriterAdimSelect(dokumanGozdenGeciremeKriteriAdimID);
                }// else {
                //    $scope.InfoDokumanGozdenGecirmeKriterAdim.DOKUMAN_GOZDEN_GECIRME_KRITER_ADIM_ID = null;

                //}
                $scope.$modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_dokuman_gozden_gecirme_kriteri_adim_ekle.html',
                    size: 'lg',
                    scope: $scope
                });
                $scope.$modalInstance.result.then(function () {
                    $scope.DokumanGozdenGecirmeKriterAdimGetData();
                }, function (data) {
                });
            };

            $scope.Geri = function () {
                $scope.$modalInstance.close();
            };

            $scope.DokumanGozdenGecirmeKriterAdimSelect = function (dokumanGozdenGeciremeKriteriAdimID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimSelect(dokumanGozdenGeciremeKriteriAdimID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter adım bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter adım bilgileri yüklenirken bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoDokumanGozdenGecirmeKriterAdim = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriter adım bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.InfoDokumanGozdenGecirmeKriterAdim = {};
            $scope.DokumanGozdenGecirmeAdimSifirla = function () {
                $scope.InfoDokumanGozdenGecirmeKriterAdim.DOKUMAN_GOZDEN_GECIRME_KRITER_ADIM_ID = null;
                $scope.InfoDokumanGozdenGecirmeKriterAdim.KRITER = null;
            };

            $scope.DokumanGozdenGecirmeKriterAdimEkleGuncelle = function (InfoDokumanGozdenGecirmeKriterAdim, frmKriterAdim) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiDokumanGozdenGecirmeKriterAdim = true;
                if (frmKriterAdim.$valid) { } else {
                    $rootScope.focusToInvalid(frmKriterAdim);
                    return;
                }
                InfoDokumanGozdenGecirmeKriterAdim.DOKUMAN_GOZDEN_GECIRME_KRITERI_ID = $scope.dokumanGozdenGecirmeKriteriID;
                var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimEkleGuncelle(InfoDokumanGozdenGecirmeKriterAdim);
                promiseGet.then(function (gelen) {


                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter adım kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter adım işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam", "Gözden geçirme kriter adım işleminiz başarılı bir şekilde yapılmıştır.", "S");
                        //$scope.DokumanGozdenGecirmeKriterAdimGetData();
                        $scope.formCalistirildiDokumanGozdenGecirmeKriterAdim = false;
                        $scope.DokumanGozdenGecirmeAdimSifirla();
                        $scope.Geri();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriter adım kayıt işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.DokumanGozdenGecirmeKriteriAdimAktifPasif = function (InfoDokumanGozdenGecirmeKriterAdim) {

                var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimAktifPasif(InfoDokumanGozdenGecirmeKriterAdim);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriteri adim onay işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriteri adim onay işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Gözden geçirme kriteri aidm onay işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');

                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriteri adim onay işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.DokumanGozdenGecirmeKriterAdimSil = function (InfoDokumanGozdenGecirmeKriterAdim) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDokumanGozdenGecirmeKriterAdim.DokumanGozdenGecirmeKriterAdimSil(InfoDokumanGozdenGecirmeKriterAdim.DOKUMAN_GOZDEN_GECIRME_KRITER_ADIM_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Gözden geçirme kriter adım silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Gözden geçirme kriter adım silme işlemi sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    } else {
                        mesajGoster('İşlem tamam.', "Gözden geçirme kriter adım silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.DokumanGozdenGecirmeKriterAdimGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Gözden geçirme kriter adım silme işlemi sırasında bir hata oluştu.Hata:', hata);
                    });
            };

            $scope.modalSilmeOnayiDokumanGozdenGecirmeKriteriAdim = function (InfoDokumanGozdenGecirmeKriterAdim) {
                $scope.secilenKayit = InfoDokumanGozdenGecirmeKriterAdim;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.DokumanGozdenGecirmeKriterAdimSil($scope.secilenKayit);
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

