angular
    .module('inspinia')
        .service('srvMailLog', function ($http) {
            this.MailLogGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/MailLog",
                    params: AramaKriter
                });
                return request;
           }

            this.MailLogSelect = function (MAIL_LOG_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/MailLog/"+MAIL_LOG_ID
                });
                return request;
           }

            this.MailLogEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/MailLog",
                    data:Info
                });
                return request;
           }

            this.MailLogSil = function (MAIL_LOG_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/MailLog/"+MAIL_LOG_ID
                });
                return request;
           }
    })
;

