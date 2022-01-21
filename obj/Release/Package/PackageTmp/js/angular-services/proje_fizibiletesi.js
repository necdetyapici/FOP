angular
    .module('inspinia')
    .service('srvProjeFizibiletesi', function ($http) {

        this.ProjeFizibiletesiGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjeFizibiletesi",
                params: AramaKriter
            });
            return request;
        }

        this.ProjeFizibiletesiSelect = function (PROJE_FIZIBILITE_ID) {
            var request = $http({
                method: "get",
                url: "/api/ProjeFizibiletesi/" + PROJE_FIZIBILITE_ID
            });
            return request;
        }

        this.ProjeFizibiletesiEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/ProjeFizibiletesi",
                data: Info
            });
            return request;
        }

        this.ProjeFizibiletesiSil = function (PROJE_FIZIBILITE_ID) {
            var request = $http({
                method: "delete",
                url: "/api/ProjeFizibiletesi/" + PROJE_FIZIBILITE_ID
            });
            return request;
        }


    })
    ;

