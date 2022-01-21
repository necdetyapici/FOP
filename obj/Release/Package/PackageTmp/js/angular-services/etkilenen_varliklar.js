angular
    .module('inspinia')
        .service('srvEtkilenenVarliklar', function ($http) {
            this.EtkilenenVarliklarGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/EtkilenenVarliklar",
                    params: AramaKriter
                });
                return request;
           }

            this.EtkilenenVarliklarSelect = function (ETKILENEN_VARLIKLAR_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/EtkilenenVarliklar/"+ETKILENEN_VARLIKLAR_ID
                });
                return request;
           }

            this.EtkilenenVarliklarEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/EtkilenenVarliklar",
                    data:Info
                });
                return request;
           }

            this.EtkilenenVarliklarSil = function (ETKILENEN_VARLIKLAR_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/EtkilenenVarliklar/"+ETKILENEN_VARLIKLAR_ID
                });
                return request;
           }
    })
;

