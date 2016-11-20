(function () {
    angular.module('app.garden')
        .controller('GardenController', GardenController);
    GardenController.$inject = ['GardenService', 'toastr', '$rootScope'];
    function GardenController(GardenService, toastr, $rootScope) {
        vm = this;
        vm.myId = $rootScope.userInfo ? $rootScope.userInfo._id : '';
        vm.gardens = [];
        vm.setMapSize = setMapSize;
        vm.type = 0;
        vm.loadGardens = loadGardens;
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
        };

        loadGardens(1);

        function loadGardens(type) {
            vm.type = type;
            if (type === 0) {
                loadAllGardens();
            } else if (type === 1) {
                loadGardensApproved()
            } else if (type === 2) {
                loadMyGarden();
            }
        };

        function loadAllGardens() {
            if ($rootScope.isAdmin) {
                GardenService.loadGardens().then(
                    function (res) {
                        vm.gardens = res;
                    },
                    function (err) {
                        toastr.error(err.message, 'Lỗi!')
                    })
            } else {
                toastr.error("Bạn không có quyền truy cập!", "Lỗi")
            }
        };

        function loadGardensApproved() {
            GardenService.loadGardensApproved().then(
                function (res) {
                    vm.gardens = res;
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi!')
                });
        }
        function loadMyGarden() {
            GardenService.loadMyGardens($rootScope.userInfo._id).then(
                function (res) {
                    vm.gardens = res;
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi!');
                }
            )
        }
    };
})();