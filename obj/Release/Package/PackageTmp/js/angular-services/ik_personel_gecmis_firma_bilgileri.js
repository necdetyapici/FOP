angular
    .module('inspinia')
        .service('srvIkPersonelGecmisFirmaBilgileri', function ($http) {
            this.IkPersonelGecmisFirmaBilgileriGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelGecmisFirmaBilgileri",
                    params: AramaKriter
                });
                return request;
           }

            this.IkPersonelGecmisFirmaBilgileriSelect = function (IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelGecmisFirmaBilgileri/"+IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ID
                });
                return request;
           }

            this.IkPersonelGecmisFirmaBilgileriEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkPersonelGecmisFirmaBilgileri",
                    data:Info
                });
                return request;
           }

            this.IkPersonelGecmisFirmaBilgileriSil = function (IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkPersonelGecmisFirmaBilgileri/"+IK_PERSONEL_GECMIS_FIRMA_BILGILERI_ID
                });
                return request;
           }
    })
;

