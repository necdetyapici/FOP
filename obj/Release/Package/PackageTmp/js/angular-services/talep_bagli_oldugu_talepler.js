angular
    .module('inspinia')
        .service('srvTalepBagliOlduguTalepler', function ($http) {
            this.TalepBagliOlduguTaleplerGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepBagliOlduguTalepler",
                    params: AramaKriter
                });
                return request;
           }

            this.TalepBagliOlduguTaleplerSelect = function (TALEP_BAGLI_OLDUGU_TALEPLER_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/TalepBagliOlduguTalepler/"+TALEP_BAGLI_OLDUGU_TALEPLER_ID
                });
                return request;
           }

            this.TalepBagliOlduguTaleplerEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/TalepBagliOlduguTalepler",
                    data:Info
                });
                return request;
           }

            this.TalepBagliOlduguTaleplerSil = function (Info) {
                var request = $http({
                    method:"post",
                    url: "/api/TalepBagliOlduguTalepler/Delete",
                    data: Info,
                });
                return request;
           }
    })
;

