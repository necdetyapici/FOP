angular
    .module('inspinia')
    .service('srvDokumanGozdenGecirme', function ($http) {
        this.DokumanGozdenGecirmeGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanGozdenGecirme",
                params: AramaKriter
            });
            return request;
        }

        this.DokumanGozdenGecirmeSelect = function (DOKUMAN_GOZDEN_GECIRME_ID) {
            var request = $http({
                method: "get",
                url: "/api/DokumanGozdenGecirme/" + DOKUMAN_GOZDEN_GECIRME_ID
            });
            return request;
        }

        this.DokumanGozdenGecirmeEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanGozdenGecirme",
                data: Info
            });
            return request;
        }

        this.DokumanGozdenGecirmeSil = function (DOKUMAN_GOZDEN_GECIRME_ID) {
            var request = $http({
                method: "delete",
                url: "/api/DokumanGozdenGecirme/" + DOKUMAN_GOZDEN_GECIRME_ID
            });
            return request;
        }

        //this.DokumanGozdenGecirmeGecmisiGetData = function (AramaKriter) {
        //    var request = $http({
        //        method: "get",
        //        url: "/api/DokumanGozdenGecirme/GozdenGecirmeGecmisi",
        //        params: AramaKriter
        //    });
        //    return request;
        //}
    })
    ;

