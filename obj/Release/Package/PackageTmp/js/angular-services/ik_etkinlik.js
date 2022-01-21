angular
    .module('inspinia')
        .service('srvIkEtkinlik', function ($http) {
            this.IkEtkinlikGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEtkinlik",
                    params: AramaKriter
                });
                return request;
           }

            this.IkEtkinlikSelect = function (IK_ETKINLIK_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEtkinlik/"+IK_ETKINLIK_ID
                });
                return request;
           }

            this.IkEtkinlikEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkEtkinlik",
                    data:Info
                });
                return request;
           }

            this.IkEtkinlikSil = function (IK_ETKINLIK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkEtkinlik/"+IK_ETKINLIK_ID
                });
                return request;
           }
    })
;

