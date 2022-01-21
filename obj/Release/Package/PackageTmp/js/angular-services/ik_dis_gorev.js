angular
    .module('inspinia')
        .service('srvIkDisGorev', function ($http) {
            this.IkDisGorevGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDisGorev",
                    params: AramaKriter
                });
                return request;
           }

            this.IkDisGorevSelect = function (IK_DIS_GOREV_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDisGorev/"+IK_DIS_GOREV_ID
                });
                return request;
           }

            this.IkDisGorevEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkDisGorev",
                    data:Info
                });
                return request;
           }

            this.IkDisGorevSil = function (IK_DIS_GOREV_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkDisGorev/"+IK_DIS_GOREV_ID
                });
                return request;
            }

            this.IkDisGorevOnay = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/IkDisGorev/IkDisGorevOnay",
                    data: Info
                });
                return request;
            }
    })
;

