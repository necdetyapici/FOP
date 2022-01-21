angular
    .module('inspinia')
        .service('srvIkDemirbas', function ($http) {
            this.IkDemirbasGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDemirbas",
                    params: AramaKriter
                });
                return request;
           }

            this.IkDemirbasSelect = function (IK_DEMIRBAS_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDemirbas/"+IK_DEMIRBAS_ID
                });
                return request;
           }

            this.IkDemirbasEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkDemirbas",
                    data:Info
                });
                return request;
           }

            this.IkDemirbasSil = function (IK_DEMIRBAS_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkDemirbas/"+IK_DEMIRBAS_ID
                });
                return request;
            }

            this.DemirbasFormu = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/IkDemirbas/Form",
                    params: AramaKriter
                });
                return request;
            }
    })
;

