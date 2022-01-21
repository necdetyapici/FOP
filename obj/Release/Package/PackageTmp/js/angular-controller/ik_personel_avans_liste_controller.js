angular.module('inspinia').controller(
    'ik_personel_avans_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$rootScope', '$modal', 'ngDialog', 'srvAvans','srvAvansTuru', 'srvGenel', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog, srvAvans, srvAvansTuru, srvGenel, Ayarlarim) {
            $scope.kullaniciID = $stateParams.kullaniciID;

            $scope.Ayarlar = Ayarlarim;
            $scope.AramaKriter = {
                KULLANICI_ID: $scope.kullaniciID,
                LISTE: true,
                AVANS_ADI: '',
                AVANS_MASRAF_DURUMU_ID: '',
                TALEP_TARIHI: '',
                AVANS_TURU_ID: '',
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
            };


            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });


            $scope.init = function () {
                $scope.AvansGetData($scope.AramaKriter);
                $scope.AvansTuruGetData();
                $scope.AvansMasrafDurumuGetData();
            };


            $scope.AvansGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvans.AvansGetData($scope.AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel avans listesi yüklerken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel avans listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.AvansListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel avans listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.ARANACAK_ALAN_ADINI_YAZINIZ).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.AvansSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvans.AvansSil(info.AVANS_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel avans silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel avans silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster('İşlem tamam.', "Personel avans silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.AvansListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriter.SayfaNo = $scope.AramaKriter.SayfaNo - 1;
                        }
                        $scope.AvansGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel avans silme işlemi sırasında bir hata oluştu. Hata:', hata);
                    });

            };

            $scope.modalSilmeOnayi = function (info) {
                $scope.secilenKayit = info;
                ngDialog.openConfirm({
                    template: "views/common/modal_kayit_sil.html",
                    scope: $scope
                }).then(
                    function (value) {
                        if ('true' === value) {
                            $scope.AvansSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.AvansTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvansTuru.AvansTuruGetData();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Avans türü listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Avans türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.AvansTuruListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Avans türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.AvansMasrafDurumuGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getAvansMasrafDurumu();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Avans durumu listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Avans durumu listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.AvansMasrafDurumuListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Avans durumu listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizle = function () {

                $scope.AramaKriter = {
                    LISTE: true,
                    AVANS_ADI: null,
                    TALEP_EDEN_AD_SOYAD: null,
                    AVANS_MASRAF_DURUMU_ID: null,
                    AVANS_TURU_ID: null,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi
                };
                $('#txtTALEP_TARIHI').val(null);
                $scope.AvansGetData($scope.AramaKriter);

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

            $scope.AvansFormuYazdir = function (avansId, kullaniciId) {
                $scope.Kriter = {
                    AVANS_ID: avansId,
                    KULLANICI_ID: kullaniciId,
                    AVANS_ADI: $scope.AramaKriter.AVANS_ADI,
                    AVANS_TURU_ID: $scope.AramaKriter.AVANS_TURU_ID,
                    TALEP_TARIHI: $scope.AramaKriter.TALEP_TARIHI,
                    AVANS_MASRAF_DURUMU_ID: $scope.AramaKriter.AVANS_MASRAF_DURUMU_ID
                };
                // $scope.modalGoster($scope.Kriter);
                $scope.yeniForm($scope.Kriter);
            };

            $scope.yeniForm = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvAvans.AvansFormu(Kriter);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {

                        var browserCanPrint = (-1 != navigator.userAgent.indexOf('Chrome')) || (-1 != navigator.userAgent.indexOf('Safari'));
                        
                        $scope.RaporData = { Dosya: gelen.data.FORM_ON_IZLEME, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf', ekUzantiIki: 'docx' };
                        $scope.modalInstanceDokuman = $modal.open({
                            templateUrl: 'views/common/modal_dokuman_viewer.html',
                            controller: 'ik_personel_avans_liste_controller',
                            size: 'lg',
                            backdrop: 'static',
                            // windowClass: "animated fadeInDown",
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
                $scope.modalInstanceDokuman.dismiss('cancel');
            };
        }]);

