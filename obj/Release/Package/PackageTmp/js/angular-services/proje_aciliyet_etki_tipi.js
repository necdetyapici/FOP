angular
    .module('inspinia')
        .service('srvProjeAciliyetEtkiTipi', function ($http) {
            this.ProjeAciliyetEtkiTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeAciliyetEtkiTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeAciliyetEtkiTipiSelect = function (PROJE_ACILIYET_ETKI_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeAciliyetEtkiTipi/"+PROJE_ACILIYET_ETKI_TIPI_ID
                });
                return request;
           }

            this.ProjeAciliyetEtkiTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeAciliyetEtkiTipi",
                    data:Info
                });
                return request;
           }

            this.ProjeAciliyetEtkiTipiSil = function (PROJE_ACILIYET_ETKI_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeAciliyetEtkiTipi/"+PROJE_ACILIYET_ETKI_TIPI_ID
                });
                return request;
           }
    })
;

