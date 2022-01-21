angular
    .module('inspinia')
        .service('srvProjeRisk', function ($http) {
            this.ProjeRiskGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeRisk",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeRiskSelect = function (PROJE_RISK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeRisk/"+PROJE_RISK_ID
                });
                return request;
           }

            this.ProjeRiskEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeRisk",
                    data:Info
                });
                return request;
           }

            this.ProjeRiskSil = function (PROJE_RISK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeRisk/"+PROJE_RISK_ID
                });
                return request;
            }

            this.ProjeRiskFormu = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeRisk/Form",
                    params: AramaKriter
                });
                return request;
            }
    })
;

