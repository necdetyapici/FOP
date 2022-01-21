angular
    .module('inspinia')
        .service('srvOlasilikDegeri', function ($http) {
            this.OlasilikDegeriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/OlasilikDegeri",
                    params: AramaKriter
                });
                return request;
           }

            this.OlasilikDegeriSelect = function (OLASILIK_DEGERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/OlasilikDegeri/"+OLASILIK_DEGERI_ID
                });
                return request;
           }

            this.OlasilikDegeriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/OlasilikDegeri",
                    data:Info
                });
                return request;
           }

            this.OlasilikDegeriSil = function (OLASILIK_DEGERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/OlasilikDegeri/"+OLASILIK_DEGERI_ID
                });
                return request;
           }
    })
;

