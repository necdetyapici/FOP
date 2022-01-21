angular
    .module('inspinia')
        .service('srvDDanismanlikTuru', function ($http) {
            this.DDanismanlikTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/DDanismanlikTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.DDanismanlikTuruSelect = function (D_DANISMANLIK_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/DDanismanlikTuru/"+D_DANISMANLIK_TURU_ID
                });
                return request;
           }

            this.DDanismanlikTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/DDanismanlikTuru",
                    data:Info
                });
                return request;
           }

            this.DDanismanlikTuruSil = function (D_DANISMANLIK_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/DDanismanlikTuru/"+D_DANISMANLIK_TURU_ID
                });
                return request;
           }
    })
;

