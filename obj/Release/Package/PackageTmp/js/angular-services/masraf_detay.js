angular
    .module('inspinia')
        .service('srvMasrafDetay', function ($http) {
            this.MasrafDetayGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/MasrafDetay",
                    params: AramaKriter
                });
                return request;
           }

            this.MasrafDetaySelect = function (MASRAF_DETAY_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/MasrafDetay/"+MASRAF_DETAY_ID
                });
                return request;
           }

            this.MasrafDetayEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/MasrafDetay",
                    data:Info
                });
                return request;
           }

            this.MasrafDetaySil = function (MASRAF_DETAY_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/MasrafDetay/"+MASRAF_DETAY_ID
                });
                return request;
            }

            this.MasrafDetayOnay = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/MasrafDetay/MasrafDetayOnay",
                    data: Info
                });
                return request;
            }
    })
;

