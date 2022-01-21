angular.module('inspinia').controller(
    'yetki_grup_kontrol_noktalari_controller', ['$scope', '$http', '$state', '$stateParams', '$document', '$window', '$log', '$localStorage', '$sessionStorage', '$rootScope', '$modal', 'ngDialog', 'srvYetkilendirme',
        function ($scope, $http, $state, $stateParams, $document, $window, $log, $localStorage, $sessionStorage, $rootScope, $modal, ngDialog, srvYetkilendirme) {
            $scope.yetkiGrupID = $stateParams.yetkiGrupID;
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });

            $scope.init = function () {
                $scope.yetkiGruplariListesiniGetir();
            };

            $scope.yetkiGruplariListesiniGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.getYetkiGruplariKontrolNoktalariListesi($scope.yetkiGrupID);

                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grup kontrol noktları listesi yüklenirken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grup kontrol noktları listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.YetkiGrupKontrolNoktalariListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        if (hata.status === 404) {
                            $state.go('anasayfa');
                            mesajGoster('Dikkat', hata.data, 'I');
                        }
                        else {
                            mesajGoster('Dikkat', hata.data.mesaj, 'I');
                        }
                        console.error('Yetki grup kontrol noktaları listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            }

            $scope.yetkiGrupKontrolNoktalariKaydet = function (kontrol) {
                $scope.formCalistirildi = true;
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.YetkiGrupKontrolNoktalariKaydet(kontrol);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grup kontrol noktaları kayıt işleminiz sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grup kontrol noktaları kayıt işleminiz sırasında bir hata oluştu.Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Yetki grup kontrol noktaları kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yetki grup kontrol noktaları kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            }

            function removeTurkish(value) {
                return value
                    .replace(/ç/g, 'c')
                    .replace(/Ç/g, 'c')
                    .replace(/ı/g, 'i')
                    .replace(/İ/g, 'i')
                    .replace(/ğ/g, 'g')
                    .replace(/Ğ/g, 'g')
                    .replace(/ü/g, 'u')
                    .replace(/Ü/g, 'u')
                    .replace(/ş/g, 's')
                    .replace(/Ş/g, 's')
                    .replace(/ö/g, 'o')
                    .replace(/Ö/g, 'o');
            }

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = removeTurkish(item.KONTROL_NOKTASI_ADI).toLowerCase();
                var search = removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };


            $scope.modalSilmeOnayi = function (yetkiGrup) {
                $scope.secilenKayit = yetkiGrup.YETKI_GRUP_ID;

                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(function (value) {
                    if (value === "true") {
                        $scope.YetkiGrubuSil($scope.secilenKayit);
                        $scope.secilenKayit = undefined;
                    }
                    else {
                        $scope.secilenKayit = undefined;
                        return;
                    }
                }
                );
            };


            $scope.YetkiGrubKontrolNoktasiSil = function (yetkiGrupID) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvYetkilendirme.YetkiGrubuSil(yetkiGrupID);

                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Yetki grup kontrol noktaları silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Yetki grup kontrol noktaları silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);

                    }
                    else {
                        mesajGoster('İşlem tamam.', "Yetki grup kontrol noktaları silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        $scope.yetkiGruplariListesiniGetir();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Yetki grup kontrol nokları silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {
                $state.reload();
                txtArama = '';


            };

        }]);