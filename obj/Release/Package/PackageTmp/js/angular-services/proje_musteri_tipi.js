angular
    .module('inspinia')
        .service('srvProjeMusteriTipi', function ($http) {
            this.ProjeMusteriTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeMusteriTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeMusteriTipiSelect = function (PROJE_MUSTERI_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeMusteriTipi/"+PROJE_MUSTERI_TIPI_ID
                });
                return request;
           }

            this.ProjeMusteriTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeMusteriTipi",
                    data:Info
                });
                return request;
           }

            this.ProjeMusteriTipiSil = function (PROJE_MUSTERI_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeMusteriTipi/"+PROJE_MUSTERI_TIPI_ID
                });
                return request;
           }
    })
;

