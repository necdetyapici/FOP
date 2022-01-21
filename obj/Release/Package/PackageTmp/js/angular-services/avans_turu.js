angular
    .module('inspinia')
        .service('srvAvansTuru', function ($http) {
            this.AvansTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/AvansTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.AvansTuruSelect = function (AVANS_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/AvansTuru/"+AVANS_TURU_ID
                });
                return request;
           }

            this.AvansTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/AvansTuru",
                    data:Info
                });
                return request;
           }

            this.AvansTuruSil = function (AVANS_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/AvansTuru/"+AVANS_TURU_ID
                });
                return request;
           }
    })
;

