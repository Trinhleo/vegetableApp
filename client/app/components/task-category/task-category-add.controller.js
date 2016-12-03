(function () {
    angular.module('app.production-item')
        .controller('AddTaskCategoryController', AddTaskCategoryController);

    AddTaskCategoryController.$inject = ['TaskCategoryService', '$state', 'toastr'];
    function AddTaskCategoryController(TaskCategoryService, $state, toastr) {
        vm = this;
        vm.formData = {
            name: "",
            description: ""
        };
        vm.addTaskCategory = addTaskCategory;
        function addTaskCategory() {
            TaskCategoryService.createTaskCategory(vm.formData).then(
                function (res) {
                    vm.formData = {
                        name: "",
                        description: ""
                    }
                    toastr.success('Thêm loại tác vụ thành công', 'Thành công!')
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi');
                }
            )
        }
    };
})();