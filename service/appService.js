angular.module('MondiaAssignment').factory('appService', function ($http, $q, $rootScope) {

    var appService = {};

    appService.baseURL = "";

    appService.callService = function (params) {
        var finalParams = angular.extend({}, {
            timeout: 50 * 1000,
            cache: false,
            data: null,
            params: null,
            method: 'POST',
            responseType: "",
        }, params);
        finalParams.url = appService.baseURL + params.url;
        finalParams.data = params.data;
        if (!navigator.onLine) {
            window.alert('Please check your internet and try again later');
            return $q.reject('offline');
        } else {
            $rootScope.showSpinner = true;
            return $http(finalParams).then(function (response) {
                $rootScope.showSpinner = false;
                    return $q.when(response.data);
            }, function (error) {
                $rootScope.showSpinner = false;
                window.alert(error);
                return $q.reject(error);
            });
        }
    };

    appService.getData = function () {
       return appService.callService({
            url: 'https://api.myjson.com/bins/l9pn3',
            method: 'GET'
        });
    };

    return appService;
});