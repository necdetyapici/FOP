angular
    .module('inspinia')
        .service('srvIkKargo', function ($http) {
            this.IkKargoGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkKargo",
                    params: AramaKriter
                });
                return request;
           }

            this.IkKargoSelect = function (IK_KARGO_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkKargo/"+IK_KARGO_ID
                });
                return request;
           }

            this.IkKargoEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkKargo",
                    data:Info
                });
                return request;
           }

            this.IkKargoSil = function (IK_KARGO_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkKargo/"+IK_KARGO_ID
                });
                return request;
           }
    })
;

