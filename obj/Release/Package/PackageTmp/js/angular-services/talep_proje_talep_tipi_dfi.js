angular
    .module('inspinia')
        .service('srvTalepProjeTalepTipiDfi', function ($http) {
            this.TalepProjeTalepTipiDfiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiDfi",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeTalepTipiDfiSelect = function (TALEP_PROJE_TALEP_TIPI_DFI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiDfi/"+TALEP_PROJE_TALEP_TIPI_DFI_ID
                });
                return request;
           }

            this.TalepProjeTalepTipiDfiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeTalepTipiDfi",
                    data:Info
                });
                return request;
           }

            this.TalepProjeTalepTipiDfiSil = function (TALEP_PROJE_TALEP_TIPI_DFI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeTalepTipiDfi/"+TALEP_PROJE_TALEP_TIPI_DFI_ID
                });
                return request;
           }
    })
;

