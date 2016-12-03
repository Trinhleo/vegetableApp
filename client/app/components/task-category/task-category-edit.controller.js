(function () {
    angular.module('app.production-item')
        .controller('EditTaskCategoryController', EditTaskCategoryController);

    EditTaskCategoryController.$inject = ['TaskCategoryService', '$state', '$stateParams','toastr'];
    function EditTaskCategoryController(TaskCategoryService, $state, $stateParams, toastr) {
        vm = this;
        vm.taskCategoryId = $stateParams.taskCategoryId;
        vm.formData = {};
        vm.update = update;
        TaskCategoryService.getTaskCategory(vm.taskCategoryId).then(
            function (res) {
                vm.formData = res;
            },
            function (err) {
                toastr.error(err.message, "Lỗi")
            }
        );

        function update() {
            TaskCategoryService.updateTaskCategory(vm.formData).then(
                function (res) {
                    toastr.success('Cập nhật thành công', 'Thành công');
                    $state.go('index.production-item-details', {
                        taskCategoryId: vm.taskCategoryId
                    })

                },
                function (err) {
                    toastr.error(err.message, 'Lỗi')
                }
            )
        };

    };
})();