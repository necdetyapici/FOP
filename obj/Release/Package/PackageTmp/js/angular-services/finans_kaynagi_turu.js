angular
    .module('inspinia')
        .service('srvFinansKaynagiTuru', function ($http) {
            this.FinansKaynagiTuruGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/FinansKaynagiTuru",
                    params: AramaKriter
                });
                return request;
           }

            this.FinansKaynagiTuruSelect = function (FINANS_KAYNAGI_TURU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/FinansKaynagiTuru/"+FINANS_KAYNAGI_TURU_ID
                });
                return request;
           }

            this.FinansKaynagiTuruEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/FinansKaynagiTuru",
                    data:Info
                });
                return request;
           }

            this.FinansKaynagiTuruSil = function (FINANS_KAYNAGI_TURU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/FinansKaynagiTuru/"+FINANS_KAYNAGI_TURU_ID
                });
                return request;
           }
    })
;

