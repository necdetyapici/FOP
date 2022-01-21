angular
    .module('inspinia')
        .service('srvDokuman', function ($http) {
            this.DokumanGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Dokuman",
                    params: AramaKriter
                });
                return request;
           }

            this.DokumanSelect = function (DOKUMAN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Dokuman/"+DOKUMAN_ID
                });
                return request;
           }

            this.DokumanEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Dokuman",
                    data:Info
                });
                return request;
           }

            this.DokumanSil = function (DOKUMAN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Dokuman/"+DOKUMAN_ID
                });
                return request;
            }

            this.DokumanOnIzleme = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/Dokuman/DokumanOnIzleme",
                    params: AramaKriter
                });
                return request;
            }

            this.DokumanIndir = function (AramaKriter) {
                 return $http({
                    method: "get",
                    url: "/api/Dokuman/DokumanIndir",
                    params: AramaKriter
                });

            }

            //this.DokumanAl = function (Info) {
            //    var request = $http({
            //        method: "post",
            //        url: "/api/Dokuman/DokumanAl",
            //        data: Info
            //    });
            //    return request;
            //}

            this.DokumanKlasorYetkiGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/Dokuman/DokumanKlasorYetkiGet",
                    params: AramaKriter
                });
                return request;
            }

            this.DokumanKlasorEkleGuncelle = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/Dokuman/KlasorEkle",
                    data: Info
                });
                return request;
            }

            this.DokumanYayinOnIzleme = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/Dokuman/DokumanYayinOnIzleme",
                    params: AramaKriter
                });
                return request;
            }

            this.DokumanYukle = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/Dokuman/DokumanYukle",
                    data: Info
                });
                return request;
            }

            this.DokumanYayinWordIndir = function (doc) {
                return $http({
                    method: "post",
                    url: "/api/Dokuman/DokumanYayinWordIndir",
                    data: doc,
                    //responseType : 'arraybuffer'
                });

            }

            this.DokumanYayinIndir = function (AramaKriter) {
                return $http({
                    method: "get",
                    url: "/api/Dokuman/DokumanYayinIndir",
                    params: AramaKriter
                });

            }
    })
;

