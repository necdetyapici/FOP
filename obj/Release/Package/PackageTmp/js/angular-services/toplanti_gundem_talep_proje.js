angular
    .module('inspinia')
        .service('srvToplantiGundemTalepProje', function ($http) {
            this.ToplantiGundemTalepProjeGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundemTalepProje",
                    params: AramaKriter
                });
                return request;
           }

            this.ToplantiGundemTalepProjeSelect = function (TOPLANTI_GUNDEM_TALEP_PROJE_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ToplantiGundemTalepProje/"+TOPLANTI_GUNDEM_TALEP_PROJE_ID
                });
                return request;
           }

            this.ToplantiGundemTalepProjeEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ToplantiGundemTalepProje",
                    data:Info
                });
                return request;
           }

            this.ToplantiGundemTalepProjeSil = function (TOPLANTI_GUNDEM_TALEP_PROJE_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ToplantiGundemTalepProje/"+TOPLANTI_GUNDEM_TALEP_PROJE_ID
                });
                return request;
           }
    })
;

