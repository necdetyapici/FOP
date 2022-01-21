angular
    .module('inspinia')
        .service('srvToplantiGundemiHavuzu', function ($http) {
            this.ToplantiGundemiHavuzuGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundemiHavuzu",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiGundemiHavuzuSelect = function (TOPLANTI_GUNDEMI_HAVUZU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundemiHavuzu/"+TOPLANTI_GUNDEMI_HAVUZU_ID
                });
                return request;
           }

            this.ToplantiGundemiHavuzuEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiGundemiHavuzu",
                    data:Info
                });
                return request;
           }

            this.ToplantiGundemiHavuzuSil = function (TOPLANTI_GUNDEMI_HAVUZU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiGundemiHavuzu/"+TOPLANTI_GUNDEMI_HAVUZU_ID
                });
                return request;
           }
    })
;

