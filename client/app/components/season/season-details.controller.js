(function () {
    angular.module('app.season')
        .controller('DetailsSeasonController', DetailsSeasonController);
    DetailsSeasonController.$inject = ['SeasonService', 'seasonDetails', 'taskCats', 'tasks', 'GardenService', '$stateParams', '$state', 'toastr', '$timeout', '$rootScope', '$localStorage'];
    function DetailsSeasonController(SeasonService, seasonDetails, taskCats, tasks, GardenService, $stateParams, $state, toastr, $timeout, $rootScope, $localStorage) {
        vm = this;
        vm.gardenId = $stateParams.gardenId;
        vm.season = seasonDetails;
        vm.taskCats = taskCats;
        vm.tasks = tasks;
        vm.addedTasks= []
        vm.garden = $rootScope.garden || {};
        vm.remove = remove;
        vm.chartData = [];
        vm.temp = [];
        vm.hud = [];
        vm.time = [];
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
        //chart 2
        // Create a timer
        // var start = +new Date();

        // // Create the chart

        // $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=large-dataset.json&callback=?', function (data) {

        //     // Create a timer
        //     var start = +new Date();

        //     // Create the chart
        //     Highcharts.stockChart('container2', {
        //         chart: {
        //             events: {
        //                 load: function () {
        //                     this.setTitle(null, {
        //                         text: 'Built chart in ' + (new Date() - start) + 'ms'
        //                     });
        //                 }
        //             },
        //             zoomType: 'x'
        //         },

        //         rangeSelector: {

        //             buttons: [{
        //                 type: 'day',
        //                 count: 3,
        //                 text: '3d'
        //             }, {
        //                 type: 'week',
        //                 count: 1,
        //                 text: '1w'
        //             }, {
        //                 type: 'month',
        //                 count: 1,
        //                 text: '1m'
        //             }, {
        //                 type: 'month',
        //                 count: 6,
        //                 text: '6m'
        //             }, {
        //                 type: 'year',
        //                 count: 1,
        //                 text: '1y'
        //             }, {
        //                 type: 'all',
        //                 text: 'All'
        //             }],
        //             selected: 3
        //         },

        //         yAxis: {
        //             title: {
        //                 text: 'Temperature (°C)'
        //             }
        //         },

        //         title: {
        //             text: 'Hourly temperatures in Vik i Sogn, Norway, 2009-2015'
        //         },

        //         subtitle: {
        //             text: 'Built chart in ...' // dummy text to reserve space for dynamic subtitle
        //         },

        //         series: [{
        //             name: 'Temperature',
        //             data: data.data,
        //             pointStart: data.pointStart,
        //             pointInterval: data.pointInterval,
        //             tooltip: {
        //                 valueDecimals: 1,
        //                 valueSuffix: '°C'
        //             }
        //         }]

        //     });
        // });


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