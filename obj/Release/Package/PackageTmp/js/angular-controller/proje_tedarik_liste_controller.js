angular.module('inspinia').controller(
    'proje_tedarik_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvProjeTedarik', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvProjeTedarik, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.projeID = $stateParams.projeID;
            $scope.search = {};

            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.ProjeTedarikGetData();
            }

            $scope.AramaKriter = {
                PROJE_ID: $scope.projeID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                TEDARIKCI: '',
                TEDARIK_EDILECEK_URUN: '',
                ILGILI_KISI: '',
                ILGILI_KISI_TELEFON: '',
                LISTE: true
            };

            $scope.ProjeTedarikGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTedarik.ProjeTedarikGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu == false) {
                        mesajGoster('Dikkat', 'Tedarik listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedarik listesi yüklenirken bir hata oluştu. Hata: ', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.ProjeTedarikListesi = gelen.data.Veri;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedarik listesi yüklenirken bir hata oluştu. Hata: ', hata);
                    });
            }

            $scope.ignoreTurkish = function (item) {
                if (!$scope.search.txtArama) return true;
                var text = $rootScope.removeTurkish(item.TEDARIKCI).toLowerCase();
                var search = $rootScope.removeTurkish($scope.search.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.ProjeTedarikSil = function (InfoTedarik) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjeTedarik.ProjeTedarikSil(InfoTedarik.PROJE_TEDARIK_ID);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', 'Tedarik silme işlemi sırasında bir hata oluştu. ' + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W');
                        console.error('Tedarik silme işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam.', 'Tedarik silme işlemi başarılı bir şekilde gerçekleştirilmiştir.', 'S');
                        if ($scope.ProjeTedarikListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.ProjeTedarikGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedarik silme işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
                $rootScope.sayfayukleniyor = false;
            }

            $scope.modalSilmeOnayi = function (InfoTedarik) {
                $scope.secilenKayit = InfoTedarik;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' == value) {
                            $scope.ProjeTedarikSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            }

            $scope.filtreTemizle = function () {
                $scope.AramaKriter = {
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    PROJE_ID: $scope.projeID,
                    TEDARIKCI: null,
                    TEDARIK_EDILECEK_URUN: null,
                    ILGILI_KISI: null,
                    ILGILI_KISI_TELEFON: null,
                    LISTE: true
                };
                $scope.ProjeTedarikGetData($scope.AramaKriter);
            }

            $scope.ProjeTedarikEkleGuncelle = function (InfoTedarik) {
                $scope.formCalistirildiTedarik = true;
                if ($scope.frmTedarik.$valid) { } else {
                    $rootScope.focusToInvalid($scope.frmTedarik);
                    return;
                }
                $rootScope.sayfayukleniyor = true;
                InfoTedarik.PROJE_ID = $scope.projeID;
                var promiseGet = srvProjeTedarik.ProjeTedarikEkleGuncelle(InfoTedarik);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    $scope.formCalistirildiTedarik = false;
                    if (gelen.data.basariDurumu == false) {
                        mesajGoster('Dikkat', "Tedarik kayıt işlemi sırasında bir hata oluştu. " + gelen.data.mesaj, gelen.data.sistemMesaj != null ? 'E' : 'W')
                        console.error('Tedarik kayıt işlemi sırasında bir hata oluştu. Hata: ', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Tedarik kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.ProjeTedarikGetData();
                        InfoTedarik.TEDARIKCI = null;
                        InfoTedarik.TEDARIK_EDILECEK_URUN = null;
                        InfoTedarik.ILGILI_KISI = null;
                        InfoTedarik.ILGILI_KISI_E_POSTA = null;
                        InfoTedarik.ILGILI_KISI_TELEFON = null;
                        //angular.element("#txtTEDARIKCI")[0].value = null;
                        //angular.element("#txtTEDARIK_EDILECEK_URUN")[0].value = null;
                        //angular.element("#txtILGILI_KISI")[0].value = null;
                        //angular.element("#txtMUSTERI_E_POSTA")[0].value = null;
                        //angular.element("#txtILGILI_KISI_TELEFON")[0].value = null;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        $scope.formCalistirildiTedarik = false;
                        mesajGoster('Dikkat', hata.status == 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Tedarik kayıt işlemi sırasında bir hata oluştu. Hata: ', hata);
                    });
            }
        }]);

