angular
    .module('inspinia')
        .service('srvDokumanYetkiGrup', function ($http) {
            this.DokumanYetkiGrupGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanYetkiGrup",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanYetkiGrupSelect = function (DOKUMAN_YETKI_GRUP_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanYetkiGrup/"+DOKUMAN_YETKI_GRUP_ID
                });
                return request;
           }

            this.DokumanYetkiGrupEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanYetkiGrup",
                    data:Info
                });
                return request;
           }

            this.DokumanYetkiGrupSil = function (DOKUMAN_YETKI_GRUP_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanYetkiGrup/"+DOKUMAN_YETKI_GRUP_ID
                });
                return request;
           }
    })
;

