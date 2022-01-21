angular
    .module('inspinia')
    .service('srvIkEgitimPersonel', function ($http) {
        this.IkEgitimPersonelGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/IkEgitimPersonel",
                params: AramaKriter
            });
            return request;
        }

        this.IkEgitimPersonelSelect = function (IK_EGITIM_PERSONEL_ID) {
            var request = $http({
                method: "get",
                url: "/api/IkEgitimPersonel/" + IK_EGITIM_PERSONEL_ID
            });
            return request;
        }

        this.IkEgitimPersonelEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/IkEgitimPersonel",
                data: Info
            });
            return request;
        }

        this.IkEgitimPersonelSil = function (IK_EGITIM_PERSONEL_ID) {
            var request = $http({
                method: "delete",
                url: "/api/IkEgitimPersonel/" + IK_EGITIM_PERSONEL_ID
            });
            return request;
        }
    })
    ;

