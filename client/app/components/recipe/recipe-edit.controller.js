(function () {
    angular.module('app.recipe')
        .controller('EditRecipeController', EditRecipeController);

    EditRecipeController.$inject = ['RecipeService', '$state', '$stateParams','toastr'];
    function EditRecipeController(RecipeService, $state, $stateParams, toastr) {
        vm = this;
        vm.recipeId = $stateParams.recipeId;
        vm.formData = {};
        vm.update = update;
        RecipeService.getRecipe(vm.recipeId).then(
            function (res) {
                vm.formData = res;
            },
            function (err) {
                toastr.error(err.message, "Lỗi")
            }
        );

        function update() {
            RecipeService.updateRecipe(vm.formData).then(
                function (res) {
                    toastr.success('Cập nhật thành công', 'Thành công');
                    $state.go('index.recipe-details', {
                        RecipeId: vm.recipeId
                    })

                },
                function (err) {
                    toastr.error(err.message, 'Lỗi')
                }
            )
        };

    };
})();