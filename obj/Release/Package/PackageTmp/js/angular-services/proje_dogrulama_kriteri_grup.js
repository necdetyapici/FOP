angular
    .module('inspinia')
        .service('srvProjeDogrulamaKriteriGrup', function ($http) {
            this.ProjeDogrulamaKriteriGrupGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDogrulamaKriteriGrup",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeDogrulamaKriteriGrupSelect = function (PROJE_DOGRULAMA_KRITERI_GRUP_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDogrulamaKriteriGrup/"+PROJE_DOGRULAMA_KRITERI_GRUP_ID
                });
                return request;
           }

            this.ProjeDogrulamaKriteriGrupEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeDogrulamaKriteriGrup",
                    data:Info
                });
                return request;
           }

            this.ProjeDogrulamaKriteriGrupSil = function (PROJE_DOGRULAMA_KRITERI_GRUP_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeDogrulamaKriteriGrup/"+PROJE_DOGRULAMA_KRITERI_GRUP_ID
                });
                return request;
           }
    })
;

