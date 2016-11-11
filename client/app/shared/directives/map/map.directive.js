(function () {
    angular.module('app')
        .directive('myMap', Map);
    Map.$inject = ['$rootScope', '$filter', '$timeout', 'geolocation']
    function Map($rootScope, $filter, $timeout, geolocation) {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                gardens: '=gardens',
                editable: '=editable',
                myId: '=myId',
                add: '=add'
            },
            replace: true,
            link: link
        };
        // directive link function
        function link(scope, element, attrs) {

            var map, overlay, lastinfoWindow;
            var markers = [];
            // The number of steps that each panTo action will undergo
            window.initialize = function () {
                $rootScope.isMapLoad = true;
                initMap();
            };

            if (!$rootScope.isMapLoad) {
                addMapScript();
            } else {
                initMap();
            };

            function getMyLocation() {
                // Get User's actual coordinates based on HTML5 at window load
                geolocation.getLocation().then(function (data) {

                    // Set the latitude and longitude equal to the HTML5 coordinates
                    var coords = { lat: data.coords.latitude, long: data.coords.longitude };

                    var position = new google.maps.LatLng(coords.lat, coords.long);
                    $timeout(function () {
                        map.panTo(position);
                    }, 250);
                });
            }

            // scope.$watch('myLocation', function (myLocation) {
            //     var position;
            //     if ($rootScope.isMapLoad) {
            //         position = new google.maps.LatLng(myLocation[0], myLocation[1]);
            //         map.panTo(position);
            //     }
            // });

            scope.$watch('gardens', function (gardens) {
                $timeout(function () {
                    if (scope.gardens.length > 0) {
                        setMarker(scope.gardens);
                        // try {
                        //  
                        //     var position = [lastEvent.location[1], lastEvent.location[0]];
                        // } catch (err) {
                        //     return;
                        // }
                        var lastEvent = scope.gardens[scope.gardens.length - 1];
                        try {
                            position = new google.maps.LatLng(lastEvent.location[1], lastEvent.location[0]);
                        } catch (e) {
                            position = new google.maps.LatLng(lastEvent.latitude, lastEvent.longitude);
                        };
                        map.panTo(position);
                        scope.initPosition = position;
                    } else {
                        clearMarkers();
                        getMyLocation();
                    };
                }, 200);
            }, true);


            function addMapScript() {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = "https://maps.googleapis.com/maps/api/js?callback=initialize"
                document.body.appendChild(script);
            };

            function customMarker(latlng, map, args) {
                this.latlng = latlng;
                this.args = args;
                this.setMap(map);
            };

            function controlMap(controlDiv, position, title, map) {

                // Set CSS for the reset border.
                var controlUI = document.createElement('div');
                controlUI.style.backgroundColor = '#fff';
                controlUI.style.border = '2px solid #fff';
                controlUI.style.borderRadius = '3px';
                controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
                controlUI.style.cursor = 'pointer';
                controlUI.style.marginBottom = '22px';
                controlUI.style.marginRight = '15px';
                controlUI.style.textAlign = 'center';
                controlUI.title = 'Click to back location';
                controlDiv.appendChild(controlUI);

                // Set CSS for the control interior.
                var controlText = document.createElement('div');
                controlText.style.color = 'rgb(25,25,25)';
                controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
                controlText.style.fontSize = '16px';
                controlText.style.lineHeight = '38px';
                controlText.style.paddingLeft = '5px';
                controlText.style.paddingRight = '5px';
                controlText.innerHTML = title;
                controlUI.appendChild(controlText);

                controlUI.addEventListener('click', function () {
                    if (position === 0) {
                        map.setCenter(scope.initPosition);
                    } else {
                        getMyLocation();
                    };
                });


            };

            // init the map
            function initMap() {
                //custom Marker
                // map config
                if (map === void 0) {
                    var selectedLat = scope.initLat || 10.8121052;
                    var selectedLong = scope.initLong || 106.7120805;
                    // var navHeight =  $('.nav').css('height');
                    var height = window.innerHeight;

                    window.addEventListener('load', function () {
                        height = window.innerHeight;
                    });

                    $('#map_canvas').css({ height: height });

                    var mapCanvas = document.getElementById('map_canvas');

                    var mapOptions = {
                        center: new google.maps.LatLng(selectedLat, selectedLong),
                        zoom: 10,
                        minZoom: 3,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var lastMarker;
                    map = new google.maps.Map(mapCanvas, mapOptions);
                    //get my location
                    // Create the DIV to hold the control and call the CenterControl()
                    // constructor passing in this DIV.
                    var centerControlDiv = document.createElement('div');
                    var centerControl = new controlMap(centerControlDiv, 0, 'Vị trí khởi tạo', map);

                    centerControlDiv.index = 1;
                    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

                    var rightControlDiv = document.createElement('div');

                    var rightControl = new controlMap(rightControlDiv, 1, 'Vị trí của tôi', map);

                    centerControlDiv.index = 2;
                    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(rightControlDiv);

                    google.maps.event.addListener(map, 'click', function (e) {
                        if (scope.add || scope.editable) {
                            var marker = new google.maps.Marker({
                                position: e.latLng,
                                draggable: true,
                                animation: google.maps.Animation.BOUNCE,
                                map: map
                            });

                            // When a new spot is selected, delete the old red bouncing marker
                            if (lastMarker) {
                                lastMarker.setMap(null);
                            }

                            // Create a new red bouncing marker and move to it
                            lastMarker = marker;

                            // Update Broadcasted Variable (lets the panels know to change their lat, long values)
                            $rootScope.clickLat = marker.getPosition().lat();
                            $rootScope.clickLong = marker.getPosition().lng();
                            $rootScope.$broadcast("clicked");
                            // window.setTimeout(function () {
                            //     map.panTo(marker.getPosition());
                            // }, 500);
                            marker.addListener('drag', function () {
                                $rootScope.clickLat = marker.getPosition().lat();
                                $rootScope.clickLong = marker.getPosition().lng();
                                $rootScope.$broadcast("drag");
                            })
                        };
                    });



                    customMarker.prototype = new google.maps.OverlayView();

                    customMarker.prototype.draw = function () {
                        var self = this;
                        var div = this.div;

                        if (!div) {

                            div = this.div = document.createElement('div');
                            div.id = 'marker';
                            div.style.width = '100px';
                            div.style.height = '100px';;

                            var div_pointer = document.createElement('div');
                            div_pointer.className = 'triangle';

                            var image_container = document.createElement('div');
                            image_container.className = 'image_container';

                            var img = document.createElement('img');
                            img.className = "marker_image";
                            img.src = self.args.img;

                            var name_container = document.createElement('div');
                            name_container.className = 'name_container';

                            var text = document.createElement('p');
                            text.innerText = self.args.name;
                            text.className = 'text';

                            var exit = document.createElement('div');
                            exit.className = 'exit';
                            exit.innerHTML = '<img className="exit_image" style="width:30px; height:30px;" src="https://cdn3.iconfinder.com/data/icons/security-1/512/delete-512.png">' + '</img>';
                            exit.style.display = 'none';


                            function large() {
                                div.classList.add('large');
                                div.style.width = '300px';
                                div.style.height = '300px';
                                div.style.zIndex = '1000';

                                exit.style.display = 'block';
                                exit.style.opacity = '1';
                                exit.addEventListener('mouseover', function () {
                                    exit.style.opacity = '1';
                                }, false);
                                exit.addEventListener('mouseout', function () {
                                    exit.style.opacity = '0.3';
                                }, false);

                            }

                            function close(e) {
                                var target = e.target;
                                e.stopPropagation();
                                div.classList.remove('large');
                                div.style.width = '100px';
                                div.style.height = '100px';

                                exit.style.display = 'none';
                            }

                            div.appendChild(image_container);
                            image_container.appendChild(img);
                            div.appendChild(div_pointer);
                            div.appendChild(name_container);
                            name_container.appendChild(text);
                            div.appendChild(exit);

                            name_container.onmouseover = function () { name_container.style.opacity = '0.6'; div.style.zIndex = '1000' };
                            name_container.onmouseout = function () { name_container.style.opacity = '0'; div.style.zIndex = '100' };
                            // div.addEventListener('click', large, false);
                            // exit.addEventListener('click', close, false);

                            if (typeof (self.args.marker_id) !== 'undefined') {
                                div.dataset.marker_id = self.args.marker_id;
                            }

                            google.maps.event.addDomListener(div, "click", function (event) {
                                google.maps.event.trigger(self, "click");
                            });

                            var panes = this.getPanes();

                            panes.overlayImage.appendChild(div);

                        }

                        var point = this.getProjection().fromLatLngToDivPixel(this.latlng);

                        if (point) {
                            div.style.left = (point.x - 50) + 'px';
                            div.style.top = (point.y - 125) + 'px';
                        }
                    }

                    customMarker.prototype.remove = function () {

                        if (this.div) {
                            this.div.parentNode.removeChild(this.div);
                            this.div = null;
                        }

                    }

                    customMarker.prototype.getPosition = function () {
                        return this.latlng;
                    }
                };


            };

            function toggleBounce() {
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                }
            };


            function setMarker(gardens) {
                clearMarkers();

                gardens.forEach(function (evt) {
                    var position
                    try {
                        position = new google.maps.LatLng(evt.location[1], evt.location[0]);
                    } catch (e) {
                        position = new google.maps.LatLng(evt.latitude, evt.longitude);
                    };
                    // var newLatlng = new google.maps.LatLng(evt.location[1], evt.location[0]);
                    image = evt.imgUrl;
                    name = evt.name;
                    var lastOverlay;
                    var lastIW;
                    var overlay = new customMarker(
                        position,
                        map,
                        {
                            img: image,
                            name: name
                        });
                    // var startDate = $filter('date')(evt.startTime, 'medium', '+070');
                    // var endTime = $filter('date')(evt.endTime, 'medium', '+070')
                    var description = evt.description;
                    var eventHostId = evt.userHost;
                    var hostProfileLink = '#/users/' + evt.userHost._id;
                    var detailsLink = '#/gardens/' + evt._id;
                    var editLink = detailsLink.concat('/edit');
                    var address = evt.address
                    var contentString = '<div id="iw-container"><div class="iw-title"> <a style="color:#f5f5f5" href="' + detailsLink + '">' + name + '</a></div>'
                        + '<div class="iw-content">'
                        + '</strong></h5>'
                        + '<h5>Start Time: <strong style="color: red">' + startTime + '</strong></h5>'
                        + '<h5>End Time: <strong style="color: red">' + endTime + '</strong></h5>'
                        + '<h5>Address: <strong>' + address + '</strong></h5>'
                        // + '<a href="' + detailsLink + '"><button class="btn btn-info">Event Details</button></a><br><br>'
                        // + '<img style="height:200px; width:400px" src="' + evt.imgUrl + '" />'
                        + '<hr>'
                        + '<h5>Hosted by:<a href="' + hostProfileLink + '"> <img style="height:36px; width:36px; border-radius:50%" src="' + evt.userHost.profileImageURL + '" /> <strong style ="color: #000099">' + evt.userHost.firstName + ' ' + evt.userHost.lastName
                        + '</a></div>'
                        + '</strong></h5>'
                        + '<div class="iw-bottom-gradient"></div>'
                        + '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString,
                        maxWidth: 400,
                        maxHeight: 400,
                        pixelOffset: new google.maps.Size(-45, -117)
                    });

                    google.maps.event.addListener(infowindow, 'domready', function () {

                        // Reference to the DIV that wraps the bottom of infowindow
                        var iwOuter = $('.gm-style-iw');

                        /* Since this div is in a position prior to .gm-div style-iw.
                         * We use jQuery and create a iwBackground variable,
                         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
                        */
                        var iwBackground = iwOuter.prev();

                        // Removes background shadow DIV
                        iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

                        // Removes white background DIV
                        iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

                        // Moves the infowindow 115px to the right.
                        iwOuter.parent().parent().css({ left: '115px' });

                        // Moves the shadow of the arrow 76px to the left margin.
                        iwBackground.children(':nth-child(1)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

                        // Moves the arrow 76px to the left margin.
                        iwBackground.children(':nth-child(3)').attr('style', function (i, s) { return s + 'left: 76px !important;' });

                        // Changes the desired tail shadow color.
                        iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

                        // Reference to the div that groups the close button elements.
                        var iwCloseBtn = iwOuter.next();

                        // Apply the desired effect to the close button
                        iwCloseBtn.css({ opacity: '1', right: '38px', top: '3px', border: '7px solid #48b5e9', 'border-radius': '13px', 'box-shadow': '0 0 5px #3990B9' });

                        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
                        if ($('.iw-content').height() < 140) {
                            $('.iw-bottom-gradient').css({ display: 'none' });
                        }

                        // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
                        iwCloseBtn.mouseout(function () {
                            $(this).css({ opacity: '1' });
                        });
                    });

                    overlay.addListener('click', function () {
                        if (lastinfoWindow !== void 0) {
                            lastinfoWindow.close();
                        };
                        infowindow.open(map, overlay);
                        lastinfoWindow = infowindow;

                        window.setTimeout(function () {
                            map.panTo(overlay.getPosition());
                        }, 500);

                    });
                    markers.push(overlay);
                });
            };

            function clearMarkers() {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];
            };
        };
    };
})();