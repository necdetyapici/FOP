angular
    .module('inspinia')
        .service('srvVarlikOlasilikEtkiDegeriTipi', function ($http) {
            this.VarlikOlasilikEtkiDegeriTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/VarlikOlasilikEtkiDegeriTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.VarlikOlasilikEtkiDegeriTipiSelect = function (VARLIK_OLASILIK_ETKI_DEGERI_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/VarlikOlasilikEtkiDegeriTipi/"+VARLIK_OLASILIK_ETKI_DEGERI_TIPI_ID
                });
                return request;
           }

            this.VarlikOlasilikEtkiDegeriTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/VarlikOlasilikEtkiDegeriTipi",
                    data:Info
                });
                return request;
           }

            this.VarlikOlasilikEtkiDegeriTipiSil = function (VARLIK_OLASILIK_ETKI_DEGERI_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/VarlikOlasilikEtkiDegeriTipi/"+VARLIK_OLASILIK_ETKI_DEGERI_TIPI_ID
                });
                return request;
           }
    })
;

