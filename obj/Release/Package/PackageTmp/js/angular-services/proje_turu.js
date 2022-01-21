angular
    .module('inspinia')
        .service('srvProjeTuru', function ($http) {
            this.ProjeTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeTuruSelect = function (PROJE_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTuru/"+PROJE_TURU_ID
                });
                return request;
           }

            this.ProjeTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeTuru",
                    data:Info
                });
                return request;
           }

            this.ProjeTuruSil = function (PROJE_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeTuru/"+PROJE_TURU_ID
                });
                return request;
           }
    })
;

