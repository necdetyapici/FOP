angular
    .module('inspinia')
        .service('srvTalepSiniflandirmaTipi', function ($http) {
            this.TalepSiniflandirmaTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepSiniflandirmaTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepSiniflandirmaTipiSelect = function (TALEP_SINIFLANDIRMA_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepSiniflandirmaTipi/"+TALEP_SINIFLANDIRMA_TIPI_ID
                });
                return request;
           }

            this.TalepSiniflandirmaTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepSiniflandirmaTipi",
                    data:Info
                });
                return request;
           }

            this.TalepSiniflandirmaTipiSil = function (TALEP_SINIFLANDIRMA_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepSiniflandirmaTipi/"+TALEP_SINIFLANDIRMA_TIPI_ID
                });
                return request;
           }
    })
;

