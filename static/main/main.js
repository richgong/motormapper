_.templateSettings.variable = "rc";

var resultTemplate = _.template($( "script.result" ).html());

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// Google Maps Scripts
// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', initMap);

var ZIP_CODE = 94101, DISTANCE = 15;

function initMap() {


    $.get('https://api.instamotor.com/v2/mp/vehicles',
        {
            zipcode: ZIP_CODE,
            distance: DISTANCE
        },
        function(cars, status) {

            var length = cars.length;
            var index = 0;
            var process = function() {
                var next = index + 30;
                for (; index < length && index < next; index++) {
                    new Point(cars[index]);
                }
                if (index < length)
                    setTimeout(process, 1);
                else
                    Point.renderMap();
            };
            process();
            console.log(status);
        });

    var mapOptions = {
        zoom: 15, // How zoomed in you want the map to start at (always required)
        center: new google.maps.LatLng(40.6700, -73.9400), // New York
        scrollwheel: false
    };
    // Create the Google Map using out element and options defined above
    Point.map = new google.maps.Map($('#map')[0], mapOptions);

    /*// Custom Map Marker Icon - Customize the map-marker.png file to customize your icon
     var image = 'img/map-marker.png';
     var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
     var beachMarker = new google.maps.Marker({
     position: myLatLng,
     map: map,
     icon: image
     });*/


    /*Point.lookupLocation(ZIP_CODE, function (err, ll) {
     Point.ll = ll;
     Point.renderMap();
     });*/

}

/*$("input[name=distance]:radio").change(function () {
 //if ($('input[name=location]').val())
 $('form[name=search]').submit();
 });
 */
