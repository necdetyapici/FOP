angular
    .module('inspinia')
        .service('srvIkEtkinlikDosya', function ($http) {
            this.IkEtkinlikDosyaGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEtkinlikDosya",
                    params: AramaKriter
                });
                return request;
           }

            this.IkEtkinlikDosyaSelect = function (IK_ETKINLIK_DOSYA_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEtkinlikDosya/"+IK_ETKINLIK_DOSYA_ID
                });
                return request;
           }

            this.IkEtkinlikDosyaEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkEtkinlikDosya",
                    data:Info
                });
                return request;
           }

            this.IkEtkinlikDosyaSil = function (IK_ETKINLIK_DOSYA_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkEtkinlikDosya/"+IK_ETKINLIK_DOSYA_ID
                });
                return request;
           }
    })
;

