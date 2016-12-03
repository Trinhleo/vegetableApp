(function () {
    'use strict';
    angular
        .module('app')
        .directive('proBody', proBodyDirective);
    function proBodyDirective() {
        var directive = {
            restrict: 'EA',
            templateUrl: './app/shared/directives/pro-table/pro-body/pro-body.html',
            scope: {
                proBody: '='
            },
            controller: proBodyController,
            controllerAs: 'vm'
        };
        return directive;
    }
    proBodyController.$inject = ['$scope'];

    function proBodyController($scope) {
        var vm = this;
        var option = $scope.proBody;
        vm.contentList = option.contentList;
        vm.titleList = option.titleList;
        vm.sorting = option.sorting;
        vm.methodList = [];
        vm.actionList = option.actionList;
        vm.actionForRow = option.actionForRow;
        vm.message = option.message;
        init();

        function init() {
            $scope.$watch('proBody', function (value) {
                option = value;
                vm.contentList = option.contentList;
                vm.titleList = option.titleList;
                vm.actionList = option.actionList;
                vm.message = option.message;
                if (vm.actionList !== undefined) {
                    vm.actionList.forEach(function (element) {
                        vm.methodList.push(element.action);
                    }, this);
                }
                vm.actionForRow = option.actionForRow;
            }, true);
        }
    }

})();
