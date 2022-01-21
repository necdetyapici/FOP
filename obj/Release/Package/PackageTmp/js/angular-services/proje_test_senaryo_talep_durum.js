angular
    .module('inspinia')
        .service('srvProjeTestSenaryoTalepDurum', function ($http) {
            this.ProjeTestSenaryoTalepDurumGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryoTalepDurum",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeTestSenaryoTalepDurumSelect = function (PROJE_TEST_SENARYO_TALEP_DURUM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryoTalepDurum/"+PROJE_TEST_SENARYO_TALEP_DURUM_ID
                });
                return request;
           }

            this.ProjeTestSenaryoTalepDurumEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeTestSenaryoTalepDurum",
                    data:Info
                });
                return request;
           }

            this.ProjeTestSenaryoTalepDurumSil = function (PROJE_TEST_SENARYO_TALEP_DURUM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeTestSenaryoTalepDurum/"+PROJE_TEST_SENARYO_TALEP_DURUM_ID
                });
                return request;
            }

            this.YeniTestSenaryoEkle = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/ProjeTestSenaryoTalepDurum/YeniTestSenaryo",
                    data: Info
                });
                return request;
            }

            this.ProjeTestSenaryoTestAdımEkle = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/ProjeTestSenaryoTalepDurum/TestAdimEkle",
                    data: Info
                });
                return request;
            }
    })
;

