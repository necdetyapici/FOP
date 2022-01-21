angular
    .module('inspinia')
        .service('srvTalepProjeSurecAkisLog', function ($http) {
            this.TalepProjeSurecAkisLogGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeSurecAkisLog",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeSurecAkisLogSelect = function (TALEP_PROJE_SUREC_AKIS_LOG_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeSurecAkisLog/"+TALEP_PROJE_SUREC_AKIS_LOG_ID
                });
                return request;
           }

            this.TalepProjeSurecAkisLogEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeSurecAkisLog",
                    data:Info
                });
                return request;
           }

            this.TalepProjeSurecAkisLogSil = function (TALEP_PROJE_SUREC_AKIS_LOG_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeSurecAkisLog/"+TALEP_PROJE_SUREC_AKIS_LOG_ID
                });
                return request;
           }
    })
;

