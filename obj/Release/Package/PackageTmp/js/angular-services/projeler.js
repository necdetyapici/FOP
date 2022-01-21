angular
    .module('inspinia')
    .service('srvProjeler', function ($http) {

            this.ProjelerGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Projeler",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjelerSelect = function (PROJE_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Projeler/"+PROJE_ID
                });
                return request;
           }

            this.ProjelerEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Projeler",
                    data:Info
                });
                return request;
           }

            this.ProjelerSil = function (PROJE_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Projeler/"+PROJE_ID
                });
                return request;
           }
    })
;

