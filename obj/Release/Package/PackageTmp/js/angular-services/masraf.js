angular
    .module('inspinia')
        .service('srvMasraf', function ($http) {
            this.MasrafGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Masraf",
                    params: AramaKriter
                });
                return request;
           }

            this.MasrafSelect = function (MASRAF_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Masraf/"+MASRAF_ID
                });
                return request;
           }

            this.MasrafEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Masraf",
                    data:Info
                });
                return request;
           }

            this.MasrafSil = function (MASRAF_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Masraf/"+MASRAF_ID
                });
                return request;
            }

            this.MasrafOnay = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/Masraf/MasrafOnay",
                    data: Info
                });
                return request;
            }

            this.MasrafFormu = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/Masraf/Form",
                    params: AramaKriter
                });
                return request;
            }
    })
;

