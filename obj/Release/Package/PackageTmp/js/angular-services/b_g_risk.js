angular
    .module('inspinia')
        .service('srvBGRisk', function ($http) {
            this.BGRiskGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRisk",
                    params: AramaKriter
                });
                return request;
           }

            this.BGRiskSelect = function (B_G_RISK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRisk/"+B_G_RISK_ID
                });
                return request;
           }

            this.BGRiskEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/BGRisk",
                    data:Info
                });
                return request;
           }

            this.BGRiskSil = function (B_G_RISK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/BGRisk/"+B_G_RISK_ID
                });
                return request;
           }
    })
;

