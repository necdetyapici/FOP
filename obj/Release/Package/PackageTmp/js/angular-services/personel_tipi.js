angular
    .module('inspinia')
        .service('srvPersonelTipi', function ($http) {
            this.PersonelTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/PersonelTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.PersonelTipiSelect = function (PERSONEL_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/PersonelTipi/"+PERSONEL_TIPI_ID
                });
                return request;
           }

            this.PersonelTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/PersonelTipi",
                    data:Info
                });
                return request;
           }

            this.PersonelTipiSil = function (PERSONEL_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/PersonelTipi/"+PERSONEL_TIPI_ID
                });
                return request;
           }
    })
;

