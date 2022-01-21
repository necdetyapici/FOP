angular
    .module('inspinia')
        .service('srvProjeDogrulamaKriteri', function ($http) {
            this.ProjeDogrulamaKriteriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDogrulamaKriteri",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeDogrulamaKriteriSelect = function (PROJE_DOGRULAMA_KRITERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDogrulamaKriteri/"+PROJE_DOGRULAMA_KRITERI_ID
                });
                return request;
           }

            this.ProjeDogrulamaKriteriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeDogrulamaKriteri",
                    data:Info
                });
                return request;
           }

            this.ProjeDogrulamaKriteriSil = function (PROJE_DOGRULAMA_KRITERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeDogrulamaKriteri/"+PROJE_DOGRULAMA_KRITERI_ID
                });
                return request;
            }

            this.ProjeDogrulamaKriteriAktifPasif = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/ProjeDogrulamaKriteri/AktifPasif",
                    data: Info
                });
                return request;
            }
    })
;

