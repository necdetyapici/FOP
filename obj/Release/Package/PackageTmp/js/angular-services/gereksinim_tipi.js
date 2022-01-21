angular
    .module('inspinia')
        .service('srvGereksinimTipi', function ($http) {
            this.GereksinimTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/GereksinimTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.GereksinimTipiSelect = function (GEREKSINIM_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/GereksinimTipi/"+GEREKSINIM_TIPI_ID
                });
                return request;
           }

            this.GereksinimTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/GereksinimTipi",
                    data:Info
                });
                return request;
           }

            this.GereksinimTipiSil = function (GEREKSINIM_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/GereksinimTipi/"+GEREKSINIM_TIPI_ID
                });
                return request;
           }
    })
;

