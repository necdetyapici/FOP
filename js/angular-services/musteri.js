angular
    .module('inspinia')
        .service('srvMusteri', function ($http) {
            this.MusteriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/Musteri",
                    params: AramaKriter
                });
                return request;
           }

            this.MusteriSelect = function (MUSTERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/Musteri/"+MUSTERI_ID
                });
                return request;
           }

            this.MusteriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/Musteri",
                    data:Info
                });
                return request;
           }

            this.MusteriSil = function (MUSTERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/Musteri/"+MUSTERI_ID
                });
                return request;
           }
    })
;

