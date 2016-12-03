(function () {
    angular.module('app.task-category')
        .config(TaskCategoryRouter);
    TaskCategoryRouter.$inject = ['$stateProvider']
    function TaskCategoryRouter($stateProvider) {
        $stateProvider
            .state('index.task-category', {
                url: "/task-categories",
                templateUrl: 'app/components/task-category/task-category.html',
                controller: 'TaskCategoryController',
                controllerAs: 'vm'
            })
            .state('index.task-category-add', {
                url: "/task-categories/add",
                templateUrl: 'app/components/task-category/task-category-add.html',
                controller: 'AddTaskCategoryController',
                controllerAs: 'vm'
            })
            .state('index.task-category-edit', {
                url: "/task-categories/:taskCategoryId/edit",
                templateUrl: 'app/components/task-category/task-category-edit.html',
                controller: 'EditTaskCategoryController',
                controllerAs: 'vm'
            })
            .state('index.task-category-details', {
                url: "/task-categories/:taskCategoryId",
                templateUrl: 'app/components/task-category/task-category-details.html',
                controller: 'DetailsTaskCategoryController',
                controllerAs: 'vm',
            });
    }
})();