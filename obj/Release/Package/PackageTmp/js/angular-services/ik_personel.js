angular
    .module('inspinia')
    .service('srvIkPersonel', function ($http) {
        this.IkPersonelGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/IkPersonel",
                params: AramaKriter
            });
            return request;
        }

        this.IkPersonelSelect = function (IK_PERSONEL_ID) {
            var request = $http({
                method: "get",
                url: "/api/IkPersonel/" + IK_PERSONEL_ID
            });
            return request;
        }

        this.IkPersonelEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/IkPersonel",
                data: Info
            });
            return request;
        }

        this.IkPersonelSil = function (IK_PERSONEL_ID) {
            var request = $http({
                method: "delete",
                url: "/api/IkPersonel/" + IK_PERSONEL_ID
            });
            return request;
        }
    })
    ;

