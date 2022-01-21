angular
    .module('inspinia')
        .service('srvDokumanUpdate', function ($http) {
            this.DokumanUpdateGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanUpdate",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanUpdateSelect = function (DOKUMAN_UPDATE_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanUpdate/"+DOKUMAN_UPDATE_ID
                });
                return request;
           }

            this.DokumanUpdateEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanUpdate",
                    data:Info
                });
                return request;
           }

            this.DokumanUpdateSil = function (DOKUMAN_UPDATE_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanUpdate/"+DOKUMAN_UPDATE_ID
                });
                return request;
           }
    })
;

