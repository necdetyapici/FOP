angular
    .module('inspinia')
        .service('srvProjeIterasyon', function ($http) {
            this.ProjeIterasyonGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeIterasyon",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeIterasyonSelect = function (PROJE_ITERASYON_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeIterasyon/"+PROJE_ITERASYON_ID
                });
                return request;
           }

            this.ProjeIterasyonEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeIterasyon",
                    data:Info
                });
                return request;
           }

            this.ProjeIterasyonSil = function (PROJE_ITERASYON_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeIterasyon/"+PROJE_ITERASYON_ID
                });
                return request;
           }
    })
;

