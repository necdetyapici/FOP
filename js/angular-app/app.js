(function () {
    angular.module('inspinia', [
        'ui.router',
        'oc.lazyLoad',
        'ui.bootstrap',
        'ngIdle',
        'ngStorage',
        'ui.utils.masks',
        'ngDialog',
        'angular.filter',
        'ngImgCrop',
        'nya.bootstrap.select',
        'gridshore.c3js.chart',
        'ngSanitize',
        'MsalAngular',
        'angular-rich-text-diff',
        'ui.tinymce',
        'oitozero.ngSweetAlert'
       

    ])

        .constant('Ayarlarim', { MaxSayfaSayisi: 10, SayfaBasinaKayitSayisi: 10, MaxSayfaSayisi: 10 })
        
        .filter('moment', function () {
            return function (dateString, format) {
                return moment(dateString).format(format);
            };
        })

        .filter('moment2', function () {
            return function (dateString) {
                moment.locale('tr', {
                    relativeTime: {
                        future: 'Sonra %s',
                        past: '%s Önce',
                        s: 'Bir Kaç Saniye',
                        ss: '%d Saniye',
                        m: 'Bir Dakika',
                        mm: '%d Dakika',
                        h: '1 Saat',
                        hh: '%d Saat',
                        d: '1 Gün',
                        dd: '%d Gün',
                        M: '1 Ay',
                        MM: '%d Ay',
                        y: '1 Yıl',
                        yy: '%d Yıl'
                    }
                });
                return moment(dateString).fromNow();
            };
        })

        .filter('moment3', function () {
            return function (dateString) {
                moment.locale('tr', {
                    calendar: {
                        lastDay: '[Dün Saat] LT',
                        sameDay: '[Bugün Saat] LT',
                        nextDay: '[Yarın Saat] LT',
                        lastWeek: '[Geçen Hafta] dddd [Saat] LT',
                        nextWeek: '[Haftaya] dddd [Saat] LT',
                        sameElse: 'dddd LT - L'
                    }
                });
                return moment(dateString).calendar();
            };
        })
   
        .filter('startFrom', function () {
        return function (input, start) {
            if (input) {
                start = +start;
                return input.slice(start);
            }
            return [];
        };
    })


        .filter('tarih', function () {
            return function (dateString) {
                return moment(dateString).format('DD/MM/YYYY');
            };
        })


        .filter('tarihYokIseTire', function () {
            return function (datestring) {
                if (datestring)
                    return moment(datestring).format('DD/MM/YYYY');
                else
                    return "-";
            }
        })


        .filter('tarihsaat', function () {
            return function (dateString) {
                return moment(dateString).format('DD/MM/YYYY HH:mm');
            };
        })

        .filter('telefon', function () {
            return function (number) {

                if (!number) { return ''; }

                var value = number.toString().trim().replace(/^\+/, '');

                if (value.match(/[^0-9]/)) {
                    return number;
                }

                if (12 == value.length) {
                    //TODO: Veritabanına telefon numaralarını 10 hane yazmalıyız!.
                    value = value.slice(2);
                }

                if (10 != value.length) {
                    return number;
                }

                return ("(" + value.slice(0, 3) + ") " + value.slice(3).slice(0, 3) + ' ' + value.slice(3).slice(3)).trim();
            };
        })



        .factory('authHttpResponseInterceptor', ['$q', '$location', '$injector', '$rootScope', function ($q, $location, $injector, $rootScope) {
            return {
                response: function (response) {
                    if (response.status === 401) {
                        console.log("Response 401");
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    if (rejection.status === 401) {
                        console.log("Response Error 401", rejection);
                        rejection.data = {
                            basariDurumu: false,
                            mesaj: rejection.data
                        };

                        if ($rootScope.oncekiAdres == null)
                            $rootScope.oncekiAdres = $location.path();

                        //if ($http.defaults == undefined && $http.defaults.headers.common['AUTH_TOKEN'] == undefined) {
                        //    $location.path('/');
                        //}
                        // $state.go('kullanici.login', {});
                        $location.path('/').search('returnTo', $location.path());
                    }
                    else if (rejection.status === 403) {
                        console.log("Response Error 403", rejection);
                        var stateService = $injector.get('$state');
                        stateService.go('kullanici.giris');

                        //if ($http.defaults == undefined && $http.defaults.headers.common['AUTH_TOKEN'] == undefined) {
                        //    $location.path('/');
                        //}
                        //$state.go('anasayfa', {});
                        //$location.path('/login').search('returnTo', $location.path());
                    }
                    return $q.reject(rejection);
                }
            }
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authHttpResponseInterceptor');
        }])

        // .config(['msalAuthenticationServiceProvider', function (msal) {
        //     msal.init({
        //         clientID: applicationConfig.clientID,
        //         authority: null,
        //         tokenReceivedCallback: function (errorDesc, token, error, tokenType) {
        //              if (token) {
        //                 console.log("token received: in callback " + token)
        //             } else if (error) {
        //                 console.log("error received: in callback " + error)
        //             }
        //         },
        //         optionalParams: {},
        //         routeProtectionConfig: {
        //             popUp: true,
        //             consentScopes: applicationConfig.consentScopes
        //         },
        //          })
        // }])

        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode(false).hashPrefix('');
        }])

        .config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                showClose: false
            });
        }]);

})();
