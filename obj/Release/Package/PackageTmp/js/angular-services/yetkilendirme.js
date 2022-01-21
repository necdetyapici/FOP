angular
    .module('inspinia')

    .service('srvYetkilendirme', function ($http) {

        this.getYetkiGruplariListesi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/YetkiGruplari/",
                params: AramaKriter
            });
            return request;
        }

        this.getYetkiGruplari = function (YetkiGrubuID) {
            var request = $http({
                method: "get",
                url: "/api/YetkiGruplari/" + YetkiGrubuID
            });

            return request;
        }

        this.YetkiGrubuKaydet = function (YetkiGrubu) {
            var request = $http({
                method: "post",
                url: "/api/YetkiGruplari",
                data: YetkiGrubu
            });
            return request;
        }

        this.YetkiGrubuSil = function (YetkiGrubuID) {
            var request = $http({
                method: "delete",
                url: "/api/YetkiGruplari/" + YetkiGrubuID
            });
            return request;
        }

        this.getYetkiGruplariKontrolNoktalariListesi = function (YetkiGrupID) {
            var request = $http({
                method: "get",
                url: "/api/YetkiGrupKontrolNoktalari/" + YetkiGrupID
            });
            return request;
        }

        this.YetkiGrupKontrolNoktalariKaydet = function (YetkiGrupKontrolNoktalari) {
            var request = $http({
                method: "post",
                url: "/api/YetkiGrupKontrolNoktalari",
                data: YetkiGrupKontrolNoktalari
            });
            return request;
        }

        this.getKullaniciYetkiGruplari = function (KullaniciID) {
            var request = $http({
                method: "get",
                url: "/api/KullaniciYetkiGruplari?KULLANICI_ID=" + KullaniciID
            });
            return request;
        }

        this.KullaniciYetkiGrubuKaydet = function (Kullanici) {
            var request = $http({
                method: "post",
                url: "/api/KullaniciYetkiGruplari",
                data: Kullanici
            });
            return request;
        }

        this.KullaniciYetkiGrubuSil = function (KullaniciYetkiGrupID) {
            var request = $http({
                method: "delete",
                url: "/api/KullaniciYetkiGruplari/" + KullaniciYetkiGrupID
            });
            return request;
        }


    });
