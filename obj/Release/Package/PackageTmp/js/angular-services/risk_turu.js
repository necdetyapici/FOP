angular
    .module('inspinia')
        .service('srvRiskTuru', function ($http) {
            this.RiskTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/RiskTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.RiskTuruSelect = function (RISK_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/RiskTuru/"+RISK_TURU_ID
                });
                return request;
           }

            this.RiskTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/RiskTuru",
                    data:Info
                });
                return request;
           }

            this.RiskTuruSil = function (RISK_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/RiskTuru/"+RISK_TURU_ID
                });
                return request;
            }
            
    })
;

