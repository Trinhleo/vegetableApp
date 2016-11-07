
(function () {
    angular.module('app')
        .directive('slider', Slider);
    Slider.$inject = ['$timeout'];

    function Slider($timeout) {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                images: '=images'
            },
            link: linkFn,
            templateUrl: './app/shared/directives/slider/slider.directive.html'
        };

        function linkFn(scope, elem, attrs) {

            var timer;

            scope.currentIndex = 0;
            scope.next = next;
            scope.prev = prev;

            function next() {
                scope.currentIndex < scope.images.length - 1 ? scope.currentIndex++ : scope.currentIndex = 0;
            };

            function prev() {
                scope.currentIndex > 0 ? scope.currentIndex-- : scope.currentIndex = scope.images.length - 1;
            };

            scope.$watch('currentIndex', function () {
                if (scope.images.length !== 0) {
                    scope.images.forEach(function (image) {
                        image.visible = false;
                    });
                    scope.images[scope.currentIndex].visible = true;
                };
            }, true);

            /* Start: For Automatic slideshow*/

            function sliderFunc() {
                timer = $timeout(function () {
                    scope.next();
                    timer = $timeout(sliderFunc, 3000);
                }, 3000);
            };

            sliderFunc();

            scope.$on('$destroy', function () {
                $timeout.cancel(timer);
            });

            /* End : For Automatic slideshow*/

        };
    };
})()
