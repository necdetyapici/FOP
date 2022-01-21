angular
    .module('inspinia')
        .service('srvToplantiGundemiTuru', function ($http) {
            this.ToplantiGundemiTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundemiTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiGundemiTuruSelect = function (TOPLANTI_GUNDEMI_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundemiTuru/"+TOPLANTI_GUNDEMI_TURU_ID
                });
                return request;
           }

            this.ToplantiGundemiTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiGundemiTuru",
                    data:Info
                });
                return request;
           }

            this.ToplantiGundemiTuruSil = function (TOPLANTI_GUNDEMI_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiGundemiTuru/"+TOPLANTI_GUNDEMI_TURU_ID
                });
                return request;
           }
    })
;

