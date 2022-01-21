angular
    .module('inspinia')
        .service('srvTalepProjeIlgi', function ($http) {
            this.TalepProjeIlgiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeIlgi",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeIlgiSelect = function (TALEP_PROJE_ILGI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeIlgi/"+TALEP_PROJE_ILGI_ID
                });
                return request;
           }

            this.TalepProjeIlgiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeIlgi",
                    data:Info
                });
                return request;
           }

            this.TalepProjeIlgiSil = function (TALEP_PROJE_ILGI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeIlgi/"+TALEP_PROJE_ILGI_ID
                });
                return request;
           }
    })
;

