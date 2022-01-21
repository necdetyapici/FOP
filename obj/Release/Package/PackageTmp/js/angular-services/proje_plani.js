angular
    .module('inspinia')
    .service('srvProjePlani', function ($http) {

        //this.ProjePlaniGetData = function (PROJEID) {
        //    var request = $http({
        //        method: "get",
        //        url: "/api/ProjePlani?projeID=" + PROJEID,
        //    });
        //    return request;
        //}

        this.ProjePlaniGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjePlani",
                params: AramaKriter
            });
            return request;
        };

        this.ProjePlaniSelect = function (PROJE_PLANI_ID) {
            var request = $http({
                method: "get",
                url: "/api/ProjePlani/" + PROJE_PLANI_ID
            });
            return request;
        };

        this.ProjePlaniEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/ProjePlani",
                data: Info
            });
            return request;
        };

        this.ProjePlaniSil = function (PROJE_PLANI_ID) {
            var request = $http({
                method: "delete",
                url: "/api/ProjePlani/" + PROJE_PLANI_ID
            });
            return request;
        };

        this.ProjePlaniCountGetData = function () {
            var request = $http({
                method: "get",
                url: "/api/ProjePlani/GetCount"
            });
            return request;
        };

        this.ProjePlaniOnay = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/ProjePlani/Onay",
                data: Info
            });
            return request;
        };
    })
    ;

