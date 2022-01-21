angular
    .module('inspinia')
        .service('srvTalepProjeGenelLog', function ($http) {
            this.TalepProjeGenelLogGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeGenelLog",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeGenelLogSelect = function (TALEP_PROJE_GENEL_LOG_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeGenelLog/"+TALEP_PROJE_GENEL_LOG_ID
                });
                return request;
           }

            this.TalepProjeGenelLogEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeGenelLog",
                    data:Info
                });
                return request;
           }

            this.TalepProjeGenelLogSil = function (TALEP_PROJE_GENEL_LOG_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeGenelLog/"+TALEP_PROJE_GENEL_LOG_ID
                });
                return request;
           }
    })
;

