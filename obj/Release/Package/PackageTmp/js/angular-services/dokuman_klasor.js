angular
    .module('inspinia')
        .service('srvDokumanKlasor', function ($http) {
            this.DokumanKlasorGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanKlasor",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanKlasorSelect = function (DOKUMAN_KLASOR_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanKlasor/"+DOKUMAN_KLASOR_ID
                });
                return request;
           }

            this.DokumanKlasorEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanKlasor",
                    data:Info
                });
                return request;
           }

            this.DokumanKlasorSil = function (DOKUMAN_KLASOR_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanKlasor/"+DOKUMAN_KLASOR_ID
                });
                return request;
            }

            this.DokumanKlasorAgacGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/DokumanKlasor/DokumanGet",
                    params: AramaKriter
                });
                return request;
            }

            this.DokumanKlasorFormAyariGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/DokumanKlasor/FormAyariDokumanGet",
                    params: AramaKriter
                });
                return request;
            }
    })
;

