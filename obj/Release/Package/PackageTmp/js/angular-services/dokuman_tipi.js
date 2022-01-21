angular
    .module('inspinia')
        .service('srvDokumanTipi', function ($http) {
            this.DokumanTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanTipiSelect = function (DOKUMAN_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanTipi/"+DOKUMAN_TIPI_ID
                });
                return request;
           }

            this.DokumanTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanTipi",
                    data:Info
                });
                return request;
           }

            this.DokumanTipiSil = function (DOKUMAN_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanTipi/"+DOKUMAN_TIPI_ID
                });
                return request;
           }
    })
;

