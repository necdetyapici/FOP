angular
    .module('inspinia')
        .service('srvDokumanGozdenGecirmeKriterAdim', function ($http) {
            this.DokumanGozdenGecirmeKriterAdimGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanGozdenGecirmeKriterAdim",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanGozdenGecirmeKriterAdimSelect = function (DOKUMAN_GOZDEN_GECIRME_KRITER_ADIM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanGozdenGecirmeKriterAdim/"+DOKUMAN_GOZDEN_GECIRME_KRITER_ADIM_ID
                });
                return request;
           }

            this.DokumanGozdenGecirmeKriterAdimEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanGozdenGecirmeKriterAdim",
                    data:Info
                });
                return request;
           }

            this.DokumanGozdenGecirmeKriterAdimSil = function (DOKUMAN_GOZDEN_GECIRME_KRITER_ADIM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanGozdenGecirmeKriterAdim/"+DOKUMAN_GOZDEN_GECIRME_KRITER_ADIM_ID
                });
                return request;
            }

            this.DokumanGozdenGecirmeKriterAdimAktifPasif = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/DokumanGozdenGecirmeKriterAdim/AktifPasif",
                    data: Info
                });
                return request;
            }

            
    })
;

