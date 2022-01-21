angular
    .module('inspinia')
        .service('srvAvans', function ($http) {
            this.AvansGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Avans",
                    params: AramaKriter
                });
                return request;
           }

            this.AvansSelect = function (AVANS_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Avans/"+AVANS_ID
                });
                return request;
           }

            this.AvansEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Avans",
                    data:Info
                });
                return request;
           }

            this.AvansSil = function (AVANS_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Avans/"+AVANS_ID
                });
                return request;
            }

            this.AvansOnaylama = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/Avans/AvansOnaylama",
                    data: Info
                });
                return request;
            }

            this.AvansFormu = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/Avans/Form",
                    params: AramaKriter
                });
                return request;
            }
    })
;

