/**
 * MainCtrl - controller
 *
 */

function MainCtrl($http, $scope, $window, $state, $localStorage, $sessionStorage, $rootScope, $templateCache, $interval, srvGenel, $q, $modal) {

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

  




    $scope.$on('$stateChangeSuccess', function (event, object) {
        $rootScope.sayfayukleniyor = false;
        window.scrollTo(0, 0);
        $scope.fixTopLinks();

        if ($rootScope.httpIptalEdici == undefined) {
            $rootScope.httpIptalEdici = $q.defer();


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



    $scope.logout = function () {

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


                $state.go('kullanici.giris', {});


            }
        },
            function (hata) {
                $rootScope.sayfayukleniyor = false;
                mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                console.error('Duyuru kayıt işlemi sırasında bir hata oluştu. Hata:', hata);
            });

    }



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