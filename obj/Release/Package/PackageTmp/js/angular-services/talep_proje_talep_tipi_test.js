angular
    .module('inspinia')
        .service('srvTalepProjeTalepTipiTest', function ($http) {
            this.TalepProjeTalepTipiTestGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiTest",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeTalepTipiTestSelect = function (TALEP_PROJE_TALEP_TIPI_TEST_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiTest/"+TALEP_PROJE_TALEP_TIPI_TEST_ID
                });
                return request;
           }

            this.TalepProjeTalepTipiTestEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeTalepTipiTest",
                    data:Info
                });
                return request;
           }

            this.TalepProjeTalepTipiTestSil = function (TALEP_PROJE_TALEP_TIPI_TEST_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeTalepTipiTest/"+TALEP_PROJE_TALEP_TIPI_TEST_ID
                });
                return request;
           }
    })
;

