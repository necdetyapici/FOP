angular
    .module('inspinia')
    .service('srvDuyuru', function ($http) {
        this.DuyuruGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/Duyuru",
                params: AramaKriter
            });
            return request;
        }

        this.DuyuruSelect = function (DUYURU_ID) {
            var request = $http({
                method: "get",
                url: "/api/Duyuru/" + DUYURU_ID
            });
            return request;
        }

        this.DuyuruEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/Duyuru",
                data: Info
            });
            return request;
        }

        this.DuyuruKaldir = function (DUYURU_ID) {
            var request = $http({
                method: "delete",
                url: "/api/Duyuru/" + DUYURU_ID
            });
            return request;
        }

            this.SetOkundu = function (duyuru) {
                return $http({
                    method: "post",
                    url: "/api/Duyuru/SetOkundu",
                    data: duyuru
                });
            }

            this.DuyuruSil = function (DUYURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Duyuru/"+DUYURU_ID
                });
                return request;
            }

            this.OkunmamisDuyuru = function (httpIptal) {
                return $http({ method: "get", url: "/api/Duyuru/GetOkunmamis", timeout: httpIptal.promise });
            }
        this.DuyuruYayinla = function (post) {
            var request = $http({
                method: "put",
                url: "/api/Duyuru",
                data: post
            });
            return request;
        }

    })
    ;

