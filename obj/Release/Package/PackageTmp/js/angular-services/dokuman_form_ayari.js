angular
    .module('inspinia')
    .service('srvDokumanFormAyari', function ($http) {
        this.DokumanFormAyariGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanFormAyari",
                params: AramaKriter
            });
            return request;
        }

        this.DokumanFormAyariSelect = function (DOKUMAN_FORM_AYARI_ID) {
            var request = $http({
                method: "get",
                url: "/api/DokumanFormAyari/" + DOKUMAN_FORM_AYARI_ID
            });
            return request;
        }

        this.DokumanFormAyariEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanFormAyari",
                data: Info
            });
            return request;
        }

        this.DokumanFormAyariSil = function (DOKUMAN_FORM_AYARI_ID) {
            var request = $http({
                method: "delete",
                url: "/api/DokumanFormAyari/" + DOKUMAN_FORM_AYARI_ID
            });
            return request;
        }

        this.DokumanFormTipiGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanFormTipi",
                params: AramaKriter
            });
            return request;
        }
    });

