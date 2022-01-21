angular
    .module('inspinia')
        .service('srvIkUnvan', function ($http) {
            this.IkUnvanGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkUnvan",
                    params: AramaKriter
                });
                return request;
           }

            this.IkUnvanSelect = function (IK_UNVAN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkUnvan/"+IK_UNVAN_ID
                });
                return request;
           }

            this.IkUnvanEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkUnvan",
                    data:Info
                });
                return request;
           }

            this.IkUnvanSil = function (IK_UNVAN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkUnvan/"+IK_UNVAN_ID
                });
                return request;
           }
    })
;

