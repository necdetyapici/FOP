angular
    .module('inspinia')
        .service('srvDokumanYetkiGrupKullanici', function ($http) {
            this.DokumanYetkiGrupKullaniciGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanYetkiGrupKullanici",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanYetkiGrupKullaniciSelect = function (DOKUMAN_YETKI_GRUP_KULLANICI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanYetkiGrupKullanici/"+DOKUMAN_YETKI_GRUP_KULLANICI_ID
                });
                return request;
           }

            this.DokumanYetkiGrupKullaniciEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanYetkiGrupKullanici",
                    data:Info
                });
                return request;
           }

            this.DokumanYetkiGrupKullaniciSil = function (DOKUMAN_YETKI_GRUP_KULLANICI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanYetkiGrupKullanici/"+DOKUMAN_YETKI_GRUP_KULLANICI_ID
                });
                return request;
           }
    })
;

