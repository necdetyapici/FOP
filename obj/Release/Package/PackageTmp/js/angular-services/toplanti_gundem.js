angular
    .module('inspinia')
        .service('srvToplantiGundem', function ($http) {
            this.ToplantiGundemGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundem",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiGundemSelect = function (TOPLANTI_GUNDEM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundem/"+TOPLANTI_GUNDEM_ID
                });
                return request;
           }

            this.ToplantiGundemEkleGuncelle = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/ToplantiGundem" ,
                    data:Info
                });
                return request;
           }

            this.ToplantiGundemSil = function (TOPLANTI_GUNDEM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiGundem/"+TOPLANTI_GUNDEM_ID
                });
                return request;
            }

            this.ToplantiGundemDurum = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/ToplantiGundem/ToplantiGundemDurum",
                    data: Info
                });
                return request;
            };
    })
;

