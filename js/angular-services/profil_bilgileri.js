angular
    .module('inspinia')
        .service('srvProfilBilgileri', function ($http) {
            this.GetData = function () {
                var request = $http({
                    method:"get",
                    url:"/api/ProfilBilgileri"
                });
                return request;
           }

            this.ProfilKaydet = function (Kullanici) {
            var request = $http({
                method: "post",
                url: "/api/ProfilBilgileri",
                data: Kullanici
            });
            return request;
        }

          
    })
;

