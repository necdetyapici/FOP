angular
    .module('inspinia')
        .service('srvProjePersonel', function ($http) {
           // this.ProjePersonelGetData = function (ProjeID) {
           //     var request = $http({
           //         method:"get",
           //         url:"/api/ProjePersonel?projeID="+ProjeID
           //     });
           //     return request;
           //}

            this.ProjePersonelGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjePersonel",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjePersonelSelect = function (PROJE_PERSONEL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjePersonel/"+PROJE_PERSONEL_ID
                });
                return request;
           }

            this.ProjePersonelEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjePersonel",
                    data:Info
                });
                return request;
           }

            this.ProjePersonelSil = function (PROJE_PERSONEL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjePersonel/"+PROJE_PERSONEL_ID
                });
                return request;
           }
    })
;

