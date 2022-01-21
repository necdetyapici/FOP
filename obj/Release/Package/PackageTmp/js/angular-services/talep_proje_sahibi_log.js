angular
    .module('inspinia')
        .service('srvTalepProjeSahibiLog', function ($http) {
            this.TalepProjeSahibiLogGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeSahibiLog",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeSahibiLogSelect = function (TALEP_PROJE_SAHIBI_LOG_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeSahibiLog/"+TALEP_PROJE_SAHIBI_LOG_ID
                });
                return request;
           }

            this.TalepProjeSahibiLogEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeSahibiLog",
                    data:Info
                });
                return request;
           }

            this.TalepProjeSahibiLogSil = function (TALEP_PROJE_SAHIBI_LOG_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeSahibiLog/"+TALEP_PROJE_SAHIBI_LOG_ID
                });
                return request;
           }
    })
;

