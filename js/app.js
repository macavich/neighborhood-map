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

  document.getElementById('zoom-to-area').addEventListener('click', function() {
    findPlaces();
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
  console.log(numItems);
  console.log(placeToSearch);

  var request = {
    query: placeToSearch,
    fields: ['formatted_address', 'geometry','name']
  };

  var service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(results);
      map.setCenter(results[0].geometry.location);
      map.setZoom(8);
      map.fitBounds();
      for (var i = 0; i < Math.max(results.length, numItems); i++) {
        var place = results[i];
        console.log(place);
        buildMarker(place, i);
      };
    } else {
      console.log(request);
      console.log(results);
      console.log(status);
      return function () {
        window.alert("We couldn't find the place you were looking for!");
      }
    };
  });
};

function buildMarker(data, i) {
  console.log(data);
  var marker_id = i;
  var marker = new google.maps.Marker({
    map: map,
    position: data.geometry.location,
    title: data.title,
    animation: google.maps.Animation.DROP,
    id: marker_id
  });

  markers.push(marker);

  var largeInfowindow = new google.maps.InfoWindow();
  marker.addListener('click', function() {
    populateInfoWindow(this, largeInfowindow);
  });

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
  // Make sure the address isn't blank.
  if (address == '') {
    window.alert('You must enter an area, or address.');
  } else {
    // Geocode the address/area entered to get the center. Then, center the map
    // on it and zoom in
    geocoder.geocode(
      { address: address,
        componentRestrictions: {locality: 'New York'}
      },
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(15);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      }
    );
  }
}
