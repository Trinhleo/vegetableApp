(function () {
    angular.module('app.device-node')
        .config(DeviceNodeRoutes);
    DeviceNodeRoutes.$inject = ['$stateProvider'];
    function DeviceNodeRoutes($stateProvider) {
        $stateProvider
            .state('index.device-node', {
                url: "/device-nodes",
                templateUrl: 'app/components/device-node/device-node.html',
                controller: 'DeviceNodeController',
                controllerAs: 'vm'
            })
            .state('index.device-node-add', {
                url: "/device-nodes/add",
                templateUrl: 'app/components/device-node/device-node-add.html',
                controller: 'AddDeviceNodeController',
                controllerAs: 'vm'
            })
            .state('index.device-node-edit', {
                url: "/device-nodes/:deviceNodeId/edit",
                templateUrl: 'app/components/device-node/device-node-edit.html',
                controller: 'EditDeviceNodeController',
                controllerAs: 'vm'
            })
            .state('index.device-node-details', {
                url: "/device-nodes/:deviceNodeId",
                templateUrl: 'app/components/device-node/device-node-details.html',
                controller: 'DetailsDeviceNodeController',
                controllerAs: 'vm'
            });
    }
})();