(function () {
    angular.module('app.season')
        .controller('ListSeasonController', ListSeasonController);
    ListSeasonController.$inject = ['SeasonService', 'GardenService', '$stateParams', '$rootScope', '$localStorage', 'toastr'];
    function ListSeasonController(SeasonService, GardenService, $stateParams, $rootScope, $localStorage, toastr) {
        vm = this;
        vm.gardenId = $stateParams.gardenId || '';
        vm.seasons = [];
        vm.garden = $rootScope.garden || {};
        if ($.isEmptyObject(vm.garden)) {
            GardenService.getGarden(vm.gardenId).then(
                function (res) {
                    vm.garden = res;
                    vm.garden.isOwner = $localStorage.userInfo && $localStorage.userInfo._id === res.user._id ? true : false;
                    $rootScope.garden = vm.garden;
                    console.log(vm.garden.isOwner);
                },
                function (err) {

                }
            )
        }
        SeasonService.loadSeasons(vm.gardenId).then(
            function (res) {
                vm.seasons = res;
            },
            function (err) {
                toastr.error(err.errMsg)
            }
        )
    };
})();