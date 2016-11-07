(function () {
    angular.module('app')
        .directive('myMap', Map);
    Map.$inject = ['$rootScope', '$filter', '$timeout']
    function Map($rootScope, $filter, $timeout) {
        return {
            restrict: 'E',
            template: '<div></div>',
            scope: {
                events: '=events',
                editable: '=editable',
                myId: '=myId',
                add: '=add'
            },
            replace: true,
            link: link
        };
        // directive link function
        function link(scope, element, attrs) {
            window.initialize = function () {
                $rootScope.isMapLoad = true;
                initMap();
            };

            if (!$rootScope.isMapLoad) {
                addMapScript();
            } else {
                initMap();
            };

            function addMapScript() {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = "https://maps.googleapis.com/maps/api/js?callback=initialize"
                document.body.appendChild(script);
            };


            var map, infoWindow, overlay;
            var markers = [];

            function customMarker(latlng, map, args) {
                this.latlng = latlng;
                this.args = args;
                this.setMap(map);
            }

            $timeout(function () {
                scope.$watch('events', function (events) {
                    console.log(events);
                    setMarker(events);
                }, true);
            }, 1000);

            // scope.$watch('events', function (events) {
            //     console.log(events);
            //     setMarker(events);
            // }, true);

            $timeout(function () {
                scope.$watch('myId', function (myevents) {
                    // console.log(myevents);
                    // setMarker(events);
                }, true);
            }, 500);


            // scope.$watch('clickLat', function (events) {
            //     console.log(events);
            // });

            // scope.$watch('clickLong', function (events) {
            //     console.log(events);
            // });


            // init the map
            function initMap() {
                //custom Marker
                // map config
                if (map === void 0) {
                    var selectedLat = 10.8121052;
                    var selectedLong = 106.7120805;
                    // var navHeight =  $('.nav').css('height');
                    var height = window.innerHeight;
                    window.addEventListener('load', function () {
                        height = window.innerHeight;
                    });

                    $('#map_canvas').css({ height: height });

                    var mapCanvas = document.getElementById('map_canvas');

                    var mapOptions = {
                        center: new google.maps.LatLng(selectedLat, selectedLong),
                        zoom: 13,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var lastMarker;
                    map = new google.maps.Map(mapCanvas, mapOptions);

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
                            window.setTimeout(function () {
                                map.panTo(marker.getPosition());
                            }, 500);
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
                            div.addEventListener('click', large, false);
                            exit.addEventListener('click', close, false);

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


            function setMarker(events) {
                clearMarkers();

                events.forEach(function (evt) {
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
                    var startTime = $filter('date')(evt.startTime, 'medium', '+070');
                    var endTime = $filter('date')(evt.endTime, 'medium', '+070')
                    var description = evt.description;
                    var eventHostId = evt.userHost;
                    var hostProfileLink = '#/users/' + evt.userHost._id;
                    var detailsLink = '#/events/' + evt._id;
                    var editLink = detailsLink.concat('/edit');
                    // var uploadLink = detailsLink.concat('/upload');
                    var address = evt.address
                    // var link = window.location('/gallery')
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
                        maxHeight: 400
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
                        infowindow.open(map, overlay);
                    });
                    // addMarkerWithTimeout(evt, 100, map);
                    markers.push(overlay);
                });

                // for (var i in events) {



                //     // addMarkerWithTimeout(events[i], i * 100, map);

                // };
            };

            // function addMarkerWithTimeout(event, timeout, map, draggable) {
            //     window.setTimeout(function () {
            //         var position;
            //         try {
            //             position = new google.maps.LatLng(event.location[1], event.location[0]);
            //         } catch (e) {
            //             position = new google.maps.LatLng(event.latitude, event.longitude);
            //         };
            //         var icon = {
            //             url: event.imgUrl, // url
            //             scaledSize: new google.maps.Size(200, 100), // scaled size
            //             origin: new google.maps.Point(0, 0), // origin
            //             anchor: new google.maps.Point(0, 32)
            //         };
            //         var draggable = scope.editable ? true : false;

            //         var marker = new google.maps.Marker({
            //             position: position,
            //             draggable: draggable,
            //             map: map,
            //             title: event.name,
            //             animation: google.maps.Animation.DROP,
            //             icon: icon
            //         });

            //         var myEvent = scope.myId === event.userHost ? true : false;
            //         var name = event.name;
            //         // var startTime = $filter('date')(event.startTime, 'medium', '+07');
            //         // var endTime = $filter('date')(event.endTime, 'medium', '+07');
            //         var startTime = $filter('date')(event.startTime, 'medium', '+070');
            //         var endTime = $filter('date')(event.endTime, 'medium', '+070')
            //         var description = event.description;
            //         var eventHostId = event.userHost;
            //         var detailsLink = '#/events/' + event._id;
            //         var editLink = detailsLink.concat('/edit');
            //         // var uploadLink = detailsLink.concat('/upload');
            //         var address = event.address
            //         // var link = window.location('/gallery')
            //         var contentString = ' <div><h3>' + name + '</h3><br>'
            //             + '<h4>Start Time: <strong>' + startTime + '</strong></h4>'
            //             + '<h4>End Time: <strong>' + endTime + '</strong></h4>'
            //             + '<h4>Address: <strong>' + address + '</strong></h4>'
            //             + '<a href="' + detailsLink + '"><button class="btn btn-info">Event Details</button></a><br><br>'
            //             + '<img style="height:200px; width:400px" src="' + event.imgUrl + '" />'
            //             + '</div>';

            //         var rightClickInfoWidow = '<a href="' + detailsLink + '"><button class="btn btn-info">Event Details</button></a>'
            //             + '<a href="' + editLink + '"><button class="btn btn-warning">Edit Event</button></a>'
            //             // + '<a href="' + uploadLink + '"><button class="btn btn-success">Upload Event Image</button></a><br><br>'
            //             + '</div>';
            //         var infowindowRightClick = new google.maps.InfoWindow({
            //             content: rightClickInfoWidow
            //         });

            //         if (infoWindow !== void 0) {
            //             infoWindow.close();
            //         };
            //         if (myEvent) {
            //             var contentStringMyEvent = ' <div><h3>' + name + '</h3><br>'
            //                 + '<h4>Start Time: <strong>' + startTime + '</strong></h4>'
            //                 + '<h4>End Time: <strong>' + endTime + '</strong></h4>'
            //                 + '<h4>Address: <strong>' + address + '</strong></h4>'
            //                 + '<a href="' + detailsLink + '"><button class="btn btn-info">Event Details</button></a>'
            //                 + '<a href="' + editLink + '"><button class="btn btn-warning">Edit Event</button></a><br><br>'
            //                 // + '<a href="' + uploadLink + '"><button class="btn btn-success">Upload Event Image</button></a><br><br>'
            //                 + '<img style="height:200px; width:400px" src="' + event.imgUrl + '" />'
            //                 + '</div>';

            //             var infowindow = new google.maps.InfoWindow({
            //                 content: contentStringMyEvent
            //             });

            //             marker.addListener('rightclick', function () {


            //                 infowindow.close();
            //                 infowindowRightClick.open(map, marker);
            //                 console.log('myevent');
            //             });
            //         } else {
            //             var infowindow = new google.maps.InfoWindow({
            //                 content: contentString
            //             });
            //         };

            //         marker.addListener('click', function () {
            //             infowindowRightClick.close();
            //             infowindow.open(map, marker);
            //             $rootScope.clickLat = marker.getPosition().lat();
            //             $rootScope.clickLong = marker.getPosition().lng();
            //             $rootScope.$broadcast("clicked");

            //         });
            //         marker.addListener('drag', function () {
            //             infowindow.open(map, marker);
            //             $rootScope.clickLat = marker.getPosition().lat();
            //             $rootScope.clickLong = marker.getPosition().lng();
            //             $rootScope.$broadcast("drag");

            //         });

            //         // var newLatlng = new google.maps.LatLng(marker.Lat, marker.Lng);
            //         // // image = marker.url.imgUrl;
            //         // name = marker.title;

            //         // var overlay = new customMarker(
            //         //     newLatlng,
            //         //     map,
            //         //     {
            //         //         img: icon.url,
            //         //         name: name,
            //         //         marker_id: '123',
            //         //         colour: 'Red'
            //         //     });

            //         markers.push(marker);
            //     }, timeout);
            // }

            function clearMarkers() {
                for (var i = 0; i < markers.length; i++) {
                    markers[i].setMap(null);
                }
                markers = [];
            };
        };
    };
})();