angular
    .module('inspinia')
        .service('srvToplantiDokuman', function ($http) {
            this.ToplantiDokumanGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiDokuman",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiDokumanSelect = function (TOPLANTI_DOKUMAN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiDokuman/"+TOPLANTI_DOKUMAN_ID
                });
                return request;
           }

            this.ToplantiDokumanEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiDokuman",
                    data:Info
                });
                return request;
           }

            this.ToplantiDokumanSil = function (TOPLANTI_DOKUMAN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiDokuman/"+TOPLANTI_DOKUMAN_ID
                });
                return request;
           }
    })
;

