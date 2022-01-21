angular
    .module('inspinia')
    .service('srvMSGraph', function ($http) {

        this.ConsentRequest = function () {
            //var request = $http({
            //    metod: 'post',
            //    headers: {
            //        'Content-Type': 'application/x-www-form-urlencoded',
            //        'Access-Control-Allow-Origin': '*' },             
            //    url: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            //    params: { client_id: APPLICATION_CONFIG.clientID, response_type: 'code', response_mode: 'query', scope: 'user.read' },
            //    responseType: 'json'
            //});

            //request.withCredentials = true;

            return request;
        }
       
    });
    

