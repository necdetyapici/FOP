angular
    .module('inspinia')
        .service('srvProjeTeknolojikFizibilite', function ($http) {
           // this.ProjeTeknolojikFizibiliteGetData = function (ProjeID) {
           //     var request = $http({
           //         method:"get",
           //         url:"/api/ProjeTeknolojikFizibilite/?projeID=" + ProjeID
           //     });
           //     return request;
           //}

            this.ProjeTeknolojikFizibiliteGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeTeknolojikFizibilite",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjeTeknolojikFizibiliteSelect = function (PROJE_TEKNOLOJIK_FIZIBILITE_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjeTeknolojikFizibilite/"+PROJE_TEKNOLOJIK_FIZIBILITE_ID
                });
                return request;
           }

            this.ProjeTeknolojikFizibiliteEkleGuncelle = function (Info) {
                var request = $http({
                    method: "post",
                    url: "/api/ProjeTeknolojikFizibilite",
                    data: Info 
                });
                return request;
           }

            this.ProjeTeknolojikFizibiliteSil = function (PROJE_TEKNOLOJIK_FIZIBILITE_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeTeknolojikFizibilite/"+PROJE_TEKNOLOJIK_FIZIBILITE_ID
                });
                return request;
           }
    })
;

