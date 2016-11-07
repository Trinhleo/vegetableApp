(function () {
	'use strict';
	angular.module('app')
		.directive('slideShow', SlideShow);

	SlideShow.$inject = ['$interval', '$timeout'];

	function SlideShow($interval, $timeout) {
		return {
			restrict: 'E',
			scope: {
				images: "=images"
			},
			templateUrl: './app/shared/directives/slide-show.directive.html',
			link: linkFn
		};

		function linkFn(scope) {
			//Set your interval time. 4000 = 4 seconds
			$timeout(function () {
				scope.$watch('images', function (images) {

					startSlider();
					console.log(images);

				}, true);
			}, 1000);

			scope.setTime = 4000;

			// scope.images = [{
			// 	src: 'img/fader-images/1.png',
			// 	alt: 'The Beach'
			// }, {
			// 	src: 'img/fader-images/2.png',
			// 	alt: 'The Beach'
			// }, {
			// 	src: 'img/fader-images/3.png',
			// 	alt: 'The Beach'
			// }, {
			// 	src: 'img/fader-images/4.png',
			// 	alt: 'The Beach'
			// }, {
			// 	src: 'img/fader-images/5.png',
			// 	alt: 'The Beach'
			// }, {
			// 	src: 'img/fader-images/6.png',
			// 	alt: 'The Beach'
			// }];

			//Pagination dots - gets number of images
			scope.numberOfImages = scope.images.length;


			//Pagination - click on dots and change image
			scope.selectedImage = 0;

			//Slideshow controls
			scope.dots = dots;
			scope.sliderBack = sliderBack;
			scope.sliderForward = sliderForward;
			scope.setSelected = setSelected;
			scope.autoSlider = autoSlider;
			scope.stopSlider = stopSlider;
			scope.toggleStartStop = toggleStartStop;
			scope.startSlider = startSlider;
			scope.show = show;

			function dots(num) {
				return new Array(num);
			};
			function setSelected(idx) {
				stopSlider();
				scope.selectedImage = idx;
			};
			function sliderBack() {
				stopSlider();
				scope.selectedImage === 0 ? scope.selectedImage = scope.numberOfImages - 1 : scope.selectedImage--;
			};

			function sliderForward() {
				stopSlider();
				autoSlider();
			};

			function autoSlider() {
				scope.selectedImage < scope.numberOfImages - 1 ? scope.selectedImage++ : scope.selectedImage = 0;
			};

			function stopSlider() {
				$interval.cancel(scope.intervalPromise);
				scope.activePause = true;
				scope.activeStart = false;
			};

			function toggleStartStop() {
				if (scope.activeStart) {
					stopSlider();
				} else {
					startSlider();
				}
			};

			function startSlider() {
				scope.intervalPromise = $interval(scope.autoSlider, scope.setTime);
				scope.activeStart = true;
				scope.activePause = false;
			};

			function show(idx) {
				if (scope.selectedImage == idx) {
					return "show";
				}
			};
		};
	};
})();
