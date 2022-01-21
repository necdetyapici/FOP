angular
    .module('inspinia')
        .service('srvToplantiYeri', function ($http) {
            this.ToplantiYeriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiYeri",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiYeriSelect = function (TOPLANTI_YERI_ID) {
                var request = $http({
                    method:"get",
                    url: "/api/ToplantiYeri/" + TOPLANTI_YERI_ID
                });
                return request;
           }

            this.ToplantiYeriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiYeri",
                    data:Info
                });
                return request;
           }

            this.ToplantiYeriSil = function (TOPLANTI_YERI_ID) {
                var request = $http({
                    method:"delete",
                    url: "/api/ToplantiYeri/" + TOPLANTI_YERI_ID
                });
                return request;
           }
    })
;

