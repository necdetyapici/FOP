angular
    .module('inspinia')
        .service('srvRiskIslemeStratejisi', function ($http) {
            this.RiskIslemeStratejisiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/RiskIslemeStratejisi",
                    params: AramaKriter
                });
                return request;
           }

            this.RiskIslemeStratejisiSelect = function (RISK_ISLEME_STRATEJISI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/RiskIslemeStratejisi/"+RISK_ISLEME_STRATEJISI_ID
                });
                return request;
           }

            this.RiskIslemeStratejisiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/RiskIslemeStratejisi",
                    data:Info
                });
                return request;
           }

            this.RiskIslemeStratejisiSil = function (RISK_ISLEME_STRATEJISI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/RiskIslemeStratejisi/"+RISK_ISLEME_STRATEJISI_ID
                });
                return request;
           }
    })
;

