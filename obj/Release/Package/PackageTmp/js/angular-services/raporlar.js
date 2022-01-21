angular
    .module('inspinia')
    .service('srvRaporlar', function ($http) {

        this.rprKullaniListesi = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/rprKullaniciListesi",
                    data:Info
                });
                return request;
           }

        this.rprIzinFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprPersonelIzinFormu",
                data: Info
            });
            return request;
        }

        this.rprZimmetFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprPersonelZimmetFormu",
                data: Info
            });
            return request;
        }

        this.rprGenelZimmetFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprPersonelZimmetFormu/GenelZimmetTeslimPost",
                data: Info
            });
            return request;
        }

        this.rprDemirbasListesi = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprDemirbasListesi",
                data: Info
            });
            return request;
        }

        
        this.rprZimmetListesiFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprPersonelZimmetFormu/GenelZimmetListesiPost",
                data: Info
            });
            return request;
        }


        this.rprMasrafFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprPersonelMasrafFormu",
                data: Info
            });
            return request;
        }

        this.rprProjeRiskFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprProjeRiskDurumFormu",
                data: Info
            });
            return request;
        }

        this.rprToplantiTutanagiFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprToplantiTutanagiFormu",
                data: Info
            });
            return request;
        }

        this.rprProjeRiskGrupFormu = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/rprPersonelZimmetFormu/RiskGrupListesi",
                data: Info
            });
            return request;
        }
    })
;

