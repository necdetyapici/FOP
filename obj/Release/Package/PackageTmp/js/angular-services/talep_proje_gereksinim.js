angular
    .module('inspinia')
        .service('srvTalepProjeGereksinim', function ($http) {
            this.TalepProjeGereksinimGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeGereksinim",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeGereksinimSelect = function (TALEP_PROEJ_GEREKSINIM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeGereksinim/"+TALEP_PROEJ_GEREKSINIM_ID
                });
                return request;
           }

            this.TalepProjeGereksinimEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeGereksinim",
                    data:Info
                });
                return request;
           }

            this.TalepProjeGereksinimSil = function (TALEP_PROEJ_GEREKSINIM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeGereksinim/"+TALEP_PROEJ_GEREKSINIM_ID
                });
                return request;
           }
    })
;

