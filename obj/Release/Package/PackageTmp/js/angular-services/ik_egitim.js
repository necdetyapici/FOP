angular
    .module('inspinia')
        .service('srvIkEgitim', function ($http) {
            this.IkEgitimGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitim",
                    params: AramaKriter
                });
                return request;
           }

            this.IkEgitimSelect = function (IK_EGITIM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitim/"+IK_EGITIM_ID
                });
                return request;
           }

            this.IkEgitimEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkEgitim",
                    data:Info
                });
                return request;
           }

            this.IkEgitimSil = function (IK_EGITIM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkEgitim/"+IK_EGITIM_ID
                });
                return request;
           }
    })
;

