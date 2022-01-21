angular
    .module('inspinia')
    .service('srvEntegrasyon', function ($http) {

       

        this.GetEntegrasyonAuth = function (id) {
            var request = $http({
                method: "get",
                url: "/api/OutlookEntegrasyon/GetOutlookAuth/" + id,
                
                
            });
            return request;
        }

        this.GetUserToken = function (kullaniciID) {

            return $http({
                method: "get",
                url: "/api/Entegrasyon",
                params: { 'KULLANICI_ID': kullaniciID, 'ENT_ID' : 3 }
            });

        }

        this.CheckForOutlook = function(entegrasyon) {
            return $http({
                method: "get",
                url : "/api/OutlookEntegrasyon",
                params: { "ENT" : entegrasyon }
            });
        }

        this.EmailCheck = function (ENT_ID,httpIptal) {
            return $http({
                method:"get",
                url : "/api/OutlookEntegrasyon/ReadEmailCount/" + ENT_ID,
                timeout : httpIptal.promise
                
            });
        }

        this.calendarWeekCheck = function (ENT_ID,httpIptal) {
            return $http({
                method: "get",
                url: "/api/OutlookEntegrasyon/ReadWeeklyCalendar/" + ENT_ID,
                timeout:  httpIptal.promise
            });
        }

       
    });
