(function () {
    angular.module('app.garden')
        .controller('GardenController', GardenController);
    GardenController.$inject = ['GardenService', 'toastr', '$rootScope'];
    function GardenController(GardenService, toastr, $rootScope) {
        vm = this;
        vm.myId = $rootScope.userInfo ? $rootScope.userInfo._id : '';
        vm.gardens = [];
        vm.setMapSize = setMapSize;

        $(window).resize(function () {
            setMapSize();
        });

        function setMapSize() {
            var subHeight = 140;
            if ($(window).innerWidth() <= 500) {
                subHeight = 120;
            }
            var height = $(window).innerHeight() - $('.action-bar').height() - subHeight;
            $('#map_canvas').height(height);
        }
        GardenService.loadGardens().then(
            function (res) {
                vm.gardens = res;
            },
            function (err) {
                toastr.error(err.message, 'Lỗi!')
            }
        )
    };
})();