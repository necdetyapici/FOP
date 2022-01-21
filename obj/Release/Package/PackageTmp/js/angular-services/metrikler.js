angular
    .module('inspinia')
    .service('srvMetrikler', function ($http) {

            this.MetriklerGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/Metrikler",
                    params: AramaKriter
                });
                return request;
            }

            this.MetriklerSelect = function (METRIK_ID) {
                var request = $http({
                    method: "get",
                    url: "/api/Metrikler/" + METRIK_ID
                });
                return request;
            }

            this.MetriklerEkleGuncelle = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/Metrikler",
                    data: Info
                });
                return request;
            }

            this.MetriklerSil = function (METRIK_ID) {
                var request = $http({
                    method: "delete",
                    url: "/api/Metrikler/" + METRIK_ID
                });
                return request;
            }
        })
;

