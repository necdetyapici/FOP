angular
    .module('inspinia')
        .service('srvVarlikOlasilikEtkiDegeriSonuc', function ($http) {
            this.VarlikOlasilikEtkiDegeriSonucGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/VarlikOlasilikEtkiDegeriSonuc",
                    params: AramaKriter
                });
                return request;
           }

            this.VarlikOlasilikEtkiDegeriSonucSelect = function (VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/VarlikOlasilikEtkiDegeriSonuc/"+VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ID
                });
                return request;
           }

            this.VarlikOlasilikEtkiDegeriSonucEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/VarlikOlasilikEtkiDegeriSonuc",
                    data:Info
                });
                return request;
           }

            this.VarlikOlasilikEtkiDegeriSonucSil = function (VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/VarlikOlasilikEtkiDegeriSonuc/"+VARLIK_OLASILIK_ETKI_DEGERI_SONUC_ID
                });
                return request;
           }
    })
;

