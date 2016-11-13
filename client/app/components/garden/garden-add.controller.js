(function () {
    angular.module('app.garden')
        .controller('AddGardenController', AddGardenController);

    AddGardenController.$inject = ['$state', '$localStorage', '$rootScope', '$scope', 'GardenService', 'geolocation', 'FileUploader', 'appConfigs', '$window', '$timeout', 'toastr'];

    function AddGardenController($state, $localStorage, $rootScope, $scope, GardenService, geolocation, FileUploader, appConfigs, $window, $timeout, toastr) {
        var vm = this;
        // Initializes Variables
        // ----------------------------------------------------------------------------
        var coords = {};
        var lat = 0;
        var long = 0;
        vm.clickLat = 10.350;
        vm.clickLong = 106.500;
        vm.gardenId = '';
        vm.formData = {};
        vm.endDateBeforeRender = endDateBeforeRender;
        vm.endDateOnSetTime = endDateOnSetTime;
        vm.startDateBeforeRender = startDateBeforeRender;
        vm.startDateOnSetTime = startDateOnSetTime;
        vm.garden = {};
        // Set initial coordinates to the center of the US
        // vm.formData.latitude = 10.350;
        // vm.formData.longitude = 106.500;
        vm.createGarden = createGarden;
        vm.uploader = new FileUploader({
            url: appConfigs.baseUrl.concat(appConfigs.port).concat(appConfigs.baseApiUrl).concat('gallery/images'),
            headers: {
                authorization: $localStorage.token
            },
            alias: 'myfile'
        });
        vm.uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });
        vm.uploader.onAfterAddingFile = onAfterAddingFile;
        vm.uploader.onSuccessItem = onSuccessItem;
        vm.uploader.onErrorItem = onErrorItem;
        vm.uploadGardenImage = uploadGardenImage;
        vm.cancelUpload = cancelUpload;

        this.isOpen = false;

        this.openCalendar = function (e) {
            e.prgardenDefault();
            e.stopPropagation();

            vm.isOpen = true;
        };


        getGardensLocation();

        function getGardensLocation() {
            GardenService.loadMyGardens().then(
                function (res) {
                    vm.gardens = res;

                },
                function (err) {
                    console.log(err)
                    toastr.error(err, 'Lỗi');
                });
        }


        // // Get User's actual coordinates based on HTML5 at window load
        // geolocation.getLocation().then(function (data) {

        //     // Set the latitude and longitude equal to the HTML5 coordinates
        //     var coords = { lat: data.coords.latitude, long: data.coords.longitude };

        //     vm.myLocation = [coords.long, coords.lat];

        // });



        // Get coordinates based on mouse click. When a click garden is detected....
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

        function createGarden() {

            // Grabs all of the text box fields
            var gardenData = {
                name: vm.formData.name,
                startTime: vm.formData.startTime,
                endTime: vm.formData.endTime,
                location: [vm.formData.longitude, vm.formData.latitude],
                description: vm.formData.description,
                address: vm.formData.address
            };

            GardenService.createGarden(gardenData)
                .then(function (res) {

                    // Clear form data expert location
                    vm.formData.name = "";
                    vm.formData.startTime = "";
                    vm.formData.endTime = "";
                    vm.formData.description = "";
                    vm.formData.address = "";
                    vm.garden = res;
                    getgardensLocation();
                    vm.uploadgardenImage();
                    vm.gardenId = res._id;
                }, function (err) {
                    toastr.error(err.data.message, 'Oops');
                });

        };



        function startDateOnSetTime() {
            $scope.$broadcast('start-date-changed');
        }

        function endDateOnSetTime() {
            $scope.$broadcast('end-date-changed');
        }

        function startDateBeforeRender($dates) {
            if (vm.formData.endTime) {
                var activeDate = moment(vm.formData.endTime);

                $dates.filter(function (date) {
                    return date.localDateValue() >= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            }
        }

        function endDateBeforeRender($view, $dates) {
            if (vm.formData.startTime) {
                var activeDate = moment(vm.formData.startTime).subtract(1, $view).add(1, 'minute');

                $dates.filter(function (date) {
                    return date.localDateValue() <= activeDate.valueOf()
                }).forEach(function (date) {
                    date.selectable = false;
                })
            };
        };
        // Called after the user selected a new picture file
        function onAfterAddingFile(fileItem) {
            if ($window.FileReader) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL(fileItem._file);

                fileReader.onload = function (fileReadergarden) {
                    $timeout(function () {
                        vm.imageURL = fileReadergarden.target.result;
                    }, 0);
                };
            }
        };

        // Called after the user has successfully uploaded a new picture
        function onSuccessItem(fileItem, response, status, headers) {
            // Show success message


            // Clear upload buttons
            vm.cancelUpload();
            var data = {};
            data._id = vm.gardenId;
            data.imgUrl = response.imgUrl;
            gardenService.updategarden(data).then(function (res) {
                // vm.success = "success";
                vm.garden = res;
                toastr.success("Success on create new garden!", "Create garden");
                $rootScope.$broadcast('new garden', vm.garden);
                getgardensLocation();

            },
                function (err) {
                    $rootScope.$broadcast('new garden', vm.garden);
                    toastr.error(err, "Oops!");
                });
            // $state.go('index.gallery');

        };

        // Called after the user has failed to uploaded a new picture
        function onErrorItem(fileItem, response, status, headers) {
            // Clear upload buttons
            vm.cancelUpload();

            // Show error message
            vm.error = response.message;
        };

        // Change user profile picture
        function uploadGardenImage() {
            // Clear messages
            vm.success = vm.error = null;

            // Start upload
            vm.uploader.uploadAll();
        };

        // Cancel the upload process
        function cancelUpload() {
            vm.uploader.clearQueue();
        };
    };
})();
