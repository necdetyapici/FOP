angular
    .module('inspinia')
        .service('srvDokumanProjePaketiGrup', function ($http) {
            this.DokumanProjePaketiGrupGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanProjePaketiGrup",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanProjePaketiGrupSelect = function (DOKUMAN_PROJE_PAKETI_GRUP_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanProjePaketiGrup/"+DOKUMAN_PROJE_PAKETI_GRUP_ID
                });
                return request;
           }

            this.DokumanProjePaketiGrupEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanProjePaketiGrup",
                    data:Info
                });
                return request;
           }

            this.DokumanProjePaketiGrupSil = function (DOKUMAN_PROJE_PAKETI_GRUP_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanProjePaketiGrup/"+DOKUMAN_PROJE_PAKETI_GRUP_ID
                });
                return request;
           }
    })
;

