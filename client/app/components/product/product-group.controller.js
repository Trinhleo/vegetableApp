(function () {
    angular.module('app.product')
        .controller('ProductGroupController', ProductGroupController);
    ProductGroupController.$inject = ['productGroups', '$filter'];
    function ProductGroupController(productGroups, $filter) {
        var vm = this;
        vm.productGroups = productGroups;
        vm.buildPager = buildPager;
        vm.pageChanged = pageChanged;
        vm.pagedItems = [];
        vm.itemsPerPage = 5;
        vm.currentPage = 1;
        vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
        buildPager();
        function buildPager() {
            figureOutItemsToDisplay();
        };
        function figureOutItemsToDisplay() {
            vm.filteredItems = $filter('filter')(vm.productGroups, {
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