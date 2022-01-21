angular
    .module('inspinia')
        .service('srvIkDepartman', function ($http) {
            this.IkDepartmanGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDepartman",
                    params: AramaKriter
                });
                return request;
           }

            this.IkDepartmanSelect = function (IK_DEPARTMAN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDepartman/"+IK_DEPARTMAN_ID
                });
                return request;
           }

            this.IkDepartmanEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkDepartman",
                    data:Info
                });
                return request;
           }

            this.IkDepartmanSil = function (IK_DEPARTMAN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkDepartman/"+IK_DEPARTMAN_ID
                });
                return request;
           }
    })
;

