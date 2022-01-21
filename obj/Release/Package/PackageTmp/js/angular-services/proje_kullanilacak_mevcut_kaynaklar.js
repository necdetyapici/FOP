angular
    .module('inspinia')
        .service('srvProjeKullanilacakMevcutKaynaklar', function ($http) {
            //this.ProjeKullanilacakMevcutKaynaklarGetData = function (ProjeID) {
            //    var request = $http({
            //        method:"get",
            //        url:"/api/ProjeKullanilacakMevcutKaynaklar?ProjeID="+ProjeID
            //    });
            //    return request;
            //}

            this.ProjeKullanilacakMevcutKaynaklarGetData = function (AramaKriter) {
                var request = $http({
                    method: "get",
                    url: "/api/ProjeKullanilacakMevcutKaynaklar",
                    params: AramaKriter
                });
                return request;
            }

            this.ProjeKullanilacakMevcutKaynaklarSelect = function (PROJE_KULLANILACAK_MEVCUT_KAYNAK_ID) {
                
                var request = $http({
                    method:"get",
                    url:"/api/ProjeKullanilacakMevcutKaynaklar/"+PROJE_KULLANILACAK_MEVCUT_KAYNAK_ID
                });
                return request;
           }

            this.ProjeKullanilacakMevcutKaynaklarEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/ProjeKullanilacakMevcutKaynaklar",
                    data:Info
                });
                return request;
           }

            this.ProjeKullanilacakMevcutKaynaklarSil = function (PROJE_KULLANILACAK_MEVCUT_KAYNAK_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/ProjeKullanilacakMevcutKaynaklar/"+PROJE_KULLANILACAK_MEVCUT_KAYNAK_ID
                });
                return request;
           }
    });