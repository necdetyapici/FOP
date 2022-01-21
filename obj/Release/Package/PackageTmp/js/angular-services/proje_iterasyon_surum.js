angular
    .module('inspinia')
        .service('srvProjeIterasyonSurum', function ($http) {
            this.ProjeIterasyonSurumGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeIterasyonSurum",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeIterasyonSurumSelect = function (PROJE_ITERASYON_SURUM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeIterasyonSurum/"+PROJE_ITERASYON_SURUM_ID
                });
                return request;
           }

            this.ProjeIterasyonSurumEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeIterasyonSurum",
                    data:Info
                });
                return request;
           }

            this.ProjeIterasyonSurumSil = function (PROJE_ITERASYON_SURUM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeIterasyonSurum/"+PROJE_ITERASYON_SURUM_ID
                });
                return request;
           }
    })
;

