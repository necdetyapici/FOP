angular
    .module('inspinia')
        .service('srvDokumanYetkiKullanici', function ($http) {
            this.DokumanYetkiKullaniciGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanYetkiKullanici",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanYetkiKullaniciSelect = function (DOKUMAN_YETKI_KULLANICI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanYetkiKullanici/"+DOKUMAN_YETKI_KULLANICI_ID
                });
                return request;
           }

            this.DokumanYetkiKullaniciEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanYetkiKullanici",
                    data:Info
                });
                return request;
           }

            this.DokumanYetkiKullaniciSil = function (DOKUMAN_YETKI_KULLANICI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanYetkiKullanici/"+DOKUMAN_YETKI_KULLANICI_ID
                });
                return request;
           }
    })
;

