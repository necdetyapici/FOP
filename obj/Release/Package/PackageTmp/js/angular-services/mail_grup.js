angular
    .module('inspinia')
        .service('srvMailGrup', function ($http) {
            this.MailGrupGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/MailGrup",
                    params: AramaKriter
                });
                return request;
           }

            this.MailGrupSelect = function (MAIL_GRUP_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/MailGrup/"+MAIL_GRUP_ID
                });
                return request;
           }

            this.MailGrupEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/MailGrup",
                    data:Info
                });
                return request;
           }

            this.MailGrupSil = function (MAIL_GRUP_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/MailGrup/"+MAIL_GRUP_ID
                });
                return request;
           }
    })
;

