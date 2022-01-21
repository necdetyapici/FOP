angular
    .module('inspinia')
    .service('srvProjeTedarik', function ($http) {
        //this.ProjeTedarikGetData = function (PROJEID) {
        //    var request = $http({
        //        method:"get",
        //        url:"/api/ProjeTedarik?projeID="+PROJEID
        //    });
        //    return request;
        //}
        this.ProjeTedarikGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjeTedarik",
                params: AramaKriter
            });
            return request;
        }

        this.ProjeTedarikSelect = function (PROJE_TEDARIK_ID) {
            var request = $http({
                method: "get",
                url: "/api/ProjeTedarik/" + PROJE_TEDARIK_ID
            });
            return request;
        }

        this.ProjeTedarikEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/ProjeTedarik",
                data: Info
            });
            return request;
        }

        this.ProjeTedarikSil = function (PROJE_TEDARIK_ID) {
            var request = $http({
                method: "delete",
                url: "/api/ProjeTedarik/" + PROJE_TEDARIK_ID
            });
            return request;
        }
    })
    ;

