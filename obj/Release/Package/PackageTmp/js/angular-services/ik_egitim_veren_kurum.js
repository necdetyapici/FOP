angular
    .module('inspinia')
        .service('srvIkEgitimVerenKurum', function ($http) {
            this.IkEgitimVerenKurumGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitimVerenKurum",
                    params: AramaKriter
                });
                return request;
           }

            this.IkEgitimVerenKurumSelect = function (IK_EGITIM_VEREN_KURUM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkEgitimVerenKurum/"+IK_EGITIM_VEREN_KURUM_ID
                });
                return request;
           }

            this.IkEgitimVerenKurumEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkEgitimVerenKurum",
                    data:Info
                });
                return request;
           }

            this.IkEgitimVerenKurumSil = function (IK_EGITIM_VEREN_KURUM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkEgitimVerenKurum/"+IK_EGITIM_VEREN_KURUM_ID
                });
                return request;
           }
    })
;

