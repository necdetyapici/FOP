angular
    .module('inspinia')
        .service('srvBGRiskUygulamaKontrolKriteri', function ($http) {
            this.BGRiskUygulamaKontrolKriteriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRiskUygulamaKontrolKriteri",
                    params: AramaKriter
                });
                return request;
           }

            this.BGRiskUygulamaKontrolKriteriSelect = function (B_G_RISK_UYGULAMA_KONTROL_KRITERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/BGRiskUygulamaKontrolKriteri/"+B_G_RISK_UYGULAMA_KONTROL_KRITERI_ID
                });
                return request;
           }

            this.BGRiskUygulamaKontrolKriteriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/BGRiskUygulamaKontrolKriteri",
                    data:Info
                });
                return request;
           }

            this.BGRiskUygulamaKontrolKriteriSil = function (B_G_RISK_UYGULAMA_KONTROL_KRITERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/BGRiskUygulamaKontrolKriteri/"+B_G_RISK_UYGULAMA_KONTROL_KRITERI_ID
                });
                return request;
           }
    })
;

