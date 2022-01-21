angular
    .module('inspinia')
        .service('srvProjeSurumYonetimStratejisi', function ($http) {
           // this.ProjeSurumYonetimStratejisiGetData = function (PROJEID) {
           //     var request = $http({
           //         method:"get",
           //         url:"/api/ProjeSurumYonetimStratejisi?projeID="+PROJEID
           //     });
           //     return request;
           //}

            this.ProjeSurumYonetimStratejisiGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeSurumYonetimStratejisi",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjeSurumYonetimStratejisiSelect = function (PROJE_SURUM_YONETIM_STRATEJISI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeSurumYonetimStratejisi/"+PROJE_SURUM_YONETIM_STRATEJISI_ID
                });
                return request;
           }

            this.ProjeSurumYonetimStratejisiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeSurumYonetimStratejisi",
                    data:Info
                });
                return request;
           }

            this.ProjeSurumYonetimStratejisiSil = function (PROJE_SURUM_YONETIM_STRATEJISI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeSurumYonetimStratejisi/"+PROJE_SURUM_YONETIM_STRATEJISI_ID
                });
                return request;
           }
    })
;

