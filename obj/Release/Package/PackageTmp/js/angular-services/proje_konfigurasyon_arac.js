angular
    .module('inspinia')
        .service('srvProjeKonfigurasyonArac', function ($http) {
            //this.ProjeKonfigurasyonAracGetData = function (ProjeID) {
            //    var request = $http({
            //        method:"get",
            //        url:"/api/ProjeKonfigurasyonArac/?projeID="+ProjeID
            //    });
            //    return request;
            //}

            this.ProjeKonfigurasyonAracGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeKonfigurasyonArac/",
                    params: AramaKriter
                });
                return request;
                
            }

            this.ProjeKonfigurasyonAracSelect = function (PROJE_KONFIGURASYON_ARAC_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeKonfigurasyonArac/"+PROJE_KONFIGURASYON_ARAC_ID
                });
                return request;
           }

            this.ProjeKonfigurasyonAracEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeKonfigurasyonArac",
                    data:Info
                });
                return request;
           }

            this.ProjeKonfigurasyonAracSil = function (PROJE_KONFIGURASYON_ARAC_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeKonfigurasyonArac/"+PROJE_KONFIGURASYON_ARAC_ID
                });
                return request;
           }
    })
;

