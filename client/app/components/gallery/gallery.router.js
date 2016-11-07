(function () {
    angular.module('app.gallery')
        .config(GalleryRouter);

    function GalleryRouter($stateProvider) {
        $stateProvider
            .state('index.gallery', {
                url: "/gallery",
                abstract: true,
                templateUrl: 'app/components/gallery/gallery.html',
                controller: 'GalleryController',
                controllerAs: 'vm'
            })
            .state('index.gallery.album', {
                url: "",
                templateUrl: 'app/components/gallery/gallery-album.html',
                controller: 'GalleryController',
                controllerAs: 'vm'
            })
            .state('index.gallery.upload', {
                url: "/gallery-upload",
                templateUrl: 'app/components/gallery/upload-image.html',
                controller: 'UploadImageController',
                controllerAs: 'vm'
            });
    };
})();