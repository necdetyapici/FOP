angular
    .module('inspinia')
        .service('srvIkDemirbasCinsi', function ($http) {
            this.IkDemirbasCinsiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDemirbasCinsi",
                    params: AramaKriter
                });
                return request;
           }

            this.IkDemirbasCinsiSelect = function (IK_DEMIRBAS_CINSI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkDemirbasCinsi/"+IK_DEMIRBAS_CINSI_ID
                });
                return request;
           }

            this.IkDemirbasCinsiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkDemirbasCinsi",
                    data:Info
                });
                return request;
           }

            this.IkDemirbasCinsiSil = function (IK_DEMIRBAS_CINSI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkDemirbasCinsi/"+IK_DEMIRBAS_CINSI_ID
                });
                return request;
           }
    })
;

