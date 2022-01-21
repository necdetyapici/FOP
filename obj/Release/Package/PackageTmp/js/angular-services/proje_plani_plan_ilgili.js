angular
    .module('inspinia')
        .service('srvProjePlaniPlanIlgili', function ($http) {
            this.ProjePlaniPlanIlgiliGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjePlaniPlanIlgili",
                    params: AramaKriter
                });
                return request;
           }

            this.ProjePlaniPlanIlgiliSelect = function (PROJE_PLANI_PLAN_ILGILI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjePlaniPlanIlgili/"+PROJE_PLANI_PLAN_ILGILI_ID
                });
                return request;
           }

            this.ProjePlaniPlanIlgiliEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url: "/api/ProjePlaniPlanIlgili",
                    data:Info
                });
                return request;
           }

            this.ProjePlaniPlanIlgiliSil = function (PROJE_PLANI_PLAN_ILGILI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjePlaniPlanIlgili/"+PROJE_PLANI_PLAN_ILGILI_ID
                });
                return request;
           }
    })
;

