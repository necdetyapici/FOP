angular
    .module('inspinia')
    .service('srvDSeviyeKapsam', function ($http) {
        this.DSeviyeKapsamGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DSeviyeKapsam",
                params: AramaKriter
            });
            return request;
        }

        this.DSeviyeKapsamSelect = function (D_SEVIYE_KAPSAM_ID) {
            var request = $http({
                method: "get",
                url: "/api/DSeviyeKapsam/" + D_SEVIYE_KAPSAM_ID
            });
            return request;
        }

        this.DSeviyeKapsamEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DSeviyeKapsam",
                data: Info
            });
            return request;
        }

        this.DSeviyeKapsamSil = function (D_SEVIYE_KAPSAM_ID) {
            var request = $http({
                method: "delete",
                url: "/api/DSeviyeKapsam/" + D_SEVIYE_KAPSAM_ID
            });
            return request;
        }
    })
    ;

