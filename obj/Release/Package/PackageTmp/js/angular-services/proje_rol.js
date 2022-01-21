angular
    .module('inspinia')
        .service('srvProjeRol', function ($http) {
            //this.ProjeRolGetData = function (PROJEID) {
            //    var request = $http({
            //        method:"get",
            //        url: "/api/ProjeRol?projeID=" + PROJEID
            //    });
            //    return request;
            //}

            this.ProjeRolGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeRol",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjeRolSelect = function (PROJE_ROL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeRol/"+PROJE_ROL_ID
                });
                return request;
           }

            this.ProjeRolEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeRol",
                    data:Info
                });
                return request;
           }

            this.ProjeRolSil = function (PROJE_ROL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeRol/"+PROJE_ROL_ID
                });
                return request;
           }
    })
;

