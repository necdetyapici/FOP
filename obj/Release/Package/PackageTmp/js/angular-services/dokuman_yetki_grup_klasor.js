angular
    .module('inspinia')
        .service('srvDokumanYetkiGrupKlasor', function ($http) {
            this.DokumanYetkiGrupKlasorGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanYetkiGrupKlasor",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanYetkiGrupKlasorSelect = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url: "/api/DokumanYetkiGrupKlasor/Select",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanYetkiGrupKlasorEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanYetkiGrupKlasor",
                    data:Info
                });
                return request;
           }

            this.DokumanYetkiGrupKlasorSil = function (DOKUMAN_YETKI_GRUP_KLASOR_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanYetkiGrupKlasor/"+DOKUMAN_YETKI_GRUP_KLASOR_ID
                });
                return request;
           }
    })
;

