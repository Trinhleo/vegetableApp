(function () {
    angular.module('app.task-category')
        .controller('TaskCategoryController', TaskCategoryController);
    TaskCategoryController.$inject = ['TaskCategoryService', 'toastr'];
    function TaskCategoryController(TaskCategoryService, toastr) {
        vm = this;
        vm.taskCategory = [];
        TaskCategoryService.listAllTaskCategories().then(
            function (res) {
                vm.taskCategory = res;
            },
            function (err) {
                 toastr.error(err.message,'Lỗi!')
            }
        )
    };
})();