angular
    .module('inspinia')
        .service('srvProjeRiskTehditGerceklesmeSayisi', function ($http) {
            this.ProjeRiskTehditGerceklesmeSayisiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeRiskTehditGerceklesmeSayisi",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeRiskTehditGerceklesmeSayisiSelect = function (PROJE_RISK_TEHDIT_GERCEKLESME_SAYISI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeRiskTehditGerceklesmeSayisi/"+PROJE_RISK_TEHDIT_GERCEKLESME_SAYISI_ID
                });
                return request;
           }

            this.ProjeRiskTehditGerceklesmeSayisiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeRiskTehditGerceklesmeSayisi",
                    data:Info
                });
                return request;
           }

            this.ProjeRiskTehditGerceklesmeSayisiSil = function (PROJE_RISK_TEHDIT_GERCEKLESME_SAYISI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeRiskTehditGerceklesmeSayisi/"+PROJE_RISK_TEHDIT_GERCEKLESME_SAYISI_ID
                });
                return request;
           }
    })
;

