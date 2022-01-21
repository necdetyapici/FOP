angular
    .module('inspinia')
    .service('srvProjeGereksinim', function ($http) {
        this.ProjeGereksinimGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjeGereksinim",
                params: AramaKriter
            });
            return request;
        }

        this.ProjeGereksinimSelect = function (PROJE_GEREKSINIM_ID) {
            var request = $http({
                method: "get",
                url: "/api/ProjeGereksinim/" + PROJE_GEREKSINIM_ID
            });
            return request;
        }

        this.ProjeGereksinimEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/ProjeGereksinim",
                data: Info
            });
            return request;
        }

        this.ProjeGereksinimSil = function (PROJE_GEREKSINIM_ID) {
            var request = $http({
                method: "delete",
                url: "/api/ProjeGereksinim/" + PROJE_GEREKSINIM_ID
            });
            return request;
        }
    })
    ;

