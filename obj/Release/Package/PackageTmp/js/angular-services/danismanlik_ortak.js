angular
    .module('inspinia')
    .service('srvDanismanlikOrtak', function ($http) {

        let hizmetID;
        this.setHizmetID = function (id) {
            hizmetID = id;
        }

        this.getHizmetID = function () {
            if (hizmetID) {
                return hizmetID;

            }
            else {
                return -1;
            }
        }

    });
