angular.module('inspinia').controller('kullanici_giris_controller', ['$scope', '$http', '$state', '$stateParams', '$location', '$document', '$log', '$localStorage', '$sessionStorage', '$rootScope', 'srvKullanici',
    function ($scope, $http, $state, $stateParams, $location, $document, $log, $localStorage, $sessionStorage, $rootScope, srvKullanici) {
        $scope.versiyon = "1.2.0";
        $rootScope.bodyclass = "gray-bg";
        $scope.sistemTarih = new Date().getFullYear();

        $scope.sifremiUnuttum = false;
        $scope.calistirildi = false;

        

        $scope.enableLoginButton = function (value) {
            if (value) {
                $scope.buttonclicked = false;
                $scope.loginButtonText = "Giriş";
            } else {
                $scope.buttonclicked = true;
                $scope.loginButtonText = "Lütfen bekleyiniz...";
            }
        };

        $scope.enableLoginButtonSifreUnuttum = function (value) {
            if (value) {
                $scope.buttonclickedSifreUnuttum = false;
                $scope.SifreUnuttumButtonText = "Gönder";
            } else {
                $scope.buttonclickedSifreUnuttum = true;
                $scope.SifreUnuttumButtonText = "Lütfen bekleyiniz...";
            }
        };

        $scope.init = function () {
            $localStorage.$reset();
            $sessionStorage.$reset();
            delete $scope.$storage;
            $http.defaults.withCredentials = true;
            $http.defaults.headers.common['AUTH_TOKEN'] = undefined;
            $scope.enableLoginButton(true);
            $scope.enableLoginButtonSifreUnuttum(true);
            $scope.sayfayukleniyor = false;
            $sessionStorage.sayfayukleniyor = false;
        };

        function setHttpProviderCommonHeaderToken(TOKEN) {
            $http.defaults.headers.common['AUTH_TOKEN'] = TOKEN;
        }

        $scope.sayfayukleniyor = true;
        $scope.kullaniciGiris = function (loginForm) {
            $scope.formCalistirildi = true;
            if ($scope.frmlogin.$valid) { } else {
                $rootScope.focusToInvalid($scope.frmlogin);
                //$scope.formCalistirildi = false;
                $scope.enableLoginButtonSifreUnuttum(true);
                return;
            }
            $scope.enableLoginButton(false);
            $scope.sayfayukleniyor = true;

            var promiseGet = srvKullanici.KullaniciGirisKontrol(loginForm);

            promiseGet.then(function (gelen) {
                if (gelen.data.basariDurumu === false) {
                    mesajGoster('Dikkat', 'Giriş işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj === null ? 'I' : 'E');
                    console.error('Giriş işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    $('#sifre').focus();
                    $scope.enableLoginButton(true);
                    $scope.sayfayukleniyor = false;
                }
                else if (gelen.data.TOKEN !== undefined) {
                    $scope.$storage = $sessionStorage.$default({
                        TOKEN: gelen.data.TOKEN,
                        SON_GUNCELLENME_TARIHI: gelen.data.SON_GUNCELLENME_TARIHI,
                        KULLANICI_ID: gelen.data.KULLANICI_ID,
                        MUSTERI_ID: gelen.data.MUSTERI_ID,
                        AD_SOYAD: gelen.data.AD_SOYAD,
                        KULLANICI_TIPI_ID: gelen.data.KULLANICI_TIPI_ID,
                        PERSONEL_TIPI_ID: gelen.data.PERSONEL_TIPI_ID,
                        E_POSTA: gelen.data.E_POSTA,
                        YETKI_LIST: gelen.data.YETKI_LIST,
                        IS_PICT_YONETICI: gelen.data.IS_PICT_YONETICI,
                        IS_MUSTERI_YONETICI: gelen.data.IS_MUSTERI_YONETICI,
                        IS_MUSTERI_KULLANICI: gelen.data.IS_MUSTERI_KULLANICI,
                        IS_KURUM_MUSTERI_KULLANICI: gelen.data.IS_KURUM_MUSTERI_KULLANICI,
                        KULLANICI_AVATAR: gelen.data.KULLANICI_AVATAR
                    });

                    if (gelen.data.TOKEN !== undefined && gelen.data.TOKEN !== "")
                        setHttpProviderCommonHeaderToken(gelen.data.TOKEN);

                    $rootScope.$storage = $scope.$storage;
                    $scope.sayfayukleniyor = false;
                    mesajGoster('İşlem başarılı', "Sayın " + $scope.$storage.AD_SOYAD + " PICT' e hoşgeldiniz.", 'S');
                    $rootScope.bodyclass = "";
                    $state.go('anasayfa', {});
                    

                }
            },
                function (hata) {
                    $scope.enableLoginButton(true);
                    $scope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                    console.error('Giriş işlemi sırasında bir hata oluştu. Hata:', hata.data.sistemMesaj);
                    $('#sifre').focus();
                });

        };

        $scope.sifreUnuttum = function (forgetPasswordForm) {
            $scope.formSifreUnuttumCalistirildi = true;
            if ($scope.frmforgetPassword.$valid) { } else {
                $rootScope.focusToInvalid($scope.frmforgetPassword);
                //$scope.formSifreUnuttumCalistirildi = false;
                $scope.enableLoginButtonSifreUnuttum(true);
                return;
            }
            $scope.enableLoginButtonSifreUnuttum(false);
            $scope.sayfayukleniyor = true;


            $scope.sayfayukleniyor = true;
            var promiseGet = srvKullanici.KullaniciSifreUnuttum(forgetPasswordForm);
            promiseGet.then(function (gelen) {
                if (gelen.data.basariDurumu === false) {
                    mesajGoster('Dikkat', 'Şifre unuttum işlemi sırasında bir hata oluştu.' + gelen.data.mesaj, gelen.data.sistemMesaj === null ? 'I' : 'E');
                    console.error('Şifre unuttum işlemi sırasında bir hata oluştu. Hata:', gelen.data.sistemMesaj);
                    $scope.enableLoginButtonSifreUnuttum(true);
                    $scope.sayfayukleniyor = false;
                }
                else {
                    mesajGoster("İşlem tamam", gelen.data.mesaj, "S");
                    $scope.enableLoginButtonSifreUnuttum(true);
                }
            },
                function (hata) {
                    $scope.sayfayukleniyor = false;
                    mesajGoster('Dikkat', hata.status === 404 ? hata.data : hata.data.mesaj, 'I');
                    console.error('Şifre unuttum işlemi sırasında bir hata oluştu. Hata:', hata);
                    $scope.enableLoginButtonSifreUnuttum(true);
                });
        };

        

    }]);
