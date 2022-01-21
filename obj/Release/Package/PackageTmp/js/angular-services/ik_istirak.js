angular
    .module('inspinia')
        .service('srvIkIstirak', function ($http) {
            this.IkIstirakGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIstirak",
                    params: AramaKriter
                });
                return request;
           }

            this.IkIstirakSelect = function (IK_ISTIRAK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIstirak/"+IK_ISTIRAK_ID
                });
                return request;
           }

            this.IkIstirakEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkIstirak",
                    data:Info
                });
                return request;
           }

            this.IkIstirakSil = function (IK_ISTIRAK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkIstirak/"+IK_ISTIRAK_ID
                });
                return request;
           }
    })
;

