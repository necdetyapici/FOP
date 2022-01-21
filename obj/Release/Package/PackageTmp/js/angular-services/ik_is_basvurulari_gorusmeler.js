angular
    .module('inspinia')
        .service('srvIkIsBasvurulariGorusmeler', function ($http) {
            this.IkIsBasvurulariGorusmelerGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIsBasvurulariGorusmeler",
                    params: AramaKriter
                });
                return request;
           }

            this.IkIsBasvurulariGorusmelerSelect = function (IK_IS_BASVURULARI_GORUSMELER_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIsBasvurulariGorusmeler/"+IK_IS_BASVURULARI_GORUSMELER_ID
                });
                return request;
           }

            this.IkIsBasvurulariGorusmelerEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkIsBasvurulariGorusmeler",
                    data:Info
                });
                return request;
           }

            this.IkIsBasvurulariGorusmelerSil = function (IK_IS_BASVURULARI_GORUSMELER_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkIsBasvurulariGorusmeler/"+IK_IS_BASVURULARI_GORUSMELER_ID
                });
                return request;
           }
    })
;

