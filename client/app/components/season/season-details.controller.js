(function () {
    angular.module('app.season')
        .controller('DetailsSeasonController', DetailsSeasonController);
    DetailsSeasonController.$inject = ['SeasonService', '$stateParams', '$state', 'toastr', '$rootScope'];
    function DetailsSeasonController(SeasonService, $stateParams, $state, toastr, $rootScope) {
        vm = this;
        vm.season = {};
        loadSeason();
        function loadSeason() {
            SeasonService.getSeason($stateParams.seasonId).then(
                function (res) {
                    vm.season = res;
                    $rootScope.seasonId = vm.season._id
                },
                function (err) {
                    toastr.error(err, 'Lỗi');
                }
            )
        };
    };
})();