(function () {
    angular.module('app.product')
        .controller('ProductController', ProductController);
    ProductController.$inject = ['products', '$stateParams', 'ProductService', 'SeasonService', 'GardenService', 'toastr', '$filter'];
    function ProductController(products, $stateParams, ProductService, SeasonService, GardenService, toastr, $filter) {
        var vm = this;
        vm.products = products;
        vm.pagedItems = [];
        vm.itemsPerPage = 5;
        vm.currentPage = 1;
        vm.figureOutItemsToDisplay = figureOutItemsToDisplay;
        buildPager();
        function buildPager() {
            figureOutItemsToDisplay();
        };
        function figureOutItemsToDisplay() {
            vm.filteredItems = $filter('filter')(vm.products, {
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