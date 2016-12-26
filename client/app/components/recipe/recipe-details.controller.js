(function () {
    angular.module('app.recipe')
        .controller('DetailsRecipeController', DetailsRecipeController);

    DetailsRecipeController.$inject = ['RecipeService','$state', '$stateParams', 'toastr'];
    function DetailsRecipeController(RecipeService,$state, $stateParams, toastr) {
        vm = this;
        vm.recipe = {};
        vm.remove = remove;
        getRecipe();
        function getRecipe() {
            RecipeService.getRecipe($stateParams.recipeId).then(
                function (res) {
                    vm.recipe = res;
                },
                function (err) {
                    toastr.error(err.message, "Lỗi")
                }
            );
        };
        function remove() {
            if (confirm('Bạn có thực sự muốn xóa không?')) {
                RecipeService.deleteRecipe($stateParams.RecipeId).then(
                    function (res) {
                        toastr.success("Xóa thành công", 'Thành công!');
                        $state.go('index.recipe');
                    },
                    function (err) {
                        toastr.error("Xóa thất bại", 'Thất bại!')
                    }
                )
            }
        }
    };
})();