(function () {
    angular.module('app.garden')
        .controller('GardenController', GardenController);
    GardenController.$inject = ['GardenService', 'toastr'];
    function GardenController(GardenService, toastr) {
        vm = this;
        vm.gardens = [];
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