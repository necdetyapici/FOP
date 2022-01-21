angular
    .module('inspinia')
    .service('srvTalepProjeSurecLog', function ($http) {
        this.TalepProjeSurecLogGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/TalepProjeSurecLog",
                params: AramaKriter
            });
            return request;
        }

        this.TalepProjeSurecLogSelect = function (TALEP_PROJE_SUREC_LOG_ID) {
            var request = $http({
                method: "get",
                url: "/api/TalepProjeSurecLog/" + TALEP_PROJE_SUREC_LOG_ID
            });
            return request;
        }

        this.TalepProjeSurecLogEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/TalepProjeSurecLog",
                data: Info
            });
            return request;
        }

        this.TalepProjeSurecLogSil = function (TALEP_PROJE_SUREC_LOG_ID) {
            var request = $http({
                method: "delete",
                url: "/api/TalepProjeSurecLog/" + TALEP_PROJE_SUREC_LOG_ID
            });
            return request;
        }

        

        this.TalepProjeSurecLogOnay = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/TalepProjeSurecLog/SurecOnay",
                data: Info
            });
            return request;
        }
    })
    ;

