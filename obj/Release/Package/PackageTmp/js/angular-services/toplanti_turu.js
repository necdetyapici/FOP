angular
    .module('inspinia')
        .service('srvToplantiTuru', function ($http) {
            this.ToplantiTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiTuruSelect = function (TOPLANTI_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiTuru/"+TOPLANTI_TURU_ID
                });
                return request;
           }

            this.ToplantiTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiTuru",
                    data:Info
                });
                return request;
           }

            this.ToplantiTuruSil = function (TOPLANTI_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiTuru/"+TOPLANTI_TURU_ID
                });
                return request;
           }
    })
;

