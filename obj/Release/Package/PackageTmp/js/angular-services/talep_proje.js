angular
    .module('inspinia')
    .service('srvTalepProje', function ($http) {
        this.TalepProjeGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/TalepProje",
                params: AramaKriter
            });
          
            return request;
        }

        this.TalepProjeSelect = function (TALEP_PROJE_ID) {
            var request = $http({
                method: "get",
                url: "/api/TalepProje/" + TALEP_PROJE_ID
            });
         
            return request;
        }

        this.TalepProjeEkleGuncelle = function (Info) {
            
            var request = $http({
                method: "post",
                url: "/api/TalepProje",
                data: Info,
            });
            return request;
        }

        this.TalepProjeSil = function (TALEP_PROJE_ID) {
            var request = $http({
                method: "delete",
                url: "/api/TalepProje/" + TALEP_PROJE_ID
            });
          
            return request;
        }

        this.TalepProjeCounGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/TalepProje/getcount",
                params: AramaKriter
            });

            return request;
        }

        this.TalepProjeOnay = function (InfoOnay) {
            var request = $http({
                method: "post",
                url: "/api/TalepProje/TalepOnaylama",
                data: InfoOnay,
            });
            return request;
        }
    })
    ;

