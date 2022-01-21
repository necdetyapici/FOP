angular
    .module('inspinia')
        .service('srvProjedeEgitimAlanPersonel', function ($http) {
           // this.ProjedeEgitimAlanPersonelGetData = function (PROJEID) {
           //     var request = $http({
           //         method:"get",
           //         url:"/api/ProjedeEgitimAlanPersonel?projeID="+PROJEID
           //     });
           //     return request;
           //}
            this.ProjedeEgitimAlanPersonelGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjedeEgitimAlanPersonel",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjedeEgitimAlanPersonelSelect = function (PROJE_EGITIM_ALAN_PERSONEL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjedeEgitimAlanPersonel/"+PROJE_EGITIM_ALAN_PERSONEL_ID
                });
                return request;
           }

            this.ProjedeEgitimAlanPersonelEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjedeEgitimAlanPersonel",
                    data:Info
                });
                return request;
           }

            this.ProjedeEgitimAlanPersonelSil = function (PROJE_EGITIM_ALAN_PERSONEL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjedeEgitimAlanPersonel/"+PROJE_EGITIM_ALAN_PERSONEL_ID
                });
                return request;
           }
    })
;

