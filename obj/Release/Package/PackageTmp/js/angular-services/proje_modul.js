angular
    .module('inspinia')
        .service('srvProjeModul', function ($http) {
            this.ProjeModulGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeModul",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeModulSelect = function (PROJE_MODUL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeModul/"+PROJE_MODUL_ID
                });
                return request;
           }

            this.ProjeModulEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeModul",
                    data:Info
                });
                return request;
           }

            this.ProjeModulSil = function (PROJE_MODUL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeModul/"+PROJE_MODUL_ID
                });
                return request;
           }
    })
;

