angular
    .module('inspinia')
        .service('srvMailGrupKullanici', function ($http) {
            this.MailGrupKullaniciGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/MailGrupKullanici",
                    params: AramaKriter
                });
                return request;
           }

            this.MailGrupKullaniciSelect = function (MAIL_GRUP_KULLANICI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/MailGrupKullanici/"+MAIL_GRUP_KULLANICI_ID
                });
                return request;
           }

            this.MailGrupKullaniciEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/MailGrupKullanici",
                    data:Info
                });
                return request;
           }

            this.MailGrupKullaniciSil = function (MAIL_GRUP_KULLANICI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/MailGrupKullanici/"+MAIL_GRUP_KULLANICI_ID
                });
                return request;
           }
    })
;

