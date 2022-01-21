angular
    .module('inspinia')
        .service('srvMusteriIzinAyari', function ($http) {
            this.MusteriIzinAyariGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/MusteriIzinAyari",
                    params: AramaKriter
                });
                return request;
           }

            this.MusteriIzinAyariSelect = function (MUSTERI_IZIN_AYARI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/MusteriIzinAyari/"+MUSTERI_IZIN_AYARI_ID
                });
                return request;
           }

            this.MusteriIzinAyariEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/MusteriIzinAyari",
                    data:Info
                });
                return request;
           }

            this.MusteriIzinAyariSil = function (MUSTERI_IZIN_AYARI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/MusteriIzinAyari/"+MUSTERI_IZIN_AYARI_ID
                });
                return request;
           }
    })
;

