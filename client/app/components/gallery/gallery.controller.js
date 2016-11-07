(function () {
    angular.module('app.gallery')
        .controller('GalleryController', GalleryController);
    GalleryController.$inject = ['GalleryService'];
    function GalleryController(GalleryService) {
        var vm = this;
        vm.alert = "";
        vm.images = [];
        vm.delete = deleteImage;
        getImages();
        console.log("gallery");

        function deleteImage(id, index) {
            GalleryService.deleteImage(id).then(
                function (res) {
                    console.log(res)
                    delete vm.images[index];
                },
                function (err) {
                    vm.alert = err
                }
            );
        };

        function getImages() {
            GalleryService.getImages().then(
                function (res) {
                    vm.images = res;
                    console.log(res);
                },
                function (err) {
                    vm.alert = err;
                });

        };
    };
})();