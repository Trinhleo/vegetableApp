(function () {
    angular.module('app.services')
        .factory('GalleryService', GalleryService);

    GalleryService.$inject = ['$q', '$http', 'appConfigs', '$localStorage'];
    function GalleryService($q, $http, appConfigs, $localStorage) {
        var apiUrl = appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat("gallery");

        return {
            createImage: createImage,
            getImages: getImages,
            getImagesByUserId: getImagesByUserId,
            getOneImage: getOneImage,
            updateImage: updateImage,
            deleteImage: deleteImage
        };

        function createImage() {

        };

        function getImages() {
            var deferred = $q.defer();

            $http.get(apiUrl + '/images').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getImagesByUserId(userId) {
            var deferred = $q.defer();

            $http.get(apiUrl + '/' + userId + '/images').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
        function getImagesByGardenId(gardenId) {
            var deferred = $q.defer();

            $http.get(apiUrl + '/' + gardenId + '/images').then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function getOneImage(id) {
            var deferred = $q.defer();

            $http.get(apiUrl + '/images/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function updateImage(data) {
            var id = data._id;
            var deferred = $q.defer();
            $http.put(apiUrl + '/images/' + id, data).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };

        function deleteImage(id) {
            var deferred = $q.defer();
            $http.delete(apiUrl + '/images/' + id).then(function (res) {
                deferred.resolve(res.data);
            }, function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        };
    };
})();