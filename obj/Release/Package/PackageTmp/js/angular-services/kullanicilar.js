angular
    .module('inspinia')
        .service('srvKullanicilar', function ($http) {
            this.KullanicilarGetData = function (AramaKriter) {
                debugger;
                var request = $http({
                    method:"get",
                    url:"/api/Kullanicilar",
                    params: AramaKriter
                });
                return request;
           }

            this.KullanicilarSelect = function (KULLANICI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Kullanicilar/"+KULLANICI_ID
                });
                return request;
           }

            this.KullanicilarEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Kullanicilar",
                    data:Info
                });
                return request;
           }

            this.KullanicilarSil = function (KULLANICI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Kullanicilar/"+KULLANICI_ID
                });
                return request;
           }
    })
;

