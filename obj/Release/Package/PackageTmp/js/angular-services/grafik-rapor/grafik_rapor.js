angular
    .module('inspinia')
        .service('srvGrafikRapor', function ($http) {
            this.grafikRaporGetData = function (aramakriter) {
                var request = $http({
                    method:"get",
                    url:"/api/GrafikRapor",
                    params: aramakriter
                });
                return request;
           }

            
    })
;

