angular
    .module('inspinia')
        .service('srvKargoSirketi', function ($http) {
            this.KargoSirketiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/KargoSirketi",
                    params: AramaKriter
                });
                return request;
           }

            this.KargoSirketiSelect = function (KARGO_SIRKETI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/KargoSirketi/"+KARGO_SIRKETI_ID
                });
                return request;
           }

            this.KargoSirketiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/KargoSirketi",
                    data:Info
                });
                return request;
           }

            this.KargoSirketiSil = function (KARGO_SIRKETI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/KargoSirketi/"+KARGO_SIRKETI_ID
                });
                return request;
           }
    })
;

