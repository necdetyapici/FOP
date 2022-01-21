angular
    .module('inspinia')
        .service('srvEtkiDegeri', function ($http) {
            this.EtkiDegeriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/EtkiDegeri",
                    params: AramaKriter
                });
                return request;
           }

            this.EtkiDegeriSelect = function (ETKI_DEGERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/EtkiDegeri/"+ETKI_DEGERI_ID
                });
                return request;
           }

            this.EtkiDegeriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/EtkiDegeri",
                    data:Info
                });
                return request;
           }

            this.EtkiDegeriSil = function (ETKI_DEGERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/EtkiDegeri/"+ETKI_DEGERI_ID
                });
                return request;
           }
    })
;

