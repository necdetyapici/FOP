angular
    .module('inspinia')
        .service('srvIkEtkinlikPersonel', function ($http) {
            this.IkEtkinlikPersonelGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEtkinlikPersonel",
                    params: AramaKriter
                });
                return request;
           }

            this.IkEtkinlikPersonelSelect = function (IK_ETKINLIK_PERSONEL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEtkinlikPersonel/"+IK_ETKINLIK_PERSONEL_ID
                });
                return request;
           }

            this.IkEtkinlikPersonelEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkEtkinlikPersonel",
                    data:Info
                });
                return request;
           }

            this.IkEtkinlikPersonelSil = function (IK_ETKINLIK_PERSONEL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkEtkinlikPersonel/"+IK_ETKINLIK_PERSONEL_ID
                });
                return request;
           }
    })
;

