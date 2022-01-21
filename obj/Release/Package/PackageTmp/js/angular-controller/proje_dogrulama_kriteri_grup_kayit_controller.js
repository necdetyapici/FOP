angular.module('inspinia').controller(
    'proje_dogrulama_kriteri_grup_kayit_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvGenel', 'srvProjeDogrulamaKriteriGrup', 'srvProjeDogrulamaKriteri',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvGenel, srvProjeDogrulamaKriteriGrup, srvProjeDogrulamaKriteri) {
            $scope.projeDogrulamaKriteriGrupID = $stateParams.projeDogrulamaKriteriGrupID;
            $scope.projeID = $stateParams.projeID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.AramaKriter = {
                LISTE: false,
                PROJE_ID: $scope.projeID
            };
            $scope.AramaKriterDogrulamaKriteriListe = {
                LISTE: false,
                PROJE_ID: $scope.projeID,
                PROJE_DOGRULAMA_KRITERI_GRUP_ID: $scope.projeDogrulamaKriteriGrupID
            };

            $scope.init = function () {
                $scope.TalepProjeSurecTipiGetData();
                if ($scope.projeDogrulamaKriteriGrupID > 0) {
                    $scope.ProjeDogrulamaKriteriGrupSelect();
                    $scope.ProjeDogrulamaKriteriGetData();
                }
            }

            $scope.ProjeDogrulamaKriteriGrupSelect = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDogrulamaKriteriGrup.ProjeDogrulamaKriteriGrupSelect($scope.projeDogrulamaKriteriGrupID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri grup bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri grup bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjeDogrulamaKriteriGrup = gelen.data;
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
                        console.error('Doğrulama kriteri grup bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.ProjeDogrulamaKriteriGrupEkleGuncelle = function (InfoProjeDogrulamaKriteriGrup) {
                $scope.formCalistirildiProjeDogrulamaKriteriGrup = true;
                if ($scope.frmProjeDogrulamaKriteriGrup.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeDogrulamaKriteriGrup);
                    return;
                }
                InfoProjeDogrulamaKriteriGrup.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeDogrulamaKriteriGrup.ProjeDogrulamaKriteriGrupEkleGuncelle(InfoProjeDogrulamaKriteriGrup);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri grup kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri grup kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Doğrulama kriteri grup kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $state.go('proje.projelerkayit.plan.projedogrulamakriterigrupkayit', { projeDogrulamaKriteriGrupID:gelen.data.returnKayitNo });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri grup kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.TalepProjeSurecTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepProjeSurecTipi();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Süreç tipi listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Süreç tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepProjeSurecTipiListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Süreç tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeDogrulamaKriteriGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDogrulamaKriteri.ProjeDogrulamaKriteriGetData($scope.AramaKriterDogrulamaKriteriListe);
                promiseGet.then(function (gelen) {
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeDogrulamaKriteriListesi = gelen.data.Veri;
                    }

                    $rootScope.sayfayukleniyor = false;
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjeDogrulamaKriteriSelect = function (projeDogrulamaKriteriID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDogrulamaKriteri.ProjeDogrulamaKriteriSelect(projeDogrulamaKriteriID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri bilgileri yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjeDogrulamaKriteri = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }


            $scope.ProjeDogrulamaKriteriEkle = function (projeDogrulamaKriteriID) {
                if (projeDogrulamaKriteriID > 0) {
                    $scope.ProjeDogrulamaKriteriSelect(projeDogrulamaKriteriID);
                } else {
                    $scope.InfoProjeDogrulamaKriteriGrup.PROJE_DOGRULAMA_KRITERI_ID = null;

                }
                $scope.$modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_proje_dogrulama_kriteri_ekle.html',
                    controller: 'proje_dogrulama_kriteri_grup_kayit_controller',
                    size: 'lg',
                    scope: $scope
                });
                $scope.$modalInstance.result.then(function () {
                    $scope.ProjeDogrulamaKriteriGetData();
                }, function (data) {
                });
            };

            $scope.ProjeDogrulamaKriteriSifirla = function () {
                $scope.InfoProjeDogrulamaKriteri.PROJE_DOGRULAMA_KRITERI_ID = null;
                $scope.InfoProjeDogrulamaKriteri.KRITER = null;
            }


            $scope.ProjeDogrulamaKriteriSil = function (InfoProjeDogrulamaKriteriGrup) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeDogrulamaKriteri.ProjeDogrulamaKriteriSil(InfoProjeDogrulamaKriteriGrup.PROJE_DOGRULAMA_KRITERI_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Doğrulama kriteri silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');

                        $scope.ProjeDogrulamaKriteriGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            };

            $scope.modalSilmeOnayiProjeDogrulamaKriteri = function (InfoProjeDogrulamaKriteriGrup) {
                $scope.secilenKayit = InfoProjeDogrulamaKriteriGrup;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeDogrulamaKriteriSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };



            $scope.ProjeDogrulamaKriteriEkleGuncelle = function (InfoProjeDogrulamaKriteri) {
                $scope.formCalistirildiProjeDogrulamaKriteri = true;
                if ($scope.frmProjeDogrulamaKriteri.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmProjeDogrulamaKriteri);
                    return;
                }
                InfoProjeDogrulamaKriteri.PROJE_ID = $scope.projeID;
                InfoProjeDogrulamaKriteri.PROJE_DOGRULAMA_KRITERI_GRUP_ID = $scope.projeDogrulamaKriteriGrupID;
                
                var promiseGet = srvProjeDogrulamaKriteri.ProjeDogrulamaKriteriEkleGuncelle(InfoProjeDogrulamaKriteri);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Doğrulama kriteri kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeDogrulamaKriteriSifirla();
                        $scope.ProjeDogrulamaKriteriGetData();
                        $scope.$modalInstance.close();
                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }


            $scope.Geri = function () {
                $scope.$modalInstance.close();
            };

            $scope.ProjeDogrulamaKriteriAktifPasif = function (InfoProjeDogrulamaKriteri) {

                var promiseGet = srvProjeDogrulamaKriteri.ProjeDogrulamaKriteriAktifPasif(InfoProjeDogrulamaKriteri);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Doğrulama kriteri onay işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Doğrulama kriteri onay işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Doğrulama kriteri onay işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.ProjeDogrulamaKriteriSifirla();
                        $scope.ProjeDogrulamaKriteriGetData();
                        $scope.$modalInstance.close();
                    }
                },
                    function (hata) {
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Doğrulama kriteri onay işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }


        }]);

