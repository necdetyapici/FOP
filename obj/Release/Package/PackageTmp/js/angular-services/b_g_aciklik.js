angular
    .module('inspinia')
        .service('srvBGAciklik', function ($http) {
            this.BGAciklikGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/BGAciklik",
                    params: AramaKriter
                });
                return request;
           }

            this.BGAciklikSelect = function (B_G_ACIKLIK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/BGAciklik/"+B_G_ACIKLIK_ID
                });
                return request;
           }

            this.BGAciklikEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/BGAciklik",
                    data:Info
                });
                return request;
           }

            this.BGAciklikSil = function (B_G_ACIKLIK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/BGAciklik/"+B_G_ACIKLIK_ID
                });
                return request;
           }
    })
;

