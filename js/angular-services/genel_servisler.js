angular
    .module('inspinia')

    .service('srvGenel', function ($http) {

        this.getProjeEtiketListesi = function (projeID) {
            return $http({ method: "get", url: "/api/ProjeEtiket/" + projeID });

        }


        this.getSolMenuListesi = function () {
            var request = $http({
                method: "get",
                url: "/api/SolMenuIslemleri"
            });
            return request;
        }

        this.getKullaniciTipiListesi = function () {
            var request = $http({
                method: "get",
                url: "/api/KullaniciTipi"
            });
            return request;
        }
        this.getKullaniciDurumlariListesi = function () {
            var request = $http({
                method: "get",
                url: "/api/KullaniciDurumlari"
            });
            return request;
        }

        this.getKullaniciIslemTuruListesi = function () {
            var request = $http({
                method: "get",
                url: "/api/KullaniciIslemTuru"
            });
            return request;
        }



        //ismi değiştirdim.ama ileri götürmedi.adem
        this.pictLogKaydet = function (Kullanici) {
            var request = $http({
                method: "post",
                url: "/api/KullaniciLog",
                data: Kullanici
            });
            return request;
        }


        this.getForm = function () {
            var request = $http({
                method: "get",
                url: "/api/Formlar"
            });
            return request;
        }

        this.getKurumBirim = function (id) {
            var request = $http({
                method: "get",
                url: "/api/KurumBirim/" + id
            });
            return request;
        }

        this.getIlIlce = function (id) {
            var request = $http({
                method: "get",
                url: "/api/IlIlce/" + id
            });
            return request;
        }

        this.getIlce = function (id, MUSTERI_IL_ID) {
            var request = $http({
                method: "get",
                url: "/api/IlIlce/" + id + "?MUSTERI_IL_ID=" + MUSTERI_IL_ID
            });
            return request;
        }

        this.getPeriyotTipiListesi = function () {
            var request = $http({
                method: "get",
                url: "/api/PeriyotTipi"
            });
            return request;
        }
        this.getTahminEdilenProjeSuresiListesi = function () {
            var request = $http({
                method: "get",
                url: "/api/TahminEdilenProjeSuresi"
            });
            return request;
        }


        this.getDegerlendirmeYontemi = function () {
            var request = $http({
                method: "get",
                url: "/api/DegerlendirmeYontemi/"
            });
            return request;
        }

        this.getTecrube = function () {
            var request = $http({
                method: "get",
                url: "/api/Tecrube/"
            });
            return request;
        }

        this.getIterasyonDurumTipi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/IterasyonDurumTipi",
                params: AramaKriter
            });
            return request;
        }

        this.getTalepDurumTipi = function () {
            var request = $http({
                method: "get",
                url: "/api/TalepDurumTipi/"
            });
            return request;
        }

        this.getTalepTipi = function () {
            var request = $http({
                method: "get",
                url: "/api/TalepTipi/"
            });
            return request;
        }

        this.getTalepDogrulanmaDurumTipi = function () {
            var request = $http({
                method: "get",
                url: "/api/TalepDogrulanmaDurumTipi/"
            });
            return request;
        }

        this.testDogrulanmadi = function (talepTest) {
            var request = $http({
                method: "post",
                url: "/api/TalepProjeTalepTipiTestDogrulanmadi",
                data: talepTest
            });
            return request;
        }
        this.testDogrulandi = function (talepTest) {
            var request = $http({
                method: "post",
                url: "/api/TalepProjeTalepTipiTestDogrulandi",
                data: talepTest
            });
            return request;
        }

        this.getTalepProjeSurecAkisTipi = function () {
            var request = $http({
                method: "get",
                url: "/api/TalepProjeSurecAkisTipi/"
            });
            return request;
        }

        this.getTalepProjeSurecTipi = function () {
            var request = $http({
                method: "get",
                url: "/api/TalepProjeSurecTipi/"
            });
            return request;
        }

        this.getIsDurumu = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/IsDurumu",
                params: AramaKriter
            });
            return request;
        }

        this.getParaBirimi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ParaBirimi",
                params: AramaKriter
            });
            return request;
        }

        this.getIsBasvurulariDurumTipi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/IsBasvurulariDurumTipi",
                params: AramaKriter
            });
            return request;
        }

        this.getIzinTuru = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/IzinTuru",
                params: AramaKriter
            });
            return request;
        }


        this.getKanGrubu = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/KanGrubu",
                params: AramaKriter
            });
            return request;
        }

        //this.getKargoSirketi = function (AramaKriter) {
        //    var request = $http({
        //        method: "get",
        //        url: "/api/KargoSirketi",
        //        params: AramaKriter
        //    });
        //    return request;
        //}

        this.getKargoGonderiTipi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/KargoGonderiTipi",
                params: AramaKriter
            });
            return request;
        }

        this.getDemirbasDurumu = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DemirbasDurumu",
                params: AramaKriter
            });
            return request;
        }

        this.getOkulDurumTipi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/OkulDurumTipi",
                params: AramaKriter
            });
            return request;
        }

        this.getOkulTuru = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/OkulTuru",
                params: AramaKriter
            });
            return request;
        }

        this.getToplantiKonuTuru = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ToplantiKonuTuru",
                params: AramaKriter
            });
            return request;
        }

        this.getSurec = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/Surec",
                params: AramaKriter
            });
            return request;
        }

        this.getRiskDerecesi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/RiskDerecesi",
                params: AramaKriter
            });
            return request;
        }

        this.getAvansMasrafDurumu = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/AvansMasrafDurumu",
                params: AramaKriter
            });
            return request;
        }


        this.DuyuruDurumuGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/DuyuruDurumu",
                params: AramaKriter
            });
            return request;
        }

        this.getIkYakinlikDerecesi = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/IkYakinlikDerecesi",
                params: AramaKriter
            });
            return request;
        }

        this.getProjeAciliyetGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjeAciliyet",
                params: AramaKriter
            });
            return request;
        }

        this.getProjeEtkiGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjeEtki",
                params: AramaKriter
            });
            return request;
        }

        this.getProjeAciliyetEtkiSonucGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjeAciliyetEtkiSonuc",
                params: AramaKriter
            });
            return request;
        }

        this.getProjeAciliyetEtkiSonucHesapGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/ProjeAciliyetEtkiSonuc/GetHesap",
                params: AramaKriter
            });
            return request;
        }

        this.getMailTuruGetData = function (AramaKriter) {
            var request = $http({
                method: "get",
                url: "/api/MailGrupTuru",
                params: AramaKriter
            });
            return request;
        }

        this.KullaniciCikis = function () {
            var request = $http({
                method: "post",
                url: "/api/TalepProje/KullaniciCikis"
            });
            return request;
        }



    });