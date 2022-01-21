angular
    .module('inspinia')

    //bu alan web servislerinin view ile bağlantısının yapıldığı kısımdır.
    .service('srvTeknolojikFizibilite', function ($http) {
        this.TeknolojikFizibiliteGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/TeknolojikFizibilite",
                params: AramaKriter
            });
            return request;
        }

        this.TeknolojikFizibiliteSelect = function (TEKNOLOJIK_FIZIBILITE_ID) {
            var request = $http({
                method: "get",
                url: "/api/TeknolojikFizibilite/" + TEKNOLOJIK_FIZIBILITE_ID
            });
            return request;
        }

        this.TeknolojikFizibiliteEkleGuncelle = function (Info) {
           
            var request = $http({
                method: "post",
                url: "/api/TeknolojikFizibilite",
                data: Info
            });
            return request;
        }

        this.TeknolojikFizibiliteSil = function (TEKNOLOJIK_FIZIBILITE_ID) {
            var request = $http({
                method: "delete",
                url: "/api/TeknolojikFizibilite/" + TEKNOLOJIK_FIZIBILITE_ID
            });
            return request;
        }

        //this.TeknolojikFizibiliteProjeGetData = function (projeID) {
        //    var request = $http({
        //        method: "get",
        //        url: "/api/TeknolojikFizibilite/GetProje?projeID=" + projeID
        //    });
        //    return request;
        //}

        this.TeknolojikFizibiliteProjeGetData = function (AramaKriter) {
            var request = $http({
                method: "Get",
                url: "/api/TeknolojikFizibilite/GetProje",
                params: AramaKriter
            });
            
            return request;
        }
    })
    ;

