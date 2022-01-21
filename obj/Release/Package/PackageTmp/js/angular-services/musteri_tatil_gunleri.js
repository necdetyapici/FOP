angular
    .module('inspinia')
        .service('srvMusteriTatilGunleri', function ($http) {
            this.MusteriTatilGunleriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/MusteriTatilGunleri",
                    params: AramaKriter
                });
                return request;
           }

            this.MusteriTatilGunleriSelect = function (MUSTERI_TATIL_GUNLERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/MusteriTatilGunleri/"+MUSTERI_TATIL_GUNLERI_ID
                });
                return request;
           }

            this.MusteriTatilGunleriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/MusteriTatilGunleri",
                    data:Info
                });
                return request;
           }

            this.MusteriTatilGunleriSil = function (MUSTERI_TATIL_GUNLERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/MusteriTatilGunleri/"+MUSTERI_TATIL_GUNLERI_ID
                });
                return request;
           }
    })
;

