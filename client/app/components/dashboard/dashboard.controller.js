(function () {
    angular.module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$state', '$localStorage', '$rootScope', 'ProductService', 'GardenService', 'SeasonService'];

    function DashboardController($state, $localStorage, $rootScope, ProductService, GardenService, SeasonService) {
        var vm = this;
        $rootScope.user = $localStorage.user;
        $rootScope.userInfo = $localStorage.userInfo;
        vm.totalProduct = 0;
        var productChart;
        var gardenChart;
        var seasonChart;
        var userChart;
        ProductService.listProducts().then(
            function (res) {
                var total = 0;
                var data = [];
                angular.forEach(res, function (p) {
                    total += p.count || 0;
                });
                vm.totalProduct = total;
                angular.forEach(res, function (p) {
                    data.push({
                        name: p.productionItem.name,
                        y: p.count / total * 100
                    })
                })
                productChart = Highcharts.chart('productChart', {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                    },
                    title: {
                        text: 'Tỉ lệ sản phẩm'
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    credits: false,
                    plotOptions: {
                        pie: {
                            allowPointSelect: true,
                            cursor: 'pointer',
                            dataLabels: {
                                enabled: true,
                                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                                style: {
                                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                                }
                            }
                        }
                    },
                    series: [{
                        name: 'Tỉ lệ',
                        colorByPoint: true,
                        data: data
                    }]
                });
            }
        )
    }
})();
