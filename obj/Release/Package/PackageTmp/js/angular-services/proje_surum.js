angular
    .module('inspinia')
        .service('srvProjeSurum', function ($http) {
            this.ProjeSurumGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeSurum",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjeSurumSelect = function (PROJE_SURUM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeSurum/"+PROJE_SURUM_ID
                });
                return request;
           }

            this.ProjeSurumEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeSurum",
                    data:Info
                });
                return request;
           }

            this.ProjeSurumSil = function (PROJE_SURUM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeSurum/"+PROJE_SURUM_ID
                });
                return request;
           }
    })
;

