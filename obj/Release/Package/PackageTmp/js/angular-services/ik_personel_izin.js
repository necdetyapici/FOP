angular
    .module('inspinia')
        .service('srvIkPersonelIzin', function ($http) {
            this.IkPersonelIzinGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelIzin",
                    params: AramaKriter
                });
                return request;
           }

            this.IkPersonelIzinSelect = function (IK_PERSONEL_IZIN_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelIzin/"+IK_PERSONEL_IZIN_ID
                });
                return request;
           }

            this.IkPersonelIzinEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkPersonelIzin",
                    data:Info
                });
                return request;
           }

            this.IkPersonelIzinSil = function (IK_PERSONEL_IZIN_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkPersonelIzin/"+IK_PERSONEL_IZIN_ID
                });
                return request;
            }

            this.IkPersonelToplamIzinGetData = function (KULLANICI_ID) {
                var request = $http({
                    method:"get",
                    url: "/api/IkPersonelIzin/ToplamIzinGet/" + KULLANICI_ID,
                });
                return request;
            }


            this.IzinOnaylama = function (InfoOnay) {
                var request = $http({
                    method: "post",
                    url: "/api/IkPersonelIzin/IzinOnaylama",
                    data: InfoOnay
                });
                return request;
            }

            this.IkPersonelIzinHesaplama = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/IkPersonelIzin/IzinHesaplama",
                    params: AramaKriter
                });
                return request;
            }
            
            this.IzinFormu = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/IkPersonelIzin/Form",
                    params: AramaKriter
                });
                return request;
            }

    })
;

