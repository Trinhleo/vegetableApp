(function () {
    angular.module('app.garden')
        .controller('DetailsGardenController', DetailsGardenController);

    DetailsGardenController.$inject = ['anchorSmoothScroll','$location','$state', '$localStorage', '$rootScope', '$scope', 'GardenService', '$stateParams', 'FileUploader', 'appConfigs', '$window', '$timeout', 'toastr'];

    function DetailsGardenController(anchorSmoothScroll,$location,$state, $localStorage, $rootScope, $scope, GardenService, $stateParams, FileUploader, appConfigs, $window, $timeout, toastr) {
        var vm = this;
        // vm.room = {};
        vm.gardenImages = [];
        vm.gardens = [];
        vm.garden = {};
        vm.gotoEdit = gotoEdit;
        vm.gotoSeasons = gotoSeasons;
        vm.deleteGarden = deleteGarden;
        // vm.likeGardens = likeGardens;
        vm.isMyGarden = false;
        vm.isLiked = false;
        vm.initLocation = [];
        vm.carouselIndex = 0;
        vm.approve = approve;
        vm.unApprove = unApprove;
        vm.gotoElement = gotoElement;
        // vm.socket = io.connect('http://localhost:3000/chat');

        // checkFav();
        vpw = $(window).width();
        vph = $(window).height();

        $('.full-page').height(vph);
        $(document).ready(function () {
            setMapSize();
        });
        //caculate map size
        $(window).resize(function () {
            setMapSize();
        });
        function setMapSize() {
            var height = $('#info').height() - 5;
            $('#map_canvas').height(height);
        }

        $rootScope.gardenId = $stateParams.gardenId;
        // function checkFav() {
        //     GardenService.checkFavoritegarden($stateParams.gardenId).then(
        //         function (res) {
        //             if (res)
        //                 vm.isLiked = true;
        //         },
        //         function (err) {
        //             vm.isLiked = false;
        //         }
        //     );
        // };
        getGarden();
        function getGarden() {
            GardenService.getGarden($stateParams.gardenId).then(
                function (res) {
                    var gd = res;
                    var userId = gd.user ? gd.user._id : gd[0].user._id;
                    vm.isMyGarden = $localStorage.userInfo && $localStorage.userInfo._id === userId ? true : false;
                    vm.initLocation = gd.location;

                    if (gd.length) {
                        vm.garden = gd[0];
                        // vm.room = evt;
                        vm.gardens = gd;
                    } else {
                        vm.garden = gd;
                        vm.gardens.push(gd);
                    }
                    $rootScope.garden = vm.garden;
                    $rootScope.garden.isOwner = vm.isMyGarden;
                    setMapSize();
                },
                function (err) {
                    toastr.error(err.errMsg, 'Lỗi')
                    $state.go('index.garden');
                }
            );
        };


        // GardenService.getGardenImages($stateParams.gardenId).then(
        //     function (res) {
        //         var evt = res;
        //         vm.gardenImages = evt;
        //         vm.carouselIndex = vm.gardenImages.length / 2;
        //     },
        //     function (err) {
        //         $state.go('index.gardens');
        //     }
        // );
        function gotoElement(elementId) {
             anchorSmoothScroll.scrollTo(elementId);
        }
        function gotoSeasons(){
            window.location.href = '#/gardens/'+ $stateParams.gardenId +'/seasons';
        }

        function gotoEdit() {
            $state.go('index.garden-edit', {
                gardenId: vm.garden._id,
            });
        };

        function deleteGarden() {
            $(function () {
                $("#dialog-confirm").removeClass('hidden');
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Đồng ý": function () {
                            $(this).dialog("close");
                            GardenService.deleteGarden($stateParams.gardenId)
                                .then(
                                function (res) {
                                    toastr.success('Xóa thành công!', 'Thành công');
                                    $state.go('index.garden');
                                },
                                function (err) {
                                    toastr.error(err.errMsg, 'Lỗi')
                                });
                        },
                        Hủy: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });

        };

        function likeGardens() {
            if (!vm.isLiked) {
                GardenService.addToFavoritegardens($stateParams.gardenId)
                    .then(
                    function (res) {
                        console.log(res);
                        // checkFav();
                        vm.isLiked = true
                    },
                    function (err) {
                        $state.go('index.garden');
                    });
            } else {
                GardenService.removeFavoriteGarden($stateParams.gardenId)
                    .then(
                    function (res) {
                        // checkFav();
                        vm.isLiked = false;
                        console.log(res)
                    },
                    function (err) {
                        toastr.error(err, "Lỗi")
                        $state.go('index.garden');
                    });
            }
        };

        function approve() {
            GardenService.approve(vm.garden._id).then(
                function (res) {
                    toastr.success('Duyệt thành công!', 'Thành công');
                    getGarden()
                },
                function (err) {
                    toastr.error(err.errMsg, 'Lỗi');
                }
            )
        };

        function unApprove() {
            GardenService.unApprove(vm.garden._id).then(
                function (res) {
                    toastr.success('Duyệt thành công!', 'Thành công');
                    getGarden();
                },
                function (err) {
                    toastr.error(err.errMsg, 'Lỗi');
                }
            )
        }
    };
})();
