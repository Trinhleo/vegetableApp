(function () {
    angular.module('app.season')
        .controller('EditSeasonController', EditSeasonController);
    EditSeasonController.$inject = ['SeasonService', '$stateParams', '$state', '$rootScope', 'toastr'];
    function EditSeasonController(SeasonService, $stateParams, $state, $rootScope, toastr) {
        vm = this;
        vm.season = {};
        vm.formChange = false;
        vm.updateSeason = updateSeason;
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

    };
})();