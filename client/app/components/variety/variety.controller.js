(function () {
    angular.module('app.variety')
        .controller('VarietyController', VarietyController);
    VarietyController.$inject = ['VarietyService', 'toastr'];
    function VarietyController(VarietyService, toastr) {
        var vm = this;
        vm.varieties = [];
        VarietyService.listAllVarieties().then(
            function (res) {
                vm.varieties = res;
            },
            function (err) {
                 toastr.error(err.message,'Lỗi!')
            }
        )
    };
})();