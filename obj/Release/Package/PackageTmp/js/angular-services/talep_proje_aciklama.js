angular
    .module('inspinia')
        .service('srvTalepProjeAciklama', function ($http) {
            this.TalepProjeAciklamaGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeAciklama",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeAciklamaSelect = function (TALEP_PROJE_ACIKLAMA_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeAciklama/"+TALEP_PROJE_ACIKLAMA_ID
                });
                return request;
           }

            this.TalepProjeAciklamaEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeAciklama",
                    data:Info
                });
                return request;
           }

            this.TalepProjeAciklamaSil = function (TALEP_PROJE_ACIKLAMA_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeAciklama/"+TALEP_PROJE_ACIKLAMA_ID
                });
                return request;
           }
    })
;

