angular
    .module('inspinia')
        .service('srvIkZimmet', function ($http) {
            this.IkZimmetGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkZimmet",
                    params: AramaKriter
                });
                return request;
           }

            this.IkZimmetSelect = function (IK_ZIMMET_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkZimmet/"+IK_ZIMMET_ID
                });
                return request;
           }

            this.IkZimmetEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkZimmet",
                    data:Info
                });
                return request;
           }

            this.IkZimmetSil = function (IK_ZIMMET_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkZimmet/"+IK_ZIMMET_ID
                });
                return request;
            }

            this.ZimmetFormu = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/IkZimmet/Form",
                    params: AramaKriter
                });
                return request;
            }
    })
;

