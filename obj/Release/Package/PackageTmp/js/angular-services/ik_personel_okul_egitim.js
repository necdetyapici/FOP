angular
    .module('inspinia')
        .service('srvIkPersonelOkulEgitim', function ($http) {
            this.IkPersonelOkulEgitimGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelOkulEgitim",
                    params: AramaKriter
                });
                return request;
           }

            this.IkPersonelOkulEgitimSelect = function (IK_PERSONEL_OKUL_EGITIM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelOkulEgitim/"+IK_PERSONEL_OKUL_EGITIM_ID
                });
                return request;
           }

            this.IkPersonelOkulEgitimEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkPersonelOkulEgitim",
                    data:Info
                });
                return request;
           }

            this.IkPersonelOkulEgitimSil = function (IK_PERSONEL_OKUL_EGITIM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkPersonelOkulEgitim/"+IK_PERSONEL_OKUL_EGITIM_ID
                });
                return request;
           }
    })
;

