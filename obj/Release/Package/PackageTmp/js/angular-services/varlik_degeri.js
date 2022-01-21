angular
    .module('inspinia')
        .service('srvVarlikDegeri', function ($http) {
            this.VarlikDegeriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/VarlikDegeri",
                    params: AramaKriter
                });
                return request;
           }

            this.VarlikDegeriSelect = function (VARLIK_DEGERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/VarlikDegeri/"+VARLIK_DEGERI_ID
                });
                return request;
           }

            this.VarlikDegeriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/VarlikDegeri",
                    data:Info
                });
                return request;
           }

            this.VarlikDegeriSil = function (VARLIK_DEGERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/VarlikDegeri/"+VARLIK_DEGERI_ID
                });
                return request;
           }
    })
;

