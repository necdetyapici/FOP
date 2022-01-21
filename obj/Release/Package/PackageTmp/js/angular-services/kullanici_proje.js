angular
    .module('inspinia')
        .service('srvKullaniciProje', function ($http) {
            this.KullaniciProjeGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/KullaniciProje",
                    params: AramaKriter
                });
                return request;
           }

            this.KullaniciProjeSelect = function (KULLANICI_PROJE_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/KullaniciProje/"+KULLANICI_PROJE_ID
                });
                return request;
           }

            this.KullaniciProjeEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/KullaniciProje",
                    data:Info
                });
                return request;
           }

            this.KullaniciProjeSil = function (KULLANICI_PROJE_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/KullaniciProje/"+KULLANICI_PROJE_ID
                });
                return request;
           }
    })
;

