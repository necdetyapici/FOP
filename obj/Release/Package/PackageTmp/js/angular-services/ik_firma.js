angular
    .module('inspinia')
        .service('srvIkFirma', function ($http) {
            this.IkFirmaGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkFirma",
                    params: AramaKriter
                });
                return request;
           }

            this.IkFirmaSelect = function (IK_FIRMA_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkFirma/"+IK_FIRMA_ID
                });
                return request;
           }

            this.IkFirmaEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkFirma",
                    data:Info
                });
                return request;
           }

            this.IkFirmaSil = function (IK_FIRMA_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkFirma/"+IK_FIRMA_ID
                });
                return request;
           }
    })
;

