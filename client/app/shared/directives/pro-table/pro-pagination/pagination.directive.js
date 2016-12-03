(function () {
    'use strict';
    angular
        .module('app')
        .directive('proPagination', proPaginationective);
    function proPaginationective() {
        var directive = {
            restrict: 'EA',
            templateUrl: './app/shared/directives/pro-table/pro-pagination/pagination.html',
            scope: {
                proPagination: '='
            },
            controller: paginationController,
            controllerAs: 'vm'
        };
        return directive;
    }
    paginationController.$inject = ['$scope'];

    function paginationController($scope) {
        $scope._ = _;
        var vm = this;
        vm.proPagination = $scope.proPagination;
        vm.amountRecordArray = vm.proPagination.amountRecordArray;
        vm.amountRecord = vm.amountRecordArray[0];
        vm.leftPageFunction = leftPageFunction;
        vm.inputPageChange = inputPageChange;
        vm.rightPageFunction = rightPageFunction;
        vm.currentPage = vm.proPagination.page;
        vm.totalPage = vm.proPagination.totalPage;
        vm.inputPage = vm.proPagination.page + 1;
        // 
        vm.setPage = setPage;
        vm.activeItem = [];
        vm.btnPages = [];

        vm.changeAmount = changeAmount;
        init();

        function init() {
            $scope.$watch('proPagination', function (value) {
                vm.proPagination = value;
                vm.totalPage = value.totalPage;
                vm.currentPage = value.page;
            }, true);
            initPaging();
        }

        function initPaging() {
            for (var i = 0; i < vm.totalPage; i++) {
                vm.btnPages.push(i + 1);
                vm.activeItem.push(''); // set all button none active
            }
            vm.activeItem[0] = 'active'; // set first button is active
        }

        function inputPageChange() {
            if (vm.inputPage.length !== 0 && vm.inputPage > 0 && vm.inputPage <= vm.totalPage) {

                vm.currentPage = vm.inputPage - 1;
                vm.proPagination.paging(vm.proPagination.sort, vm.currentPage, vm.proPagination.amount);
                setActive(vm.currentPage);
            }
        }

        function leftPageFunction() {
            if (vm.currentPage > 0) {

                vm.currentPage = vm.currentPage - 1;
                vm.inputPage = vm.currentPage + 1;
                setActive(vm.currentPage);
                vm.proPagination.paging(vm.proPagination.sort, vm.currentPage, vm.proPagination.amount);
            }

        }

        function rightPageFunction() {
            if (vm.currentPage < vm.proPagination.totalPage - 1) {
                vm.currentPage = vm.currentPage + 1;
                vm.inputPage = vm.currentPage + 1;
                setActive(vm.currentPage);
                vm.proPagination.paging(vm.proPagination.sort, vm.currentPage, vm.proPagination.amount);
            }

        }

        function setPage(index) {
            setActive(index);
            vm.currentPage = index;
            vm.inputPage = index + 1;
            vm.proPagination.paging(vm.proPagination.sort, vm.currentPage, vm.proPagination.amount);
        }

        function setActive(index) {
            vm.activeItem[index] = 'active';
            for (var i = 0; i < vm.activeItem.length; i++) {
                if (i !== index) {
                    vm.activeItem[i] = '';
                }
            }
        }

        function changeAmount(item) {
            vm.proPagination.amount = item;
            vm.currentPage = 0;
            vm.inputPage = 1;
            setActive(vm.currentPage);
            vm.proPagination.paging(vm.proPagination.sort, vm.currentPage, vm.proPagination.amount);
        }
    }

})();
