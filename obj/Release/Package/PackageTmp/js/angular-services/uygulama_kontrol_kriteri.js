angular
    .module('inspinia')
        .service('srvUygulamaKontrolKriteri', function ($http) {
            this.UygulamaKontrolKriteriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/UygulamaKontrolKriteri",
                    params: AramaKriter
                });
                return request;
           }

            this.UygulamaKontrolKriteriSelect = function (UYGULAMA_KONTROL_KRITERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/UygulamaKontrolKriteri/"+UYGULAMA_KONTROL_KRITERI_ID
                });
                return request;
           }

            this.UygulamaKontrolKriteriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/UygulamaKontrolKriteri",
                    data:Info
                });
                return request;
           }

            this.UygulamaKontrolKriteriSil = function (UYGULAMA_KONTROL_KRITERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/UygulamaKontrolKriteri/"+UYGULAMA_KONTROL_KRITERI_ID
                });
                return request;
           }
    })
;

