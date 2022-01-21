angular
    .module('inspinia')
        .service('srvProjeTestSenaryoTestAdimTalepDurum', function ($http) {
            this.ProjeTestSenaryoTestAdimTalepDurumGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryoTestAdimTalepDurum",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeTestSenaryoTestAdimTalepDurumSelect = function (PROJE_TEST_SENARYO_TEST_ADIM_TALEP_DURUM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTestSenaryoTestAdimTalepDurum/"+PROJE_TEST_SENARYO_TEST_ADIM_TALEP_DURUM_ID
                });
                return request;
           }

            this.ProjeTestSenaryoTestAdimTalepDurumEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url: "/api/ProjeTestSenaryoTestAdimTalepDurum",
                    data: Info
                });
                return request;
           }

            this.ProjeTestSenaryoTestAdimTalepDurumSil = function (PROJE_TEST_SENARYO_TEST_ADIM_TALEP_DURUM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeTestSenaryoTestAdimTalepDurum/"+PROJE_TEST_SENARYO_TEST_ADIM_TALEP_DURUM_ID
                });
                return request;
            }

            
    })
;

