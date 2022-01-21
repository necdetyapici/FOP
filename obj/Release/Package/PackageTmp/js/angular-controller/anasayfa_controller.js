angular.module('inspinia').controller(
    'anasayfa_controller', ['$scope', '$http', '$state', '$stateParams', '$log', '$localStorage', '$location', '$sessionStorage', '$rootScope', 'SweetAlert', '$modal', 'srvTalepProje', 'srvProjePlani', 'srvDuyuru', 'srvGenel','srvEntegrasyon',
        function ($scope, $http, $state, $stateParams, $log, $localStorage, $location, $sessionStorage, $rootScope, $SweetAlert, $modal, srvTalepProje, srvProjePlani, srvDuyuru, srvGenel,srvEntegrasyon) {

            $scope.AramaKriter = {
                Anasayfa: 1
            };

            $scope.init = function () {
                $scope.menuleriGetir();
                if ($rootScope.oncekiAdres != null) {
                    $location.path($rootScope.oncekiAdres);
                    $rootScope.oncekiAdres = null;
                }
                $scope.tarih = new Date().getDate();
                $scope.TalepProjeCountGetData();
                //$scope.TalepTipiGetData();
                $scope.TalepProjeGunAyGetData();
                $scope.TalepProjeHaftaGetData();
                $scope.Taleplerim('Gun');
                $scope.TalepDurumTipiGetData();
                $scope.DuyuruGetData($scope.AramaKriterDuyuru);
                if ($scope.$storage.IS_KURUM_MUSTERI_KULLANICI !== true) {
                    $scope.ProjePlaniCountGetData();
                    $scope.ProjePlaniGunAyGetData();
                    $scope.ProjePlaniHaftaGetData();
                    $scope.Planlarim('Gun');
                }

            };

            
            $scope.AramaKriterTalep = {
                LISTE: false,
                TALEP_TIPI_ID: '',
                AKTIF: '',
                KAPALI: '',
                BUGUN_AY: '',
                TALEP_TIPI: '',
                TALEP_PROJE_TALEP_NO: '',
                TALEP_DURUM_TIPI_ID: '',
                TALEP_PLANLANAN_BASLANGIC_TARIHI: '',
                TALEP_PLANLANAN_BITIS_TARIHI: ''
            }

            
            $scope.AramaKriterTaleplerimGunAy = {
                LISTE: false,
                BUGUN_AY: true
            };
            $scope.AramaKriterTaleplerimHafta = {
                LISTE: false,
                HAFTA: true
            };
            $scope.AramaKriterPlan = {
                LISTE: false,
                ANASAYFA: true,
                AKTIF: '',
                BUGUN_AY: '',
                GOZDEN_GECIRILEN: '',
                ILGILI: '',
                REDDEDILMIS: '',
                BASLANGIC_TARIHI: '',
                BITIS_TARIHI: '',
                TASK_ADI: '',
                TASK_NO: ''
            }

            
            $scope.AramaKriterPlanlarimGunAy = {
                LISTE: false,
                BUGUN_AY: true,
                ANASAYFA: true
            };

            $scope.AramaKriterPlanlarimHafta = {
                LISTE: false,
                HAFTA: true,
                ANASAYFA: true
            };

            $scope.menuleriGetir = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getSolMenuListesi();

                promiseGet.then(function (pl) {
                    $scope.$storage = $sessionStorage.$default({
                        MenuListesi: pl.data
                    });
                    //$rootScope.MenuListesi = pl.data;
                    $rootScope.sayfayukleniyor = false;
                },
                    function (errorPl) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "Menu listesi yüklenirken bir hata oluştu. Hata: " + errorPl.data, 'W')
                        $log.error('menuleriGetir Hata:', errorPl);
                    });
            };

            $scope.setUrl = function (Url) {
                $state.go(Url);
            };

            $scope.TalepProjeCountGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeCounGetData();
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep değerleriniz yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep değerleriniz yüklenirken bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoTalepProjeCount = gelen.data;
                        $scope.TalepTipiCount();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', "TalepProje listesi yüklenirken bir hata oluştu.Hata: " + hata.data.MessageDetail, 'W');
                        console.log('TalepProjeGetData Hata:', hata);
                    });
            };

            $scope.TalepTipiCount = function () {
                $scope.TalepTipiDfi = 0;
                $scope.TalepTipiProblem = 0;
                $scope.TalepTipiDegisiklik = 0;
                $scope.TalepTipiTest = 0;
                $scope.TalepTipiRisk = 0;
                $scope.TalepTipiGelistirme = 0;
                $scope.TalepTipiYeniIstek = 0;
                $scope.TalepTipiGenel = 0;
                angular.forEach($scope.InfoTalepProjeCount.TALEP_TIPI_VERI, function (value, key) {
                    switch (parseInt(value.TalepTipiAdi)) {
                        case 1:
                            $scope.TalepTipiDfi = value.count;
                            break;
                        case 2:
                            $scope.TalepTipiProblem = value.count;
                            break;
                        case 3:
                            $scope.TalepTipiDegisiklik = value.count;
                            break;
                        case 4:
                            $scope.TalepTipiTest = value.count;
                            break;
                        case 5:
                            $scope.TalepTipiRisk = value.count;
                            break;
                        case 6:
                            $scope.TalepTipiGelistirme = value.count;
                            break;
                        case 7:
                            $scope.TalepTipiYeniIstek = value.count;
                            break;
                        case 8:
                            $scope.TalepTipiGenel = value.count;
                            break;
                        default:
                    }
                });
            };

            $scope.TalepProjeGunAyGetData = function () {
                $scope.TaleplerimGunListesi = [];
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeGetData($scope.AramaKriterTaleplerimGunAy);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bugün ve ay talepleriniz yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bugün ve ay talepleriniz yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepProjeBuGunAyListesi = gelen.data.Veri;

                        angular.forEach($scope.TalepProjeBuGunAyListesi, function (value, key) {
                            if ($scope.tarih === new Date(value.TALEP_PLANLANAN_BASLANGIC_TARIHI).getDate()) {
                                $scope.TaleplerimGunListesi.push(value);
                            }

                        });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bugün ve ay talepleriniz yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TalepProjeHaftaGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeGetData($scope.AramaKriterTaleplerimHafta);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Haftalık talepleriniz yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Haftalık talepleriniz yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.TalepProjHaftaListesi = gelen.data.Veri;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Haftalık talepleriniz yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.Taleplerim = function (Value) {
                if (Value === 'Gun') {
                    $scope.TaleplerimListesi = $scope.TaleplerimGunListesi;
                } else if (Value === 'Ay') {
                    $scope.TaleplerimListesi = $scope.TalepProjeBuGunAyListesi;
                }
                else if (Value === 'Hafta') {
                    $scope.TaleplerimListesi = $scope.TalepProjHaftaListesi;
                }


            };

            $scope.TalepProjeGetData = function (Kriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvTalepProje.TalepProjeGetData(Kriter);
                promiseGet.then(function (gelen) {
                    // $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talepleriniz yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talepleriniz yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.TaleplerimListesi = gelen.data.Veri;
                        $rootScope.sayfayukleniyor = false;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talepleriniz yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.TALEP_TIPI_ID;
            $scope.TalepleriListele = function (Value) {

                if (Value === 'AktifTalep') {
                    $scope.AramaKriterTalep.AKTIF = true;
                    $scope.AramaKriterTalep.BUGUN_AY = false;
                    $scope.AramaKriterTalep.KAPALI = false;
                    $scope.AramaKriterTalep.TALEP_TIPI = false;
                    $scope.AramaKriterTalep.TALEP_TIPI_ID = null;

                }
                else if (Value === 'KapaliTalep') {
                    $scope.AramaKriterTalep.KAPALI = true;
                    $scope.AramaKriterTalep.BUGUN_AY = false;
                    $scope.AramaKriterTalep.AKTIF = false;
                    $scope.AramaKriterTalep.TALEP_TIPI = false;
                    $scope.AramaKriterTalep.TALEP_TIPI_ID = null;

                }
                else if (Value === 'SeciliTalepTipi') {
                    $scope.AramaKriterTalep.TALEP_TIPI = true;
                    $scope.AramaKriterTalep.BUGUN_AY = false;
                    $scope.AramaKriterTalep.KAPALI = false;
                    $scope.AramaKriterTalep.AKTIF = false;
                    $scope.AramaKriterTalep.TALEP_TIPI_ID = $scope.TALEP_TIPI_ID;
                } else {
                    $scope.AramaKriterTalep.BUGUN_AY = true;
                }
                $scope.TalepProjeGetData($scope.AramaKriterTalep);
                // $scope.GunHaftaAy = true;
            };

            $scope.ignoreTurkish = function (item) {
                if (!$scope.txtArama) return true;
                var text = removeTurkish(item.TALEP_PROJE_KONU).toLowerCase();
                var search = removeTurkish($scope.txtArama).toLowerCase();
                return text.indexOf(search) > -1;
            };

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

            $scope.ProjePlaniCountGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniCountGetData();
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Plan değerleriniz yüklenirken bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Plan değerleriniz bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        $scope.InfoProjePlaniCount = gelen.data;
                    }

                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Plan değerleriniz yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePlaniGunAyGetData = function () {
                $scope.PlanlarimGunListesi = [];
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniGetData($scope.AramaKriterPlanlarimGunAy);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Bugün ve ay planlarınız yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Bugün ve ay planlarınız yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.PlanlarimBuGunAyListesi = gelen.data.Veri;
                        angular.forEach($scope.PlanlarimBuGunAyListesi, function (value, key) {
                            if ($scope.tarih === new Date(value.BASLANGIC_TARIHI).getDate()) {
                                $scope.PlanlarimGunListesi.push(value);
                            }
                        });
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Bugün ve ay planlarınız yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.ProjePlaniHaftaGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniGetData($scope.AramaKriterPlanlarimHafta);
                promiseGet.then(function (gelen) {
                    //$scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Haftalık planlarınız yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Haftalaık planlarınız yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.PlanlarimHaftaListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Haftalık planlarınız yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };


            $scope.Planlarim = function (Value) {
                if (Value === 'Gun') {
                    $scope.PlanlarimListesi = $scope.PlanlarimGunListesi;
                } else if (Value === 'Ay') {
                    $scope.PlanlarimListesi = $scope.PlanlarimBuGunAyListesi;
                }
                else if (Value === 'Hafta') {
                    $scope.PlanlarimListesi = $scope.PlanlarimHaftaListesi;
                }
            };

            $scope.ProjePlaniGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvProjePlani.ProjePlaniGetData(AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Planlarınız yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Planlarınız yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                        $scope.PlanlarimListesi = gelen.data.Veri;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Planlarınız yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.PlanlarimListele = function (Value) {
                if (Value === 'AktifPlanlarim') {
                    $scope.AramaKriterPlan.AKTIF = true;
                    $scope.AramaKriterPlan.GOZDEN_GECIRILEN = false;
                    $scope.AramaKriterPlan.ILGILI = false;
                    $scope.AramaKriterPlan.REDDEDILMIS = false;
                }
                else if (Value === 'GozdenGecirilenPlanlarim') {
                    $scope.AramaKriterPlan.AKTIF = false;
                    $scope.AramaKriterPlan.GOZDEN_GECIRILEN = true;
                    $scope.AramaKriterPlan.ILGILI = false;
                    $scope.AramaKriterPlan.REDDEDILMIS = false;
                }
                else if (Value === 'ReddedilmisPlanlarim') {
                    $scope.AramaKriterPlan.AKTIF = false;
                    $scope.AramaKriterPlan.GOZDEN_GECIRILEN = false;
                    $scope.AramaKriterPlan.ILGILI = false;
                    $scope.AramaKriterPlan.REDDEDILMIS = true;
                }
                else if (Value === 'IlgiliPlanlarim') {
                    $scope.AramaKriterPlan.AKTIF = false;
                    $scope.AramaKriterPlan.GOZDEN_GECIRILEN = false;
                    $scope.AramaKriterPlan.ILGILI = true;
                    $scope.AramaKriterPlan.REDDEDILMIS = false;
                } else {
                    $scope.AramaKriterPlan.BUGUN_AY = true;
                }
                $scope.ProjePlaniGetData($scope.AramaKriterPlan);

                // $scope.GunHaftaAyPlan = true;
            };


            $scope.ignoreTurkishPlanlarim = function (item) {
                if (!$scope.txtAramaPlan) return true;
                var text = removeTurkish(item.TASK_ADI).toLowerCase();
                var search = removeTurkish($scope.txtAramaPlan).toLowerCase();
                return text.indexOf(search) > -1;
            };



            $scope.AramaKriterDuyuru = {
                LISTE: true,
                AKTIF: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 5
            };

            $scope.DuyuruGetData = function (AramaKriter) {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvDuyuru.DuyuruGetData(AramaKriter);
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.Veri.length > 0 && gelen.data.Veri[0].basariDurumu === false) {
                        mesajGoster('Dikkat', 'Duyuru listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Duyuru listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    }
                    else {
                        if ($scope.duyuruKonum == true) {
                            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                            $scope.DuyuruModalListesi = gelen.data.Veri;
                        } else {
                            $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                            $scope.DuyuruListesi = gelen.data.Veri;
                        }
                        
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Duyuru listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            // $scope.duyuruAlert = function (konu, metin) {
            //     $SweetAlert.swal({
            //         title: konu,
            //         text: metin
            //     });
            // };

            $scope.DuyuruEkle = function () {
                $scope.$modalInstanceDuyuruEkle = $modal.open({
                    templateUrl: 'views/common/modal_duyuru_ekle.html',
                    scope: $scope
                });
            };


            $scope.DuyuruEkleKapat = function () {
                $scope.$modalInstanceDuyuruEkle.dismiss('cancel');
            };



            $scope.DuyuruEkleGuncelle = function (InfoDuyuru, frmDuyuru) {
                $rootScope.sayfayukleniyor = true;
                $scope.formCalistirildiDuyuruEkle = true;
                if (frmDuyuru.$valid) { } else {
                    $rootScope.focusToInvalid();
                    return;
                }
                InfoDuyuru.DUYURU_DURUMU_ID = 2;
                var promiseGet = srvDuyuru.DuyuruEkleGuncelle(InfoDuyuru);
                promiseGet.then(function (gelen) {
                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Duyuru kayıt işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                        console.error('Duyuru kayıt işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    }
                    else {
                        mesajGoster("İşlem tamam.", "Duyuru kayıt işleminiz başarılı bir şekilde gerçekleştirilmiştir.", "S");
                        $scope.DuyuruEkleKapat();
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Duyuru kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
                    });
            };

            // sil
            // $scope.DuyuruListele = function () {
            //     $scope.duyuruKonum = true;
            //     $scope.DuyuruGetData($scope.AramaKriterListeDuyuru);
            //     $scope.$modalInstanceDuyuruListe = $modal.open({
            //         templateUrl: 'views/common/modal_duyuru_listele.html',
            //         size: 'lg',
            //         scope: $scope
            //     });
            // };

            // $scope.DuyuruListeleKapat = function () {
            //     $scope.$modalInstanceDuyuruListe.dismiss('cancel');
            // };

            $scope.AramaKriterListeDuyuru = {
                LISTE: true,
                AKTIF: true,
                SayfaNo: 1,
                SayfaBasinaKayitSayisi: 10
            };


            $(window).resize(function () {
                $(".sweet-alert").css("margin-top", -$(".sweet-alert").outerHeight() / 2);
            });

            $scope.filtreTemizleTaleplerim = function () {
                $scope.AramaKriterTalep.TALEP_PROJE_TALEP_NO = null;
                $scope.AramaKriterTalep.TALEP_DURUM_TIPI_ID = null;
                $scope.AramaKriterTalep.TALEP_PLANLANAN_BASLANGIC_TARIHI = null;
                $scope.AramaKriterTalep.TALEP_PLANLANAN_BITIS_TARIHI = null;
                $('#txtTALEP_PLANLANAN_BASLANGIC_TARIHI').val(null);
                $('#txtTALEP_PLANLANAN_BITIS_TARIHI').val(null);
                $scope.TalepProjeGetData($scope.AramaKriterTalep);
            };

            $scope.TalepDurumTipiGetData = function () {
                $rootScope.sayfayukleniyor = true;
                var promiseGet = srvGenel.getTalepDurumTipi();
                promiseGet.then(function (gelen) {

                    $rootScope.sayfayukleniyor = false;
                    if (gelen.data.length > 0 && gelen.data.basariDurumu === false) {
                        mesajGoster('Dikkat', 'Talep durum tipi listesi yüklenirken bir hata oluştu.' + gelen.data.Veri[0].mesaj, gelen.data.Veri[0].sistemMesaj !== null ? 'E' : 'W');
                        console.error('Talep durum tipi listesi yüklenirken bir hata oluştu. Hata:', gelen.data.Veri[0].sistemMesaj);
                    } else {
                        $scope.TalepDurumListesi = gelen.data;
                    }
                },
                    function (hata) {
                        $rootScope.sayfayukleniyor = false;
                        mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                        console.error('Talep durum tipi listesi yüklenirken bir hata oluştu. Hata:', hata);
                    });
            };

            $scope.filtreTemizlePlanlarim = function () {
                $('#txtBASLANGIC_TARIHI').val(null);
                $('#txtBITIS_TARIHI').val(null);
                $scope.AramaKriterPlan.BASLANGIC_TARIHI = null;
                $scope.AramaKriterPlan.BITIS_TARIHI = null;
                $scope.AramaKriterPlan.TASK_ADI = null;
                $scope.AramaKriterPlan.TASK_NO = null;
                $scope.ProjePlaniGetData($scope.AramaKriterPlan);
            };


        }]);

