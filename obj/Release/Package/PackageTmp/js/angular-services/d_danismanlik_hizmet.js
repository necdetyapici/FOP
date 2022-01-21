angular
    .module('inspinia')
    .service('srvDDanismanlikHizmet', function ($http) {
        this.DDanismanlikHizmetGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DDanismanlikHizmet",
                params: AramaKriter
            });
            return request;
        }


        this.DanismanlikGetir = function (danismanlik) {
            return $http({ method: "get", url: "/api/DDanismanlik/" + danismanlik });
        }






        this.DDanismanlikHizmetSelect = function (D_DANISMANLIK_HIZMET_ID) {
            var request = $http({
                method: "get",
                url: "/api/DDanismanlikHizmet/" + D_DANISMANLIK_HIZMET_ID
            });
            return request;
        }

        this.DDanismanlikAlaniSeviyeleriGetir = function (id) {

            var kriter = {
                LISTE: false,
                DANISMANLIK_ALAN_ID: id,

            }

            var request = $http({
                method: "get",
                url: "/api/DSeviyeKapsam",
                params: kriter
            });

            return request;

        }

        this.DDenetimTuruGetir = function () {
            var func = { method: "get", url: "/api/DDenetimTuru" };
            return $http(func);
        }

        this.DDanismanlikHizmetEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DDanismanlikHizmet",
                data: Info
            });
            return request;
        }

        this.DDanismanlikHizmetSil = function (D_DANISMANLIK_HIZMET_ID) {
            var request = $http({
                method: "delete",
                url: "/api/DDanismanlikHizmet/" + D_DANISMANLIK_HIZMET_ID
            });
            return request;
        }

        this.DHizmetAktifPasif = function (info) {
            var request = $http({
                method: "put",
                url: "/api/DDanismanlikHizmet",
                data: info
            });
            return request;
        }
    })
    ;

