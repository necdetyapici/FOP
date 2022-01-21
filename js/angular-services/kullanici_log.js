angular
    .module('inspinia')
        .service('srvKullaniciLog', function ($http) {
            this.KullaniciLogGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/KullaniciLog",
                    params: AramaKriter
                });
                return request;
           }

            this.KullaniciLogSelect = function (KULLANICI_LOG_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/KullaniciLog/"+KULLANICI_LOG_ID
                });
                return request;
           }

            this.KullaniciLogEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/KullaniciLog",
                    data:Info
                });
                return request;
           }

            this.KullaniciLogSil = function (KULLANICI_LOG_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/KullaniciLog/"+KULLANICI_LOG_ID
                });
                return request;
           }
    })
;

