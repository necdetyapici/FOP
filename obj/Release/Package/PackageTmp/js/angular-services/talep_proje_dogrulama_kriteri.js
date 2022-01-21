angular
    .module('inspinia')
        .service('srvTalepProjeDogrulamaKriteri', function ($http) {
            this.TalepProjeDogrulamaKriteriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeDogrulamaKriteri",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeDogrulamaKriteriSelect = function (TALEP_PROJE_DOGRULAMA_KRITERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeDogrulamaKriteri/"+TALEP_PROJE_DOGRULAMA_KRITERI_ID
                });
                return request;
           }

            this.TalepProjeDogrulamaKriteriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeDogrulamaKriteri",
                    data:Info
                });
                return request;
           }

            this.TalepProjeDogrulamaKriteriSil = function (TALEP_PROJE_DOGRULAMA_KRITERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeDogrulamaKriteri/"+TALEP_PROJE_DOGRULAMA_KRITERI_ID
                });
                return request;
           }
    })
;

