angular
    .module('inspinia')
        .service('srvProjePlanlananPersonelSayisi', function ($http) {
            //this.ProjePlanlananPersonelSayisiGetData = function (PROJEID) {
            //    var request = $http({
            //        method:"get",
            //        url: "/api/ProjePlanlananPersonelSayisi?projeID=" + PROJEID
            //    });
            //    return request;
            //}

            this.ProjePlanlananPersonelSayisiGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjePlanlananPersonelSayisi",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjePlanlananPersonelSayisiSelect = function (PROJE_PLANLANAN_PERSONEL_SAYISI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjePlanlananPersonelSayisi/"+PROJE_PLANLANAN_PERSONEL_SAYISI_ID
                });
                return request;
           }

            this.ProjePlanlananPersonelSayisiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjePlanlananPersonelSayisi",
                    data:Info
                });
                return request;
           }

            this.ProjePlanlananPersonelSayisiSil = function (PROJE_PLANLANAN_PERSONEL_SAYISI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjePlanlananPersonelSayisi/"+PROJE_PLANLANAN_PERSONEL_SAYISI_ID
                });
                return request;
           }
    })
;

