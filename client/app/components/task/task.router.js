(function () {
    angular.module('app.task')
        .config(TaskRouter);
    TaskRouter.$inject = ['$stateProvider']
    function TaskRouter($stateProvider) {
        $stateProvider
            .state('index.task', {
                url: "/tasks",
                templateUrl: 'app/components/task/task.html',
                controller: 'TaskController',
                controllerAs: 'vm'
            })
            .state('index.task-add', {
                url: "/tasks/add",
                templateUrl: 'app/components/task/task-add.html',
                controller: 'AddTaskController',
                controllerAs: 'vm'
            })
            .state('index.task-edit', {
                url: "/tasks/:taskId/edit",
                templateUrl: 'app/components/task/task-edit.html',
                controller: 'EditTaskController',
                controllerAs: 'vm'
            })
            .state('index.task-details', {
                url: "/tasks/:taskId",
                templateUrl: 'app/components/task/task-details.html',
                controller: 'DetailsTaskController',
                controllerAs: 'vm',
            });
    }
})();