(function () {
    angular.module('app.user')
        .controller('UserManageController', UserManageController);
    UserManageController.$inject = ['$filter', 'AdminService'];
    function UserManageController($filter, AdminService) {
        var vm = this;
        vm.users = [];
        vm.buildPager = buildPager;
        vm.pageChanged = pageChanged;
        vm.pagedItems = [];
        vm.itemsPerPage = 5;
        vm.currentPage = 1;
        vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
        AdminService.getAllUsers().then(
            function (res) {
                vm.users = res;
                buildPager();
            }
        );

        function buildPager() {
            figureOutItemsToDisplay();
        };
        function figureOutItemsToDisplay() {
            vm.filteredItems = $filter('filter')(vm.users, {
                $: vm.search
            });
            vm.filterLength = vm.filteredItems.length;
            var begin = ((vm.currentPage - 1) * vm.itemsPerPage);
            var end = begin + vm.itemsPerPage;
            vm.pagedItems = vm.filteredItems.slice(begin, end);
        };
        function pageChanged() {
            figureOutItemsToDisplay();
        };
    };
})();