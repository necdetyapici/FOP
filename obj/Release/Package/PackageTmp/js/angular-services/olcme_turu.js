angular
    .module('inspinia')
        .service('srvOlcmeTuru', function ($http) {
            this.OlcmeTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/OlcmeTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.OlcmeTuruSelect = function (OLCME_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/OlcmeTuru/"+OLCME_TURU_ID
                });
                return request;
           }

            this.OlcmeTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/OlcmeTuru",
                    data:Info
                });
                return request;
           }

            this.OlcmeTuruSil = function (OLCME_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/OlcmeTuru/"+OLCME_TURU_ID
                });
                return request;
           }
    })
;

