angular
    .module('inspinia')
        .service('srvTicariKosul', function ($http) {
            this.TicariKosulGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TicariKosul",
                    params: AramaKriter
                });
                return request;
           }

            this.TicariKosulSelect = function (TICARI_KOSUL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TicariKosul/"+TICARI_KOSUL_ID
                });
                return request;
           }

            this.TicariKosulEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TicariKosul",
                    data:Info
                });
                return request;
           }

            this.TicariKosulSil = function (TICARI_KOSUL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TicariKosul/"+TICARI_KOSUL_ID
                });
                return request;
           }
    })
;

