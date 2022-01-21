angular
    .module('inspinia')
        .service('srvKonfigurasyonArac', function ($http) {
            this.KonfigurasyonAracGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/KonfigurasyonArac",
                    params: AramaKriter
                });
                return request;
           }

            this.KonfigurasyonAracSelect = function (KONFIGURASYON_ARAC_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/KonfigurasyonArac/"+KONFIGURASYON_ARAC_ID
                });
                return request;
           }

            this.KonfigurasyonAracEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/KonfigurasyonArac",
                    data:Info
                });
                return request;
           }

            this.KonfigurasyonAracSil = function (KONFIGURASYON_ARAC_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/KonfigurasyonArac/"+KONFIGURASYON_ARAC_ID
                });
                return request;
           }
    })
;

