Point = function(lat, lng) {
    Point.list.push(this);
    this.ll = new google.maps.LatLng(lat, lng);
    this.marker = new google.maps.Marker({
        //icon: '/static/img/map-marker.png',
        animation: google.maps.Animation.DROP
    });
};

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