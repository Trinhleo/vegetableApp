(function () {
    'use strict';
    angular
        .module('app')
        .directive('proTable', proTableDirective);
    function proTableDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: './app/shared/directives/pro-table/pro-table.html',
            scope: {
                proTable: '='
            },
            controller: proTableController,
            controllerAs: 'vm'
        };
        return directive;
    }
    proTableController.$inject = ['$scope'];

    function proTableController($scope) {
        var vm = this;
        vm.option = $scope.proTable;
        init();

        $(document).ready(function () {
            tableResponsive();
        })

        $(window).resize(function () {
            tableResponsive();
        });

        function tableResponsive() {
            var table = $('.pro-table');
            if ($(window).innerWidth() < 1024) {
                table.addClass('table-responsive');
            } else {
                table.removeClass('table-responsive');
            }

        }
        function init() {
            $scope.$watch('proTable', function (value) {
                vm.option = value;
                vm.option.header = value.header;
                vm.option.body = value.body;
                vm.pagination = value.pagination;
                tableResponsive();
            }, true);
        }
    }

})();
