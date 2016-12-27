(function () {
    angular.module('app.season')
        .controller('AddSeasonController', AddSeasonController);
    AddSeasonController.$inject = ['ProductionItemService', 'VarietyService', '$scope', '$state', 'toastr', 'SeasonService', 'GardenService', '$rootScope', '$stateParams', '$filter', '$localStorage', '$q', '$log', '$timeout'];
    function AddSeasonController(ProductionItemService, VarietyService, $scope, $state, toastr, SeasonService, GardenService, $rootScope, $stateParams, $filter, $localStorage, $q, $log, $timeout) {
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
        vm.recipes = [];
        vm.varieties = [];
        vm.getRecipes = getRecipes;
        vm.getVarieties = getVarieties;
        vm.cancel = cancel;
        $(document).ready(function () {
            $('#productionItem').select2({
                placeholder: "Chọn đối tượng sản xuất",
                allowClear: true,
                language: 'vi'
            });
            $('#productionItem').on('change', function () {
                $timeout(function () {
                    vm.season.productionItem = $("#productionItem").val()
                    vm.getVarieties(vm.season.productionItem);
                });
            });
            $('#variety').select2({
                placeholder: "Chọn giống",
                allowClear: true,
                language: 'vi'
            });
            $('#variety').on('change', function () {
                $timeout(function () {
                    vm.season.variety = $("#variety").val()
                    vm.getRecipes(vm.season.variety);
                });
            });
            $('#recipe').select2({
                placeholder: "Chọn công thức sản xuất",
                allowClear: true,
                language: 'vi'
            });
            $('#recipe').on('change', function () {
                $timeout(function () {
                    vm.season.recipe = $("#recipe").val()
                });
            });
        })

        $scope.$watch(vm.season.productionItem, function (data) {
            if (data) {
                vm.season.name = data + Date.now();
            }
        }, true)
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
        function cancel() {
            $state.go('index.season.list');
        }
        function getVarieties(piId) {
            ProductionItemService.getVariety(piId).then(
                function (res) {
                    vm.varieties = res;
                },
                function (err) {
                    toastr.error(err, 'Lỗi!')
                })
        }

        function getRecipes(vaId) {
            VarietyService.listRecipe(vaId).then(
                function (res) {
                    vm.recipes = res
                },
                function (err) {
                    toastr.error(err, 'Lỗi!')
                })
        }

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
                        msg = err.errMsg;
                    }
                    toastr.error(msg, 'Lỗi');
                });
        }
    };
})();