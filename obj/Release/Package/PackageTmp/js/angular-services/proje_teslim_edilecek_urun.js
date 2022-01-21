angular
    .module('inspinia')
        .service('srvProjeTeslimEdilecekUrun', function ($http) {
           // this.ProjeTeslimEdilecekUrunGetData = function (PROJEID) {
           //     var request = $http({
           //         method:"get",
           //         url:"/api/ProjeTeslimEdilecekUrun?projeID="+PROJEID
           //     });
           //     return request;
           //}

            this.ProjeTeslimEdilecekUrunGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeTeslimEdilecekUrun",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjeTeslimEdilecekUrunSelect = function (PROJE_TESLIM_EDILECEK_URUN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTeslimEdilecekUrun/"+PROJE_TESLIM_EDILECEK_URUN_ID
                });
                return request;
           }

            this.ProjeTeslimEdilecekUrunEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeTeslimEdilecekUrun",
                    data:Info
                });
                return request;
           }

            this.ProjeTeslimEdilecekUrunSil = function (PROJE_TESLIM_EDILECEK_URUN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeTeslimEdilecekUrun/"+PROJE_TESLIM_EDILECEK_URUN_ID
                });
                return request;
           }
    })
;

