angular
    .module('inspinia')
        .service('srvDokumanProjePaketiKlasor', function ($http) {
            this.DokumanProjePaketiKlasorGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanProjePaketiKlasor",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanProjePaketiKlasorSelect = function (DOKUMAN_PROJE_PAKETI_KLASOR_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanProjePaketiKlasor/"+DOKUMAN_PROJE_PAKETI_KLASOR_ID
                });
                return request;
           }

            this.DokumanProjePaketiKlasorEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanProjePaketiKlasor",
                    data:Info
                });
                return request;
           }

            this.DokumanProjePaketiKlasorSil = function (DOKUMAN_PROJE_PAKETI_KLASOR_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanProjePaketiKlasor/"+DOKUMAN_PROJE_PAKETI_KLASOR_ID
                });
                return request;
            }

            this.DokumanProjePaketiKlasorAktifPasif = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/DokumanProjePaketiKlasor/AktifPasif",
                    data: Info
                });
                return request;
            }
    })
;

