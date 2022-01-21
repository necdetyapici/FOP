angular
    .module('inspinia')
        .service('srvSurec', function ($http) {
            this.SurecGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Surec",
                    params: AramaKriter
                });
                return request;
           }

            this.SurecSelect = function (SUREC_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Surec/"+SUREC_ID
                });
                return request;
           }

            this.SurecEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Surec",
                    data:Info
                });
                return request;
           }

            this.SurecSil = function (SUREC_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Surec/"+SUREC_ID
                });
                return request;
           }
    })
;

