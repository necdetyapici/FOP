angular
    .module('inspinia')
        .service('srvGereksinimTuru', function ($http) {
            this.GereksinimTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/GereksinimTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.GereksinimTuruSelect = function (GEREKSINIM_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/GereksinimTuru/"+GEREKSINIM_TURU_ID
                });
                return request;
           }

            this.GereksinimTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/GereksinimTuru",
                    data:Info
                });
                return request;
           }

            this.GereksinimTuruSil = function (GEREKSINIM_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/GereksinimTuru/"+GEREKSINIM_TURU_ID
                });
                return request;
           }
    })
;

