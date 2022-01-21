angular
    .module('inspinia')
        .service('srvTalepProjeTalepTipiDegisiklik', function ($http) {
            this.TalepProjeTalepTipiDegisiklikGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiDegisiklik",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeTalepTipiDegisiklikSelect = function (TALEP_PROJE_TALEP_TIPI_DEGISIKLIK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiDegisiklik/"+TALEP_PROJE_TALEP_TIPI_DEGISIKLIK_ID
                });
                return request;
           }

            this.TalepProjeTalepTipiDegisiklikEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeTalepTipiDegisiklik",
                    data:Info
                });
                return request;
           }

            this.TalepProjeTalepTipiDegisiklikSil = function (TALEP_PROJE_TALEP_TIPI_DEGISIKLIK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeTalepTipiDegisiklik/"+TALEP_PROJE_TALEP_TIPI_DEGISIKLIK_ID
                });
                return request;
           }
    })
;

