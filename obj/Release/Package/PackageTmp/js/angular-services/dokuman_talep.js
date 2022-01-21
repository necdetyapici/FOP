angular
    .module('inspinia')
        .service('srvDokumanTalep', function ($http) {
            this.DokumanTalepGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanTalep",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanTalepSelect = function (DOKUMAN_TALEP_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanTalep/"+DOKUMAN_TALEP_ID
                });
                return request;
           }

            this.DokumanTalepEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanTalep",
                    data:Info
                });
                return request;
           }

            this.DokumanTalepSil = function (DOKUMAN_TALEP_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanTalep/"+DOKUMAN_TALEP_ID
                });
                return request;
           }
    })
;

