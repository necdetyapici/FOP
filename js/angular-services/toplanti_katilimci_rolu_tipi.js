angular
    .module('inspinia')
        .service('srvToplantiKatilimciRoluTipi', function ($http) {
            this.ToplantiKatilimciRoluTipiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiKatilimciRoluTipi",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiKatilimciRoluTipiSelect = function (TOPLANTI_KATILIMCI_ROLU_TIPI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiKatilimciRoluTipi/"+TOPLANTI_KATILIMCI_ROLU_TIPI_ID
                });
                return request;
           }

            this.ToplantiKatilimciRoluTipiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiKatilimciRoluTipi",
                    data:Info
                });
                return request;
           }

            this.ToplantiKatilimciRoluTipiSil = function (TOPLANTI_KATILIMCI_ROLU_TIPI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiKatilimciRoluTipi/"+TOPLANTI_KATILIMCI_ROLU_TIPI_ID
                });
                return request;
           }
    })
;

