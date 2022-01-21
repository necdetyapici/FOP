angular
    .module('inspinia')
        .service('srvKontrolNoktalari', function ($http) {
            this.KontrolNoktalariGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/KontrolNoktalari",
                    params: AramaKriter
                });
                return request;
           }

            this.KontrolNoktalariSelect = function (KONTROL_NOKTASI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/KontrolNoktalari/"+KONTROL_NOKTASI_ID
                });
                return request;
           }

            this.KontrolNoktalariEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/KontrolNoktalari",
                    data:Info
                });
                return request;
           }

            this.KontrolNoktalariSil = function (KONTROL_NOKTASI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/KontrolNoktalari/"+KONTROL_NOKTASI_ID
                });
                return request;
           }
    })
;

