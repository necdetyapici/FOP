/// <reference path="../plugins/jquery-ui/jquery-ui.min.js" />
/// <reference path="../plugins/jquery-ui/jquery-ui.min.js" />
/// <reference path="../plugins/datapicker/bootstrap-datepicker.min.js" />
/// <reference path="../plugins/datapicker/bootstrap-datepicker.min.js" />
/// <reference path="../plugins/datapicker/bootstrap-datepicker.tr.min.js" />
/// <reference path="../plugins/datapicker/bootstrap-datepicker.min.js" />

/**
*
* Pict 2017-04-01
* EMFA Yazılım
* Version 1.0
*
 */

//var APPLICATION_CONFIG = {
//    clientID : "f1badcdf-5b54-4512-87b0-68eefa26c826",
//    redirectUri : "http://localhost:49811/",
//    interactionModue : "popUp",
//};





function config($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, IdleProvider, KeepaliveProvider) {
    IdleProvider.idle(5);
    IdleProvider.timeout(120);

    $urlRouterProvider.otherwise("/kullanici/giris");

    $ocLazyLoadProvider.config({
        debug: true

    });



    $stateProvider
        .state('kullanici', {
            abstract: true,
            url: "/kullanici",
            templateUrl: "views/common/content_single.html",
        })

        .state('IlIlce', {
            abstract: true,
            url: "/GenelListeler"
        })


        .state('kullanici.giris', {
            url: "/giris",
            controller: 'kullanici_giris_controller',
            templateUrl: "views/kullanici_giris.html",
            data: { pageTitle: 'PICT Sistemi Giriş' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-services/kullanici.js', 'js/angular-controller/kullanici_giris_controller.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            name: 'angular-peity',
                            files: ['js/plugins/peity/jquery.peity.min.js', 'js/plugins/peity/angular-peity.js']
                        },
                    ]);
                }
            }
        })





        .state('anasayfa', {
            url: "/anasayfa",
            controller: 'anasayfa_controller',
            templateUrl: "views/anasayfa.html",
            data: { pageTitle: 'Ana Sayfa' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/anasayfa_controller.js', 'js/angular-services/kullanici.js', 'js/angular-services/entegrasyon.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje.js']
                        },
                        {
                            files: ['js/angular-services/proje_plani.js']
                        },
                        {
                            files: ['js/angular-services/duyuru.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })

        .state('profil', {
            abstract: true,
            url: "/profil",
            templateUrl: "views/common/content.html",
        })

        .state('profil.bilgilerim', {
            url: "/",
            controller: 'profil_bilgilerim_controller',
            templateUrl: "views/profil_bilgilerim.html",
            data: { pageTitle: 'Profil Bilgilerim' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/profil_bilgilerim_controller.js', 'js/angular-services/profil_bilgileri.js', 'js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim', {
            abstract: true,
            url: "/yonetim",
            templateUrl: "views/common/content.html",
        })



        .state('yonetim.musterilistesi', {
            url: "/musterilistesi",
            controller: 'musteri_liste_controller',
            templateUrl: "views/musteri_liste.html",
            data: { pageTitle: 'Müşteri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/musteri_liste_controller.js', 'js/angular-services/musteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musterikayit', {
            url: "/musterikayit/:musteriID",
            controller: 'musteri_kayit_controller',
            templateUrl: "views/musteri_kayit.html",
            data: { pageTitle: 'Müşteri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/musteri_kayit_controller.js', 'js/angular-services/musteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.musteriayari', {
            url: "/musteriayari/:musteriID",
            controller: 'musteri_ayari_controller',
            templateUrl: "views/musteri_ayari.html",
            data: { pageTitle: 'Müşteri Ayarı' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/musteri_ayari_controller.js', 'js/angular-services/musteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //Proje

        .state('yonetim.musteriayari.proje', {
            url: "/proje",
            templateUrl: "views/musteri_ayari_proje.html",
            data: { pageTitle: 'Proje Ayarları' },

        })

        //Proje Dokuman Dosya Tipi

        .state('yonetim.musteriayari.proje.projedokumandosyatipilistesi', {
            url: "/projedokumandosyatipilistesi",
            controller: 'proje_dokuman_dosya_tipi_liste_controller',
            templateUrl: "views/proje_dokuman_dosya_tipi_liste.html",
            data: { pageTitle: 'ProjeDokumanDosyaTipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_dokuman_dosya_tipi_liste_controller.js', 'js/angular-services/proje_dokuman_dosya_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.projedokumandosyatipikayit', {
            url: "/projedokumandosyatipikayit/:ProjeDokumanDosyaTipiID",
            controller: 'proje_dokuman_dosya_tipi_kayit_controller',
            templateUrl: "views/proje_dokuman_dosya_tipi_kayit.html",
            data: { pageTitle: 'ProjeDokumanDosyaTipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_dokuman_dosya_tipi_kayit_controller.js', 'js/angular-services/proje_dokuman_dosya_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })








        //Proje Gereksinim Türü

        .state('yonetim.musteriayari.proje.gereksinimturulistesi', {
            url: "/gereksinimturulistesi",
            controller: 'gereksinim_turu_liste_controller',
            templateUrl: "views/gereksinim_turu_liste.html",
            data: { pageTitle: 'GereksinimTuru Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/gereksinim_turu_liste_controller.js', 'js/angular-services/gereksinim_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.gereksinimturukayit', {
            url: "/gereksinimturukayit/:GereksinimTuruID",
            controller: 'gereksinim_turu_kayit_controller',
            templateUrl: "views/gereksinim_turu_kayit.html",
            data: { pageTitle: 'GereksinimTuru Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/gereksinim_turu_kayit_controller.js', 'js/angular-services/gereksinim_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })








        //Proje Gereksinim Tipi

        .state('yonetim.musteriayari.proje.gereksinimtipilistesi', {
            url: "/gereksinimtipilistesi",
            controller: 'gereksinim_tipi_liste_controller',
            templateUrl: "views/gereksinim_tipi_liste.html",
            data: { pageTitle: 'Gereksinim Tipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/gereksinim_tipi_liste_controller.js', 'js/angular-services/gereksinim_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.gereksinimtipikayit', {
            url: "/gereksinimtipikayit/:GereksinimTipiID",
            controller: 'gereksinim_tipi_kayit_controller',
            templateUrl: "views/gereksinim_tipi_kayit.html",
            data: { pageTitle: 'Gereksinim Tipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/gereksinim_tipi_kayit_controller.js', 'js/angular-services/gereksinim_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })










        //Proje Test Senaryo Test Tipi

        .state('yonetim.musteriayari.proje.testsenaryotesttipilistesi', {
            url: "/testsenaryotesttipilistesi",
            controller: 'test_senaryo_test_tipi_liste_controller',
            templateUrl: "views/test_senaryo_test_tipi_liste.html",
            data: { pageTitle: 'Test Senaryo Test Tipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/test_senaryo_test_tipi_liste_controller.js', 'js/angular-services/test_senaryo_test_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.testsenaryotesttipikayit', {
            url: "/testsenaryotesttipikayit/:TestSenaryoTestTipiID",
            controller: 'test_senaryo_test_tipi_kayit_controller',
            templateUrl: "views/test_senaryo_test_tipi_kayit.html",
            data: { pageTitle: 'Test Senaryo Test Tipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/test_senaryo_test_tipi_kayit_controller.js', 'js/angular-services/test_senaryo_test_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })








        //PROJE ÖLÇME TÜRÜ

        .state('yonetim.musteriayari.proje.olcmeturulistesi', {
            url: "/olcmeturulistesi",
            controller: 'olcme_turu_liste_controller',
            templateUrl: "views/olcme_turu_liste.html",
            data: { pageTitle: 'OlcmeTuru Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/olcme_turu_liste_controller.js', 'js/angular-services/olcme_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.olcmeturukayit', {
            url: "/olcmeturukayit/:OlcmeTuruID",
            controller: 'olcme_turu_kayit_controller',
            templateUrl: "views/olcme_turu_kayit.html",
            data: { pageTitle: 'OlcmeTuru Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/olcme_turu_kayit_controller.js', 'js/angular-services/olcme_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })








        //Proje Personel Tipi

        .state('yonetim.musteriayari.proje.personeltipilistesi', {
            url: "/personeltipilistesi",
            controller: 'personel_tipi_liste_controller',
            templateUrl: "views/personel_tipi_liste.html",
            data: { pageTitle: 'PersonelTipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/personel_tipi_liste_controller.js', 'js/angular-services/personel_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.personeltipikayit', {
            url: "/personeltipikayit/:PersonelTipiID",
            controller: 'personel_tipi_kayit_controller',
            templateUrl: "views/personel_tipi_kayit.html",
            data: { pageTitle: 'PersonelTipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/personel_tipi_kayit_controller.js', 'js/angular-services/personel_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        //Proje Yaşam Döngüsü

        .state('yonetim.musteriayari.proje.yasamdongusulistesi', {
            url: "/yasamdongusulistesi",
            controller: 'yasam_dongusu_liste_controller',
            templateUrl: "views/yasam_dongusu_liste.html",
            data: { pageTitle: 'YasamDongusu Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/yasam_dongusu_liste_controller.js', 'js/angular-services/yasam_dongusu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.yasamdongusukayit', {
            url: "/yasamdongusukayit/:YasamDongusuID",
            controller: 'yasam_dongusu_kayit_controller',
            templateUrl: "views/yasam_dongusu_kayit.html",
            data: { pageTitle: 'YasamDongusu Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/yasam_dongusu_kayit_controller.js', 'js/angular-services/yasam_dongusu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })








        //Proje Ticari Koşul

        .state('yonetim.musteriayari.proje.ticarikosullistesi', {
            url: "/ticarikosullistesi",
            controller: 'ticari_kosul_liste_controller',
            templateUrl: "views/ticari_kosul_liste.html",
            data: { pageTitle: 'TicariKosul Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ticari_kosul_liste_controller.js', 'js/angular-services/ticari_kosul.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.ticarikosulkayit', {
            url: "/ticarikosulkayit/:TicariKosulID",
            controller: 'ticari_kosul_kayit_controller',
            templateUrl: "views/ticari_kosul_kayit.html",
            data: { pageTitle: 'TicariKosul Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ticari_kosul_kayit_controller.js', 'js/angular-services/ticari_kosul.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })









        //Proje Finans Kaynağı Türü

        .state('yonetim.musteriayari.proje.finanskaynagiturulistesi', {
            url: "/finanskaynagiturulistesi",
            controller: 'finans_kaynagi_turu_liste_controller',
            templateUrl: "views/finans_kaynagi_turu_liste.html",
            data: { pageTitle: 'FinansKaynagiTuru Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/finans_kaynagi_turu_liste_controller.js', 'js/angular-services/finans_kaynagi_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.finanskaynagiturukayit', {
            url: "/finanskaynagiturukayit/:FinansKaynagiTuruID",
            controller: 'finans_kaynagi_turu_kayit_controller',
            templateUrl: "views/finans_kaynagi_turu_kayit.html",
            data: { pageTitle: 'FinansKaynagiTuru Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/finans_kaynagi_turu_kayit_controller.js', 'js/angular-services/finans_kaynagi_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })








        //Proje Risk İşleme Stratejisi

        .state('yonetim.musteriayari.proje.riskislemestratejisilistesi', {
            url: "/riskislemestratejisilistesi",
            controller: 'risk_isleme_stratejisi_liste_controller',
            templateUrl: "views/risk_isleme_stratejisi_liste.html",
            data: { pageTitle: 'Risk İşleme Stratejisi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/risk_isleme_stratejisi_liste_controller.js', 'js/angular-services/risk_isleme_stratejisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.riskislemestratejisikayit', {
            url: "/riskislemestratejisikayit/:RiskIslemeStratejisiID",
            controller: 'risk_isleme_stratejisi_kayit_controller',
            templateUrl: "views/risk_isleme_stratejisi_kayit.html",
            data: { pageTitle: 'Risk İşleme Stratejisi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/risk_isleme_stratejisi_kayit_controller.js', 'js/angular-services/risk_isleme_stratejisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })








        //Proje Turu

        .state('yonetim.musteriayari.proje.projeturulistesi', {
            url: "/projeturulistesi",
            controller: 'proje_turu_liste_controller',
            templateUrl: "views/proje_turu_liste.html",
            data: { pageTitle: 'Proje Türü Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_turu_liste_controller.js', 'js/angular-services/proje_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.proje.projeturukayit', {
            url: "/projeturukayit/:ProjeTuruID",
            controller: 'proje_turu_kayit_controller',
            templateUrl: "views/proje_turu_kayit.html",
            data: { pageTitle: 'Proje Türü Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_turu_kayit_controller.js', 'js/angular-services/proje_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        // Müşteri Ayarı Proje Müşteri Tipi

        .state('yonetim.musteriayari.proje.projemusteritipilistesi', {
            url: "/projemusteritipilistesi",
            controller: 'proje_musteri_tipi_liste_controller',
            templateUrl: "views/proje_musteri_tipi_liste.html",
            data: { pageTitle: 'ProjeMusteriTipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_musteri_tipi_liste_controller.js', 'js/angular-services/proje_musteri_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.musteriayari.proje.projemusteritipikayit', {
            url: "/projemusteritipikayit/:ProjeMusteriTipiID",
            controller: 'proje_musteri_tipi_kayit_controller',
            templateUrl: "views/proje_musteri_tipi_kayit.html",
            data: { pageTitle: 'ProjeMusteriTipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_musteri_tipi_kayit_controller.js', 'js/angular-services/proje_musteri_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //Talep

        .state('yonetim.musteriayari.talep', {
            url: "/talep",
            templateUrl: "views/musteri_ayari_talep.html",
            data: { pageTitle: 'Talep Yönetim Sistemi Ayarları' },

        })

        //Talep Süreç

        .state('yonetim.musteriayari.talep.sureclistesi', {
            url: "/sureclistesi",
            controller: 'surec_liste_controller',
            templateUrl: "views/surec_liste.html",
            data: { pageTitle: 'Surec Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/surec_liste_controller.js', 'js/angular-services/surec.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.musteriayari.talep.sureckayit', {
            url: "/sureckayit/:SurecID",
            controller: 'surec_kayit_controller',
            templateUrl: "views/surec_kayit.html",
            data: { pageTitle: 'Surec Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/surec_kayit_controller.js', 'js/angular-services/surec.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //Talep Sınıflandırma Tipi

        .state('yonetim.musteriayari.talep.talepsiniflandirmatipilistesi', {
            url: "/talepsiniflandirmatipilistesi",
            controller: 'talep_siniflandirma_tipi_liste_controller',
            templateUrl: "views/talep_siniflandirma_tipi_liste.html",
            data: { pageTitle: 'TalepSiniflandirmaTipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/talep_siniflandirma_tipi_liste_controller.js', 'js/angular-services/talep_siniflandirma_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.musteriayari.talep.talepsiniflandirmatipikayit', {
            url: "/talepsiniflandirmatipikayit/:TalepSiniflandirmaTipiID",
            controller: 'talep_siniflandirma_tipi_kayit_controller',
            templateUrl: "views/talep_siniflandirma_tipi_kayit.html",
            data: { pageTitle: 'TalepSiniflandirmaTipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/talep_siniflandirma_tipi_kayit_controller.js', 'js/angular-services/talep_siniflandirma_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })














        //İnsan Kaynakları


        .state('yonetim.musteriayari.insankaynaklari', {
            url: "/insankaynaklari",
            templateUrl: "views/musteri_ayari_insankaynaklari.html",
            data: { pageTitle: 'İnsan Kaynakları Ayarları' },

        })

        //İnsan Kaynakları Departman

        .state('yonetim.musteriayari.insankaynaklari.ikdepartmanlistesi', {
            url: "/ikdepartmanlistesi",
            controller: 'ik_departman_liste_controller',
            templateUrl: "views/ik_departman_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Departman Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_departman_liste_controller.js', 'js/angular-services/ik_departman.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('yonetim.musteriayari.insankaynaklari.ikdepartmankayit', {
            url: "/ikdepartmankayit/:IkDepartmanID",
            controller: 'ik_departman_kayit_controller',
            templateUrl: "views/ik_departman_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Departman Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_departman_kayit_controller.js', 'js/angular-services/ik_departman.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        //İnsan Kaynakları Müşteri İzin Ayarı

        .state('yonetim.musteriayari.insankaynaklari.musteriizinayarikayit', {
            url: "/musteriizinayarikayit",
            controller: 'musteri_izin_ayari_kayit_controller',
            templateUrl: "views/musteri_izin_ayari_kayit.html",
            data: { pageTitle: 'Musteri Izin Ayari Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/musteri_izin_ayari_kayit_controller.js', 'js/angular-services/musteri_izin_ayari.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },
                        {
                            files: ['js/angular-services/musteri_tatil_gunleri.js']
                        },

                    ]);
                }
            }
        })


        //İnsan Kaynakları Birim

        .state('yonetim.musteriayari.insankaynaklari.ikbirimlistesi', {
            url: "/ikbirimlistesi",
            controller: 'ik_birim_liste_controller',
            templateUrl: "views/ik_birim_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Birim Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_birim_liste_controller.js', 'js/angular-services/ik_birim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('yonetim.musteriayari.insankaynaklari.ikbirimkayit', {
            url: "/ikbirimkayit/:IkBirimID",
            controller: 'ik_birim_kayit_controller',
            templateUrl: "views/ik_birim_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Birim Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_birim_kayit_controller.js', 'js/angular-services/ik_birim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        //İnsan Kaynakları Demirbaş Cinsi

        .state('yonetim.musteriayari.insankaynaklari.ikdemirbascinsilistesi', {
            url: "/ikdemirbascinsilistesi",
            controller: 'ik_demirbas_cinsi_liste_controller',
            templateUrl: "views/ik_demirbas_cinsi_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Demirbaş Cinsi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_demirbas_cinsi_liste_controller.js', 'js/angular-services/ik_demirbas_cinsi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.musteriayari.insankaynaklari.ikdemirbascinsikayit', {
            url: "/ikdemirbascinsikayit/:IkDemirbasCinsiID",
            controller: 'ik_demirbas_cinsi_kayit_controller',
            templateUrl: "views/ik_demirbas_cinsi_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Demirbaş Cinsi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_demirbas_cinsi_kayit_controller.js', 'js/angular-services/ik_demirbas_cinsi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //İnsan Kaynakları Unvan

        .state('yonetim.musteriayari.insankaynaklari.ikunvanlistesi', {
            url: "/ikunvanlistesi",
            controller: 'ik_unvan_liste_controller',
            templateUrl: "views/ik_unvan_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Unvan Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_unvan_liste_controller.js', 'js/angular-services/ik_unvan.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.insankaynaklari.ikunvankayit', {
            url: "/ikunvankayit/:IkUnvanID",
            controller: 'ik_unvan_kayit_controller',
            templateUrl: "views/ik_unvan_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Unvan Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_unvan_kayit_controller.js', 'js/angular-services/ik_unvan.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //Müşteri Ayarı İnsan Kaynakları Kargo Şirketi

        .state('yonetim.musteriayari.insankaynaklari.kargosirketilistesi', {
            url: "/kargosirketilistesi",
            controller: 'kargo_sirketi_liste_controller',
            templateUrl: "views/kargo_sirketi_liste.html",
            data: { pageTitle: 'Kargo Şirketi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kargo_sirketi_liste_controller.js', 'js/angular-services/kargo_sirketi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.insankaynaklari.kargosirketikayit', {
            url: "/kargosirketikayit/:KargoSirketiID",
            controller: 'kargo_sirketi_kayit_controller',
            templateUrl: "views/kargo_sirketi_kayit.html",
            data: { pageTitle: 'Kargo Şirketi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kargo_sirketi_kayit_controller.js', 'js/angular-services/kargo_sirketi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //Müşteri Ayarı İnsan Kaynakları Ulaşım Şekli Tİpi

        .state('yonetim.musteriayari.insankaynaklari.ulasimseklitipilistesi', {
            url: "/ulasimseklitipilistesi",
            controller: 'ulasim_sekli_tipi_liste_controller',
            templateUrl: "views/ulasim_sekli_tipi_liste.html",
            data: { pageTitle: 'Ulaşım Şekli Tipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ulasim_sekli_tipi_liste_controller.js', 'js/angular-services/ulasim_sekli_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.insankaynaklari.ulasimseklitipikayit', {
            url: "/ulasimseklitipikayit/:UlasimSekliTipiID",
            controller: 'ulasim_sekli_tipi_kayit_controller',
            templateUrl: "views/ulasim_sekli_tipi_kayit.html",
            data: { pageTitle: 'Ulaşım Şekli Tipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ulasim_sekli_tipi_kayit_controller.js', 'js/angular-services/ulasim_sekli_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        // İnsankaynakları Avans Türü

        .state('yonetim.musteriayari.insankaynaklari.avansturulistesi', {
            url: "/avansturulistesi",
            controller: 'avans_turu_liste_controller',
            templateUrl: "views/avans_turu_liste.html",
            data: { pageTitle: 'AvansTuru Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/avans_turu_liste_controller.js', 'js/angular-services/avans_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('yonetim.musteriayari.insankaynaklari.avansturukayit', {
            url: "/avansturukayit/:AvansTuruID",
            controller: 'avans_turu_kayit_controller',
            templateUrl: "views/avans_turu_kayit.html",
            data: { pageTitle: 'AvansTuru Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/avans_turu_kayit_controller.js', 'js/angular-services/avans_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //İnsan Kaynakları Ekler/Dosya Tipleri

        .state('yonetim.musteriayari.insankaynaklari.ikdosyatipilistesi', {
            url: "/ikdosyatipilistesi",
            controller: 'ik_dosya_tipi_liste_controller',
            templateUrl: "views/ik_dosya_tipi_liste.html",
            data: { pageTitle: 'Ik Dosya Tipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_dosya_tipi_liste_controller.js', 'js/angular-services/ik_dosya_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.insankaynaklari.ikdosyatipikayit', {
            url: "/ikdosyatipikayit/:IkDosyaTipiID",
            controller: 'ik_dosya_tipi_kayit_controller',
            templateUrl: "views/ik_dosya_tipi_kayit.html",
            data: { pageTitle: 'Ik Dosya Tipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_dosya_tipi_kayit_controller.js', 'js/angular-services/ik_dosya_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //İnsan Kaynakları Eğitim Dosya Tipi

        .state('yonetim.musteriayari.insankaynaklari.ikegitimdosyatipilistesi', {
            url: "/ikegitimdosyatipilistesi",
            controller: 'ik_egitim_dosya_tipi_liste_controller',
            templateUrl: "views/ik_egitim_dosya_tipi_liste.html",
            data: { pageTitle: '  Egitim Dosya Tipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_egitim_dosya_tipi_liste_controller.js', 'js/angular-services/ik_egitim_dosya_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.insankaynaklari.ikegitimdosyatipikayit', {
            url: "/ikegitimdosyatipikayit/:IkEgitimDosyaTipiID",
            controller: 'ik_egitim_dosya_tipi_kayit_controller',
            templateUrl: "views/ik_egitim_dosya_tipi_kayit.html",
            data: { pageTitle: ' Egitim Dosya Tipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_egitim_dosya_tipi_kayit_controller.js', 'js/angular-services/ik_egitim_dosya_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })






        //Toplantı


        .state('yonetim.musteriayari.toplanti', {
            url: "/toplanti",
            templateUrl: "views/musteri_ayari_toplanti.html",
            data: { pageTitle: 'Toplantı Ayarları' },

        })

        //Toplantı Yeri 

        .state('yonetim.musteriayari.toplanti.toplantiyerilistesi', {
            url: "/toplantiyerilistesi",
            controller: 'toplanti_yeri_liste_controller',
            templateUrl: "views/toplanti_yeri_liste.html",
            data: { pageTitle: 'Toplantı Yeri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_yeri_liste_controller.js', 'js/angular-services/toplanti_yeri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.toplanti.toplantiyerikayit', {
            url: "/toplantiyerikayit/:ToplantiYeriID",
            controller: 'toplanti_yeri_kayit_controller',
            templateUrl: "views/toplanti_yeri_kayit.html",
            data: { pageTitle: 'Toplantı Yeri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_yeri_kayit_controller.js', 'js/angular-services/toplanti_yeri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })









        //Toplantı Gündemi Türü

        .state('yonetim.musteriayari.toplanti.toplantigundemiturulistesi', {
            url: "/toplantigundemiturulistesi",
            controller: 'toplanti_gundemi_turu_liste_controller',
            templateUrl: "views/toplanti_gundemi_turu_liste.html",
            data: { pageTitle: 'Toplantı Gündemi Türü Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_gundemi_turu_liste_controller.js', 'js/angular-services/toplanti_gundemi_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.toplanti.toplantigundemiturukayit', {
            url: "/toplantigundemiturukayit/:ToplantiGundemiTuruID",
            controller: 'toplanti_gundemi_turu_kayit_controller',
            templateUrl: "views/toplanti_gundemi_turu_kayit.html",
            data: { pageTitle: 'Toplantı Gündemi Türü Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_gundemi_turu_kayit_controller.js', 'js/angular-services/toplanti_gundemi_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })









        //Toplantı Katılımcı Rolü Tipi



        .state('yonetim.musteriayari.toplanti.toplantikatilimcirolutipilistesi', {
            url: "/toplantikatilimcirolutipilistesi",
            controller: 'toplanti_katilimci_rolu_tipi_liste_controller',
            templateUrl: "views/toplanti_katilimci_rolu_tipi_liste.html",
            data: { pageTitle: 'Toplantı Katılımcı Rolu Tipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_katilimci_rolu_tipi_liste_controller.js', 'js/angular-services/toplanti_katilimci_rolu_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.toplanti.toplantikatilimcirolutipikayit', {
            url: "/toplantikatilimcirolutipikayit/:ToplantiKatilimciRoluTipiID",
            controller: 'toplanti_katilimci_rolu_tipi_kayit_controller',
            templateUrl: "views/toplanti_katilimci_rolu_tipi_kayit.html",
            data: { pageTitle: 'Toplantı Katılımcı Rolu Tipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_katilimci_rolu_tipi_kayit_controller.js', 'js/angular-services/toplanti_katilimci_rolu_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //Toplantı / toplantı Türü

        .state('yonetim.musteriayari.toplanti.toplantiturulistesi', {
            url: "/toplantiturulistesi",
            controller: 'toplanti_turu_liste_controller',
            templateUrl: "views/toplanti_turu_liste.html",
            data: { pageTitle: 'ToplantiTuru Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_turu_liste_controller.js', 'js/angular-services/toplanti_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriayari.toplanti.toplantiturukayit', {
            url: "/toplantiturukayit/:ToplantiTuruID",
            controller: 'toplanti_turu_kayit_controller',
            templateUrl: "views/toplanti_turu_kayit.html",
            data: { pageTitle: 'ToplantiTuru Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_turu_kayit_controller.js', 'js/angular-services/toplanti_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })











        //Dokuman 


        .state('yonetim.musteriayari.dokuman', {
            url: "/dokuman",
            templateUrl: "views/musteri_ayari_dokuman.html",
            data: { pageTitle: 'Doküman Yönetim Sistemi Ayarları' },

        })


        //Dokuman Form Ayarı

        .state('yonetim.musteriayari.dokuman.dokumanformayarilistesi', {
            url: "/dokumanformayarilistesi",
            controller: 'dokuman_form_ayari_liste_controller',
            templateUrl: "views/dokuman_form_ayari_liste.html",
            data: { pageTitle: 'Dokuman Form Ayari Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_form_ayari_liste_controller.js', 'js/angular-services/dokuman_form_ayari.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_klasor.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.kullanicitanimla', {
            url: "/kullanicilistesi",
            controller: 'kullanici_controller',
            templateUrl: "views/kullanici_listesi.html",
            data: { pageTitle: 'Kullanıcı Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kullanici_controller.js', 'js/angular-services/kullanici.js', 'js/angular-services/raporlar.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })
        .state('yonetim.kullanicikayit', {
            url: "/kullanicikayit/:kullaniciID",
            controller: 'kullanici_kayit_controller',
            templateUrl: "views/kullanici_kayit.html",
            data: { pageTitle: 'Kullanıcı Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kullanici_kayit_controller.js', 'js/angular-services/kullanici.js', 'js/angular-services/yetkilendirme.js', 'js/angular-services/menuler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                        {
                            files: ['js/angular-services/musteri.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/projeler.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.duyurulistesi', {
            url: "/duyurulistesi",
            controller: 'duyuru_liste_controller',
            templateUrl: "views/duyuru_liste.html",
            data: { pageTitle: 'Duyuru Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/duyuru_liste_controller.js', 'js/angular-services/duyuru.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })



        .state('yonetim.duyurukayit', {
            url: "/duyurukayit/:duyuruID",
            controller: 'duyuru_kayit_controller',
            templateUrl: "views/duyuru_kayit.html",
            data: { pageTitle: 'Duyuru Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/duyuru_kayit_controller.js', 'js/angular-services/duyuru.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })




        .state('yonetim.yetkilendirmeislemleri', {
            url: "/yetkilendirme",
            controller: 'yetki_grup_controller',
            templateUrl: "views/yetki_grup_listesi.html",
            data: { pageTitle: 'Yetki Tanımları' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/yetki_grup_controller.js', 'js/angular-services/yetkilendirme.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.yetkigrubukayit', {
            url: "/yetkigrubukayit/:yetkiGrupID",
            controller: 'yetki_grup_kayit_controller',
            templateUrl: "views/yetki_grubu_kayit.html",
            data: { pageTitle: 'Yetki Grup Tanımlama' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/yetki_grup_kayit_controller.js', 'js/angular-services/yetkilendirme.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.yetkigrupkontrolnoktasikayit', {
            url: "/yetkigrupkontrolnoktasikayit/:yetkiGrupID",
            controller: 'yetki_grup_kontrol_noktalari_controller',
            templateUrl: "views/yetki_grup_kontrol_noktalari.html",
            data: { pageTitle: 'Yetki Grubuna Kontrol Noktası Atama' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/yetki_grup_kontrol_noktalari_controller.js', 'js/angular-services/yetkilendirme.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.kontrolnoktasilistesi', {
            url: "/kontrolnoktalari",
            controller: 'kontrol_noktasi_liste_controller',
            templateUrl: "views/kontrol_noktasi_listesi.html",
            data: { pageTitle: 'Kontrol Noktaları' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kontrol_noktasi_liste_controller.js', 'js/angular-services/kontrol_noktasi.js']
                        },

                    ]);
                }
            }

        })

        .state('yonetim.kontrolnoktasikayit', {
            url: "/kontrolnoktalari/:kontrolNoktasiID",
            controller: 'kontrol_noktasi_kayit_controller',
            templateUrl: "views/kontrol_noktasi_kayit.html",
            data: { pageTitle: 'Kontrol Noktaları Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kontrol_noktasi_kayit_controller.js', 'js/angular-services/kontrol_noktasi.js']
                        },

                    ]);
                }
            }
        })


        .state('yonetim.kontrolnoktalarilistesi', {
            url: "/kontrolnoktalarilistesi",
            controller: 'kontrol_noktalari_liste_controller',
            templateUrl: "views/kontrol_noktalari_liste.html",
            data: { pageTitle: 'KontrolNoktalari Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kontrol_noktalari_liste_controller.js', 'js/angular-services/kontrol_noktalari.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.kontrolnoktalarikayit', {
            url: "/kontrolnoktalarikayit/:kontrolNoktalariID",
            controller: 'kontrol_noktalari_kayit_controller',
            templateUrl: "views/kontrol_noktalari_kayit.html",
            data: { pageTitle: 'KontrolNoktalari Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kontrol_noktalari_kayit_controller.js', 'js/angular-services/kontrol_noktalari.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })






        .state('yonetim.menulerlistesi', {
            url: "/menulerlistesi",
            controller: 'menuler_liste_controller',
            templateUrl: "views/menuler_liste.html",
            data: { pageTitle: 'Menuler Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/menuler_liste_controller.js', 'js/angular-services/menuler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.menulerkayit', {
            url: "/menulerkayit/:menuID",
            controller: 'menuler_kayit_controller',
            templateUrl: "views/menuler_kayit.html",
            data: { pageTitle: 'Menuler Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/menuler_kayit_controller.js', 'js/angular-services/menuler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('yonetim.musteriyetkigruplistesi', {
            url: "/musteriyetkigruplistesi",
            controller: 'musteri_yetki_grup_liste_controller',
            templateUrl: "views/musteri_yetki_grup_liste.html",
            data: { pageTitle: 'MusteriYetkiGrup Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/musteri_yetki_grup_liste_controller.js', 'js/angular-services/musteri_yetki_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/musteri.js']
                        },
                        {
                            files: ['js/angular-services/yetkilendirme.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.musteriyetkigrupkayit', {
            url: "/musteriyetkigrupkayit/:musteriYetkiGrupID",
            controller: 'musteri_yetki_grup_kayit_controller',
            templateUrl: "views/musteri_yetki_grup_kayit.html",
            data: { pageTitle: 'MusteriYetkiGrup Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/musteri_yetki_grup_kayit_controller.js', 'js/angular-services/musteri_yetki_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/musteri.js']
                        },
                        {
                            files: ['js/angular-services/yetkilendirme.js']
                        },
                    ]);
                }
            }
        })


        .state('yonetim.kullanicilog', {
            url: "/kullanicilog",
            controller: 'kullanici_log_liste_controller',
            templateUrl: "views/kullanici_log_liste.html",
            data: { pageTitle: 'KullaniciLog Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/kullanici_log_liste_controller.js', 'js/angular-services/kullanici_log.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('yonetim.mailloglistesi', {
            url: "/mailloglistesi",
            controller: 'mail_log_liste_controller',
            templateUrl: "views/mail_log_liste.html",
            data: { pageTitle: 'Mail Log Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/mail_log_liste_controller.js', 'js/angular-services/mail_log.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        }
                    ]);
                }
            }
        })

        .state('yonetim.mailgruplistesi', {
            url: "/mailgruplistesi",
            controller: 'mail_grup_liste_controller',
            templateUrl: "views/mail_grup_liste.html",
            data: { pageTitle: 'Mail Grup Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/mail_grup_liste_controller.js', 'js/angular-services/mail_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('yonetim.mailgrupkayit', {
            url: "/mailgrupkayit/:mailGrupID",
            controller: 'mail_grup_kayit_controller',
            templateUrl: "views/mail_grup_kayit.html",
            data: { pageTitle: 'Mail Grup Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/mail_grup_kayit_controller.js', 'js/angular-services/mail_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/mail_grup_kullanici.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        }
                    ]);
                }
            }
        })



        //Sistem Tanımlamaları

        .state('sistem', {
            abstract: true,
            url: "/sistem",
            templateUrl: "views/common/content.html",
        })

        .state('sistem.metriklistesi', {
            url: "/metriklerlistesi",
            controller: 'metrikler_liste_controller',
            templateUrl: "views/metrikler_liste.html",
            data: { pageTitle: 'Metrik Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/metrikler_liste_controller.js', 'js/angular-services/metrikler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.metrikkayit', {
            url: "/metriklerkayit/:sistemMetrikID",
            controller: 'metrikler_kayit_controller',
            templateUrl: "views/metrikler_kayit.html",
            data: { pageTitle: 'Metrik Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/metrikler_kayit_controller.js', 'js/angular-services/metrikler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('sistem.teknolojikfizibilitelistesi', {
            url: "/teknolojikfizibilitelistesi",
            controller: 'teknolojik_fizibilite_liste_controller',
            templateUrl: "views/teknolojik_fizibilite_liste.html",
            data: { pageTitle: 'Teknolojik Fizibilite Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/teknolojik_fizibilite_liste_controller.js', 'js/angular-services/teknolojik_fizibilite.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.teknolojikfizibilitekayit', {
            url: "/teknolojikfizibilitekayit/:teknolojikFizibiliteID",
            controller: 'teknolojik_fizibilite_kayit_controller',
            templateUrl: "views/teknolojik_fizibilite_kayit.html",
            data: { pageTitle: 'Teknolojik Fizibilite Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/teknolojik_fizibilite_kayit_controller.js', 'js/angular-services/teknolojik_fizibilite.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.konfigurasyonaracilistesi', {
            url: "/konfigurasyonaraclistesi",
            controller: 'konfigurasyon_arac_liste_controller',
            templateUrl: "views/konfigurasyon_arac_liste.html",
            data: { pageTitle: 'Konfigürasyon Araç Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/konfigurasyon_arac_liste_controller.js', 'js/angular-services/konfigurasyon_arac.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })



        .state('sistem.konfigurasyonarackayit', {
            url: "/konfigurasyonarackayit/:konfigurasyonAracID",
            controller: 'konfigurasyon_arac_kayit_controller',
            templateUrl: "views/konfigurasyon_arac_kayit.html",
            data: { pageTitle: 'Konfigürasyon Araç Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/konfigurasyon_arac_kayit_controller.js', 'js/angular-services/konfigurasyon_arac.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.etkidegerilistesi', {
            url: "/etkidegerilistesi",
            controller: 'etki_degeri_liste_controller',
            templateUrl: "views/etki_degeri_liste.html",
            data: { pageTitle: 'Etki Değeri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/etki_degeri_liste_controller.js', 'js/angular-services/etki_degeri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.etkidegerikayit', {
            url: "/etkidegerikayit/:etkiDegeriID",
            controller: 'etki_degeri_kayit_controller',
            templateUrl: "views/etki_degeri_kayit.html",
            data: { pageTitle: 'Etki Değeri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/etki_degeri_kayit_controller.js', 'js/angular-services/etki_degeri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.olasilikdegerilistesi', {
            url: "/olasilikdegerilistesi",
            controller: 'olasilik_degeri_liste_controller',
            templateUrl: "views/olasilik_degeri_liste.html",
            data: { pageTitle: 'OlasilikDegeri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/olasilik_degeri_liste_controller.js', 'js/angular-services/olasilik_degeri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.olasilikdegerikayit', {
            url: "/olasilikdegerikayit/:olasilikDegeriID",
            controller: 'olasilik_degeri_kayit_controller',
            templateUrl: "views/olasilik_degeri_kayit.html",
            data: { pageTitle: 'Olasılık Değeri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/olasilik_degeri_kayit_controller.js', 'js/angular-services/olasilik_degeri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.etkilenenvarliklarlistesi', {
            url: "/etkilenenvarliklarlistesi",
            controller: 'etkilenen_varliklar_liste_controller',
            templateUrl: "views/etkilenen_varliklar_liste.html",
            data: { pageTitle: 'Etkilenen Varlıklar Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/etkilenen_varliklar_liste_controller.js', 'js/angular-services/etkilenen_varliklar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.etkilenenvarliklarkayit', {
            url: "/etkilenenvarliklarkayit/:etkilenenVarlikID",
            controller: 'etkilenen_varliklar_kayit_controller',
            templateUrl: "views/etkilenen_varliklar_kayit.html",
            data: { pageTitle: 'Etkilenen Varlıklar Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/etkilenen_varliklar_kayit_controller.js', 'js/angular-services/etkilenen_varliklar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.uygulamakontrolkriterigruplistesi', {
            url: "/uygulamakontrolkriterigruplistesi",
            controller: 'uygulama_kontrol_kriteri_grup_liste_controller',
            templateUrl: "views/uygulama_kontrol_kriteri_grup_liste.html",
            data: { pageTitle: 'UygulamaKontrolKriteriGrup Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/uygulama_kontrol_kriteri_grup_liste_controller.js', 'js/angular-services/uygulama_kontrol_kriteri_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.uygulamakontrolkriterigrupkayit', {
            url: "/uygulamakontrolkriterigrupkayit/:uygulamaKontrolKriteriGrupID",
            controller: 'uygulama_kontrol_kriteri_grup_kayit_controller',
            templateUrl: "views/uygulama_kontrol_kriteri_grup_kayit.html",
            data: { pageTitle: 'UygulamaKontrolKriteriGrup Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/uygulama_kontrol_kriteri_grup_kayit_controller.js', 'js/angular-services/uygulama_kontrol_kriteri_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('sistem.uygulamakontrolkriterilistesi', {
            url: "/:uygulamaKontrolKriteriGrupID/uygulamakontrolkriterilistesi/:uygulamaKontrolKriteriGrupAdi",
            controller: 'uygulama_kontrol_kriteri_liste_controller',
            templateUrl: "views/uygulama_kontrol_kriteri_liste.html",
            data: { pageTitle: 'UygulamaKontrolKriteri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/uygulama_kontrol_kriteri_liste_controller.js', 'js/angular-services/uygulama_kontrol_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.uygulamakontrolkriterikayit', {
            url: "/uygulamakontrolkriterikayit/:uygulamaKontrolKriteriID",
            controller: 'uygulama_kontrol_kriteri_kayit_controller',
            templateUrl: "views/uygulama_kontrol_kriteri_kayit.html",
            data: { pageTitle: 'UygulamaKontrolKriteri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/uygulama_kontrol_kriteri_kayit_controller.js', 'js/angular-services/uygulama_kontrol_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        //Kullanıcı Tanımlamalar
        .state('tanimlamalar', {
            abstract: true,
            url: "/tanimlamalar",
            templateUrl: "views/common/content.html",
        })

        .state('sistem.bgacikliklistesi', {
            url: "/bgacikliklistesi",
            controller: 'b_g_aciklik_liste_controller',
            templateUrl: "views/b_g_aciklik_liste.html",
            data: { pageTitle: 'Bilgi Güvenliği Açıklık Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_aciklik_liste_controller.js', 'js/angular-services/b_g_aciklik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('sistem.bgaciklikkayit', {
            url: "/bgaciklikkayit/:bgAciklikID",
            controller: 'b_g_aciklik_kayit_controller',
            templateUrl: "views/b_g_aciklik_kayit.html",
            data: { pageTitle: 'Bilgi Güvenliği Açıklık Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_aciklik_kayit_controller.js', 'js/angular-services/b_g_aciklik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('sistem.bgrisktehditlistesi', {
            url: "/bgrisktehditlistesi",
            controller: 'b_g_risk_tehdit_liste_controller',
            templateUrl: "views/b_g_risk_tehdit_liste.html",
            data: { pageTitle: 'Bilgi Güvenliği Risk Tehdit Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_tehdit_liste_controller.js', 'js/angular-services/b_g_risk_tehdit.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/b_g_aciklik.js']
                        },

                    ]);
                }
            }
        })





        .state('sistem.bgrisktehditkayit', {
            url: "/bgrisktehditkayit/:bgRiskTehditID",
            controller: 'b_g_risk_tehdit_kayit_controller',
            templateUrl: "views/b_g_risk_tehdit_kayit.html",
            data: { pageTitle: 'Bilgi Güvenliği Risk Tehdit Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_tehdit_kayit_controller.js', 'js/angular-services/b_g_risk_tehdit.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/b_g_aciklik.js']
                        },
                    ]);
                }
            }
        })


        .state('insankaynaklari.ikfirmalistesi', {
            url: "/ikfirmalistesi",
            controller: 'ik_firma_liste_controller',
            templateUrl: "views/ik_firma_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Firma Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_firma_liste_controller.js', 'js/angular-services/ik_firma.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikfirmakayit', {
            url: "/ikfirmakayit/:ikFirmaID",
            controller: 'ik_firma_kayit_controller',
            templateUrl: "views/ik_firma_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Firma Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_firma_kayit_controller.js', 'js/angular-services/ik_firma.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('insankaynaklari.ikistiraklistesi', {
            url: "/ikistiraklistesi",
            controller: 'ik_istirak_liste_controller',
            templateUrl: "views/ik_istirak_liste.html",
            data: { pageTitle: 'İnsan Kaynakları İştirak Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_istirak_liste_controller.js', 'js/angular-services/ik_istirak.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikistirakkayit', {
            url: "/ikistirakkayit/:ikIstirakID",
            controller: 'ik_istirak_kayit_controller',
            templateUrl: "views/ik_istirak_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları İştirak Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_istirak_kayit_controller.js', 'js/angular-services/ik_istirak.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('insankaynaklari.ikegitimverenkurumlistesi', {
            url: "/ikegitimverenkurumlistesi",
            controller: 'ik_egitim_veren_kurum_liste_controller',
            templateUrl: "views/ik_egitim_veren_kurum_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Eğitim Veren Kurum Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_egitim_veren_kurum_liste_controller.js', 'js/angular-services/ik_egitim_veren_kurum.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('insankaynaklari.ikegitimverenkurumkayit', {
            url: "/ikegitimverenkurumkayit/:ikEgitimVerenKurumID",
            controller: 'ik_egitim_veren_kurum_kayit_controller',
            templateUrl: "views/ik_egitim_veren_kurum_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Eğitim Veren Kurum Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_egitim_veren_kurum_kayit_controller.js', 'js/angular-services/ik_egitim_veren_kurum.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.dokumantipilistesi', {
            url: "/dokumantipilistesi",
            controller: 'dokuman_tipi_liste_controller',
            templateUrl: "views/dokuman_tipi_liste.html",
            data: { pageTitle: 'Dokuman Tipi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_tipi_liste_controller.js', 'js/angular-services/dokuman_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('dokuman.dokumantipikayit', {
            url: "/dokumantipikayit/:dokumanTipiID",
            controller: 'dokuman_tipi_kayit_controller',
            templateUrl: "views/dokuman_tipi_kayit.html",
            data: { pageTitle: 'DokumanTipi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_tipi_kayit_controller.js', 'js/angular-services/dokuman_tipi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })










        .state('dokuman.dokumanklasorlistesi', {
            url: "/dokumanklasorlistesi",
            controller: 'dokuman_klasor_liste_controller',
            templateUrl: "views/dokuman_klasor_liste.html",
            data: { pageTitle: 'Dokuman Klasör Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_klasor_liste_controller.js', 'js/angular-services/dokuman_klasor.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('dokuman.dokumanklasorkayit', {
            url: "/dokumanklasorkayit/:dokumanKlasorID",
            controller: 'dokuman_klasor_kayit_controller',
            templateUrl: "views/dokuman_klasor_kayit.html",
            data: { pageTitle: 'Dokuman Klasör Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_klasor_kayit_controller.js', 'js/angular-services/dokuman_klasor.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.dokumangozdengecirmekriterilistesi', {
            url: "/dokumangozdengecirmekriterilistesi",
            controller: 'dokuman_gozden_gecirme_kriteri_liste_controller',
            templateUrl: "views/dokuman_gozden_gecirme_kriteri_liste.html",
            data: { pageTitle: 'Doküman Gözden Geçirme Kriteri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_gozden_gecirme_kriteri_liste_controller.js', 'js/angular-services/dokuman_gozden_gecirme_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('dokuman.dokumangozdengecirmekriterikayit', {
            url: "/dokumangozdengecirmekriterikayit/:dokumanGozdenGecirmeKriteriID",
            controller: 'dokuman_gozden_gecirme_kriteri_kayit_controller',
            templateUrl: "views/dokuman_gozden_gecirme_kriteri_kayit.html",
            data: { pageTitle: 'Doküman Gözden Geçirme Kriteri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_gozden_gecirme_kriteri_kayit_controller.js', 'js/angular-services/dokuman_gozden_gecirme_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_gozden_gecirme_kriter_adim.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.dokumanprojepaketigruplistesi', {
            url: "/dokumanprojepaketigruplistesi",
            controller: 'dokuman_proje_paketi_grup_liste_controller',
            templateUrl: "views/dokuman_proje_paketi_grup_liste.html",
            data: { pageTitle: 'DokumanProjePaketiGrup Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_proje_paketi_grup_liste_controller.js', 'js/angular-services/dokuman_proje_paketi_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('dokuman.dokumanprojepaketigrupkayit', {
            url: "/dokumanprojepaketigrupkayit/:dokumanProjePaketiGrupID",
            controller: 'dokuman_proje_paketi_grup_kayit_controller',
            templateUrl: "views/dokuman_proje_paketi_grup_kayit.html",
            data: { pageTitle: 'Dokuman Proje Paketi Grup Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_proje_paketi_grup_kayit_controller.js', 'js/angular-services/dokuman_proje_paketi_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_proje_paketi_klasor.js']
                        },
                        {
                            files: ['js/angular-services/dokuman.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.dokumanprojepaketigrupkayit.dokumanprojepaketiklasorkayit', {
            url: "/dokumanprojepaketiklasorkayit/:dokumanProjePaketiKlasorID",
            controller: 'dokuman_proje_paketi_klasor_kayit_controller',
            templateUrl: "views/dokuman_proje_paketi_klasor_kayit.html",
            data: { pageTitle: 'DokumanProjePaketiKlasor Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_proje_paketi_klasor_kayit_controller.js', 'js/angular-services/dokuman_proje_paketi_klasor.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.dokumanyetkigruplistesi', {
            url: "/dokumanyetkigruplistesi",
            controller: 'dokuman_yetki_grup_liste_controller',
            templateUrl: "views/dokuman_yetki_grup_liste.html",
            data: { pageTitle: 'DokumanYetkiGrup Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_yetki_grup_liste_controller.js', 'js/angular-services/dokuman_yetki_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('dokuman.dokumanyetkigrupkayit', {
            url: "/dokumanyetkigrupkayit/:dokumanYetkiGrupID",
            controller: 'dokuman_yetki_grup_kayit_controller',
            templateUrl: "views/dokuman_yetki_grup_kayit.html",
            data: { pageTitle: 'DokumanYetkiGrup Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_yetki_grup_kayit_controller.js', 'js/angular-services/dokuman_yetki_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.dokumanyetkigrupklasorlistesi', {
            url: "/dokumanyetkigrupklasorlistesi/:dokumanYetkiGrupID",
            controller: 'dokuman_yetki_grup_klasor_liste_controller',
            templateUrl: "views/dokuman_yetki_grup_klasor_liste.html",
            data: { pageTitle: 'Dokuman Yetki Grup Klasor Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_yetki_grup_klasor_liste_controller.js', 'js/angular-services/dokuman_yetki_grup_klasor.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['css/plugins/jsTree/style.min.css', 'js/plugins/jsTree/jstree.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_klasor.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.dokumanyetkigrupkullanicilistesi', {
            url: "/dokumanyetkigrupkullanicilistesi/:dokumanYetkiGrupID",
            controller: 'dokuman_yetki_grup_kullanici_liste_controller',
            templateUrl: "views/dokuman_yetki_grup_kullanici_liste.html",
            data: { pageTitle: 'Dokuman Yetki Grup Kullanici Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_yetki_grup_kullanici_liste_controller.js', 'js/angular-services/dokuman_yetki_grup_kullanici.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },

                    ]);
                }
            }
        })


        //Proje İşlemleri

        .state('proje', {
            abstract: true,
            url: "/proje",
            templateUrl: "views/common/content.html",
        })


        .state('proje.projelerlistesi', {
            url: "/liste",
            controller: 'projeler_liste_controller',
            templateUrl: "views/projeler_liste.html",
            data: { pageTitle: 'Proje Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/projeler_liste_controller.js', 'js/angular-services/projeler.js', 'js/angular-services/proje_fizibiletesi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_turu.js']
                        },
                        {
                            files: ['js/angular-services/proje_musteri_tipi.js']
                        },
                        {
                            files: ['js/angular-services/finans_kaynagi_turu.js']
                        },
                        {
                            files: ['js/angular-services/ticari_kosul.js']
                        },
                        {
                            files: ['js/angular-services/yasam_dongusu.js']
                        },

                    ]);
                }
            }
        })





        .state('proje.projelerkayit', {
            url: "/kayit/:projeID",
            controller: 'projeler_kayit_controller',
            templateUrl: "views/projeler_kayit.html",
            data: { pageTitle: 'Proje Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/projeler_kayit_controller.js', 'js/angular-services/projeler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_personel.js']
                        },
                        {
                            files: ['js/angular-services/finans_kaynagi_turu.js']
                        },
                        {
                            files: ['js/angular-services/ticari_kosul.js']
                        },
                        {
                            files: ['js/angular-services/yasam_dongusu.js']
                        },
                        {
                            files: ['js/angular-services/proje_turu.js']
                        },
                        {
                            files: ['js/angular-services/proje_musteri_tipi.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.projekart', {
            url: "/projekart",
            templateUrl: "views/proje_kart.html",
            //controller: 'proje_kayit_controller',
            data: { pageTitle: 'Proje Kartı' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        //{
                        //    files: ['js/angular-controller/proje_kart_controller.js', 'js/angular-services/projeler.js']
                        //},
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/finans_kaynagi_turu.js']
                        },
                        {
                            files: ['js/angular-services/ticari_kosul.js']
                        },
                        {
                            files: ['js/angular-services/yasam_dongusu.js']
                        },
                        {
                            files: ['js/angular-services/proje_turu.js']
                        },
                    ]);
                }
            }


        })


        .state('proje.projelerkayit.fizibilite', {
            url: "/fizibilite",
            templateUrl: "views/proje_fizibilite.html",
            data: { pageTitle: 'Proje Fizibilete' },

        })

        //Proje tablosundaki bazı bilgilerin kayıtlarının alındığı sayfa
        .state('proje.projelerkayit.fizibilite.tahminleme', {
            url: "/tahminleme",
            templateUrl: "views/proje_tahminleme_kayit.html",
            data: { pageTitle: 'Tahminleme' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        //{
                        //    files: ['js/angular-controller/projeler_kayit_controller.js', 'js/angular-services/projeler.js']
                        //},
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_turu.js']
                        },
                    ]);
                }
            }


        })
        .state('proje.projelerkayit.fizibilite.projefizibilitelistesi', {
            url: "/projefizibilitelistesi",
            controller: 'proje_fizibiletesi_liste_controller',
            templateUrl: "views/proje_fizibiletesi_liste.html",
            data: { pageTitle: 'Fizibilete Listesi', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_fizibiletesi_liste_controller.js', 'js/angular-services/proje_fizibiletesi.js', 'js/angular-services/metrikler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.fizibilite.projefizibilitekayit', {
            url: "/projefizibilitekayit/:projeFizibiliteID",
            controller: 'proje_fizibiletesi_kayit_controller',
            templateUrl: "views/proje_fizibiletesi_kayit.html",
            data: { pageTitle: 'Proje Fizibilete Kayıt', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_fizibiletesi_kayit_controller.js', 'js/angular-services/proje_fizibiletesi.js', 'js/angular-services/metrikler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.fizibilite.teknolojikfizibilitelistesi', {
            url: "/teknolojikfizibilitelistesi",
            controller: 'proje_teknolojik_fizibilite_liste_controller',
            templateUrl: "views/proje_teknolojik_fizibilite_liste.html",
            data: { pageTitle: 'Proje Teknolojik Fizibilite Listesi', altTab: 3 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_teknolojik_fizibilite_liste_controller.js', 'js/angular-services/proje_teknolojik_fizibilite.js', 'js/angular-services/teknolojik_fizibilite.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.fizibilite.planlananpersonelsayisilistesi', {
            url: "/planlananpersonelsayisilistesi",
            controller: 'proje_planlanan_personel_sayisi_liste_controller',
            templateUrl: "views/proje_planlanan_personel_sayisi_liste.html",
            data: { pageTitle: 'Proje Planlanan Personel Sayısı Listesi', altTab: 10 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_planlanan_personel_sayisi_liste_controller.js', 'js/angular-services/proje_planlanan_personel_sayisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/personel_tipi.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.fizibilite.planlananpersonelsayisikayit', {
            url: "/planlananpersonelsayisikayit/:projePlanlananPersonelSayisiID",
            controller: 'proje_planlanan_personel_sayisi_kayit_controller',
            templateUrl: "views/proje_planlanan_personel_sayisi_kayit.html",
            data: { pageTitle: 'Proje Planlanan Personel Sayısı Kayıt', altTab: 10 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_planlanan_personel_sayisi_kayit_controller.js', 'js/angular-services/proje_planlanan_personel_sayisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/personel_tipi.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.projelerkayit.fizibilite.tedariklistesi', {
            url: "/tedariklistesi",
            controller: 'proje_tedarik_liste_controller',
            templateUrl: "views/proje_tedarik_liste.html",
            data: { pageTitle: 'Proje Tedarik Listesi', altTab: 12 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_tedarik_liste_controller.js', 'js/angular-services/proje_tedarik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.fizibilite.tedarikkayit', {
            url: "/tedarikkayit/:tedarikNo",
            controller: 'proje_tedarik_kayit_controller',
            templateUrl: "views/proje_tedarik_kayit.html",
            data: { pageTitle: 'Proje Tedarik Kayıt', altTab: 12 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_tedarik_kayit_controller.js', 'js/angular-services/proje_tedarik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.projelerkayit.risk', {
            url: "/risk",
            templateUrl: "views/proje_risk.html",
            data: { pageTitle: 'Proje Risk İşlemleri' },

        })

        .state('proje.projelerkayit.risk.projerisklistesi', {
            url: "/projerisklistesi",
            controller: 'proje_risk_liste_controller',
            templateUrl: "views/proje_risk_liste.html",
            data: { pageTitle: 'ProjeRisk Listesi', altTab: 31 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_risk_liste_controller.js', 'js/angular-services/proje_risk.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/raporlar.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.risk.projeriskkayit', {
            url: "/projeriskkayit/:projeRiskID",
            controller: 'proje_risk_kayit_controller',
            templateUrl: "views/proje_risk_kayit.html",
            data: { pageTitle: 'ProjeRisk Kayıt', altTab: 31 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_risk_kayit_controller.js', 'js/angular-services/proje_risk.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/risk_turu.js']
                        },

                        {
                            files: ['js/angular-services/olasilik_degeri.js']
                        },
                        {
                            files: ['js/angular-services/etki_degeri.js']
                        },
                        {
                            files: ['js/angular-services/proje_personel.js']
                        },
                        {
                            files: ['js/angular-services/risk_isleme_stratejisi.js']
                        },
                        {
                            files: ['js/angular-services/surec.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.projelerkayit.risk.projerisklistesi.projerisktehditgerceklesmesayisilistesi', {
            url: "/:projeRiskID/projerisktehditgerceklesmesayisilistesi",
            controller: 'proje_risk_tehdit_gerceklesme_sayisi_liste_controller',
            templateUrl: "views/proje_risk_tehdit_gerceklesme_sayisi_liste.html",
            data: { pageTitle: 'Proje Risk Tehdit Gerçeklesme Sayisi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_risk_tehdit_gerceklesme_sayisi_liste_controller.js', 'js/angular-services/proje_risk_tehdit_gerceklesme_sayisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        }
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.risk.projerisklistesi.projerisktehditgerceklesmesayisikayit', {
            url: "/:projeRiskID/projerisktehditgerceklesmesayisikayit/:projeRiskTehditGerceklesmeSayisiID",
            controller: 'proje_risk_tehdit_gerceklesme_sayisi_kayit_controller',
            templateUrl: "views/proje_risk_tehdit_gerceklesme_sayisi_kayit.html",
            data: { pageTitle: 'Proje Risk Tehdit Gerçeklesme Sayısı Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_risk_tehdit_gerceklesme_sayisi_kayit_controller.js', 'js/angular-services/proje_risk_tehdit_gerceklesme_sayisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan', {
            url: "/plan",
            templateUrl: "views/proje_plan.html",
            data: { pageTitle: 'Proje Plan' },

        })


        .state('proje.projelerkayit.plan.konfigurasyonaraclistesi', {
            url: "/konfigurasyonaraclistesi",
            controller: 'proje_konfigurasyon_arac_liste_controller',
            templateUrl: "views/proje_konfigurasyon_arac_liste.html",
            data: { pageTitle: 'Proje Konfigürasyon Araç Listesi', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_konfigurasyon_arac_liste_controller.js', 'js/angular-services/proje_konfigurasyon_arac.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/konfigurasyon_arac.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.konfigurasyonarackayit', {
            url: "/konfigurasyonarackayit/:konfigurasyonAracNo",
            controller: 'proje_konfigurasyon_arac_kayit_controller',
            templateUrl: "views/proje_konfigurasyon_arac_kayit.html",
            data: { pageTitle: 'Proje Konfigürasyon Araç Kayıt', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_konfigurasyon_arac_kayit_controller.js', 'js/angular-services/proje_konfigurasyon_arac.js', 'js/angular-services/konfigurasyon_arac.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.kullanilacakmevcutkaynaklarlistesi', {
            url: "/kullanilacakmevcutkaynaklarlistesi",
            controller: 'proje_kullanilacak_mevcut_kaynaklar_liste_controller',
            templateUrl: "views/proje_kullanilacak_mevcut_kaynaklar_liste.html",
            data: { pageTitle: 'Proje Kullanılacak Mevcut Kaynak Listesi', altTab: 4 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_kullanilacak_mevcut_kaynaklar_liste_controller.js', 'js/angular-services/proje_kullanilacak_mevcut_kaynaklar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.kullanilacakmevcutkaynaklarkayit', {
            url: "/kullanilacakmevcutkaynaklarkayit/:kullanilacakmevcutkaynaklarNo",
            controller: 'proje_kullanilacak_mevcut_kaynaklar_kayit_controller',
            templateUrl: "views/proje_kullanilacak_mevcut_kaynaklar_kayit.html",
            data: { pageTitle: 'Proje Kullanılacak Mevcut Kaynak Kayıt', altTab: 4 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_kullanilacak_mevcut_kaynaklar_kayit_controller.js', 'js/angular-services/proje_kullanilacak_mevcut_kaynaklar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.projelerkayit.plan.projepersonelrollistesi', {
            url: "/projepersonelrollistesi",
            controller: 'proje_personel_rol_liste_controller',
            templateUrl: "views/proje_personel_rol_liste.html",
            data: { pageTitle: 'Proje Personel ve  Rol Listesi', altTab: 5 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_personel_rol_liste_controller.js', 'js/angular-services/proje_personel_rol.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_rol.js']
                        },
                        {
                            files: ['js/angular-services/proje_personel.js']
                        },
                        
                    ]);
                }
            }
        })

        //proje persoenle rol düzenleme sayfası
        .state('proje.projelerkayit.plan.projepersonelrolkayit', {
            url: "/projepersonelrolkayit/:projePersonelRolID",
            controller: 'proje_personel_rol_kayit_controller',
            templateUrl: "views/proje_personel_rol_kayit.html",
            data: { pageTitle: 'Proje Personel ve Rol Kayıt', altTab: 5 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_personel_rol_kayit_controller.js', 'js/angular-services/proje_personel_rol.js', 'js/angular-services/proje_personel.js', 'js/angular-services/proje_rol.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        
                    ]);
                }
            }
        })

        //proje personel düzenleme sayfası
        .state('proje.projelerkayit.plan.projepersonelkayit', {
            url: "/projepersonelkayit/:projePersonelID",
            controller: 'proje_personel_kayit_controller',
            templateUrl: "views/proje_personel_kayit.html",
            data: { pageTitle: 'Proje Personel Kayıt', altTab: 5 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_personel_kayit_controller.js', 'js/angular-services/proje_personel.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //proje  rol düzenleme sayfası
        .state('proje.projelerkayit.plan.projerolkayit', {
            url: "/projerolkayit/:projeRolID",
            controller: 'proje_rol_kayit_controller',
            templateUrl: "views/proje_rol_kayit.html",
            data: { pageTitle: 'Proje Rol Kayıt', altTab: 5 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_rol_kayit_controller.js', 'js/angular-services/proje_rol.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_musteri_tipi.js']
                        },
                        {
                            files: ['js/angular-services/personel_tipi.js']
                        },
                    ]);
                }
            }
        })



        .state('proje.projelerkayit.plan.musteriegitimilistesi', {
            url: "/musteriegitimilistesi",
            controller: 'proje_musteri_egitimi_liste_controller',
            templateUrl: "views/proje_musteri_egitimi_liste.html",
            data: { pageTitle: 'Proje Müşteri Eğitimi Listesi', altTab: 6 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_musteri_egitimi_liste_controller.js', 'js/angular-services/proje_musteri_egitimi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            name: 'ngTagsInput',
                            files: ['js/plugins/ngTags/ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
                        },
                        {
                            files: ['js/angular-services/proje_personel.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.projelerkayit.plan.musteriegitimikayit', {
            url: "/musteriegitimikayit/:musteriEgitimiNo",
            controller: 'proje_musteri_egitimi_kayit_controller',
            templateUrl: "views/proje_musteri_egitimi_kayit.html",
            data: { pageTitle: 'Proje Müşteri Eğitimi Kayıt', altTab: 6 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_musteri_egitimi_kayit_controller.js', 'js/angular-services/proje_musteri_egitimi.js', 'js/angular-services/proje_personel.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            name: 'ngTagsInput',
                            files: ['js/plugins/ngTags/ng-tags-input.min.js', 'css/plugins/ngTags/ng-tags-input-custom.min.css']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.verilecekegitimlistesi', {
            url: "/verilecekegitimlistesi",
            controller: 'projede_verilecek_egitim_liste_controller',
            templateUrl: "views/projede_verilecek_egitim_liste.html",
            data: { pageTitle: 'Projede Verilecek Eğitim Listesi', altTab: 7 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/projede_verilecek_egitim_liste_controller.js', 'js/angular-services/projede_verilecek_egitim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.verilecekegitimkayit', {
            url: "/verilecekegitimkayit/:verilecekEgitimNo",
            controller: 'projede_verilecek_egitim_kayit_controller',
            templateUrl: "views/projede_verilecek_egitim_kayit.html",
            data: { pageTitle: 'Projede Verilecek Eğitim Kayıt', altTab: 7 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/projede_verilecek_egitim_kayit_controller.js', 'js/angular-services/projede_verilecek_egitim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.egitimalanpersonellistesi', {
            url: "/egitimalanpersonellistesi",
            controller: 'projede_egitim_alan_personel_liste_controller',
            templateUrl: "views/projede_egitim_alan_personel_liste.html",
            data: { pageTitle: 'Projede Eğitim Alan Personel Listesi', altTab: 8 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/projede_egitim_alan_personel_liste_controller.js', 'js/angular-services/projede_egitim_alan_personel.js', 'js/angular-services/proje_personel.js', 'js/angular-services/projede_verilecek_egitim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/projede_verilecek_egitim.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.egitimalanpersonelkayit', {
            url: "/egitimalanpersonelkayit/:egitimalanpersonelNo",
            controller: 'projede_egitim_alan_personel_kayit_controller',
            templateUrl: "views/projede_egitim_alan_personel_kayit.html",
            data: { pageTitle: 'Projede Eğitim Alan Personel Kayıt', altTab: 8 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/projede_egitim_alan_personel_kayit_controller.js', 'js/angular-services/projede_egitim_alan_personel.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/projede_verilecek_egitim.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.teslimedilecekurunlistesi', {
            url: "/teslimedilecekurunlistesi",
            controller: 'proje_teslim_edilecek_urun_liste_controller',
            templateUrl: "views/proje_teslim_edilecek_urun_liste.html",
            data: { pageTitle: 'Proje Teslim Edilecek Ürün Listesi', altTab: 11 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_teslim_edilecek_urun_liste_controller.js', 'js/angular-services/proje_teslim_edilecek_urun.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_personel.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.teslimedilecekurunkayit', {
            url: "/teslimedilecekurunkayit/:teslimEdilecekUrunNo",
            controller: 'proje_teslim_edilecek_urun_kayit_controller',
            templateUrl: "views/proje_teslim_edilecek_urun_kayit.html",
            data: { pageTitle: 'Proje Teslim Edilecek Ürün Kayıt', altTab: 11 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_teslim_edilecek_urun_kayit_controller.js', 'js/angular-services/proje_teslim_edilecek_urun.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })










        .state('proje.projelerkayit.plan.surumyonetimstratejisilistesi', {
            url: "/surumyonetimstratejisilistesi",
            controller: 'proje_surum_yonetim_stratejisi_liste_controller',
            templateUrl: "views/proje_surum_yonetim_stratejisi_liste.html",
            data: { pageTitle: 'Proje Sürüm Yönetim Stratejisi Listesi', altTab: 13 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_surum_yonetim_stratejisi_liste_controller.js', 'js/angular-services/proje_surum_yonetim_stratejisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.surumyonetimstratejisikayit', {
            url: "/surumyonetimstratejisikayit/:surumyonetimstratejisiNo",
            controller: 'proje_surum_yonetim_stratejisi_kayit_controller',
            templateUrl: "views/proje_surum_yonetim_stratejisi_kayit.html",
            data: { pageTitle: 'Proje Sürüm Yönetim Stratejisi Kayıt', altTab: 13 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_surum_yonetim_stratejisi_kayit_controller.js', 'js/angular-services/proje_surum_yonetim_stratejisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })







        .state('proje.projelerkayit.plan.projeplanilistesi', {
            url: "/projeplanilistesi",
            controller: 'proje_plani_liste_controller',
            templateUrl: "views/proje_plani_liste.html",
            data: { pageTitle: 'Proje Planı Listesi', altTab: 15 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_plani_liste_controller.js', 'js/angular-services/proje_plani.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                        {
                            files: ['js/angular-services/proje_plani_plan_on_kosul.js']
                        },

                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.projeplanikayit', {
            url: "/projeplanikayit/:projePlanID",
            controller: 'proje_plani_kayit_controller',
            templateUrl: "views/proje_plani_kayit.html",
            data: { pageTitle: 'Proje Planı Kayıt', altTab: 15 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_plani_kayit_controller.js', 'js/angular-services/proje_plani.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                        //{
                        //    files: [ 'js/angular-services/proje_personel.js']
                        //},
                        {
                            files: ['js/angular-services/proje_plani_plan_ilgili.js']
                        }


                    ]);
                }
            }
        })



        .state('proje.projelerkayit.plan.projeplanionkosullistesi', {
            url: "/:projePlanID/:planTaskNo/projeplanionkosullistesi",
            controller: 'proje_plani_plan_on_kosul_liste_controller',
            templateUrl: "views/proje_plani_plan_on_kosul_liste.html",
            data: { pageTitle: 'Proje Planı Plan Ön Koşul Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_plani_plan_on_kosul_liste_controller.js', 'js/angular-services/proje_plani_plan_on_kosul.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-controller/proje_plani_liste_controller.js', 'js/angular-services/proje_plani.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.projelerkayit.plan.projesurumlistesi', {
            url: "/projesurumlistesi",
            controller: 'proje_surum_liste_controller',
            templateUrl: "views/proje_surum_liste.html",
            data: { pageTitle: 'Proje Sürüm Listesi', altTab: 16 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_surum_liste_controller.js', 'js/angular-services/proje_surum.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.projesurumkayit', {
            url: "/projesurumkayit/:projeSurumID",
            controller: 'proje_surum_kayit_controller',
            templateUrl: "views/proje_surum_kayit.html",
            data: { pageTitle: 'Proje Sürüm Kayıt', altTab: 16 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_surum_kayit_controller.js', 'js/angular-services/proje_surum.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.projemodullistesi', {
            url: "/projemodullistesi",
            controller: 'proje_modul_liste_controller',
            templateUrl: "views/proje_modul_liste.html",
            data: { pageTitle: 'Proje Modül Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_modul_liste_controller.js', 'js/angular-services/proje_modul.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.projemodulkayit', {
            url: "/projemodulkayit/:projeModulID",
            controller: 'proje_modul_kayit_controller',
            templateUrl: "views/proje_modul_kayit.html",
            data: { pageTitle: 'Proje Modül Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_modul_kayit_controller.js', 'js/angular-services/proje_modul.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.projedogrulamakriterigruplistesi', {
            url: "/projedogrulamakriterigruplistesi",
            controller: 'proje_dogrulama_kriteri_grup_liste_controller',
            templateUrl: "views/proje_dogrulama_kriteri_grup_liste.html",
            data: { pageTitle: 'Proje Doğrulama Kriteri Grup Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_dogrulama_kriteri_grup_liste_controller.js', 'js/angular-services/proje_dogrulama_kriteri_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.projedogrulamakriterigrupkayit', {
            url: "/projedogrulamakriterigrupkayit/:projeDogrulamaKriteriGrupID",
            controller: 'proje_dogrulama_kriteri_grup_kayit_controller',
            templateUrl: "views/proje_dogrulama_kriteri_grup_kayit.html",
            data: { pageTitle: 'Proje Doğrulama Kriteri Grup Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_dogrulama_kriteri_grup_kayit_controller.js', 'js/angular-services/proje_dogrulama_kriteri_grup.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_dogrulama_kriteri.js']
                        },
                    ]);
                }
            }
        })


        .state('proje.projelerkayit.plan.projedogrulamakriterigrupkayit.projedogrulamakriterilistesi', {
            url: "/projedogrulamakriterilistesi",
            controller: 'proje_dogrulama_kriteri_liste_controller',
            templateUrl: "views/proje_dogrulama_kriteri_liste.html",
            data: { pageTitle: 'Proje Doğrulama Kriteri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_dogrulama_kriteri_liste_controller.js', 'js/angular-services/proje_dogrulama_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.plan.projedogrulamakriterigrupkayit.projedogrulamakriterikayit', {
            url: "/projedogrulamakriterikayit/:kayitNo",
            controller: 'proje_dogrulama_kriteri_kayit_controller',
            templateUrl: "views/proje_dogrulama_kriteri_kayit.html",
            data: { pageTitle: 'Proje Doğrulama Kriteri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_dogrulama_kriteri_kayit_controller.js', 'js/angular-services/proje_dogrulama_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })












        .state('proje.projelerkayit.talepyonetimsistemi', {
            url: "/talepyonetimsistemi",
            templateUrl: "views/proje_talep_yonetim_sistemi.html",
            data: { pageTitle: 'Proje Talep Yönetim Sistemi' }

        })

        .state('proje.projelerkayit.talepyonetimsistemi.projeiterasyonlistesi', {
            url: "/projeiterasyonlistesi",
            controller: 'proje_iterasyon_liste_controller',
            templateUrl: "views/proje_iterasyon_liste.html",
            data: { pageTitle: 'Proje İterasyon Listesi', altTab: 20 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_iterasyon_liste_controller.js', 'js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_surum.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.talepyonetimsistemi.projeiterasyonkayit', {
            url: "/projeiterasyonkayit/:projeIterasyonID",
            controller: 'proje_iterasyon_kayit_controller',
            templateUrl: "views/proje_iterasyon_kayit.html",
            data: { pageTitle: 'Proje iterasyon Kayıt', altTab: 20 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_iterasyon_kayit_controller.js', 'js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_surum.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.projelerkayit.talepyonetimsistemi.projegereksinimlistesi', {
            url: "/projegereksinimlistesi",
            controller: 'proje_gereksinim_liste_controller',
            templateUrl: "views/proje_gereksinim_liste.html",
            data: { pageTitle: 'Proje Gereksinim Listesi', altTab: 21 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_gereksinim_liste_controller.js', 'js/angular-services/proje_gereksinim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },

                    ]);
                }
            }
        })





        .state('proje.projelerkayit.talepyonetimsistemi.projegereksinimkayit', {
            url: "/projegereksinimkayit/:projeGereksinimID",
            controller: 'proje_gereksinim_kayit_controller',
            templateUrl: "views/proje_gereksinim_kayit.html",
            data: { pageTitle: 'Proje Gereksinim Kayıt', altTab: 21 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_gereksinim_kayit_controller.js', 'js/angular-services/proje_gereksinim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },
                        {
                            files: ['js/angular-services/gereksinim_turu.js']
                        },
                        {
                            files: ['js/angular-services/gereksinim_tipi.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.talepyonetimsistemi.projetestsenaryolistesi', {
            url: "/projetestsenaryolistesi",
            controller: 'proje_test_senaryo_liste_controller',
            templateUrl: "views/proje_test_senaryo_liste.html",
            data: { pageTitle: 'Proje Test Senaryo Listesi', altTab: 22 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_test_senaryo_liste_controller.js', 'js/angular-services/proje_test_senaryo.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/angular-services/proje_gereksinim.js']
                        },
                        {
                            files: ['js/angular-services/test_senaryo_test_tipi.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.projelerkayit.talepyonetimsistemi.projetestsenaryokayit', {
            url: "/projetestsenaryokayit/:projeTestSenaryoID",
            controller: 'proje_test_senaryo_kayit_controller',
            templateUrl: "views/proje_test_senaryo_kayit.html",
            data: { pageTitle: 'Proje Test Senaryo Kayıt', altTab: 22 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_test_senaryo_kayit_controller.js', 'js/angular-services/proje_test_senaryo.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/proje_test_senaryo_test_adim.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/angular-services/proje_gereksinim.js']
                        },
                        {
                            files: ['js/angular-services/test_senaryo_test_tipi.js']
                        },
                    ]);
                }
            }
        })




        .state('proje.projelerkayit.dokuman', {
            url: "/dokuman",
            templateUrl: "views/proje_dokuman.html",
            data: { pageTitle: 'Proje Döküman' },

        })

        .state('proje.projelerkayit.dokuman.projedokumanlistesi', {
            url: "/projedokumanlistesi",
            controller: 'proje_dokuman_liste_controller',
            templateUrl: "views/proje_dokuman_liste.html",
            data: { pageTitle: 'Proje Döküman Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_dokuman_liste_controller.js', 'js/angular-services/proje_dokuman.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                        },
                        {
                            files: ['js/angular-services/proje_dokuman_dosya_tipi.js']
                        },
                    ]);
                }
            }
        })


        //B.G işlemleri
        .state('proje.bilgiguvenligirisk', {
            url: "/bilgiguvenligirisk",
            templateUrl: "views/proje_fizibilite.html",
            data: { pageTitle: 'Bilgi Güvenliği Risk' },

        })
        .state('proje.bilgiguvenligirisklistesi', {
            url: "/bilgiguvenligirisklistesi",
            controller: 'b_g_risk_liste_controller',
            templateUrl: "views/b_g_risk_liste.html",
            data: { pageTitle: 'Bilgi Güvenliği Risk Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_liste_controller.js', 'js/angular-services/b_g_risk.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                    ]);
                }
            }
        })





        .state('proje.bilgiguvenligiriskkayit', {
            url: "/bilgiguvenligiriskkayit/:bgRiskID",
            controller: 'b_g_risk_kayit_controller',
            templateUrl: "views/b_g_risk_kayit.html",
            data: { pageTitle: 'Bilgi Güvenliği Risk Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_kayit_controller.js', 'js/angular-services/b_g_risk.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/varlik_degeri.js']
                        },
                        {
                            files: ['js/angular-services/varlik_olasilik_etki_degeri_sonuc.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            files: ['js/angular-services/uygulama_kontrol_kriteri.js']
                        },

                        {
                            files: ['js/angular-services/b_g_aciklik.js']
                        },
                        {
                            files: ['js/angular-services/b_g_risk_tehdit.js']
                        },
                        {
                            files: ['js/angular-services/etki_degeri.js']
                        },
                        {
                            files: ['js/angular-services/olasilik_degeri.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/risk.js']
                        },
                        {
                            files: ['js/angular-services/risk_isleme_stratejisi.js']
                        },
                        {
                            files: ['js/angular-services/surec.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.bilgiguvenligirisklistesi.bgriskuygulamakontrolkriterilistesi', {
            url: "/:bgRiskID/bgriskuygulamakontrolkriterilistesi/:bgRiskNo",
            controller: 'b_g_risk_uygulama_kontrol_kriteri_liste_controller',
            templateUrl: "views/b_g_risk_uygulama_kontrol_kriteri_liste.html",
            data: { pageTitle: 'Bilgi Güvenliği Risk Uygulama Kontrol Kriteri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_uygulama_kontrol_kriteri_liste_controller.js', 'js/angular-services/b_g_risk_uygulama_kontrol_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/uygulama_kontrol_kriteri_grup.js']
                        },
                        {
                            files: ['js/angular-services/uygulama_kontrol_kriteri.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.bilgiguvenligirisklistesi.bgriskuygulamakontrolkriterilistesi.bgriskuygulamakontrolkriterikayit', {
            url: "/bgriskuygulamakontrolkriterikayit/:bgRiskUygulamaKontrolKriteriID",
            controller: 'b_g_risk_uygulama_kontrol_kriteri_kayit_controller',
            templateUrl: "views/b_g_risk_uygulama_kontrol_kriteri_kayit.html",
            data: { pageTitle: 'BGRiskUygulamaKontrolKriteri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_uygulama_kontrol_kriteri_kayit_controller.js', 'js/angular-services/b_g_risk_uygulama_kontrol_kriteri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        .state('proje.bilgiguvenligirisklistesi.bgrisktehditgerceklesmesayisilistesi', {
            url: "/:bgRiskID/bgrisktehditgerceklesmesayisilistesi/:bgRiskNo",
            controller: 'b_g_risk_tehdit_gerceklesme_sayisi_liste_controller',
            templateUrl: "views/b_g_risk_tehdit_gerceklesme_sayisi_liste.html",
            data: { pageTitle: 'Bilgi Güvenliği Risk Tehdit Gerceklesme Sayisi Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_tehdit_gerceklesme_sayisi_liste_controller.js', 'js/angular-services/b_g_risk_tehdit_gerceklesme_sayisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                    ]);
                }
            }
        })





        .state('proje.bilgiguvenligirisklistesi.bgrisktehditgerceklesmesayisilistesi.bgrisktehditgerceklesmesayisikayit', {
            url: "/bgrisktehditgerceklesmesayisikayit/:bgRiskTehditGerceklesmeSayisiID",
            controller: 'b_g_risk_tehdit_gerceklesme_sayisi_kayit_controller',
            templateUrl: "views/b_g_risk_tehdit_gerceklesme_sayisi_kayit.html",
            data: { pageTitle: 'BGRiskTehditGerceklesmeSayisi Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/b_g_risk_tehdit_gerceklesme_sayisi_kayit_controller.js', 'js/angular-services/b_g_risk_tehdit_gerceklesme_sayisi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                    ]);
                }
            }
        })



        .state('proje.riskturulistesi', {
            url: "/riskturulistesi",
            controller: 'risk_turu_liste_controller',
            templateUrl: "views/risk_turu_liste.html",
            data: { pageTitle: 'Risk Türü Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/risk_turu_liste_controller.js', 'js/angular-services/risk_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('proje.riskturukayit', {
            url: "/riskturukayit/:riskTuruID",
            controller: 'risk_turu_kayit_controller',
            templateUrl: "views/risk_turu_kayit.html",
            data: { pageTitle: 'Risk Türü Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/risk_turu_kayit_controller.js', 'js/angular-services/risk_turu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        //İnsan Kaynakları İşlemleri

        .state('insankaynaklari', {
            abstract: true,
            url: "/insankaynaklari",
            templateUrl: "views/common/content.html",
        })



        //İnsan Kaynakları Personel
        .state('insankaynaklari.ikpersonellistesi', {
            url: "/ikpersonellistesi",
            controller: 'ik_personel_liste_controller',
            templateUrl: "views/ik_personel_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_liste_controller.js', 'js/angular-services/ik_personel.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        //{
                        //    files: ['js/angular-controller/kullanici_controller.js', 'js/angular-services/kullanici.js']
                        //},
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },

                    ]);
                }
            }
        })


        .state('insankaynaklari.ikpersonelkayit', {
            url: "/ikpersonelkayit/:kullaniciID",
            controller: 'ik_personel_kayit_controller',
            templateUrl: "views/ik_personel_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_kayit_controller.js', 'js/angular-services/ik_personel.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/ik_personel_bakmaya_yukumlu_oldugu_kisi.js']
                        },
                        {
                            files: ['js/angular-services/ik_departman.js']
                        }, {
                            files: ['js/angular-services/ik_birim.js']
                        },
                        {
                            files: ['js/angular-services/ik_unvan.js']
                        },
                    ]);
                }
            }
        })

        .state('insankaynaklari.ikpersonelkayit.ikpersonelkart', {
            url: "/ikpersonelkart",
            templateUrl: "views/ik_personel_kart.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Kart' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        //{
                        //    files: ['js/angular-controller/ik_personel_kayit_controller.js', 'js/angular-services/ik_personel.js']
                        //},
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        }
                    ]);
                }
            }
        })



        .state('insankaynaklari.ikpersonelkayit.ikpersoneleklerlistesi', {
            url: "/ikpersoneleklerlistesi",
            controller: 'ik_personel_ekler_liste_controller',
            templateUrl: "views/ik_personel_ekler_liste.html",
            data: { pageTitle: 'İnsan Kaynaklari Personel Ekler Listesi', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_ekler_liste_controller.js', 'js/angular-services/ik_personel_ekler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ik_dosya_tipi.js']
                        },

                    ]);
                }
            }
        })

        .state('insankaynaklari.ikpersonelkayit.ikpersoneleklerkayit', {
            url: "/ikpersoneleklerkayit/:ikPersonelEklerID",
            controller: 'ik_personel_ekler_kayit_controller',
            templateUrl: "views/ik_personel_ekler_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Ekler Kayıt', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_ekler_kayit_controller.js', 'js/angular-services/ik_personel_ekler.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                        },
                        {
                            files: ['js/angular-services/ik_dosya_tipi.js']
                        },
                    ]);
                }
            }
        })



        //Sayfanın controller için egitim personel controller kullanılıyor.
        .state('insankaynaklari.ikpersonelkayit.ikpersonelegitimlistesi', {
            url: "/ikpersonelegitimlistesi",
            controller: 'ik_personel_egitim_liste_controller',
            templateUrl: "views/ik_personel_egitim_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Eğitim Listesi', altTab: 3 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_egitim_liste_controller.js']
                        },
                        {
                            files: ['js/angular-services/ik_egitim_personel.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })

        //Sayfanın controller için ik personel dış görev controller kullanılıyor
        .state('insankaynaklari.ikpersonelkayit.ikdisgorevlistesi', {
            url: "/ikdisgorevlistesi",
            controller: 'ik_personel_dis_gorev_liste_controller',
            templateUrl: "views/ik_personel_dis_gorev_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Dış Görev Listesi', altTab: 5 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_dis_gorev_liste_controller.js', 'js/angular-services/ik_dis_gorev.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },

                    ]);
                }
            }
        })



        //Sayfanın controller için toplantı katılımcı controller kullanılıyor.
        .state('insankaynaklari.ikpersonelkayit.ikpersoneltoplantilistesi', {
            url: "/ikpersoneltoplantilistesi",
            controller: 'ik_personel_toplanti_liste_controller',
            templateUrl: "views/ik_personel_toplanti_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Toplantı Listesi', altTab: 4 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_toplanti_liste_controller.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_katilimci.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_turu.js']
                        },
                    ]);
                }
            }
        })




        .state('insankaynaklari.ikpersonelkayit.ikpersonelizinlistesi', {
            url: "/ikpersonelizinlistesi",
            controller: 'ik_personel_izin_liste_controller',
            templateUrl: "views/ik_personel_izin_liste.html",
            data: { pageTitle: 'İnsan Kaynaklari Personel İzin Listesi', altTab: 6 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_izin_liste_controller.js', 'js/angular-services/ik_personel_izin.js', 'js/angular-services/raporlar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },

                    ]);
                }
            }
        })





        .state('insankaynaklari.ikpersonelkayit.ikpersonelizinkayit', {
            url: "/ikpersonelizinkayit/:ikPersonelIzinID",
            controller: 'ik_personel_izin_kayit_controller',
            templateUrl: "views/ik_personel_izin_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Personel İzin Kayıt', altTab: 6 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_izin_kayit_controller.js', 'js/angular-services/ik_personel_izin.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })



        .state('insankaynaklari.ikpersonelkayit.ikpersonelprojelistesi', {
            url: "/ikpersonelprojelistesi",
            controller: 'ik_personel_projeler_liste_controller',
            templateUrl: "views/ik_personel_projeler_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Proje Personel Listesi', altTab: 7 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_projeler_liste_controller.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/proje_turu.js']
                        },
                    ]);
                }
            }
        })



        .state('insankaynaklari.ikpersonelkayit.ikpersonelgecmisfirmabilgilerilistesi', {
            url: "/ikpersonelgecmisfirmabilgilerilistesi",
            controller: 'ik_personel_gecmis_firma_bilgileri_liste_controller',
            templateUrl: "views/ik_personel_gecmis_firma_bilgileri_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Geçmiş Firma Bilgileri Listesi', altTab: 8 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_gecmis_firma_bilgileri_liste_controller.js', 'js/angular-services/ik_personel_gecmis_firma_bilgileri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikpersonelkayit.ikpersonelgecmisfirmabilgilerikayit', {
            url: "/ikpersonelgecmisfirmabilgilerikayit/:ikPersonelGecmisFirmaBilgileriID",
            controller: 'ik_personel_gecmis_firma_bilgileri_kayit_controller',
            templateUrl: "views/ik_personel_gecmis_firma_bilgileri_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Geçmiş Firma Bilgileri Kayıt', altTab: 8 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_gecmis_firma_bilgileri_kayit_controller.js', 'js/angular-services/ik_personel_gecmis_firma_bilgileri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })




        .state('insankaynaklari.ikpersonelkayit.ikpersonelzimmetlistesi', {
            url: "/ikpersonelzimmetlistesi",
            controller: 'ik_personel_zimmet_liste_controller',
            templateUrl: "views/ik_personel_zimmet_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Zimmet Listesi', altTab: 9 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_zimmet_liste_controller.js']
                        },
                        {
                            files: ['js/angular-services/ik_zimmet.js', 'js/angular-services/raporlar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })



        .state('insankaynaklari.ikpersonelkayit.ikpersonelokulegitimlistesi', {
            url: "/ikpersonelokulegitimlistesi",
            controller: 'ik_personel_okul_egitim_liste_controller',
            templateUrl: "views/ik_personel_okul_egitim_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Okul Eğitim Listesi', altTab: 10 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_okul_egitim_liste_controller.js', 'js/angular-services/ik_personel_okul_egitim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                    ]);
                }
            }
        })





        .state('insankaynaklari.ikpersonelkayit.ikpersonelokulegitimkayit', {
            url: "/ikpersonelokulegitimkayit/:ikPersonelOkulEgitimID",
            controller: 'ik_personel_okul_egitim_kayit_controller',
            templateUrl: "views/ik_personel_okul_egitim_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Okul Eğitim Kayıt', altTab: 10 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_okul_egitim_kayit_controller.js', 'js/angular-services/ik_personel_okul_egitim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })


        //İnsan Kaynakları Personel Avans

        .state('insankaynaklari.ikpersonelkayit.ikpersonelavanslistesi', {
            url: "/ikpersonelavanslistesi",
            controller: 'ik_personel_avans_liste_controller',
            templateUrl: "views/ik_personel_avans_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Avans Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_avans_liste_controller.js', 'js/angular-services/avans.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ik_personel.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/avans_turu.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikpersonelkayit.ikpersonelavanskayit', {
            url: "/ikpersonelavanskayit/:ikPersonelAvansID",
            controller: 'ik_personel_avans_kayit_controller',
            templateUrl: "views/ik_personel_avans_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Avans Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_avans_kayit_controller.js', 'js/angular-services/avans.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                        {
                            files: ['js/angular-services/projeler.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                        {
                            files: ['js/angular-services/avans_turu.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikpersonelkayit.ikpersonelmasraflistesi', {
            url: "/ikpersonelmasraflistesi",
            controller: 'ik_personel_masraf_liste_controller',
            templateUrl: "views/ik_personel_masraf_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Masraf Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_masraf_liste_controller.js', 'js/angular-services/masraf.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/raporlar.js']
                        },
                    ]);
                }
            }
        })


        .state('insankaynaklari.ikpersonelkayit.ikpersonelmasrafkayit', {
            url: "/ikpersonelmasrafkayit/:ikPersonelMasrafID",
            controller: 'ik_personel_masraf_kayit_controller',
            templateUrl: "views/ik_personel_masraf_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Personel Masraf Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_personel_masraf_kayit_controller.js', 'js/angular-services/masraf.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/masraf_detay.js']
                        },

                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                        },
                        {
                            files: ['js/angular-services/masraf_detay_ekler.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/avans.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                    ]);
                }
            }
        })



        //İnsan Kaynakları Etkinlik

        .state('insankaynaklari.iketkinliklistesi', {
            url: "/iketkinliklistesi",
            controller: 'ik_etkinlik_liste_controller',
            templateUrl: "views/ik_etkinlik_liste.html",
            data: { pageTitle: 'İnsan Kaynları Etkinlik Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_etkinlik_liste_controller.js', 'js/angular-services/ik_etkinlik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.iketkinlikkayit', {
            url: "/iketkinlikkayit/:ikEtkinlikID",
            controller: 'ik_etkinlik_kayit_controller',
            templateUrl: "views/ik_etkinlik_kayit.html",
            data: { pageTitle: 'İnsan Kaynları Etkinlik Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_etkinlik_kayit_controller.js', 'js/angular-services/ik_etkinlik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ik_istirak.js']
                        },
                        {
                            files: ['js/angular-services/ik_firma.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/ik_etkinlik_personel.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                        },
                        {
                            files: ['js/angular-services/ik_etkinlik_dosya.js']
                        },
                    ]);
                }
            }
        })






        //insan Kaynakları Dış Görev

        .state('insankaynaklari.ikdisgorevlistesi', {
            url: "/ikdisgorevlistesi",
            controller: 'ik_dis_gorev_liste_controller',
            templateUrl: "views/ik_dis_gorev_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Dış Görev Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_dis_gorev_liste_controller.js', 'js/angular-services/ik_dis_gorev.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ulasim_sekli_tipi.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikdisgorevkayit', {
            url: "/ikdisgorevkayit/:ikDisGorevID",
            controller: 'ik_dis_gorev_kayit_controller',
            templateUrl: "views/ik_dis_gorev_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Dış Görev Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_dis_gorev_kayit_controller.js', 'js/angular-services/ik_dis_gorev.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/ulasim_sekli_tipi.js']
                        }
                    ]);
                }
            }
        })



        // İnsan Kaynakları Eğitim

        .state('insankaynaklari.ikegitimlistesi', {
            url: "/ikegitimlistesi",
            controller: 'ik_egitim_liste_controller',
            templateUrl: "views/ik_egitim_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Eğitim Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_egitim_liste_controller.js', 'js/angular-services/ik_egitim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                    ]);
                }
            }
        })





        .state('insankaynaklari.ikegitimkayit', {
            url: "/ikegitimkayit/:ikEgitimID",
            controller: 'ik_egitim_kayit_controller',
            templateUrl: "views/ik_egitim_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Eğitim Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_egitim_kayit_controller.js', 'js/angular-services/ik_egitim.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ik_egitim_veren_kurum.js']
                        },
                        {
                            files: ['js/angular-services/ik_egitim_personel.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/ik_egitim_dosya.js']
                        },
                        {
                            files: ['js/angular-controller/ik_egitim_dosya_tipi_liste_controller.js', 'js/angular-services/ik_egitim_dosya_tipi.js']
                        },

                    ]);
                }
            }
        })






        //İnsan Kaynakları İş Başvuruları

        .state('insankaynaklari.ikisbasvurularilistesi', {
            url: "/ikisbasvurularilistesi",
            controller: 'ik_is_basvurulari_liste_controller',
            templateUrl: "views/ik_is_basvurulari_liste.html",
            data: { pageTitle: 'İnsan Kaynakları İş Başvuruları Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_is_basvurulari_liste_controller.js', 'js/angular-services/ik_is_basvurulari.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikisbasvurularikayit', {
            url: "/ikisbasvurularikayit/:ikIsBasvurulariID",
            controller: 'ik_is_basvurulari_kayit_controller',
            templateUrl: "views/ik_is_basvurulari_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları İş Başvuruları Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_is_basvurulari_kayit_controller.js', 'js/angular-services/ik_is_basvurulari.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ik_is_basvurulari_gorusmeler.js']
                        },
                        {
                            files: ['js/angular-services/ik_is_basvurulari_gorusmeler_ekler.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                        },
                        {
                            files: ['js/angular-services/ik_departman.js']
                        },
                    ]);
                }
            }
        })






        //İnsan Kaynakları Çağrı

        .state('insankaynaklari.ikcagrilistesi', {
            url: "/ikcagrilistesi",
            controller: 'ik_cagri_liste_controller',
            templateUrl: "views/ik_cagri_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Çağrı Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_cagri_liste_controller.js', 'js/angular-services/ik_cagri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },

                    ]);
                }
            }
        })





        .state('insankaynaklari.ikcagrikayit', {
            url: "/ikcagrikayit/:ikCagriID",
            controller: 'ik_cagri_kayit_controller',
            templateUrl: "views/ik_cagri_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Çağrı Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_cagri_kayit_controller.js', 'js/angular-services/ik_cagri.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        }
                    ]);
                }
            }
        })



        //İnsan Kaynaklari Kargo Bilgileri


        .state('insankaynaklari.ikkargolistesi', {
            url: "/ikkargolistesi",
            controller: 'ik_kargo_liste_controller',
            templateUrl: "views/ik_kargo_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Kargo Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_kargo_liste_controller.js', 'js/angular-services/ik_kargo.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/kargo_sirketi.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikkargokayit', {
            url: "/ikkargokayit/:ikKargoID",
            controller: 'ik_kargo_kayit_controller',
            templateUrl: "views/ik_kargo_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Kargo Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_kargo_kayit_controller.js', 'js/angular-services/ik_kargo.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/kargo_sirketi.js']
                        },
                    ]);
                }
            }
        })

        //İnsan Kaynakları Demirbaş İşlemleri

        .state('insankaynaklari.ikdemirbaslistesi', {
            url: "/ikdemirbaslistesi",
            controller: 'ik_demirbas_liste_controller',
            templateUrl: "views/ik_demirbas_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Demirbaş İşlemleri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_demirbas_liste_controller.js', 'js/angular-services/ik_demirbas.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/raporlar.js']
                        }
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikdemirbaskayit', {
            url: "/ikdemirbaskayit/:ikDemirbasID",
            controller: 'ik_demirbas_kayit_controller',
            templateUrl: "views/ik_demirbas_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Demirbaş İşlemleri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_demirbas_kayit_controller.js', 'js/angular-services/ik_demirbas.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ik_demirbas_cinsi.js']
                        },
                        {
                            files: ['js/angular-services/ik_birim.js']
                        },
                    ]);
                }
            }
        })

        //İnsan Kaynakları Zimmet İşlemleri

        .state('insankaynaklari.ikzimmetlistesi', {
            url: "/ikzimmetlistesi",
            controller: 'ik_zimmet_liste_controller',
            templateUrl: "views/ik_zimmet_liste.html",
            data: { pageTitle: 'İnsan Kaynakları Zimmet İşlemleri Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_zimmet_liste_controller.js', 'js/angular-services/ik_zimmet.js', 'js/angular-services/raporlar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })





        .state('insankaynaklari.ikzimmetkayit', {
            url: "/ikzimmetkayit/:ikZimmetID",
            controller: 'ik_zimmet_kayit_controller',
            templateUrl: "views/ik_zimmet_kayit.html",
            data: { pageTitle: 'İnsan Kaynakları Zimmet İşlemleri Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/ik_zimmet_kayit_controller.js', 'js/angular-services/ik_zimmet.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/ik_demirbas.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        }
                    ]);
                }
            }
        })



        //İnsan Kaynakları Avans Onay
        .state('insankaynaklari.avanslistesi', {
            url: "/avanslistesi",
            controller: 'avans_liste_controller',
            templateUrl: "views/avans_liste.html",
            data: { pageTitle: 'Avans Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/avans_liste_controller.js', 'js/angular-services/avans.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/avans_turu.js']
                        },

                    ]);
                }
            }
        })





        .state('insankaynaklari.avanskayit', {
            url: "/avanskayit/:avansID",
            controller: 'avans_kayit_controller',
            templateUrl: "views/avans_kayit.html",
            data: { pageTitle: 'Avans Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/avans_kayit_controller.js', 'js/angular-services/avans.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                    ]);
                }
            }
        })

        //İnsan kaynakları masraf onay

        .state('insankaynaklari.masraflistesi', {
            url: "/masraflistesi",
            controller: 'masraf_liste_controller',
            templateUrl: "views/masraf_liste.html",
            data: { pageTitle: 'Masraf Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/masraf_liste_controller.js', 'js/angular-services/masraf.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                    ]);
                }
            }
        })





        .state('insankaynaklari.masrafkayit', {
            url: "/masrafkayit/:masrafID",
            controller: 'masraf_kayit_controller',
            templateUrl: "views/masraf_kayit.html",
            data: { pageTitle: 'Masraf Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/masraf_kayit_controller.js', 'js/angular-services/masraf.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/masraf_detay.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                        },
                        {
                            files: ['js/angular-services/masraf_detay_ekler.js']
                        },
                        {
                            name: 'ui.select',
                            files: ['js/plugins/ui-select/select.min.js', 'css/plugins/ui-select/select.min.css']
                        },
                    ]);
                }
            }
        })




        //İnsan kaynakları izinler onay
        .state('insankaynaklari.izinlerlistesi', {
            url: "/izinlerlistesi",
            controller: 'izinler_liste_controller',
            templateUrl: "views/izinler_liste.html",
            data: { pageTitle: 'İzinler Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/izinler_liste_controller.js', 'js/angular-services/ik_personel_izin.js',]
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })

        //Toplantı İşlemleri

        .state('toplanti', {
            abstract: true,
            url: "/toplanti",
            templateUrl: "views/common/content.html",
        })

        // Toplantı İşlemleri

        .state('toplanti.toplantigundemihavuzulistesi', {
            url: "/toplantigundemihavuzulistesi",
            controller: 'toplanti_gundemi_havuzu_liste_controller',
            templateUrl: "views/toplanti_gundemi_havuzu_liste.html",
            data: { pageTitle: 'Toplantı Gündemi Havuzu Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_gundemi_havuzu_liste_controller.js', 'js/angular-services/toplanti_gundemi_havuzu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_gundemi_turu.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_turu.js']
                        },
                    ]);
                }
            }
        })


        .state('toplanti.toplantigundemihavuzukayit', {
            url: "/toplantigundemihavuzukayit/:toplantiGundemiHavuzuID",
            controller: 'toplanti_gundemi_havuzu_kayit_controller',
            templateUrl: "views/toplanti_gundemi_havuzu_kayit.html",
            data: { pageTitle: 'Toplantı Gündemi Havuzu Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_gundemi_havuzu_kayit_controller.js', 'js/angular-services/toplanti_gundemi_havuzu.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_gundemi_turu.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_turu.js']
                        },

                    ]);
                }
            }
        })


        .state('toplanti.toplantilistesi', {
            url: "/toplantilistesi",
            controller: 'toplanti_liste_controller',
            templateUrl: "views/toplanti_liste.html",
            data: { pageTitle: 'Toplantı Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_liste_controller.js', 'js/angular-services/toplanti.js', 'js/angular-services/raporlar.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_katilimci_rolu_tipi.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_turu.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_yeri.js']
                        },
                    ]);
                }
            }
        })





        .state('toplanti.toplantikayit', {
            url: "/toplantikayit/:toplantiID",
            controller: 'toplanti_kayit_controller',
            templateUrl: "views/toplanti_kayit.html",
            data: { pageTitle: 'Toplantı Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/toplanti_kayit_controller.js', 'js/angular-services/toplanti.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_katilimci.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_katilimci.js']
                        },
                        {
                            files: ['css/plugins/dualListbox/bootstrap-duallistbox.min.css', 'js/plugins/dualListbox/jquery.bootstrap-duallistbox.js', 'js/plugins/dualListbox/angular-bootstrap-duallistbox.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_gundemi_havuzu.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_gundem.js']
                        },
                        {
                            files: ['js/angular-services/proje_gereksinim.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },

                        {
                            files: ['js/angular-services/talep_proje.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernotenew/summernote.css', 'css/plugins/summernotenew/summernote-lite.css', 'js/plugins/summernotenew/summernote.min.js', 'js/plugins/summernotenew/angular-summernote.min.js', 'js/plugins/summernotenew/summernote-lite.js']
                        },
                        {
                            files: ['js/angular-services/projeler.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_gundem_talep_proje.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_dokuman.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_turu.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_gundemi_turu.js']
                        },
                        {
                            files: ['js/angular-services/toplanti.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_katilimci_rolu_tipi.js']
                        },
                        {
                            files: ['js/angular-services/surec.js']
                        },
                        {
                            files: ['js/angular-services/talep_siniflandirma_tipi.js']
                        },
                        {
                            files: ['js/angular-services/toplanti_yeri.js']
                        },
                    ]);
                }
            }
        })




        //Talep Proje İşlemleri

        .state('talep', {
            abstract: true,
            url: "/talep",
            templateUrl: "views/common/content.html"
        })



        //Talep Proje
        .state('talep.talepprojelistesi', {
            url: "/talepprojelistesi",
            controller: 'talep_proje_liste_controller',
            templateUrl: "views/talep_proje_liste.html",
            data: { pageTitle: 'Talep Proje Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/talep_proje_liste_controller.js', 'js/angular-services/talep_proje.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/projeler.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                        },
                        {
                            name: 'ui.footable',
                            files: ['js/plugins/footable/angular-footable.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernotenew/summernote.css', 'css/plugins/summernotenew/summernote-lite.css', 'js/plugins/summernotenew/summernote.min.js', 'js/plugins/summernotenew/angular-summernote.min.js', 'js/plugins/summernotenew/summernote-lite.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        }
                    ]);
                }
            }

        })

        .state('talep.talepprojekayit', {
            url: "/talepprojekayit/:talepProjeID",
            controller: 'talep_proje_kayit_controller',
            templateUrl: "views/talep_proje_kayit.html",
            data: { pageTitle: 'Talep Proje Kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                        {
                            files: ['js/angular-controller/talep_proje_kayit_controller.js', 'js/angular-services/talep_proje.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernotenew/summernote.css', 'css/plugins/summernotenew/summernote-lite.css', 'js/plugins/summernotenew/summernote.min.js', 'js/plugins/summernotenew/angular-summernote.min.js', 'js/plugins/summernotenew/summernote-lite.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_surec_log.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_sahibi_log.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_talep_tipi_log.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/projeler.js', 'js/angular-services/proje_fizibiletesi.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/angular-services/proje_gereksinim.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },


                        {
                            name: 'ui.switchery',
                            files: ['css/plugins/switchery/switchery.css', 'js/plugins/switchery/switchery.js', 'js/plugins/switchery/ng-switchery.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_ilgi.js']
                        },
                        {
                            files: ['js/angular-services/talep_bagli_oldugu_talepler.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_aciklama.js']
                        },
                        {
                            files: ['js/plugins/jasny/jasny-bootstrap.min.js', 'css/plugins/jasny/jasny-bootstrap.min.css']
                        },
                        {
                            files: ['js/angular-services/talep_proje_dokuman.js']
                        },
                        {
                            files: ['css/plugins/slick/slick.css', 'css/plugins/slick/slick-theme.css', 'js/plugins/slick/slick.min.js']
                        },
                        {
                            name: 'slick',
                            files: ['js/plugins/slick/angular-slick.min.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_surec_akis_log.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_genel_log.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_dogrulama_kriteri.js']
                        },
                        {
                            files: ['js/angular-services/proje_dogrulama_kriteri.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje_gereksinim.js']
                        },
                        {
                            files: ['js/angular-services/surec.js']
                        },
                        {
                            files: ['js/angular-services/talep_siniflandirma_tipi.js']
                        },
                    ]);
                }
            }

        })

        //Talep Kart

        .state('talep.talepprojekayit.talepprojekart', {
            url: "/talepprojekart",
            //controller: 'talep_proje_kart_controller',
            templateUrl: "views/talep_proje_kart.html",
            data: { pageTitle: 'Talep Proje Kayıt', tab: 1 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([

                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']

                        }
                    ]);
                }
            }
        })




        // Talep Dfi
        .state('talep.talepprojekayit.talepprojetaleptipidfikayit', {
            url: "/talepprojetaleptipidfikayit/:talepProjeTipiDfiID",
            controller: 'talep_proje_talep_tipi_dfi_kayit_controller',
            templateUrl: "views/talep_proje_talep_tipi_dfi_kayit.html",
            data: { pageTitle: 'TalepProjeTalepTipiDfi Kayıt', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/talep_proje_talep_tipi_dfi_kayit_controller.js', 'js/angular-services/talep_proje_talep_tipi_dfi.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        }
                    ]);
                }
            }
        })

        //Talep problem
        .state('talep.talepprojekayit.talepprojetaleptipiproblemkayit', {
            url: "/talepprojetaleptipiproblemkayit/:talepProjeTipiProblemID",
            controller: 'talep_proje_talep_tipi_problem_kayit_controller',
            templateUrl: "views/talep_proje_talep_tipi_problem_kayit.html",
            data: { pageTitle: 'TalepProjeTalepTipiProblem Kayıt', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/talep_proje_talep_tipi_problem_kayit_controller.js', 'js/angular-services/talep_proje_talep_tipi_problem.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/talep_siniflandirma_tipi.js']
                        },
                    ]);
                }
            }
        })

        //Talep Değişiklik

        .state('talep.talepprojekayit.talepprojetaleptipidegisiklikkayit', {
            url: "/talepprojetaleptipidegisiklikkayit/:talepProjeTipiDegisiklikID",
            controller: 'talep_proje_talep_tipi_degisiklik_kayit_controller',
            templateUrl: "views/talep_proje_talep_tipi_degisiklik_kayit.html",
            data: { pageTitle: 'Talep Proje Talep Tipi Degisiklik Kayıt', altTab: 2 },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/talep_proje_talep_tipi_degisiklik_kayit_controller.js', 'js/angular-services/talep_proje_talep_tipi_degisiklik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        }

                    ]);
                }
            }
        })

        //Talep Test

        .state('talep.talepprojekayit.projetestsenaryotalepdurumlistesi', {
            url: "/projetestsenaryotalepdurumlistesi",
            controller: 'proje_test_senaryo_talep_durum_liste_controller',
            templateUrl: "views/proje_test_senaryo_talep_durum_liste.html",
            data: { pageTitle: 'Proje Test Senaryo Talep Durum Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/proje_test_senaryo_talep_durum_liste_controller.js', 'js/angular-services/proje_test_senaryo_talep_durum.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/talep_proje.js']
                        },
                        {
                            files: ['js/angular-services/proje_test_senaryo.js']
                        },
                        {
                            files: ['js/angular-services/projeler.js', 'js/angular-services/proje_fizibiletesi.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/angular-services/proje_gereksinim.js']
                        },
                        {
                            files: ['css/plugins/clockpicker/clockpicker.css', 'js/plugins/clockpicker/clockpicker.js']
                        },
                        {
                            files: ['js/angular-services/proje_test_senaryo_test_adim_talep_durum.js']
                        },
                    ]);
                }
            }
        })








        .state('raporlar', {
            abstract: true,
            url: "/raporlar",
            templateUrl: "views/common/content.html",
        })


        .state('raporlar.taleprapor', {
            url: "/taleprapor",
            controller: 'talep_rapor_controller',
            templateUrl: "views/grafik-rapor/talep_rapor.html",
            data: { pageTitle: 'Talep Rapor' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/grafik-rapor/talep_rapor_controller.js', 'js/angular-services/grafik-rapor/grafik_rapor.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/projeler.js', 'js/angular-services/proje_fizibiletesi.js']
                        },
                        {
                            files: ['js/plugins/input-mask/jquery.inputmask.bundle.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                    ]);
                }
            }
        })

        .state('danismanlik', {
            abstract: true,
            url: "/danismanlik",
            templateUrl: "views/common/content.html",
        })


        .state('danismanlik.firmalistesi', {
            url: "/firmalistesi",
            controller: 'd_firma_liste_controller',
            templateUrl: "views/d_firma_liste.html",
            data: { pageTitle: 'Firma Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/d_firma_liste_controller.js', 'js/angular-services/d_firma.js', 'js/angular-services/entegrasyon.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },

                    ]);
                }
            }
        })

        .state('danismanlik.firmaduzenle', {
            url: "/firmaduzenle/:dFirmaID",
            controller: 'd_firma_kayit_controller',
            templateUrl: "views/d_firma_duzenle.html",
            data: { pageTitle: 'Firma Kaydı' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/d_firma_kayit_controller.js', 'js/angular-services/d_firma.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                    ]);
                }
            }
        })



        .state('danismanlik.firmakayit.firmakart', {
            url: "/firmakart",
            templateUrl: "views/d_firma_kart.html",
            data: { pageTitle: 'Firma Kartı' },

        })


        .state('danismanlik.firmakayit', {
            url: "/firmakayit/:dFirmaID",
            controller: 'd_firma_kayit_controller',
            templateUrl: "views/d_firma_kayit.html",
            data: { pageTitle: 'Firma Kaydı'},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/d_firma_kayit_controller.js', 'js/angular-services/d_firma.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/danismanlik_ortak.js']
                        },
                    ]);
                }
            }
        })



        .state('danismanlik.firmakayit.danismanliklistesi', {
            url: "/danismanliklistesi",
            controller: 'd_danismanlik_liste_controller',
            templateUrl: "views/d_danismanlik_liste.html",
            data: { pageTitle: 'Danışmanlık Listesi' , altTab: 2  },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/d_danismanlik_liste_controller.js', 'js/angular-services/d_danismanlik.js', 'js/angular-services/d_danismanlik_hizmet.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-controller/d_firma_kayit_controller.js']
                        },
                        {
                            files: ['js/angular-services/danismanlik_ortak.js']
                        },
                    ]);
                }
            }
        })

        .state('danismanlik.firmakayit.hizmetlistesi', {
            url: "/hizmetlistesi/:danismanlik",
            controller: 'd_danismanlik_hizmet_liste_controller',
            templateUrl: "views/d_danismanlik_hizmet_liste.html",
            data: { pageTitle: 'Danışmanlık Hizmet Listesi', altTab: 3},
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/d_danismanlik_hizmet_liste_controller.js', 'js/angular-services/d_danismanlik_hizmet.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/danismanlik_ortak.js']
                        },
                    ]);
                }
            }
        })

        .state('danismanlik.firmakayit.danismanliklistesi.hizmetkayit', {
            url: "/hizmetkayit/:dHizmetID",
            controller: 'd_danismanlik_hizmet_kayit_controller',
            templateUrl: "views/d_danismanlik_hizmet_kayit.html",
            data: { pageTitle: 'Danışmanlık hizmet kayıt' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/d_danismanlik_hizmet_kayit_controller.js', 'js/angular-services/d_danismanlik_hizmet.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/danismanlik_ortak.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman', {
            abstract: true,
            url: "/dokuman",
            templateUrl: "views/common/content.html",
        })

        .state('dokuman.dokumanlar', {
            url: "/dokumanlar",
            controller: 'dokuman_liste_controller',
            templateUrl: "views/dokuman_liste.html",
            data: { pageTitle: 'Doküman Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_liste_controller.js', 'js/angular-services/dokuman.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['css/plugins/jsTree/style.min.css', 'js/plugins/jsTree/jstree.min.js']
                        },
                        {
                            name: 'ngJsTree',
                            files: ['js/plugins/jsTree/ngJsTree.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_klasor.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_gozden_gecirme_kriteri.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_yayin.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_proje_paketi_grup.js']
                        }, {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernotenew/summernote.css', 'css/plugins/summernotenew/summernote-lite.css', 'js/plugins/summernotenew/summernote.min.js', 'js/plugins/summernotenew/angular-summernote.min.js', 'js/plugins/summernotenew/summernote-lite.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_talep.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_tipi.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })


        .state('dokuman.dokumanyetkikullanicilistesi', {
            url: "/dokumanyetkikullanicilistesi/:dokumanKlasorID",
            controller: 'dokuman_yetki_kullanici_liste_controller',
            templateUrl: "views/dokuman_yetki_kullanici_liste.html",
            data: { pageTitle: 'Dokuman Yetki Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_yetki_kullanici_liste_controller.js', 'js/angular-services/dokuman_yetki_kullanici.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_yetki_grup_klasor.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_yetki_grup.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                    ]);
                }
            }
        })


        .state('dokuman.calismaalanim', {
            url: "/calismaalanim/:dokumanID",
            controller: 'dokuman_baslik_liste_controller',
            templateUrl: "views/dokuman_baslik_liste.html",
            data: { pageTitle: 'Doküman Çalışma Alanım' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_baslik_liste_controller.js', 'js/angular-services/dokuman_baslik.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        //{
                        //    name: 'summernote',
                        //    files: ['css/plugins/summernotenew/summernote.css', 'css/plugins/summernotenew/summernote-lite.css', 'js/plugins/summernotenew/summernote.min.js', 'js/plugins/summernotenew/angular-summernote.min.js', 'js/plugins/summernotenew/summernote-lite.js']
                        //},
                        //{
                        //    files: ['js/plugins/bower_components/tinymce/tinymce.js', 'css/plugins/bower_components/angular-ui-tinymce/src/tinymce.js']
                        //},
                        {
                            files: ['js/plugins/sweetalert/sweetalert.min.js', 'css/plugins/sweetalert/sweetalert.css']
                        },
                        {
                            name: 'oitozero.ngSweetAlert',
                            files: ['js/plugins/sweetalert/angular-sweetalert.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_klasor.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_tipi.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                    ]);
                }
            }
        })





        .state('dokuman.revizyonlistesi', {
            url: "/revizyonlistesi/:dokumanID",
            controller: 'dokuman_revizyon_liste_controller',
            templateUrl: "views/dokuman_revizyon_liste.html",
            data: { pageTitle: 'Dokuman Revizyon' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_revizyon_liste_controller.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/plugins/angular-diff/angular-rich-text-diff.js', 'js/plugins/angular-diff/google-diff-match-patch.js', 'js/plugins/ngSanitize/angular-sanitize.min.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_gozden_gecirme_kriteri.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_yayin.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_baslik.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_klasor.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_tipi.js']
                        },

                    ]);
                }
            }
        })

        .state('dokuman.revizyonkarsilastirma', {
            url: "/revizyonkarsilastirma/:dokumanID/:kaynakRev/:hedefRev",
            controller: 'dokuman_revizyon_karsilastir_controller',
            templateUrl: "views/dokuman_revizyon_karsilastir.html",
            data: { pageTitle: 'Dokuman Revizyon' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_revizyon_karsilastir_controller.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/plugins/angular-diff/angular-rich-text-diff.js', 'js/plugins/angular-diff/google-diff-match-patch.js', 'js/plugins/ngSanitize/angular-sanitize.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_baslik.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },

                    ]);
                }
            }
        })


        .state('dokuman.dokumanyayinlistesi', {
            url: "/dokumanyayinlistesi/:dokumanID",
            controller: 'dokuman_yayin_liste_controller',
            templateUrl: "views/dokuman_yayin_liste.html",
            data: { pageTitle: 'Doküman Yayin Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_yayin_liste_controller.js', 'js/angular-services/dokuman_yayin.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_gozden_gecirme_kriter_adim.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_proje_paketi_klasor.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_proje_paketi_grup.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_gozden_gecirme.js']
                        },
                        {
                            files: ['js/angular-services/proje_iterasyon.js']
                        },
                        {
                            files: ['js/angular-services/proje_modul.js']
                        },
                        {
                            files: ['js/angular-services/kullanici_proje.js']
                        },
                        {
                            files: ['js/angular-services/kullanici.js']
                        },
                        {
                            name: 'summernote',
                            files: ['css/plugins/summernotenew/summernote.css', 'css/plugins/summernotenew/summernote-lite.css', 'js/plugins/summernotenew/summernote.min.js', 'js/plugins/summernotenew/angular-summernote.min.js', 'js/plugins/summernotenew/summernote-lite.js']
                        },
                        {
                            files: ['js/angular-services/dokuman_talep.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })

        .state('dokuman.yayinlar', {
            url: "/yayinlar",
            controller: 'dokuman_yayinlar_liste_controller',
            templateUrl: "views/dokuman_yayinlar_liste.html",
            data: { pageTitle: 'Doküman Yayin Listesi' },
            resolve: {
                loadPlugin: function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        {
                            files: ['js/angular-controller/dokuman_yayinlar_liste_controller.js', 'js/angular-services/dokuman.js']
                        },
                        {
                            files: ['css/plugins/iCheck/custom.css', 'js/plugins/iCheck/icheck.min.js']
                        },
                        {
                            insertBefore: '#loadBefore',
                            name: 'localytics.directives',
                            files: ['css/plugins/chosen/chosen.css', 'js/plugins/chosen/chosen.jquery.js', 'js/plugins/chosen/chosen.js']
                        },
                        {
                            files: ['js/plugins/ngMask/ngMask.min.js']
                        },
                        {
                            files: ['css/plugins/datapicker/datepicker3.css', 'js/plugins/datapicker/bootstrap-datepicker.min.js', 'js/plugins/datapicker/bootstrap-datepicker.tr.min.js']
                        },
                        {
                            files: ['css/plugins/jsTree/style.min.css', 'js/plugins/jsTree/jstree.min.js']
                        },
                        {
                            name: 'ngJsTree',
                            files: ['js/plugins/jsTree/ngJsTree.min.js']
                        },

                        {
                            files: ['css/plugins/evolcolorpicker/evol-colorpicker.css', 'js/plugins/evolcolorpicker/evol-colorpicker.js']
                        },
                        {
                            files: ['js/angular-constant/constant.js']
                        },
                    ]);
                }
            }
        })
}

angular
    .module('inspinia')
    .config(config)
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    });