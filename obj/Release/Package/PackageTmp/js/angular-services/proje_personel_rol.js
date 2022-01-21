angular
    .module('inspinia')
        .service('srvProjePersonelRol', function ($http) {
            //this.ProjePersonelRolGetData = function (PROJEID) {
            //    var request = $http({
            //        method:"get",
            //        url:"/api/ProjePersonelRol?projeID="+PROJEID
            //    });
            //    return request;
            //}

            this.ProjePersonelRolGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjePersonelRol",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjePersonelRolSelect = function (PROJE_PERSONEL_ROL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjePersonelRol/"+PROJE_PERSONEL_ROL_ID
                });
                return request;
           }

            this.ProjePersonelRolEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjePersonelRol",
                    data:Info
                });
                return request;
           }

            this.ProjePersonelRolSil = function (PROJE_PERSONEL_ROL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjePersonelRol/"+PROJE_PERSONEL_ROL_ID
                });
                return request;
           }
    })
;

