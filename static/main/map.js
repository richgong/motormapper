Point = function(car) {
    Point.list.push(this);
    this.hash_id = '#car_' + car.id;
    this.car = car;
    //console.log(car);
    var addr = car.locations[0];
    this.ll = new google.maps.LatLng(addr.lat, addr.lon);
    this.marker = new google.maps.Marker({
        icon: '/static/img/icon-14.png',
        animation: google.maps.Animation.DROP
    });

    var _this = this;

    $('#results').append(resultTemplate(this.car));
    Point.updateResults();

    $(this.hash_id).click(function() {
        window.open($(this).data("url"), '_blank');
    });

    this.marker.addListener('click', function() {
        console.log(_this.car);
        var anchor = $(_this.hash_id);
        if (Point.highlighted) {
            Point.highlighted.css({'border-width':'0px'});
        }
        $('html, body').stop().animate({
            scrollTop: anchor.offset().top - 55
        }, 1500, 'easeInOutExpo');
        Point.highlighted = anchor;
        anchor.css({
            "border-color": "#07C28F",
            "border-width": "5px",
            "border-style": "solid"
        });
    });
};

Point.limit_exceeded = false;

Point.highlighted = null;

Point.prototype.update = function(bounds) {
    this.marker.setPosition(this.ll);
    this.marker.setMap(Point.map);
    bounds.extend(this.ll);
};

Point.renderMap = function() {
    var bounds = new google.maps.LatLngBounds();
    var lls = [];
    for (var i = 0; i < Point.list.length; ++i) {
        var point = Point.list[i];
        point.update(bounds);
        lls.push(point.ll);
    }
    if (lls.length)
        Point.map.fitBounds(bounds);
    $('#spinner').hide();
    Point.updateResults();
};

Point.updateResults = function() {
    $('#status').html(statusTemplate(Point));
};

Point.lookupLocation = function(address, callback) {
    if (!address)
        return callback(null, null);
    Point.geocoder.geocode( { 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            return callback(null, results[0].geometry.location);
        }
        callback(null, null);
    });
};

Point.geocoder = new google.maps.Geocoder();

Point.list = [];

Point.total_results = 0;
