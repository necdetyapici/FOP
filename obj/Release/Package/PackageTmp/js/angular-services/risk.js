angular
    .module('inspinia')
        .service('srvRisk', function ($http) {
            this.RiskGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Risk",
                    params: AramaKriter
                });
                return request;
           }

            this.RiskSelect = function (RISK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Risk/"+RISK_ID
                });
                return request;
           }

            this.RiskEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Risk",
                    data:Info
                });
                return request;
           }

            this.RiskSil = function (RISK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Risk/"+RISK_ID
                });
                return request;
            }

            this.RiskTuruSelect = function (RISK_TURU_ID) {
                var request = $http({
                    method: "get",
                    url: "/api/Risk/GetRiskTuru/?id=" + RISK_TURU_ID
                });
                return request;
            }
    })
;

