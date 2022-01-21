angular
    .module('inspinia')
    .service('srvDokumanYayin', function ($http) {
        this.DokumanYayinGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanYayin",
                params: AramaKriter
            });
            return request;
        }

        this.DokumanYayinSelect = function (DOKUMAN_YAYIN_ID) {
            var request = $http({
                method: "get",
                url: "/api/DokumanYayin/" + DOKUMAN_YAYIN_ID
            });
            return request;
        }

        this.DokumanYayinEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanYayin",
                data: Info
            });
            return request;
        }

        this.DokumanYayinSil = function (DOKUMAN_YAYIN_ID) {
            var request = $http({
                method: "delete",
                url: "/api/DokumanYayin/" + DOKUMAN_YAYIN_ID
            });
            return request;
        }

        this.DokumanYayinOnIzlemeSelect = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanYayin/DokumanYayinOnIzlemeSelect",
                params: AramaKriter
            });
            return request;
        }

        this.DokumanOnay = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanYayin/DokumanOnay",
                data: Info
            });
            return request;
        }

        this.DokumanIndir = function (AramaKriter) {
            return $http({
                method: "get",
                url: "/api/DokumanYayin/DokumanIndir",
                params: AramaKriter
            });

        }
    })
    ;

