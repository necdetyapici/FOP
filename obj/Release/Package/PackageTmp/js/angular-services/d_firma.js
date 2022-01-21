angular
    .module('inspinia')
    .service('srvDFirma', function ($http) {
        this.DFirmaGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DFirma",
                params: AramaKriter
            });
            return request;
        }

        this.DFirmaSelect = function (D_FIRMA_ID) {
            var request = $http({
                method: "get",
                url: "/api/DFirma/" + D_FIRMA_ID
            });
            return request;
        }

        this.DFirmaEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DFirma",
                data: Info
            });
            return request;
        }

        this.DFirmaSil = function (D_FIRMA_ID) {
            var request = $http({
                method: "delete",
                url: "/api/DFirma/" + D_FIRMA_ID
            });
            return request;
        }

        this.DFirmaPasif = function (D_FIRMA_ID) {
            var request = $http({
                method: "delete",
                url: "/api/DFirma/" + D_FIRMA_ID
            });
            return request;
        }

        this.DFirmaAktif = function (post) {
            var request = $http({
                method: "put",
                url: "/api/DFirma",
                data: post
            });
            return request;
        }
    })
    ;

