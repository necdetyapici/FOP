angular
    .module('inspinia')
        .service('srvDDanismanlik', function ($http) {
            this.DDanismanlikGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DDanismanlik",
                    params: AramaKriter
                });
                return request;
           }

            this.DDanismanlikSelect = function (D_DANISMANLIK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DDanismanlik/"+D_DANISMANLIK_ID
                });
                return request;
           }

            this.DDanismanlikEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DDanismanlik",
                    data:Info
                });
                return request;
           }

            this.DDanismanlikSil = function (D_DANISMANLIK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DDanismanlik/"+D_DANISMANLIK_ID
                });
                return request;
            }

            this.DDanismanlikTuruGetData = function () {
                var request = $http({
                    method: "get",
                    url: "/api/DDanismanlikTuru"                 
                });
                return request;
            }

            this.DDanismanlikAktifPasif = function (info) {
                var request = $http({
                    method: "put",
                    url: "/api/DDanismanlik",
                    data: info
                });
                return request;
            }
    })
;

