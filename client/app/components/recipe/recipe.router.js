(function () {
    angular.module('app.recipe')
        .config(RecipeRouter);
    RecipeRouter.$inject = ['$stateProvider']
    function RecipeRouter($stateProvider) {
        $stateProvider
            .state('index.recipe', {
                url: "/recipes",
                templateUrl: 'app/components/recipe/recipe.html',
                controller: 'RecipeController',
                controllerAs: 'vm'
            })
            .state('index.recipe-add', {
                url: "/recipes/add",
                templateUrl: 'app/components/recipe/recipe-add.html',
                controller: 'AddRecipeController',
                controllerAs: 'vm'
            })
            .state('index.recipe-edit', {
                url: "/recipes/:recipeId/edit",
                templateUrl: 'app/components/recipe/recipe-edit.html',
                controller: 'EditRecipeController',
                controllerAs: 'vm'
            })
            .state('index.recipe-details', {
                url: "/recipes/:recipeId",
                templateUrl: 'app/components/recipe/recipe-details.html',
                controller: 'DetailsRecipeController',
                controllerAs: 'vm',
            });
    }
})();