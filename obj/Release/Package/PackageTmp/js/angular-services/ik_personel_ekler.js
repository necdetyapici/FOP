angular
    .module('inspinia')
        .service('srvIkPersonelEkler', function ($http) {
            this.IkPersonelEklerGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelEkler",
                    params: AramaKriter
                });
                return request;
           }

            this.IkPersonelEklerSelect = function (IK_PERSONEL_EKLER_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelEkler/"+IK_PERSONEL_EKLER_ID
                });
                return request;
           }

            this.IkPersonelEklerEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkPersonelEkler",
                    data:Info
                });
                return request;
           }

            this.IkPersonelEklerSil = function (IK_PERSONEL_EKLER_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkPersonelEkler/"+IK_PERSONEL_EKLER_ID
                });
                return request;
           }
    })
;

