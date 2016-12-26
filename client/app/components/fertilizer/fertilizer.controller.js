(function () {
    angular.module('app.fertilizer')
        .controller('FertilizerController', FertilizerController);
    FertilizerController.$inject = ['FertilizerService', 'toastr'];
    function FertilizerController(FertilizerService, toastr) {
        var vm = this;
        vm.fertilizers = [];
        FertilizerService.listAllFertilizers().then(
            function (res) {
                vm.fertilizers = res;
            },
            function (err) {
                 toastr.error(err.message,'Lỗi!')
            }
        )
    };
})();