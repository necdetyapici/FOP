angular
    .module('inspinia')
        .service('srvProjedeVerilecekEgitim', function ($http) {
           // this.ProjedeVerilecekEgitimGetData = function (PROJEID) {
           //     var request = $http({
           //         method:"get",
           //         url:"/api/ProjedeVerilecekEgitim?projeID="+PROJEID
           //     });
           //     return request;
           //}

            this.ProjedeVerilecekEgitimGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjedeVerilecekEgitim",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjedeVerilecekEgitimSelect = function (PROJEDE_VERILECEK_EGITIM_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/ProjedeVerilecekEgitim/"+PROJEDE_VERILECEK_EGITIM_ID
                });
                return request;
           }

            this.ProjedeVerilecekEgitimEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjedeVerilecekEgitim",
                    data:Info
                });
                return request;
           }

            this.ProjedeVerilecekEgitimSil = function (PROJEDE_VERILECEK_EGITIM_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjedeVerilecekEgitim/"+PROJEDE_VERILECEK_EGITIM_ID
                });
                return request;
           }
    })
;

