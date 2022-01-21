angular
    .module('inspinia')
        .service('srvIkPersonelBakmayaYukumluOlduguKisi', function ($http) {
            this.IkPersonelBakmayaYukumluOlduguKisiGetData = function (AramaKriter) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelBakmayaYukumluOlduguKisi",
                    params: AramaKriter
                });
                return request;
           }

            this.IkPersonelBakmayaYukumluOlduguKisiSelect = function (IK_PERSONEL_BAKMAYA_YUKUMLU_OLDUGU_KISI_ID) {
                var request = $http({
                    method:"get",
                    url:"/api/IkPersonelBakmayaYukumluOlduguKisi/"+IK_PERSONEL_BAKMAYA_YUKUMLU_OLDUGU_KISI_ID
                });
                return request;
           }

            this.IkPersonelBakmayaYukumluOlduguKisiEkleGuncelle = function (Info) {
                var request = $http({
                    method:"post",
                    url:"/api/IkPersonelBakmayaYukumluOlduguKisi",
                    data:Info
                });
                return request;
           }

            this.IkPersonelBakmayaYukumluOlduguKisiSil = function (IK_PERSONEL_BAKMAYA_YUKUMLU_OLDUGU_KISI_ID) {
                var request = $http({
                    method:"delete",
                    url:"/api/IkPersonelBakmayaYukumluOlduguKisi/"+IK_PERSONEL_BAKMAYA_YUKUMLU_OLDUGU_KISI_ID
                });
                return request;
           }
    })
;

