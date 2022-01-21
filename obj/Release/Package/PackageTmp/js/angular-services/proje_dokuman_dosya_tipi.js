angular
    .module('inspinia')
        .service('srvProjeDokumanDosyaTipi', function ($http) {
            this.ProjeDokumanDosyaTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDokumanDosyaTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeDokumanDosyaTipiSelect = function (PROJE_DOKUMAN_DOSYA_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDokumanDosyaTipi/"+PROJE_DOKUMAN_DOSYA_TIPI_ID
                });
                return request;
           }

            this.ProjeDokumanDosyaTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeDokumanDosyaTipi",
                    data:Info
                });
                return request;
           }

            this.ProjeDokumanDosyaTipiSil = function (PROJE_DOKUMAN_DOSYA_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeDokumanDosyaTipi/"+PROJE_DOKUMAN_DOSYA_TIPI_ID
                });
                return request;
           }
    })
;

