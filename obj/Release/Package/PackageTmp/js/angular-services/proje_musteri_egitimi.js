angular
    .module('inspinia')
        .service('srvProjeMusteriEgitimi', function ($http) {
            //this.ProjeMusteriEgitimiGetData = function (PROJEID) {
            //    var request = $http({
            //        method:"get",
            //        url:"/api/ProjeMusteriEgitimi?projeID="+PROJEID
            //    });
            //    return request;
            //}

            this.ProjeMusteriEgitimiGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeMusteriEgitimi",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjeMusteriEgitimiSelect = function (PROJE_MUSTERI_EGITIMI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeMusteriEgitimi/"+PROJE_MUSTERI_EGITIMI_ID
                });
                return request;
           }

            this.ProjeMusteriEgitimiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeMusteriEgitimi",
                    data:Info
                });
                return request;
           }

            this.ProjeMusteriEgitimiSil = function (PROJE_MUSTERI_EGITIMI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeMusteriEgitimi/"+PROJE_MUSTERI_EGITIMI_ID
                });
                return request;
           }
    })
;

