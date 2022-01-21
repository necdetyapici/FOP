angular
    .module('inspinia')
        .service('srvIkCagri', function ($http) {
            this.IkCagriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkCagri",
                    params: AramaKriter
                });
                return request;
           }

            this.IkCagriSelect = function (IK_CAGRI_HIZMETI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkCagri/"+IK_CAGRI_HIZMETI_ID
                });
                return request;
           }

            this.IkCagriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkCagri",
                    data:Info
                });
                return request;
           }

            this.IkCagriSil = function (IK_CAGRI_HIZMETI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkCagri/"+IK_CAGRI_HIZMETI_ID
                });
                return request;
           }

            this.IkCagriOnaylama = function (InfoOnaylama) {
                var request = $http({
                    method: "post",
                    url: "/api/IkCagri/IkCagriOnaylama",
                    data: InfoOnaylama
                });
                return request;
            }

    })
;

