(function () {
    angular.module('app.services')
        .factory('AdminService', AdminService);

    AdminService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function AdminService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("admin");
        return {
            getAllUsers: getAllUsers,
            getUserInfo: getUserInfo,
            updateUserInfo: updateUserInfo,
            deleteUser: deleteUser
        };
        function getAllUsers() {
           return $http.get(apiUrl + '/users').then(function (res) {
                return res.data;
            }, function (err) {
                return res.err;
            });
        };

        function getUserInfo(userId) {
            return $http.get(apiUrl + '/users/' + userId).then(function (res) {
                return res.data
            }, function (err) {
                return err.data
            });
        };

        function updateUserInfo(data) {
           return  $http.put(apiUrl + '/users/' + data._id, data).then(function (res) {
             return res.data;
            }, function (err) {
               return err.data;
            });
        };
        function deleteUser(userId) {
           return $http.delete(apiUrl + '/users/' + userId).then(function (res) {
                return res.data;
            }, function (err) {
                return err.data;
            });
        };
    }
})();