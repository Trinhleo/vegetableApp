(function () {
    angular.module('app.recipe')
        .controller('AddRecipeController', AddRecipeController);

    AddRecipeController.$inject = ['$timeout','RecipeService', 'FertilizerService', 'VarietyService', '$state', 'toastr'];
    function AddRecipeController($timeout,RecipeService, FertilizerService, VarietyService, $state, toastr) {
        var vm = this;
        vm.formData = {
            variety: "",
            time: 0,
            wateringRate: 0,
            productRate: 0,
            name: "",
            description: ""
        };
        vm.addRecipe = addRecipe;
        vm.varieties = [];
        vm.fertilizers = [];
        vm.addedFertilizers = [];
        vm.titleFertilizer = {
            'name': 'name',
            'description': 'description'
        }
        vm.titleListFertilizer = {
            name: 'name',
            description: 'description'
        };
        vm.addFertilizer = addFertilizer;
        vm.removeFertilizer = removeFertilizer;
        vm.cancel = cancel;
        $(document).ready(function () {
            $('#fertilizer').select2({
                placeholder: "Chọn phân bón",
                allowClear: true,
                language: 'vi'
            });
            $('#fertilizer').on('change', function () {
                $timeout(function () {
                    vm.formData.fertilizer = $('#fertilizer').val()
                });
            });
            $('#variety').select2({
                placeholder: "Chọn giống",
                allowClear: true,
                language: 'vi'
            });
            $('#variety').on('change', function () {
                $timeout(function () {
                    vm.formData.variety = $('#variety').val()
                });
            })
        })
        getFertilizer();
        getVarieties();
        function getFertilizer() {
            FertilizerService.listAllFertilizers().then(
                function (res) {
                    vm.fertilizers = res;
                },
                function (err) {
                    toastr.error(err.errMsg || 'Lỗi', "Lỗi");
                });
        }
        function getVarieties() {
            VarietyService.listAllVarieties().then(
                function (res) {
                    vm.varieties = res
                },
                function (err) {
                    toastr.error(err.errMsg || 'Lỗi', "Lỗi");
                }
            )
        }
        function cancel() {
            $state.go('index.recipe');
        }
        function addRecipe() {
            RecipeService.createRecipe(vm.formData).then(
                function (res) {
                    vm.formData = {
                        name: "",
                        description: ""
                    }
                    $state.go('index.recipe');
                    toastr.success('Thêm công thức sản xuất thành công', 'Thành công!')
                },
                function (err) {
                    toastr.error(err.errMsg || 'Lỗi', "Lỗi");
                }
            )
        }
        function removeFertilizer(std) {
            var index = vm.addedFertilizers.indexOf(std);
            if (index > -1) {
                vm.addedFertilizers.splice(index, 1);
                vm.fertilizers.push(std);
            }
        }
        function addFertilizer(std) {
            var stdIds = [];
            angular.forEach(vm.fertilizers, function (s) {
                stdIds.push(s.id);
            });
            var index = vm.fertilizers.indexOf(std);
            var index2 = $.inArray(std.id, stdIds);
            if (index === -1) {
                vm.addedFertilizers.push(std);
                vm.fertilizers.splice(index2, 1);
            }
        }
    };
})();