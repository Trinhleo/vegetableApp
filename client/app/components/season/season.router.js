(function () {
    angular.module('app.season')
        .config(SeasonRouter);
    SeasonRouter.$inject = ['$stateProvider']
    function SeasonRouter($stateProvider) {
        $stateProvider
            .state('index.season', {
                url: "/gardens/:gardenId",
                templateUrl: 'app/components/season/season.html',
                controller: 'SeasonController',
                controllerAs: 'vm',
            })
            .state('index.season.list', {
                url: "/seasons",
                templateUrl: 'app/components/season/season-list.html',
                controller: 'ListSeasonController',
                controllerAs: 'vm',
            })
            .state('index.season.add', {
                url: "/seasons/add",
                templateUrl: 'app/components/season/season-add.html',
                controller: 'AddSeasonController',
                controllerAs: 'vm'
            })
            .state('index.season.edit', {
                url: "/seasons/:seasonId/edit",
                templateUrl: 'app/components/season/season-edit.html',
                controller: 'EditSeasonController',
                controllerAs: 'vm'
            })
            .state('index.season.details', {
                url: "/seasons/:seasonId",
                templateUrl: 'app/components/season/season-details.html',
                controller: 'DetailsSeasonController',
                controllerAs: 'vm',
                resolve: {
                    seasonDetails: function (SeasonService, $stateParams, $rootScope) {
                        return SeasonService.getSeason($stateParams.seasonId).then(
                            function (res) {
                                $rootScope.seasonId = $stateParams.seasonId
                                return res;
                            },
                            function (err) {
                                return toastr.error(err, 'Lỗi');
                            }
                        )
                    },
                    taskCats: function (TaskCategoryService) {
                        return TaskCategoryService.listAllTaskCategories().then(function (res) {
                            return res;
                        })
                    },
                    tasks: function (SeasonService,$stateParams) {
                        return SeasonService.listTasks($stateParams.seasonId).then(function (res) {
                            return res;
                        })
                    }
                }
            })
            .state('index.season.task', {
                url: "/seasons/:seasonId/tasks",
                templateUrl: 'app/components/season/season-task.html',
                controller: 'SeasonTaskController',
                controllerAs: 'vm'
            })
            // .state('index.season-th', {
            //     url: "/seasons-th",
            //     templateUrl: 'app/components/season/season.html',
            //     controller: 'SeasonController',
            //     controllerAs: 'vm',
            //     abstract: true
            // })
            .state('index.season-th', {
                url: "/seasons-th",
                templateUrl: 'app/components/season/season-list.html',
                controller: 'ListSeasonController',
                controllerAs: 'vm',
            })
            .state('index.season-tasks', {
                url: "seasons-th/tasks",
                templateUrl: 'app/components/season/season-task.html',
                controller: 'SeasonTaskController',
                controllerAs: 'vm'
            });

    }
})();