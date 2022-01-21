angular
    .module('inspinia')
        .service('srvIkEgitimDosya', function ($http) {
            this.IkEgitimDosyaGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitimDosya",
                    params: AramaKriter
                });
                return request;
           }

            this.IkEgitimDosyaSelect = function (IK_EGITIM_DOSYA_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitimDosya/"+IK_EGITIM_DOSYA_ID
                });
                return request;
           }

            this.IkEgitimDosyaEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkEgitimDosya",
                    data:Info
                });
                return request;
           }

            this.IkEgitimDosyaSil = function (IK_EGITIM_DOSYA_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkEgitimDosya/"+IK_EGITIM_DOSYA_ID
                });
                return request;
           }
    })
;

