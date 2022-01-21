angular
    .module('inspinia')
        .service('srvDokumanGozdenGecirmeKriteri', function ($http) {
            this.DokumanGozdenGecirmeKriteriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanGozdenGecirmeKriteri",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanGozdenGecirmeKriteriSelect = function (DOKUMAN_GOZDEN_GECIRME_KRITERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DokumanGozdenGecirmeKriteri/"+DOKUMAN_GOZDEN_GECIRME_KRITERI_ID
                });
                return request;
           }

            this.DokumanGozdenGecirmeKriteriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DokumanGozdenGecirmeKriteri",
                    data:Info
                });
                return request;
           }

            this.DokumanGozdenGecirmeKriteriSil = function (DOKUMAN_GOZDEN_GECIRME_KRITERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DokumanGozdenGecirmeKriteri/"+DOKUMAN_GOZDEN_GECIRME_KRITERI_ID
                });
                return request;
           }
    })
;

