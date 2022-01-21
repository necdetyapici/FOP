angular
    .module('inspinia')
        .service('srvYasamDongusu', function ($http) {
            this.YasamDongusuGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/YasamDongusu",
                    params: AramaKriter
                });
                return request;
           }

            this.YasamDongusuSelect = function (YASAM_DONGUSU_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/YasamDongusu/"+YASAM_DONGUSU_ID
                });
                return request;
           }

            this.YasamDongusuEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/YasamDongusu",
                    data:Info
                });
                return request;
           }

            this.YasamDongusuSil = function (YASAM_DONGUSU_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/YasamDongusu/"+YASAM_DONGUSU_ID
                });
                return request;
           }
    })
;

