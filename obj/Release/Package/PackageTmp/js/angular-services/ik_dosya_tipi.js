angular
    .module('inspinia')
        .service('srvIkDosyaTipi', function ($http) {
            this.IkDosyaTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDosyaTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.IkDosyaTipiSelect = function (IK_DOSYA_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDosyaTipi/"+IK_DOSYA_TIPI_ID
                });
                return request;
           }

            this.IkDosyaTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkDosyaTipi",
                    data:Info
                });
                return request;
           }

            this.IkDosyaTipiSil = function (IK_DOSYA_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkDosyaTipi/"+IK_DOSYA_TIPI_ID
                });
                return request;
           }
    })
;

