angular
    .module('inspinia')
        .service('srvIkBirim', function ($http) {
            this.IkBirimGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkBirim",
                    params: AramaKriter
                });
                return request;
           }

            this.IkBirimSelect = function (IK_BIRIM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkBirim/"+IK_BIRIM_ID
                });
                return request;
           }

            this.IkBirimEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkBirim",
                    data:Info
                });
                return request;
           }

            this.IkBirimSil = function (IK_BIRIM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkBirim/"+IK_BIRIM_ID
                });
                return request;
           }
    })
;

