(function () {
    angular.module('app.season')
        .controller('DetailsSeasonController', DetailsSeasonController);
    DetailsSeasonController.$inject = ['SeasonService', 'GardenService', '$stateParams', '$state', 'toastr', '$timeout', '$rootScope', '$localStorage'];
    function DetailsSeasonController(SeasonService, GardenService, $stateParams, $state, toastr, $timeout, $rootScope, $localStorage) {
        vm = this;
        vm.gardenId = $stateParams.gardenId;
        vm.season = {};
        vm.garden = $rootScope.garden || {};
        vm.remove = remove;
        vm.chartData = [];
        vm.temp = [];
        vm.hud = [];
        vm.socket = io.connect('http://localhost:3000/device-node');
        vm.socket.on('deviceNodeData', function (data) {
            $timeout(function () {
                vm.temp.push({
                    created: data.created,
                    data: data.temperature
                });
                vm.hud.push({
                    created: data.created,
                    data: data.humidity
                });
            });
        });

        $(document).ready(function () {
            var seriesOptions = [],
                seriesCounter = 0,
                names = ['Nhiệt độ', 'Độ ẩm'];
            function createChart() {

                Highcharts.stockChart('container', {

                    rangeSelector: {
                        selected: 4
                    },

                    yAxis: {
                        labels: {
                            formatter: function () {
                                return (this.value > 0 ? ' + ' : '') + this.value + '%';
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },

                    plotOptions: {
                        series: {
                            compare: 'percent',
                            showInNavigator: true
                        }
                    },

                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                        valueDecimals: 2,
                        split: true
                    },

                    series: seriesOptions
                });
            }

            seriesOptions[0] = {
                name: name,
                data: vm.temp
            }
            seriesOptions[1] = {
                name: name,
                data: vm.hud
            }

            // As we're loading the data asynchronously, we don't know what order it will arrive. So
            // we keep a counter and create the chart when all the data is loaded.
            // seriesCounter += 1;

            // if (seriesCounter === names.length) {
            createChart();
        });
        if ($.isEmptyObject(vm.garden)) {
            GardenService.getGarden(vm.gardenId).then(
                function (res) {
                    vm.garden = res;
                    vm.garden.isOwner = $localStorage.userInfo && $localStorage.userInfo._id === res.user._id ? true : false;
                    $rootScope.garden = vm.garden;
                    console.log(vm.garden.isOwner);
                },
                function (err) {
                    toastr.error(err, 'Lỗi')
                }
            )
        }
        loadSeason();
        function loadSeason() {
            SeasonService.getSeason($stateParams.seasonId).then(
                function (res) {
                    vm.season = res;
                    $rootScope.seasonId = vm.season._id
                },
                function (err) {
                    toastr.error(err, 'Lỗi');
                }
            )
        };
        function remove(season) {
            $(function () {
                $("#dialog-confirm").removeClass('hidden');
                $("#dialog-confirm").dialog({
                    resizable: false,
                    height: "auto",
                    width: 400,
                    modal: true,
                    buttons: {
                        "Đồng ý": function () {
                            $(this).dialog("close");
                            SeasonService.deleteSeason(season._id).then(
                                function (res) {
                                    toastr.success('Xóa mùa vụ thành công!', 'Thành công')
                                    loadSeasons();
                                },
                                function (err) {
                                    toastr.error(err.errMsg, 'Lỗi')
                                }
                            )
                        },
                        Hủy: function () {
                            $(this).dialog("close");
                        }
                    }
                });
            });
        }
    };
})();