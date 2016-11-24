(function () {
    angular.module('app.garden')
        .controller('ApproveGardenController', ApproveGardenController);
    ApproveGardenController.$inject = ['GardenService', 'toastr', '$rootScope'];
    function ApproveGardenController(GardenService, toastr, $rootScope) {
        vm = this;
        vm.myId = $rootScope.userInfo ? $rootScope.userInfo._id : '';
        vm.setMapSize = setMapSize;
        vm.loadGardensUnApproved = loadGardensUnApproved;
        vm.loadGardensApproved = loadGardensApproved;
        vm.approve = approve;
        vm.unApprove = unApprove;
        vm.unApprovedGardens = [];
        vm.approvedGardens = []

        loadGardensUnApproved();
        loadGardensApproved();

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


        // function loadGardens(type) {
        //     vm.type = type;
        //     if (type === 0) {
        //         loadAllGardens();
        //     } else if (type === 1) {
        //         loadGardensApproved()
        //     } else if (type === 2) {
        //         loadMyGarden();
        //     }
        // };

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

        function loadGardensUnApproved() {
            GardenService.loadGardensUnApproved().then(
                function (res) {
                    vm.unApprovedGardens = res;
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi!')
                });
        };
        function loadGardensApproved() {
            GardenService.loadGardensApproved().then(
                function (res) {
                    vm.approvedGardens = res;
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi!')
                });
        };

        function approve(gardenId) {
            GardenService.approve(gardenId).then(
                function (res) {
                    toastr.success('Duyệt thành công!', 'Thành công');
                    loadGardensUnApproved();
                    loadGardensApproved();
                },
                function (err) {
                    toastr.error(err.errMsg, 'Lỗi');
                }
            )
        };

        function unApprove(gardenId) {
            GardenService.unApprove(gardenId).then(
                function (res) {
                    toastr.success('Duyệt thành công!', 'Thành công');
                    loadGardensUnApproved();
                    loadGardensApproved();
                },
                function (err) {
                    toastr.error(err.errMsg, 'Lỗi');
                }
            )
        }
    };
})();