(function () {
    angular.module('app.garden')
        .controller('EditGardenController', EditGardenController);

    EditGardenController.$inject = ['$state', '$localStorage', '$rootScope', '$scope', 'GardenService', 'ProductionItemService', 'DeviceNodeService', '$stateParams', 'FileUploader', 'appConfigs', '$window', '$timeout', 'toastr'];

    function EditGardenController($state, $localStorage, $rootScope, $scope, GardenService, ProductionItemService, DeviceNodeService, $stateParams, FileUploader, appConfigs, $window, $timeout, toastr) {
        var vm = this;
        vm.formData = {};
        vm.garden = {};
        vm.gardens = [];
        vm.productionItem = [];
        vm.deviceNode = [];
        vm.selected = [];
        vm.toggle = toggle;
        vm.toggleAll = toggleAll;
        vm.exists = exists;
        vm.contentLoad = false;
        vm.updateGarden = updateGarden;
        vm.vegetableCategory = [];
        vm.formChange = false;
        getGarden();
        setMapSize();
        $(window).resize(function () {
            setMapSize();
        });

        $rootScope.$on("clicked", function () {

            // Run the gservice functions associated with identifying coordinates
            $scope.$apply(function () {
                vm.formData.latitude = parseFloat($rootScope.clickLat);
                vm.formData.longitude = parseFloat($rootScope.clickLong);
                console.log(vm.clickLat);
            });
        });
        $rootScope.$on("drag", function () {

            // Run the gservice functions associated with identifying coordinates
            $scope.$apply(function () {
                vm.formData.latitude = parseFloat($rootScope.clickLat).toFixed(3);
                vm.formData.longitude = parseFloat($rootScope.clickLong).toFixed(3);
            });
        });

        function setMapSize() {
            var height = $('#edit-form').height();
            $('#map_canvas').height(height);
        }
        function getGarden() {
            GardenService.getGarden($stateParams.gardenId).then(
                function (res) {
                    var gd = res;
                    vm.isMyGarden = $localStorage.userInfo._id && $localStorage.userInfo._id === gd.user._id ? true : false;
                    vm.initLocation = gd.location;
                    vm.garden = gd;
                    vm.formData = gd;
                    vm.formData.latitude = gd.location[1];
                    vm.formData.longitude = gd.location[0];
                    angular.forEach(vm.formData.productionItem, function (selected) {
                        vm.selected.push(selected._id);
                    })
                    // vm.room = evt;
                    vm.gardens.push(gd);
                    vm.contentLoad = true
                    setMapSize();
                    getProductionItem();
                    getDeviceNode();
                },
                function (err) {
                    toastr.error(err.errMsg, 'Lỗi')
                    $state.go('index.garden');
                }
            );
        }

        function getProductionItem() {
            ProductionItemService.listAllProductionItems().then(
                function (res) {
                    vm.productionItem = res;
                    getProductionItemCategory(vm.productionItem);
                },
                function (err) {
                    toastr.error(err, 'Lỗi');
                }
            );
        };


        function getDeviceNode() {
            DeviceNodeService.listAllDeviceNodes().then(
                function (res) {
                    vm.deviceNode = res
                },
                function (err) {
                    toastr.error(err, 'Lỗi');
                }
            )
        };

        function updateGarden() {
            vm.formData.productionItem = vm.selected;
            GardenService.updateGarden(vm.formData).then(
                function (res) {
                    toastr.success("Cập nhật vườn thành công", "Thành công");
                    $state.go('index.garden-details', {
                        gardenId: vm.formData._id
                    })
                },
                function (err) {
                    toastr.error(err.errMsg, "Lỗi");
                }
            )
        };

        function toggle(item) {
            var idx = vm.selected.indexOf(item._id);
            if (idx > -1) {
                vm.selected.splice(idx, 1);
            }
            else {
                vm.selected.push(item._id)
            }
            vm.formChange = true;
        };

        function getProductionItemCategory(vegetable) {
            for (var x in vegetable) {
                vm.vegetableCategory.push(vegetable[x]._id);
            }
        }
        //check handle handle
        function exists(item) {
            return vm.selected.indexOf(item._id) > -1;
        };

        function isIndeterminate() {
            return (vm.selected.length !== 0 &&
                vm.selected.length !== vm.vegetableCategory.length);
        };
        function isChecked() {
            return vm.selected.length === vm.vegetableCategory.length;
        }
        function toggleAll() {
            if (vm.selected.length === vm.vegetableCategory.length) {
                vm.selected = [];
                console.log(vm.selected);
            } else if (vm.selected.length === 0 || vm.selected.length > 0) {
                vm.selected = vm.vegetableCategory.slice(0);
                console.log(vm.selected);
            }
            vm.formChange = true;
        };
    };
})();
