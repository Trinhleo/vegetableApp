(function () {
    angular.module('app.season')
        .controller('ListSeasonController', ListSeasonController);
    ListSeasonController.$inject = ['SeasonService', 'GardenService', '$stateParams', '$rootScope', '$localStorage', 'toastr'];
    function ListSeasonController(SeasonService, GardenService, $stateParams, $rootScope, $localStorage, toastr) {
        vm = this;
        vm.gardenId = $stateParams.gardenId || '';
        vm.seasons = [];
        vm.garden = $rootScope.garden || {};
        vm.remove = remove;
        if ($.isEmptyObject(vm.garden)) {
            GardenService.getGarden(vm.gardenId).then(
                function (res) {
                    vm.garden = res;
                    vm.garden.isOwner = $localStorage.userInfo && $localStorage.userInfo._id === res.user._id ? true : false;
                    $rootScope.garden = vm.garden;
                    console.log(vm.garden.isOwner);
                },
                function (err) {
                    toatr.error(err.errMsg, 'Lỗi')
                }
            )
        }
        loadSeasons();
        function loadSeasons() {
            SeasonService.loadSeasons(vm.gardenId).then(
                function (res) {
                    vm.seasons = res;
                },
                function (err) {
                    toastr.error(err.errMsg)
                }
            );
        };
        function remove(season) {
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
                            SeasonService.deleteSeason(season._id).then(
                                function (res) {
                                    toastr.success('Xóa mùa vụ thành công!', 'Thành công')
                                    loadSeasons();
                                },
                                function (err) {
                                    toastr.error(err.errMsg, 'Lỗi')
                                }
                            )
                        },
                        Hủy: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        }
    };
})();