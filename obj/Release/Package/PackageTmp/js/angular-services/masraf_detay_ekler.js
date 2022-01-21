angular
    .module('inspinia')
        .service('srvMasrafDetayEkler', function ($http) {
            this.MasrafDetayEklerGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/MasrafDetayEkler",
                    params: AramaKriter
                });
                return request;
           }

            this.MasrafDetayEklerSelect = function (MASRAF_DETAY_EKLER_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/MasrafDetayEkler/"+MASRAF_DETAY_EKLER_ID
                });
                return request;
           }

            this.MasrafDetayEklerEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/MasrafDetayEkler",
                    data:Info
                });
                return request;
           }

            this.MasrafDetayEklerSil = function (MASRAF_DETAY_EKLER_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/MasrafDetayEkler/"+MASRAF_DETAY_EKLER_ID
                });
                return request;
           }
    })
;

