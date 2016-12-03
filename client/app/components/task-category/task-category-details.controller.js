(function () {
    angular.module('app.production-item')
        .controller('DetailsTaskCategoryController', DetailsTaskCategoryController);

    DetailsTaskCategoryController.$inject = ['TaskCategoryService','$state', '$stateParams', 'toastr'];
    function DetailsTaskCategoryController(TaskCategoryService,$state, $stateParams, toastr) {
        vm = this;
        vm.taskCategory = {};
        vm.remove = remove;
        getTaskCategory();
        function getTaskCategory() {
            TaskCategoryService.getTaskCategory($stateParams.taskCategoryId).then(
                function (res) {
                    vm.taskCategory = res;
                },
                function (err) {
                    toastr.error(err.message, "Lỗi")
                }
            );
        };
        function remove() {
            if (confirm('Bạn có thực sự muốn xóa không?')) {
                TaskCategoryService.deleteTaskCategory($stateParams.taskCategoryId).then(
                    function (res) {
                        toastr.success("Xóa thành công", 'Thành công!');
                        $state.go('index.task-category');
                    },
                    function (err) {
                        toastr.error("Xóa thất bại", 'Thất bại!')
                    }
                )
            }
        }
    };
})();