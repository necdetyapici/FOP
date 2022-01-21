angular
    .module('inspinia')
        .service('srvIkEgitimDosyaTipi', function ($http) {
            this.IkEgitimDosyaTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitimDosyaTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.IkEgitimDosyaTipiSelect = function (IK_EGITIM_DOSYA_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitimDosyaTipi/"+IK_EGITIM_DOSYA_TIPI_ID
                });
                return request;
           }

            this.IkEgitimDosyaTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkEgitimDosyaTipi",
                    data:Info
                });
                return request;
           }

            this.IkEgitimDosyaTipiSil = function (IK_EGITIM_DOSYA_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkEgitimDosyaTipi/"+IK_EGITIM_DOSYA_TIPI_ID
                });
                return request;
           }
    })
;

