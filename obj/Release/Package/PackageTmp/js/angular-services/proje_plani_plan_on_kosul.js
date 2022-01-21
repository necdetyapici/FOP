angular
    .module('inspinia')
        .service('srvProjePlaniPlanOnKosul', function ($http) {
            this.ProjePlaniPlanOnKosulGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjePlaniPlanOnKosul",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjePlaniPlanOnKosulSelect = function (PROJE_PLANI_PLAN_ON_KOSUL_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjePlaniPlanOnKosul/"+PROJE_PLANI_PLAN_ON_KOSUL_ID
                });
                return request;
           }

            this.ProjePlaniPlanOnKosulEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url: "/api/ProjePlaniPlanOnKosul",
                    data:Info
                });
                return request;
           }

            this.ProjePlaniPlanOnKosulSil = function (PROJE_PLANI_PLAN_ON_KOSUL_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjePlaniPlanOnKosul/"+PROJE_PLANI_PLAN_ON_KOSUL_ID
                });
                return request;
           }
    })
;

