angular
    .module('inspinia')

    .service('srvMenu', function ($http) {

        this.getMenuListesi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/Menuler",
                params: AramaKriter
            });

            return request;
        }

        this.getMenu = function (MenuID) {
            var request = $http({
                method: "get",
                url: "/api/Menuler/" + MenuID
            });

            return request;
        }

        this.postMenuKaydet = function (Menu) {
            var request = $http({
                method: "post",
                url: "/api/Menuler",
                data: Menu
            });
            return request;
        }


        this.postMenuSil = function (MenuID) {
            var request = $http({
                method: "delete",
                url: "/api/Menuler/" + MenuID
            });
            return request;
        }


        //İrfan SAYGILI
        this.MenulerGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/Menuler",
                params: AramaKriter
            });
            return request;
        }

        this.MenulerSelect = function (MENU_ID) {
            var request = $http({
                method: "get",
                url: "/api/Menuler/" + MENU_ID
            });
            return request;
        }

        this.MenulerEkleGuncelle = function (Info) {
            var request = $http({
                method: "post",
                url: "/api/Menuler",
                data: Info
            });
            return request;
        }

        this.MenulerSil = function (MENU_ID) {
            var request = $http({
                method: "delete",
                url: "/api/Menuler/" + MENU_ID
            });
            return request;
        }




    })
;
