(function () {
    angular.module('app.season')
        .controller('AddSeasonController', AddSeasonController);
    AddSeasonController.$inject = ['$state', 'toastr', 'SeasonService', 'GardenService', '$rootScope', '$stateParams', '$filter', '$localStorage', '$q', '$log', '$timeout'];
    function AddSeasonController($state, toastr, SeasonService, GardenService, $rootScope, $stateParams, $filter, $localStorage, $q, $log, $timeout) {
        var vm = this;
        vm.gardenId = $stateParams.gardenId;
        vm.garden = $rootScope.garden || {};
        vm.contentLoad = false;
        vm.simulateQuery = true;
        vm.isDisabled = false;
        vm.productionItems = [];
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;
        vm.seachText = '';
        vm.contentLoad = false;
        vm.createSeason = createSeason;
        vm.season = {};
        vm.dateNow = new Date();

        GardenService.getGarden(vm.gardenId).then(
            function (res) {
                vm.garden = res;
                vm.garden.isOwner = $localStorage.userInfo && $localStorage.userInfo._id === res.user._id ? true : false;
                vm.productionItems = loadAll(vm.garden);
                vm.contentLoad = true;
                $rootScope.garden = vm.garden;
                console.log(vm.garden.isOwner);
            },
            function (err) {

            }
        );


        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for productionItems... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            console.log(query)
            var results = query ? vm.productionItems.filter(createFilterFor(query)) : vm.productionItems;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve(results); }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `components` list of key/value pairs
         */

        function loadAll(production) {
            var productionItems = production.productionItem;
            console.log(productionItems);
            return productionItems.map(function (pi) {
                pi.value = pi.name.toLowerCase();
                return pi;
            });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(item) {
                return (item.value.indexOf(lowercaseQuery) === 0);
            };

        }

        // tạo mùa vụ
        function createSeason() {
            vm.season.productionItem = vm.selectedItem._id;
            vm.season.garden = vm.garden._id;
            SeasonService.createSeason(vm.season).then(
                function (res) {
                    toastr.success('Tạo mùa vụ thành công!', 'Thành công');
                    vm.selectedItem = {};
                    vm.season = {
                        name: '',
                        seedQuantity: '',
                        startDate: '',
                        endDate: ''
                    }
                    $state.go('index.season.details', {
                        seasonId: res._id
                    })
                },
                function (err) {
                    var msg = '';
                    if (err.code === 11000) {
                        msg = 'Tên vườn bị trùng'
                    } else {
                        msg = 'Lỗi hệ thống';
                    }
                    toastr.error(msg, 'Lỗi');
                });
        }
    };
})();