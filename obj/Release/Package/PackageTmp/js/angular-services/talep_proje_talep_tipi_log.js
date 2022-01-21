angular
    .module('inspinia')
        .service('srvTalepProjeTalepTipiLog', function ($http) {
            this.TalepProjeTalepTipiLogGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiLog",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeTalepTipiLogSelect = function (TALEP_PROJE_TALEP_TIPI_LOG_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiLog/"+TALEP_PROJE_TALEP_TIPI_LOG_ID
                });
                return request;
           }

            this.TalepProjeTalepTipiLogEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeTalepTipiLog",
                    data:Info
                });
                return request;
           }

            this.TalepProjeTalepTipiLogSil = function (TALEP_PROJE_TALEP_TIPI_LOG_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeTalepTipiLog/"+TALEP_PROJE_TALEP_TIPI_LOG_ID
                });
                return request;
           }
    })
;

