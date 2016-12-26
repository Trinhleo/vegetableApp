(function () {
    angular.module('app.variety')
        .controller('DetailsVarietyController', DetailsVarietyController);

    DetailsVarietyController.$inject = ['VarietyService','$state', '$stateParams', 'toastr'];
    function DetailsVarietyController(VarietyService,$state, $stateParams, toastr) {
        vm = this;
        vm.variety = {};
        vm.remove = remove;
        getVariety();
        function getVariety() {
            VarietyService.getVariety($stateParams.varietyId).then(
                function (res) {
                    vm.variety = res;
                },
                function (err) {
                    toastr.error(err.message, "Lỗi")
                }
            );
        };
        function remove() {
            if (confirm('Bạn có thực sự muốn xóa không?')) {
                VarietyService.deleteVariety($stateParams.VarietyId).then(
                    function (res) {
                        toastr.success("Xóa thành công", 'Thành công!');
                        $state.go('index.Variety');
                    },
                    function (err) {
                        toastr.error("Xóa thất bại", 'Thất bại!')
                    }
                )
            }
        }
    };
})();