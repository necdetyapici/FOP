/**
 * MainCtrl - controller
 *
 */

function MainCtrl($http, $scope, $window, $state, $localStorage, $sessionStorage, $rootScope, $templateCache, $interval, srvGenel, srvEntegrasyon, srvDuyuru, $q, $modal) {

    $rootScope.OutlookEntegrasyonVar = false;
    $rootScope.EmailAdedi = -1;
    $rootScope.OutlookEntegrasyonID = 0;
    $rootScope.OutlookKontrolEdiliyor = false;
    $rootScope.OkunmamisDuyuruAdedi = 0;
    $rootScope.DuyuruKontrolEdiliyor = false;
    $rootScope.Duyurular = [];
    $rootScope.httpIptalEdici;


    
    $scope.$storage = $sessionStorage;
    $rootScope.$storage = $sessionStorage;
    $rootScope.sayfayukleniyor = true;
    $rootScope.MenuListesi = [];
    $scope.AramaKriter = { ILK_YUKLEME: 0, SON_YUKLEME_TARIHI: null };

    $scope.$on('$stateChangeStart', function () {



        $rootScope.sayfayukleniyor = true;

        if ($rootScope.$storage.TOKEN != undefined && $http.defaults.headers.common['AUTH_TOKEN'] == undefined)
            $http.defaults.headers.common['AUTH_TOKEN'] = $rootScope.$storage.TOKEN;
    });


    //angular.element(document).ready(function () {

    //});

    $(window).resize(function () {


        $scope.$apply(function () {
            $scope.fixTopLinks();
        });
    });

  


    $scope.BildirimOku = function (params) {

        $rootScope.DuyuruKontrolEdiliyor = true;
        window.swal({
            title: "",
            text: params.METNI,

            confirmButtonText: "Okudum",

            closeOnConfirm: true,


        }, function (value) {

            srvDuyuru.SetOkundu(params).then(function (res) {

                if (res.data.basariDurumu == true) {

                    var dd = [];

                    for (var i = 0; i < $rootScope.Duyurular.length; i++) {

                        if (params.DUYURU_ID == $rootScope.Duyurular[i].DUYURU_ID) {
                            continue;
                        }

                        dd.push($rootScope.Duyurular[i]);
                    }



                    $rootScope.Duyurular = dd;
                    $rootScope.OkunmamisDuyuruAdedi = dd.length;


                }

                $rootScope.DuyuruKontrolEdiliyor = false;

            }, function (error) {
                mesajGoster('Dikkat', "Aktif/Pasif işlemi sırasında bir hata oluştu.Hata: " + hata.data.mesaj, 'W');
                console.log('DDanismanlikAktifPasif Hata:', hata);
                $rootScope.DuyuruKontrolEdiliyor = false;

            });
        });
    }

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

                //  $scope.toplamKayitSayisi = gelen.data.ToplamKayitSayisi;
                $scope.DuyuruModalListesi = gelen.data.Veri;

            }
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                console.error('Duyuru listesi yüklenirken bir hata oluştu. Hata:', hata);
            });
    };

    $scope.OutlookEntegreOl = function () {

    }


    $scope.$on('$stateChangeSuccess', function (event, object) {
        $rootScope.sayfayukleniyor = false;
        window.scrollTo(0, 0);
        $scope.fixTopLinks();

        if ($rootScope.httpIptalEdici == undefined) {
            $rootScope.httpIptalEdici = $q.defer();


        }

        if (object.name == "anasayfa" && $rootScope.OutlookEntegrasyonVar == false) {
            var outlookExist = srvEntegrasyon.CheckForOutlook("Outlook");

            outlookExist.then(function (params) {

                switch (params.status) {
                    case 404:
                        mesajGoster('Dikkat', 'Outlook entegrasyonu kurulmamıştır.', "W");
                        break;
                    case 200:
                        if (params.data[0] > 0) {
                            $rootScope.OutlookEntegrasyonVar = true;
                            $rootScope.OutlookEntegrasyonID = params.data[0];
                        }
                        else {
                            $rootScope.OutlookEntegrasyonID = params.data[1];

                            var timout = setTimeout(function () {
                                var ahref = document.getElementById("outlookConnectID");

                                if (ahref) {
                                    ahref.addEventListener("click", function () {
                                        srvEntegrasyon.GetEntegrasyonAuth(params.data[1]).then(function (gelen) {

                                            if (gelen.data.URL != null && gelen.data.URL != undefined) {
                                                let params = 'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,addressbar=no,width=0,height=0,left=-1000,top=-1000';
                                                var win = window.open(gelen.data.URL, "Outlook Entegrasyonu", params);

                                                var timer = setInterval(function () {
                                                    if (win.closed) {
                                                        clearInterval(timer);

                                                        var outlookOk = srvEntegrasyon.CheckForOutlook("Outlook");

                                                        outlookOk.then(function (params) {
                                                            if (params.data[0] > 0) {
                                                                $rootScope.OutlookEntegrasyonVar = true;
                                                                $rootScope.OutlookEntegrasyonID = params.data[0];
                                                            }
                                                        })

                                                    }
                                                }, 1000);

                                            }
                                        }, function (hata) {

                                        });

                                    });
                                }
                            }, 2000);




                        }


                        break;
                    case 500:
                        mesajGoster('Dikkat', 'Beklenmedik hata; ' + params.data, "E");
                        break;

                    default:
                        break;
                }





            })
        }
        else {

            if ($scope.TimerActivated == undefined) {
                $scope.TimerActivated = true;
                $rootScope.checkTimer = setInterval(function () {


                    if ($state.current.name !== "kullanici.giris") {


                        $scope.BildirimKontrol();

                        if ($rootScope.OutlookEntegrasyonVar == true) {
                            $scope.EmailAndCalenderCheck();

                        }




                    }
                    else {

                    }




                }, 60000); // 60 saniye olsun
            }

        }
    });

    $scope.fixTopLinks = function () {
        var doc = document.getElementById("mydiv");

        if (doc) {

            var my = document.getElementById("mydeneme");

            var rect = my.getBoundingClientRect();

            if ($rootScope.OriginalRect === undefined)
                $rootScope.OriginalRect = doc.getBoundingClientRect();


            if ($rootScope.OriginalRect) {
                doc.style.position = "relative";
                doc.style.top = (rect.top - $rootScope.OriginalRect.top) + "px";
                doc.style.left = ($rootScope.OriginalRect.left - 300) + "px";

                   doc.style.zIndex = 9999;
            }
          
            //doc.style.top = rect.top;
            //doc.style.left = (rect.left - 150) + "px";
            //doc.style.zIndex = 9999;
           

        }
    }

    $scope.hideTopLinks = function () {
        var doc = document.getElementById("mydiv");
        if (doc) {
            doc.style.zIndex = 0;
        }
    }

    $scope.BildirimKontrol = function () {

        if ($rootScope.DuyuruKontrolEdiliyor == false) {
            $rootScope.DuyuruKontrolEdiliyor = true;



            var pro = srvDuyuru.OkunmamisDuyuru($rootScope.httpIptalEdici);

            pro.then(function (params) {

                $rootScope.Duyurular = params.data;
                $rootScope.OkunmamisDuyuruAdedi = $rootScope.Duyurular.length;



                $rootScope.DuyuruKontrolEdiliyor = false;

            }, function (error) {

                $rootScope.DuyuruKontrolEdiliyor = false;
            });


        }

    };

    $scope.EmailAndCalenderCheck = function () {



        if ($rootScope.OutlookKontrolEdiliyor == false) {



            $rootScope.OutlookKontrolEdiliyor = true;
            var emailCount = srvEntegrasyon.EmailCheck($rootScope.OutlookEntegrasyonID, $rootScope.httpIptalEdici);

            emailCount.then(function (params) {
                var obj = JSON.parse(params.data);
                $rootScope.EmailAdedi = obj["@odata.count"];

                var calendarWeek = srvEntegrasyon.calendarWeekCheck($rootScope.OutlookEntegrasyonID, $rootScope.httpIptalEdici);

                calendarWeek.then(function (params) {
                    var calObj = [];
                    for (var i = 0; i < params.data.length; i++) {
                        calObj.push(JSON.parse(params.data[i]));
                    };





                    var events = []

                    for (var a = 0; a < calObj.length; a++) {
                        for (var i = 0; i < calObj[a].value.length; i++) {

                            var timeToConvert = calObj[a].value[i].start.dateTime;

                            if (timeToConvert.indexOf("Z") < 0) {
                                timeToConvert = timeToConvert + "Z";
                            }

                            var dt = new Date(timeToConvert);
                            var s = dt.toString();
                            //    console.log(s);
                            var t = dt.toLocaleDateString();
                            //          console.log(t);

                            var tm = dt.toLocaleTimeString();
                            //          console.log(tm);
                            var evnt = false;

                            for (var j = 0; j < events.length; j++) {

                                if (events[j].startDate == t) {
                                    events[j].events.push({
                                        startTime: tm,
                                        subject: calObj[a].value[j].subject
                                    });
                                    evnt = true;
                                    break;

                                }
                            }

                            if (evnt == false) {
                                var ev = {
                                    startDate: t,
                                    events: [],
                                }

                                ev.events.push({
                                    startTime: tm,
                                    subject: calObj[a].value[i].subject
                                });

                                events.push(ev);
                            }
                        }
                    }





                    $rootScope.WeeklyCalendar = events;

                    //  console.log(events);

                    $rootScope.OutlookKontrolEdiliyor = false;
                }, function (error) {

                    $rootScope.OutlookKontrolEdiliyor = false;
                    console.log(error);
                });

                // $rootScope.OutlookKontrolEdiliyor = false;
            }, function (error) {

                $rootScope.OutlookKontrolEdiliyor = false;
                console.log(error);
            });
        }


    }

    $scope.AramaKriterDuyuru = {
        LISTE: true,
        AKTIF: true,
        SayfaNo: 1,
        SayfaBasinaKayitSayisi: 5
    };

    $scope.logout = function () {

        // clearInterval($rootScope.checkTimer);
        //çıkış logu ekliyor
        // var promiseGet = srvGenel.buroLogKaydet($scope.$storage.kullaniciID);
        $rootScope.httpIptalEdici.resolve();
        $localStorage.$reset();
        $sessionStorage.$reset();
        delete $scope.$storage;
        $rootScope.httpIptalEdici = undefined;


        var promiseGet = srvGenel.KullaniciCikis();
        promiseGet.then(function (gelen) {
            $rootScope.sayfayukleniyor = false;
            if (gelen.data.basariDurumu === false) {
                mesajGoster('Dikkat', 'Çıkış işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj !== null ? 'E' : 'W');
                console.error('Çıkış işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
            }
            else {
                $http.defaults.headers.common['AUTH_TOKEN'] = undefined;

                $rootScope.OutlookEntegrasyonVar = false;
                $rootScope.EmailAdedi = 0;
                $rootScope.OutlookEntegrasyonID = 0;
                $rootScope.OutlookKontrolEdiliyor = false;
                $rootScope.OkunmamisDuyuruAdedi = 0;
                $rootScope.DuyuruKontrolEdiliyor = false;
                $rootScope.Duyurular = [];

                $state.go('kullanici.giris', {});


            }
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                console.error('Duyuru kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
            });

    }

    $scope.DuyuruListele = function () {
        $scope.DuyuruGetData($scope.AramaKriterListeDuyuru);
        $scope.$modalInstanceDuyuruListe = $modal.open({
            templateUrl: 'views/common/modal_duyuru_listele.html',
            size: 'lg',
            scope: $scope
        });
    };

    $scope.duyuruAlert = function (konu, metin) {
        window.swal({
            title: konu,
            text: metin
        });
    };

    $scope.DuyuruListeleKapat = function () {
        $scope.$modalInstanceDuyuruListe.dismiss('cancel');
    };

    $rootScope.menuyuCalistir = function () {
        $('#side-menu').metisMenu();
    }

    $scope.GetMenuListesi = function () {
        return $scope.$storage.MenuListesi;
    }

    if ($scope.$storage.kullaniciID == undefined) {
        $state.go('kullanici.giris');
    }

    this.slideInterval = 5000;

    $rootScope.removeTurkish = function (value) {
        return value.replace(/ç/g, 'c')
            .replace(/Ç/g, 'C')
            .replace(/ı/g, 'i')
            .replace(/İ/g, 'I')
            .replace(/ğ/g, 'g')
            .replace(/Ğ/g, 'G')
            .replace(/ü/g, 'u')
            .replace(/Ü/g, 'U')
            .replace(/ş/g, 's')
            .replace(/Ş/g, 'S')
            .replace(/ö/g, 'o')
            .replace(/Ö/g, 'O');
    }

    $rootScope.focusToInvalid = function (form) {
        // Validasyon hatası olan bir fromda ilk sorunlu kontrolü bul, arka planını biraz kırmızı yap, ekranı kaydır ve focus ver. 
        // TODO: Burada aslında bir parametre tanımlanıp form'a ait selectoru gönderebiliriz mesela #myForm yollarsak o halde selector '#myForm .ng-invalid' olmalı.  Şimdilik park ediyorum.
        // Not: tepedeki durumda o halde en az iki öğe ng-invalid geliyor, biri form'un kendisi, diğeri de formun içindeki ilk arıza veren öğe, dolayısı ile alttaki [1] de form selector olursa [0] olmalı.
        //parametre tanımlandıgı zaman formun name gonderilerek formun ismi ile birlikte basına # işareti konulması gerekiyor. Formun ilk elemanına erişmek içinde querySelector('ng-invalid') ifadesi eklenmelidir.
        if (0 < $("#" + form.$name + '.ng-invalid').length) {
            try {
                //var firstInvalid = $(form + '.ng-invalid')[0];

                var firstInvalid = $("#" + form.$name)[0].querySelector('.ng-invalid');
                $(firstInvalid).css("background-color", "#fee");
                $('html, body').animate({
                    scrollTop: $(firstInvalid).offset().top - 32
                }, 200, function () {
                    $(firstInvalid).focus();
                });
            } catch (ex) { }
        }
        return;
    };
};


function KullaniciResimCtrl($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog) {

    $scope.myCroppedImage = '';

    $scope.init = function () {
        console.info('$scope.init: welcome to "KullaniciResimCtrl".');

        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileavatar')).on('change', handleFileSelect);
    }

    $scope.chooseImage = function () {
        $scope.Kullanici.AvatarBase64 = $scope.myCroppedImage;
        $rootScope.modalInstance.dismiss('cancel');
    }
    $scope.chooseImageInfo = function () {
        $scope.InfoAvatarBase64 = $scope.myCroppedImage;
        $rootScope.modalInstance.dismiss('cancel');
    }

    $scope.closeModal = function () {
        $rootScope.modalInstance.dismiss('cancel');
    }
};
function InfoResimCtrl($scope, $http, $state, $stateParams, $rootScope, $modal, ngDialog) {

    $scope.myCroppedImage = '';

    $scope.init = function () {
        console.info('$scope.init: welcome to "InfoResimCtrl".');

        var handleFileSelect = function (evt) {
            var file = evt.currentTarget.files[0];
            var reader = new FileReader();
            reader.onload = function (evt) {
                $scope.$apply(function ($scope) {
                    $scope.myImage = evt.target.result;
                });
            };
            reader.readAsDataURL(file);
        };
        angular.element(document.querySelector('#fileavatar')).on('change', handleFileSelect);
    }

    $scope.chooseImage = function () {
        $scope.Kullanici.AvatarBase64 = $scope.myCroppedImage;
        $rootScope.modalInstance.dismiss('cancel');
    }

    $scope.chooseImageInfo = function () {
        $scope.$parent.InfoPersonel.KULLANICI.AvatarBase64 = $scope.myCroppedImage;
        $rootScope.modalInstance.dismiss('cancel');
    }

    $scope.closeModal = function () {
        $rootScope.modalInstance.dismiss('cancel');
    }


};


angular
    .module('inspinia')
    .controller('MainCtrl', MainCtrl)
    .controller('KullaniciResimCtrl', KullaniciResimCtrl)
    .controller('InfoResimCtrl', InfoResimCtrl)
    ;