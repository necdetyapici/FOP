angular
    .module('inspinia')
        .service('srvUlasimSekliTipi', function ($http) {
            this.UlasimSekliTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/UlasimSekliTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.UlasimSekliTipiSelect = function (ULASIM_SEKLI_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/UlasimSekliTipi/"+ULASIM_SEKLI_TIPI_ID
                });
                return request;
           }

            this.UlasimSekliTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/UlasimSekliTipi",
                    data:Info
                });
                return request;
           }

            this.UlasimSekliTipiSil = function (ULASIM_SEKLI_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/UlasimSekliTipi/"+ULASIM_SEKLI_TIPI_ID
                });
                return request;
           }
    })
;

