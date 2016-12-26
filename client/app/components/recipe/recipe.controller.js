(function () {
    angular.module('app.recipe')
        .controller('RecipeController', RecipeController);
    RecipeController.$inject = ['RecipeService', 'toastr'];
    function RecipeController(RecipeService, toastr) {
        var vm = this;
        vm.recipe = [];
        RecipeService.listAllRecipes().then(
            function (res) {
                vm.recipe = res;
            },
            function (err) {
                 toastr.error(err.message,'Lỗi!')
            }
        )
    };
})();