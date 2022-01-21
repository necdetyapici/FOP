angular
    .module('inspinia')
        .service('srvIkIsBasvurulariGorusmelerEkler', function ($http) {
            this.IkIsBasvurulariGorusmelerEklerGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIsBasvurulariGorusmelerEkler",
                    params: AramaKriter
                });
                return request;
           }

            this.IkIsBasvurulariGorusmelerEklerSelect = function (IK_IS_BASVURULARI_GORUSMELER_EKLER_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIsBasvurulariGorusmelerEkler/"+IK_IS_BASVURULARI_GORUSMELER_EKLER_ID
                });
                return request;
           }

            this.IkIsBasvurulariGorusmelerEklerEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkIsBasvurulariGorusmelerEkler",
                    data:Info
                });
                return request;
           }

            this.IkIsBasvurulariGorusmelerEklerSil = function (IK_IS_BASVURULARI_GORUSMELER_EKLER_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkIsBasvurulariGorusmelerEkler/"+IK_IS_BASVURULARI_GORUSMELER_EKLER_ID
                });
                return request;
           }
    })
;

