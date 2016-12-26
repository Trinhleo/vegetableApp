(function () {
    angular.module('app.fertilizer')
        .controller('DetailsFertilizerController', DetailsFertilizerController);

    DetailsFertilizerController.$inject = ['FertilizerService','$state', '$stateParams', 'toastr'];
    function DetailsFertilizerController(FertilizerService,$state, $stateParams, toastr) {
        vm = this;
        vm.fertilizer = {};
        vm.remove = remove;
        getFertilizer();
        function getFertilizer() {
            FertilizerService.getFertilizer($stateParams.fertilizerId).then(
                function (res) {
                    vm.fertilizer = res;
                },
                function (err) {
                    toastr.error(err.message, "Lỗi")
                }
            );
        };
        function remove() {
            if (confirm('Bạn có thực sự muốn xóa không?')) {
                FertilizerService.deleteFertilizer($stateParams.fertilizerId).then(
                    function (res) {
                        toastr.success("Xóa thành công", 'Thành công!');
                        $state.go('index.fertilizer');
                    },
                    function (err) {
                        toastr.error("Xóa thất bại", 'Thất bại!')
                    }
                )
            }
        }
    };
})();