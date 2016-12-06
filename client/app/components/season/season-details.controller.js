(function () {
    angular.module('app.season')
        .controller('DetailsSeasonController', DetailsSeasonController);
    DetailsSeasonController.$inject = ['$scope', 'SeasonService', 'TaskService', 'seasonDetails', 'taskCats', 'tasks', 'GardenService', '$stateParams', '$state', 'toastr', '$timeout', '$rootScope', '$localStorage'];
    function DetailsSeasonController($scope, SeasonService, TaskService, seasonDetails, taskCats, tasks, GardenService, $stateParams, $state, toastr, $timeout, $rootScope, $localStorage) {
        var vm = this;
        vm.gardenId = $stateParams.gardenId;
        vm.season = seasonDetails;
        vm.taskCats = taskCats;
        vm.tasks = tasks;
        vm.task = {};
        vm.task.type = taskCats[0]._id;
        vm.addedTasks = []
        vm.garden = $rootScope.garden || {};
        vm.remove = remove;
        vm.chartData = [];
        vm.temp = [];
        vm.hud = [];
        vm.time = [];
        vm.addTask = addTask;
        var chart;
        var chart2;
        vm.socket = io.connect('http://localhost:3000/device-node');
        vm.socket.on('loadHistorydeviceNodeData', function (data) {
            angular.forEach(data, function (d) {
                vm.temp.push([d.created, d.temperature]);
                vm.hud.push([d.created, d.humidity]);
            })
            vm.dataLoad = true;
        });

        Highcharts.setOptions({
            global: {
                useUTC: false
            }
        });

        // Create the chart
        chart1 = Highcharts.stockChart('container', {
            chart: {
                events: {
                    load: function () {
                        vm.socket.on('deviceNodeData', function (data) {
                            $timeout(function () {
                                // vm.temp.push({
                                //     created: data.created,
                                //     data: data.temperature
                                // });
                                // vm.hud.push({
                                //     created: data.created,
                                //     data: data.humidity
                                // });
                                var series1 = chart1.series[0];
                                var series2 = chart1.series[1];
                                var x1 = (new Date()).getTime();
                                var y1 = data.temperature;
                                var y2 = data.humidity
                                series1.addPoint([x1, y1], true, true);
                                series2.addPoint([x1, y2], true, true);
                            });
                        });
                    }
                }
            },

            // rangeSelector: {
            //     buttons: [{
            //         count: 1,
            //         type: 'minute',
            //         text: '1M'
            //     }, {
            //         count: 5,
            //         type: 'minute',
            //         text: '5M'
            //     }, {
            //         type: 'all',
            //         text: 'All'
            //     }],
            //     inputEnabled: false,
            //     selected: 0
            // },

            exporting: {
                enabled: false
            },

            title: {
                text: 'Điều kiện môi trường'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'Nhiệt độ',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: false

            }, { // Secondary yAxis
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                title: {
                    text: 'Độ ẩm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            series: [{
                name: 'Nhiệt độ',
                yAxis: 0,
                tooltip: {
                    valueSuffix: ' °C'
                },
                data: (function () {
                    // generate some points to render before real samples arrive from feed
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    // 20 samples, starting 19 ms ago up to present time when feed starts plotting
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + (i * 1000),
                            y: 0
                        });
                    }
                    return data;
                })()
            },
            {
                name: 'Độ ẩm',
                tooltip: {
                    valueSuffix: ' %'
                },
                data: (function () {
                    // generate some points to render before real samples arrive from feed
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    // 20 samples, starting 19 ms ago up to present time when feed starts plotting
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + (i * 1000),
                            y: 0
                        });
                    }
                    return data;
                })(),
                yAxis: 1
            }]
        });
        chart2 = Highcharts.stockChart('container', {
            chart: {
                events: {
                    load: function () {

                        var series1 = chart1.series[0];
                        var series2 = chart1.series[1];
                        var x1 = (new Date()).getTime();
                        var y1 = data.temperature;
                        var y2 = data.humidity
                        series1.addPoint([x1, y1], true, true);
                        series2.addPoint([x1, y2], true, true);
                    }
                }
            },

            // rangeSelector: {
            //     buttons: [{
            //         count: 1,
            //         type: 'minute',
            //         text: '1M'
            //     }, {
            //         count: 5,
            //         type: 'minute',
            //         text: '5M'
            //     }, {
            //         type: 'all',
            //         text: 'All'
            //     }],
            //     inputEnabled: false,
            //     selected: 0
            // },

            exporting: {
                enabled: false
            },

            title: {
                text: 'Điều kiện môi trường'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150,
                maxZoom: 20 * 1000
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value}°C',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                title: {
                    text: 'Nhiệt độ',
                    style: {
                        color: Highcharts.getOptions().colors[2]
                    }
                },
                opposite: false

            }, { // Secondary yAxis
                labels: {
                    format: '{value}%',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                title: {
                    text: 'Độ ẩm',
                    style: {
                        color: Highcharts.getOptions().colors[0]
                    }
                },
                opposite: true
            }],
            series: [{
                name: 'Nhiệt độ',
                yAxis: 0,
                tooltip: {
                    valueSuffix: ' °C'
                },
                data: (function () {
                    // generate some points to render before real samples arrive from feed
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    // 20 samples, starting 19 ms ago up to present time when feed starts plotting
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + (i * 1000),
                            y: 0
                        });
                    }
                    return data;
                })()
            },
            {
                name: 'Độ ẩm',
                tooltip: {
                    valueSuffix: ' %'
                },
                data: (function () {
                    // generate some points to render before real samples arrive from feed
                    var data = [],
                        time = (new Date()).getTime(),
                        i;
                    // 20 samples, starting 19 ms ago up to present time when feed starts plotting
                    for (i = -19; i <= 0; i++) {
                        data.push({
                            x: time + (i * 1000),
                            y: 0
                        });
                    }
                    return data;
                })(),
                yAxis: 1
            }]
        });

        $(document).ready(function () {
            $('#taskDate').datetimepicker({ format: 'DD/MM/YYYY hh:mm A' });
            $('#taskDate input').click(function (event) {
                $('#taskDate').data("DateTimePicker").show();
            });
            $('#taskDate').on('dp.change', function (e) {
                $timeout(function () {
                    vm.task.date = e.date;
                });
            });
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
        function addTask() {
            if (vm.task.date && vm.task.date !== '') {
                vm.task.season = $stateParams.seasonId;
                TaskService.createTask(vm.task).then(
                    function (res) {
                        vm.task.date = '';
                        $('#taskDate').data("DateTimePicker").date('');
                        toastr.success('Thêm tác vụ thành công!', 'Thành công!');
                        $('#close-button').click();
                    },
                    function (err) {
                        toastr.error('Thêm tác vụ thất bại!', 'Thất bại!');
                    }
                );
            }
        }
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