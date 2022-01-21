angular
    .module('inspinia')
        .service('srvBGRiskTehditGerceklesmeSayisi', function ($http) {
            this.BGRiskTehditGerceklesmeSayisiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRiskTehditGerceklesmeSayisi",
                    params: AramaKriter
                });
                return request;
           }

            this.BGRiskTehditGerceklesmeSayisiSelect = function (B_G_RISK_TEHDIT_GERCEKLESME_SAYISI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRiskTehditGerceklesmeSayisi/"+B_G_RISK_TEHDIT_GERCEKLESME_SAYISI_ID
                });
                return request;
           }

            this.BGRiskTehditGerceklesmeSayisiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/BGRiskTehditGerceklesmeSayisi",
                    data:Info
                });
                return request;
           }

            this.BGRiskTehditGerceklesmeSayisiSil = function (B_G_RISK_TEHDIT_GERCEKLESME_SAYISI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/BGRiskTehditGerceklesmeSayisi/"+B_G_RISK_TEHDIT_GERCEKLESME_SAYISI_ID
                });
                return request;
           }
    })
;

