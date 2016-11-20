(function () {
    angular.module('app.season')
        .controller('ListSeasonController', ListSeasonController);
    ListSeasonController.$inject = ['GardenService', '$stateParams', '$rootScope', '$localStorage'];
    function ListSeasonController(GardenService, $stateParams, $rootScope, $localStorage) {
        vm = this;
        vm.gardenId = $stateParams.gardenId || '';
        vm.gardenId = $stateParams.gardenId || '';
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
    };
})();