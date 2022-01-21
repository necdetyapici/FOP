angular
    .module('inspinia')
        .service('srvToplantiKatilimci', function ($http) {
            this.ToplantiKatilimciGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiKatilimci",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiKatilimciSelect = function (TOPLANTI_KATILIMCI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiKatilimci/"+TOPLANTI_KATILIMCI_ID
                });
                return request;
           }

            this.ToplantiKatilimciEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiKatilimci",
                    data:Info
                });
                return request;
           }

            this.ToplantiKatilimciSil = function (TOPLANTI_KATILIMCI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiKatilimci/"+TOPLANTI_KATILIMCI_ID
                });
                return request;
           }
    })
;

