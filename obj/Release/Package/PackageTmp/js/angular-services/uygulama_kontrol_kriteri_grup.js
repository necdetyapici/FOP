angular
    .module('inspinia')
        .service('srvUygulamaKontrolKriteriGrup', function ($http) {
            this.UygulamaKontrolKriteriGrupGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/UygulamaKontrolKriteriGrup",
                    params: AramaKriter
                });
                return request;
           }

            this.UygulamaKontrolKriteriGrupSelect = function (UYGULAMA_KONTROL_KRITERI_GRUP_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/UygulamaKontrolKriteriGrup/"+UYGULAMA_KONTROL_KRITERI_GRUP_ID
                });
                return request;
           }

            this.UygulamaKontrolKriteriGrupEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/UygulamaKontrolKriteriGrup",
                    data:Info
                });
                return request;
           }

            this.UygulamaKontrolKriteriGrupSil = function (UYGULAMA_KONTROL_KRITERI_GRUP_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/UygulamaKontrolKriteriGrup/"+UYGULAMA_KONTROL_KRITERI_GRUP_ID
                });
                return request;
           }
    })
;

