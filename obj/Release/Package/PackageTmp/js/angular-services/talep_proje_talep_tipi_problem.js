angular
    .module('inspinia')
        .service('srvTalepProjeTalepTipiProblem', function ($http) {
            this.TalepProjeTalepTipiProblemGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiProblem",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeTalepTipiProblemSelect = function (TALEP_PROJE_TALEP_TIPI_PROBLEM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeTalepTipiProblem/"+TALEP_PROJE_TALEP_TIPI_PROBLEM_ID
                });
                return request;
           }

            this.TalepProjeTalepTipiProblemEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeTalepTipiProblem",
                    data:Info
                });
                return request;
           }

            this.TalepProjeTalepTipiProblemSil = function (TALEP_PROJE_TALEP_TIPI_PROBLEM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeTalepTipiProblem/"+TALEP_PROJE_TALEP_TIPI_PROBLEM_ID
                });
                return request;
           }
    })
;

