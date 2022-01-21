angular
    .module('inspinia')
        .service('srvProjeDokuman', function ($http) {
            this.ProjeDokumanGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDokuman",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeDokumanSelect = function (PROJE_DOKUMAN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeDokuman/"+PROJE_DOKUMAN_ID
                });
                return request;
           }

            this.ProjeDokumanEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeDokuman",
                    data:Info
                });
                return request;
           }

            this.ProjeDokumanSil = function (PROJE_DOKUMAN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeDokuman/"+PROJE_DOKUMAN_ID
                });
                return request;
           }
    })
;

