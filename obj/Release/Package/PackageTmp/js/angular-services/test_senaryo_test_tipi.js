angular
    .module('inspinia')
        .service('srvTestSenaryoTestTipi', function ($http) {
            this.TestSenaryoTestTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TestSenaryoTestTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.TestSenaryoTestTipiSelect = function (TEST_SENARYO_TEST_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TestSenaryoTestTipi/"+TEST_SENARYO_TEST_TIPI_ID
                });
                return request;
           }

            this.TestSenaryoTestTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TestSenaryoTestTipi",
                    data:Info
                });
                return request;
           }

            this.TestSenaryoTestTipiSil = function (TEST_SENARYO_TEST_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TestSenaryoTestTipi/"+TEST_SENARYO_TEST_TIPI_ID
                });
                return request;
           }
    })
;

