(function () {
    angular.module('app.recipe')
        .controller('AddRecipeController', AddRecipeController);

    AddRecipeController.$inject = ['RecipeService', '$state', 'toastr'];
    function AddRecipeController(RecipeService, $state, toastr) {
        var vm = this;
        vm.formData = {
            name: "",
            description: ""
        };
        vm.addRecipe = addRecipe;
        function addRecipe() {
            RecipeService.createRecipe(vm.formData).then(
                function (res) {
                    vm.formData = {
                        name: "",
                        description: ""
                    }
                    toastr.success('Thêm công thức sản xuất thành công', 'Thành công!')
                },
                function (err) {
                    toastr.error(err.message, 'Lỗi');
                }
            )
        }
    };
})();