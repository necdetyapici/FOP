angular
    .module('inspinia')
        .service('srvIkIsBasvurulari', function ($http) {
            this.IkIsBasvurulariGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIsBasvurulari",
                    params: AramaKriter
                });
                return request;
           }

            this.IkIsBasvurulariSelect = function (IK_IS_BASVURULARI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkIsBasvurulari/"+IK_IS_BASVURULARI_ID
                });
                return request;
           }

            this.IkIsBasvurulariEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkIsBasvurulari",
                    data:Info
                });
                return request;
           }

            this.IkIsBasvurulariSil = function (IK_IS_BASVURULARI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkIsBasvurulari/"+IK_IS_BASVURULARI_ID
                });
                return request;
           }
    })
;

