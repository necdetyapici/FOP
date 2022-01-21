angular
    .module('inspinia')
        .service('srvBGRiskTehdit', function ($http) {
            this.BGRiskTehditGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRiskTehdit",
                    params: AramaKriter
                });
                return request;
           }

            this.BGRiskTehditSelect = function (B_G_RISK_TEHDIT_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRiskTehdit/"+B_G_RISK_TEHDIT_ID
                });
                return request;
           }

            this.BGRiskTehditEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/BGRiskTehdit",
                    data:Info
                });
                return request;
           }

            this.BGRiskTehditSil = function (B_G_RISK_TEHDIT_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/BGRiskTehdit/"+B_G_RISK_TEHDIT_ID
                });
                return request;
            }

            this.BGRiskTehditTanimlamaSelect = function (B_G_ACIKLIK_ID) {
                var request = $http({
                    method: "get",
                    url: "/api/BGRiskTehdit/GetRiskTehdit/?id=" + B_G_ACIKLIK_ID
                });
                return request;
            }
    })
;

