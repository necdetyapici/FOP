angular
    .module('inspinia')
        .service('srvProjeTestSenaryo', function ($http) {
            this.ProjeTestSenaryoGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryo",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeTestSenaryoSelect = function (PROJE_TEST_SENARYO_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryo/"+PROJE_TEST_SENARYO_ID
                });
                return request;
           }

            this.ProjeTestSenaryoEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeTestSenaryo",
                    data:Info
                });
                return request;
           }

            this.ProjeTestSenaryoSil = function (PROJE_TEST_SENARYO_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeTestSenaryo/"+PROJE_TEST_SENARYO_ID
                });
                return request;
           }
    })
;

