angular.module('inspinia').controller(
    'ik_personel_izin_liste_controller', ['$scope', '$http', '$state', '$stateParams', '$filter', '$rootScope', '$modal', 'ngDialog', 'srvIkPersonelIzin', 'srvGenel', 'srvRaporlar', 'Constants', 'Ayarlarim',
        function ($scope, $http, $state, $stateParams, $filter, $rootScope, $modal, ngDialog, srvIkPersonelIzin, srvGenel, srvRaporlar, Constants, Ayarlarim) {
            $scope.Ayarlar = Ayarlarim;
            $scope.kullaniciID = $stateParams.kullaniciID;
            $scope.IzinTuru = Constants.IZIN_TURU;
            $scope.IzinDurumu = Constants.IZIN_DURUMU;
            $scope.AramaKriterListe = {
                MUSTERI_ID: '',
                IZIN_TURU_ID: '',
                IK_PERSONEL_IZIN_BASLANGIC_TARIHI: '',
                IK_PERSONEL_IZIN_BITIS_TARIHI: '',
                IK_PERSONEL_ISE_BASLANGIC_TARIHI: '',
                KULLANICI_ID: $scope.kullaniciID,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                LISTE: true
            };
            $scope.AramaKriter = {
                MUSTERI_ID: '',
                LISTE: false
            };
            $scope.$on('$stateChangeSuccess', function () {
                window.scrollTo(0, 0);
            });
            $scope.init = function () {
                $scope.IkPersonelIzinGetData();
                $scope.IzinTuruGetData();
            };

            $scope.IkPersonelIzinGetData = function (AramaKriterListe) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelIzin.IkPersonelIzinGetData($scope.AramaKriterListe);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel izin listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel izin listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.IkPersonelIzinListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel izin listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = $rootScope.removeTurkish(item.IZIN_TURU_ID).toLowerCase();
                var search = $rootScope.removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

            $scope.IkPersonelIzinSil = function (info) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelIzin.IkPersonelIzinSil(info.IK_PERSONEL_IZIN_ID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Personel izin silme işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Personel izin silme işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    } else {
                        mesajGoster('İşlem tamam', "Personel izin silme işleminiz başarılı bir şekilde gerçekleştirilmiştir.", 'S');
                        if ($scope.IkPersonelIzinListesi.length == 1 && $scope.toplamKayitSayisi > 10) {
                            $scope.AramaKriterListe.SayfaNo = $scope.AramaKriterListe.SayfaNo - 1;
                        }
                        $scope.IkPersonelIzinGetData();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel izin silme işlemi sırasında bir hata oluştu. Hata:', hata);
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
                            $scope.IkPersonelIzinSil($scope.secilenKayit);
                            $scope.secilenKayit = undefined;
                        }
                        else {
                            $scope.secilenKayit = undefined;
                            return;
                        }
                    }
                );
            };

            $scope.IzinTuruGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getIzinTuru();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'İzin türü listesi yüklerken bir hata oluştu.' + gelen.data[0].mesaj, gelen.data[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('İzin türü listesi yüklenirken bir hata oluştu. Hata:', gelen.data[0].sistemMesaj);
                    } else {
                        $scope.IzinTuruListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('İzin türü listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.IzinFormuYazdir = function (Izin_Id, Izin_Turu, kullaniciId) {
                $scope.Kriter = {
                    IK_PERSONEL_IZIN_ID: Izin_Id,
                    IZIN_TURU_ID: Izin_Turu,
                    KULLANICI_ID: kullaniciId
                  //  RAPOR: true
                };
                // $scope.modalGoster($scope.Kriter);
                $scope.yeniForm($scope.Kriter);
            };

            $scope.yeniForm = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvIkPersonelIzin.IzinFormu(Kriter);
                promiseGet.then(function (gelen) {
                    if (gelen.data.basariDurumu) {
                        
                        var browserCanPrint = (-1 != navigator.userAgent.indexOf('Chrome')) || (-1 != navigator.userAgent.indexOf('Safari'));
                        
                        $scope.RaporData = { Dosya: gelen.data.FORM_ON_IZLEME, AramaKriter: Kriter, canPrint: browserCanPrint, ekUzanti: 'pdf', ekUzantiIki: 'docx' };
                        $scope.modalInstanceDokuman = $modal.open({
                            templateUrl: 'views/common/modal_dokuman_viewer.html',
                            controller: 'ik_personel_izin_liste_controller',
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

            

            $scope.modalDokumanGizle = function () {
                $scope.modalInstanceDokuman.dismiss('cancel');
            };

            

            $scope.filtreTemizle = function () {
                angular.element("#sel_IZIN_TURU_ID")[0].value = null;

                $scope.AramaKriterListe = {
                    MUSTERI_ID: '',
                    IZIN_TURU_ID: '',
                    KULLANICI_ID: $scope.kullaniciID,
                    SayfaNo: 1,
                    SayfaBasinaKayitSayisi: Ayarlarim.SayfaBasinaKayitSayisi,
                    LISTE: true
                };
                $('#txtIK_PERSONEL_IZIN_BASLANGIC_TARIHI').val(null);
                $('#txtIK_PERSONEL_IZIN_BITIS_TARIHI').val(null);
                $('#txtIK_PERSONEL_ISE_BASLANGIC_TARIHI').val(null);
                $scope.IkPersonelIzinGetData($scope.AramaKriterListe);
            };



            $scope.PersonelIzinListeleGoster = function () {
                $scope.$modalInstance = $modal.open({
                    templateUrl: 'views/common/modal_personel_izin_liste.html',
                    size: 'lg',
                    scope: $scope
                });

            };
            $scope.Geri = function () {
                $scope.$modalInstance.dismiss('cancel');
            };

            $scope.IkPersonelToplamIzinGetData = function () {
                $rootScope.sayfayukleniyor = true;
                $scope.AramaKriter.KULLANICI_ID = $scope.kullaniciID;
                var promiseGet = srvIkPersonelIzin.IkPersonelToplamIzinGetData($scope.kullaniciID);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;

                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', "Personel bütün izin bilgileri yüklenirken bir hata oluştu. Hata: " + gelen.data.mesaj, 'E');
                        console.error('Personel bütün izin bilgileri yüklenirken bir hata oluştu. Hata:', gelen.data.mesaj);
                    }
                    else {
                        $scope.InfoPersonelToplamIzin = gelen.data;
                        $scope.PersonelIzinListeleGoster();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Personel bütün izin bilgileri yüklenirken bir hata oluştu. Hata:', hata);
                    }
                );
            };

        }]);



