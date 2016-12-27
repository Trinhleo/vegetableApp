(function () {
    angular.module('app.season')
        .controller('EditSeasonController', EditSeasonController);
    EditSeasonController.$inject = ['SeasonService', 'GardenService', '$stateParams', '$state', '$rootScope', 'toastr'];
    function EditSeasonController(SeasonService, GardenService, $stateParams, $state, $rootScope, toastr) {
        vm = this;
        vm.gardenId = $stateParams.gardenId;
        vm.garden = $rootScope.garden || {};
        vm.season = {};
        vm.formChange = false;
        vm.updateSeason = updateSeason;
        vm.goBack = goBack;
        vm.recipes = [];
        vm.varieties = [];
        vm.getRecipes = getRecipes;
        vm.getVarieties = getVarieties;
        if ($.isEmptyObject(vm.garden)) {
            GardenService.getGarden(vm.gardenId).then(
                function (res) {
                    vm.garden = res;
                    vm.garden.isOwner = $localStorage.userInfo && $localStorage.userInfo._id === res.user._id ? true : false;
                    $rootScope.garden = vm.garden;
                    console.log(vm.garden.isOwner);
                },
                function (err) {
                    toatr.error(err.errMsg, 'Lỗi')
                }
            )
        } function getVarieties(piId) {
            ProductionItemService.getVariety(piId).then(
                function (res) {
                    vm.varieties = res;
                },
                function (err) {
                    toastr.error(err, 'Lỗi!')
                })
        }

        function getRecipes(vaId) {
            VarietyService.listRecipe(vaId).then(
                function (res) {
                    vm.recipes = res
                },
                function (err) {
                    toastr.error(err, 'Lỗi!')
                })
        }

        loadSeason();
        function loadSeason() {
            SeasonService.getSeason($stateParams.seasonId).then(
                function (res) {
                    vm.season = res;
                    $rootScope.seasonId = vm.season._id

                    var startDate = new Date(vm.season.startDate);
                    vm.season.startDate = startDate;
                    var endDate = new Date(vm.season.endDate);
                    vm.season.endDate = endDate;

                },
                function (err) {
                    toastr.error(err, 'Lỗi');
                }
            );
        };
        function updateSeason() {

            SeasonService.updateSeason(vm.season).then(
                function (res) {
                    toastr.success("Cập nhật mùa vụ thành công", "Thành công");
                    $state.go('index.season.details', {
                        seasonId: vm.season._id
                    })
                },
                function (err) {
                    toastr.error(err.errMsg, "Lỗi");
                }
            )
        }
        function goBack() {
            $state.go('index.season.details', {
                seasonId: $state.seasonId
            })
        }

    };
})();