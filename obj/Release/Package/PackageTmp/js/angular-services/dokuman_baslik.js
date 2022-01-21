angular
    .module('inspinia')
    .service('srvDokumanBaslik', function ($http) {
        
        this.DokumanBaslikEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanBaslik",
                data: Info
            });
            return request;
        }
        
        this.DokumanBaslikSelect = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanBaslik/Select",
                params: AramaKriter
            });
            return request;
        }
        

        this.RevAl = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanBaslik/RevAl",
                data: Info
            });
            return request;
        }

        this.DokumanRevizyonGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanBaslik/RevGet",
                params: AramaKriter
            });
            return request;
        }

        this.DokumanRevizyonOnIzlemeSelect = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanBaslik/DokumanRevizyonOnIzlemeSelect",
                params: AramaKriter
            });
            return request;
        }

        this.RevFarkliKaydet = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanBaslik/RevFarkliKaydet",
                data: Info
            });
            return request;
        }

        this.DokumanCalismaAlanimFarkliKaydet = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/DokumanBaslik/DokumanCalismaAlanimFarkliKaydet",
                data: Info
            });
            return request;
        }

        this.DokumanRevizyonKarsilastirGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanBaslik/DokumanRevizyonKarsilastirma",
                params: AramaKriter
            });
            return request;
        }

        this.DokumanEnSonRevDon = function (id) {
            var request = $http({
                method: "get",
                url: "/api/DokumanBaslik/DokumanEnSonRevDon/" + id
            });
            return request;
        }

        this.RevGeriYukle = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DokumanBaslik/RevGeriYukle",
                params: AramaKriter
            });
            return request;
        }
    })
    ;

