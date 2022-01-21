angular
    .module('inspinia')
        .service('srvProjeTestSenaryoTestAdim', function ($http) {
            this.ProjeTestSenaryoTestAdimGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryoTestAdim",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeTestSenaryoTestAdimSelect = function (PROJE_TEST_SENARYO_ADIM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryoTestAdim/"+PROJE_TEST_SENARYO_ADIM_ID
                });
                return request;
           }

            this.ProjeTestSenaryoTestAdimEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeTestSenaryoTestAdim",
                    data:Info
                });
                return request;
           }

            this.ProjeTestSenaryoTestAdimSil = function (PROJE_TEST_SENARYO_ADIM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeTestSenaryoTestAdim/"+PROJE_TEST_SENARYO_ADIM_ID
                });
                return request;
            }

            this.ProjeTestSenaryoTestAdimAktifPasif = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/ProjeTestSenaryoTestAdim/AktifPasif",
                    data: Info
                });
                return request;
            }
    })
;

