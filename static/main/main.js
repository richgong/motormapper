_.templateSettings.variable = "rc";

var resultTemplate = _.template($( "script.result" ).html());
var statusTemplate = _.template($( "script.status" ).html());

/*function checkScroll() {
    var map = $("#map-container");
    if (map.offset().top > 50) {
        map.addClass("map-fixed");
    } else {
        map.removeClass("map-fixed");
    }
}*/

$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    checkScroll();
});


$("input[name=distance]:radio").change(function () {
  //if ($('input[name=location]').val())
  $('form[name=search]').submit();
});



//$(window).scroll(_.debounce(checkScroll, 150, true));


// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', initMap);

function radians(deg) {
    return Math.PI * deg / 180;
}

function distance(lat1, lon1, lat2, lon2) {
    lat1 = radians(lat1);
    lat2 = radians(lat2);
    lon1 = radians(lon1);
    lon2 = radians(lon2);
    var dlon = lon2 - lon1;
    var dlat = lat2 - lat1;
    var a = Math.pow(Math.sin(dlat/2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2), 2);
    a = 2 * Math.asin(Math.sqrt(a));
    return 3956 * a;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


var ZIP_CODE = 94101, DISTANCE = 15, MAKE = null, MAX_LIMIT = 50;

function initMap() {
    var params = {
        zipcode: ZIP_CODE,
        distance: DISTANCE,
        size: MAX_LIMIT
    };
    if (MAKE) {
        console.log('Make:', MAKE);
        params['q'] = MAKE;
    }

    $.get('http://api.instamotorlabs.com/v2/mp/vehicles/search',
        params,
        function(data, status) {
            console.log(data);
            var cars = data.hits.hits;
            var length = cars.length;
            Point.total_results = data.hits.total;
            if (Point.total > MAX_LIMIT) {
                Point.limit_exceeded = true;
            }
            for (var index = 0; index < length; index++) {
                console.log(cars[index]._source);
                new Point(cars[index]._source);
            }
            Point.renderMap();
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
