angular
    .module('inspinia')
        .service('srvToplanti', function ($http) {
            this.ToplantiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Toplanti",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiSelect = function (TOPLANTI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Toplanti/"+TOPLANTI_ID
                });
                return request;
           }

            this.ToplantiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Toplanti",
                    data:Info
                });
                return request;
           }

            this.ToplantiSil = function (TOPLANTI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Toplanti/"+TOPLANTI_ID
                });
                return request;
            }

            this.ToplantiFormu = function (TOPLANTI_ID) {
                var request = $http({
                    method: "get",
                    url: "/api/Toplanti/ToplantiFormu/" + TOPLANTI_ID
                    
                });
                return request;
            }

    })
;

