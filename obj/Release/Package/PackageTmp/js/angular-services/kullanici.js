angular
    .module('inspinia')

    .service('srvKullanici', function ($http) {

        this.KullaniciGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/Kullanici",
                params: AramaKriter
            });
            return request;
        }

       
        this.KullaniciSelect = function (KULLANICI_ID) {
            var request = $http({
                method: "get",
                url: "/api/Kullanici/" + KULLANICI_ID
            });
            return request;
        }

        this.KullaniciKaydet = function (Kullanici) {
            var request = $http({
                method: "post",
                url: "/api/Kullanici",
                data: Kullanici
            });
            return request;
        }

        this.KullaniciSil = function (KULLANICI_ID) {
            var request = $http({
                method: "delete",
                url: "/api/Kullanici/" + KULLANICI_ID
            });
            return request;
        }

        this.KullaniciGirisKontrol = function (loginBilgisi) {
            var request = $http({
                method: "post",
                url: "/api/KullaniciGiris",
                data: loginBilgisi
            });
            return request;
        }

        this.KullaniciPasiflestir = function (Kullanici) {
            var request = $http({
                method: "post",
                url: "/api/KullaniciPasiflestir",
                data: Kullanici
            });
            return request;
        }
        this.KullaniciAktiflestir = function (Kullanici) {
            var request = $http({
                method: "post",
                url: "/api/KullaniciAktiflestir",
                data: Kullanici
            });
            return request;
        }

        this.KullaniciSifreUnuttum = function (sifreUnuttum) {
            var request = $http({
                method: "post",
                url: "/api/SifremiUnuttum",
                data: sifreUnuttum
            });
            return request;
        }

        this.LDAPKullaniciGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/Kullanici/ldapget",
                params: AramaKriter
            });
            return request;
        }

        this.KullaniciLdapDegistir = function (Kullanici) {
            var request = $http({
                method: "post",
                url: "/api/Kullanici/ldapDurumu",
                data: Kullanici
            });
            return request;
        }

        this.KullaniciPersonelFormu = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/Kullanici/Form",
                params: AramaKriter
            });
            return request;
        }
    });