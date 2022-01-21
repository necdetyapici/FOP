angular
    .module('inspinia')
        .service('srvTalepProjeDokuman', function ($http) {
            this.TalepProjeDokumanGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeDokuman",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepProjeDokumanSelect = function (TALEP_PROJE_DOKUMAN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepProjeDokuman/"+TALEP_PROJE_DOKUMAN_ID
                });
                return request;
           }

            this.TalepProjeDokumanEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepProjeDokuman",
                    data:Info
                });
                return request;
           }

            this.TalepProjeDokumanSil = function (TALEP_PROJE_DOKUMAN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/TalepProjeDokuman/"+TALEP_PROJE_DOKUMAN_ID
                });
                return request;
           }
    })
;

