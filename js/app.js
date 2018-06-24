var map;
// Create a new blank array for all the listing markers.
var markers = [];

var bounds;
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 19.07283, lng: 72.88261},
    zoom: 8
  });

  bounds = new google.maps.LatLngBounds();

  var zoomAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('zoom-to-area-text-of-place'));
  // Bias the boundaries within the map for the zoom to area text.
  zoomAutocomplete.bindTo('bounds', map);

  var timeAutocomplete = new google.maps.places.Autocomplete(
      document.getElementById('zoom-to-area-text'));

  // Zoom to a new area
  document.getElementById('zoom-to-area').addEventListener('click', function() {
    zoomToArea();
  });

  // Query an area for places by category
  document.getElementById('query-an-area').addEventListener('click', function() {
    textSearchPlaces();
  });

  // These are the real estate listings that will be shown to the user.
  // Normally we'd have these in a database instead.
  // var locations = [
  //   {title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  //   {title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  //   {title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  //   {title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  //   {title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  //   {title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
  // ];
  // var largeInfowindow = new google.maps.InfoWindow();
  // var bounds = new google.maps.LatLngBounds();
  // // The following group uses the location array to create an array of markers on initialize.
  // for (var i = 0; i < locations.length; i++) {
  //   // Get the position from the location array.
  //   var position = locations[i].location;
  //   var title = locations[i].title;
  //   // Create a marker per location, and put into markers array.
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: position,
  //     title: title,
  //     animation: google.maps.Animation.DROP,
  //     id: i
  //   });
  //   // Push the marker to our array of markers.
  //   markers.push(marker);
  //   // Create an onclick event to open an infowindow at each marker.
  //   marker.addListener('click', function() {
  //     populateInfoWindow(this, largeInfowindow);
  //   });
  //   bounds.extend(markers[i].position);
  // }
  // // Extend the boundaries of the map for each marker
  // map.fitBounds(bounds);
}
function findPlaces() {
  var numItems = document.getElementById('zoom-to-area-number-of-items').value
  var placeToSearch = document.getElementById('zoom-to-area-text').value

  var request = {
    query: placeToSearch,
    bounds: map.getBounds(),
    fields: ['formatted_address', 'geometry','name']
  };

  var service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.setZoom(8);
      map.fitBounds();
      for (var i = 0; i < Math.max(results.length, numItems); i++) {
        var place = results[i];
        buildMarker(place, i);
      };
    } else {
      return function () {
        window.alert("We couldn't find the place you were looking for!");
      }
    };
  });
};
function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}
function buildMarker(data) {
  console.log(data);
  for (var i = 0; i < data.length; i++) {
    var marker = new google.maps.Marker({
      map: map,
      position: data.geometry.location,
      title: data.title,
      animation: google.maps.Animation.DROP,
      id: data.id
    });

    markers.push(marker);

    var largeInfowindow = new google.maps.InfoWindow();
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });
  }

  bounds.extend(marker.position);
  map.fitBounds(bounds);
}
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
  // Check to make sure the infowindow is not already opened on this marker.
  if (infowindow.marker != marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '</div>');
    infowindow.open(map, marker);
    // Make sure the marker property is cleared if the infowindow is closed.
    infowindow.addListener('closeclick',function(){
      infowindow.setMarker = null;
    });
  };
}
function zoomToArea() {
  // Initialize the geocoder.
  var geocoder = new google.maps.Geocoder();
  // Get the address or place that the user entered.
  var address = document.getElementById('zoom-to-area-text').value;
  hideMarkers(markers);
  // Make sure the address isn't blank.
  if (address == '') {
    window.alert('You must enter an area, or address.');
  } else {
    // Geocode the address/area entered to get the center. Then, center the map
    // on it and zoom in
    geocoder.geocode(
      { address: address
      },
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          console.log(results);
          map.setCenter(results[0].geometry.location);
          map.setZoom(14);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      }
    );
  }
}
function textSearchPlaces() {
  var bounds = map.getBounds();
  hideMarkers(markers);
  var placesService = new google.maps.places.PlacesService(map);
  categoryToSearch = document.getElementById('zoom-to-area-text-of-place').value;
  placesService.textSearch({
    query: categoryToSearch,
    bounds: bounds
  }, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      limit = document.getElementById('zoom-to-area-number-of-items').value;
      createMarkersForPlaces(results, limit);
    }
  });
}
function createMarkersForPlaces(places, limit) {
  var bounds = map.getBounds();
  var placelimit = (!limit) ? 7 : limit;
  for (var i = 0; i < Math.min(places.length, placelimit); i++) {
    var place = places[i];
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      title: place.title,
      animation: google.maps.Animation.DROP,
      id: place.place_id
    });

    markers.push(marker);

    var placeInfoWindow = new google.maps.InfoWindow();
    marker.addListener('click', function() {
      getPlacesDetails(this, placeInfoWindow);
    });
    // bounds.extend(place.geometry.location);
    if (place.geometry.viewport) {
      // Only geocodes have viewport.
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  }

  map.fitBounds(bounds);
}

// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow) {
  var service = new google.maps.places.PlacesService(map);
  service.getDetails({
    placeId: marker.id
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Set the marker property on this infowindow so it isn't created again.
      infowindow.marker = marker;
      var innerHTML = '<div>';
      if (place.name) {
        innerHTML += '<strong>' + place.name + '</strong>';
      }
      if (place.formatted_address) {
        innerHTML += '<br>' + place.formatted_address;
      }
      if (place.website) {
        innerHTML += '<br><a href="' + place.website + '">website</a>'
      }
      if (place.formatted_phone_number) {
        innerHTML += '<br>' + place.formatted_phone_number;
      }
      if (place.opening_hours) {
        innerHTML += '<br><br><strong>Hours:</strong><br>' +
            place.opening_hours.weekday_text[0] + '<br>' +
            place.opening_hours.weekday_text[1] + '<br>' +
            place.opening_hours.weekday_text[2] + '<br>' +
            place.opening_hours.weekday_text[3] + '<br>' +
            place.opening_hours.weekday_text[4] + '<br>' +
            place.opening_hours.weekday_text[5] + '<br>' +
            place.opening_hours.weekday_text[6];
      }
      if (place.photos) {
        innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
            {maxHeight: 100, maxWidth: 200}) + '">';
      }
      innerHTML += '</div>';
      infowindow.setContent(innerHTML);
      infowindow.open(map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  });
}
