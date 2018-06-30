var map;
// Create a new blank array for all the listing markers.
var markers = [];
var yelpAccessToken = "ma8Io2GDolGxcOxuBju5pfrMfrrS7SUJ1JaKC70_EexNP8EHcYoEdWUGrdcM_LUkdPnBFg4Xv2pcK3RIyNE9toXsQhHOVZLgLc_rzJqj1EtImeybGbrEo69FH34xW3Yx";
var foursquareClientID = "K5DB4HO5HMKVQGHMSURD54VGCDZZNYXIJYXE1WRHJ53H12BX";
var foursquareClientSecret = "BSFJKIIPID5IKQLNIQPRZAHLGDS54NLJXHMUGN0FCQCBH1GC";
var initialPlaces = [
  {
    name: "Pizza Union",
    formatted_address: "246-250 Pentonville Rd. London N1 93Y, UK",
    geometry: {
      location: {
        lat: 51.5311021,
        lng: -0.1198515
      }
    },
    formatted_phone_number: "+442072789425",
    opening_hours: {
      weekday_text: [
        "Monday: 11:00AM - 12:00AM",
        "Tuesday: 11:00AM - 12:00AM",
        "Wednesday: 11:00AM - 12:00AM",
        "Thursday: 11:00AM - 12:00AM",
        "Friday: 11:00AM - 12:00AM",
        "Saturday: 11:00AM - 12:00AM",
        "Sunday: 11:00AM - 12:00AM"
      ]
    },
    place_id: "ChIJBS8tKT8bdkgRlUzYr3nKauU",
    foursquare_id: "5570465a498eb53da6d0e9d4",
    website: "http://www.pizzaunion.com/"
  },
  {
    name: "Pizza Hut",
    formatted_address: "56-59 Strand, London WC2N 5LR, UK",
    geometry: {
      location: {
        lat: 51.509431,
        lng: -0.12342
      }
    },
    formatted_phone_number: "+442079250050",
    opening_hours: {
      weekday_text: [
        "Monday: 11:00AM - 11:00AM",
        "Tuesday: 11:00AM - 11:00AM",
        "Wednesday: 11:00AM - 11:00AM",
        "Thursday: 11:00AM - 11:00AM",
        "Friday: 11:00AM - 12:00AM",
        "Saturday: 11:00AM - 12:00AM",
        "Sunday: 11:00AM - 11:00AM"
      ]
    },
    place_id: "ChIJ774OZskEdkgRS97njpnw2as",
    foursquare_id: "4bc6005242419521ca66031d",
    website: "http://www.pizzahut.co.uk/restaurants/find-a-hut/london/strand/?utm_source=google&utm_medium=maps&utm_content=strand&utm_campaign=googleplaces"
  },
  {
    name: "Homeslice Neal's Yard",
    formatted_address: "13 Neal's Yard, London WC2H 9DR UK",
    geometry: {
      location: {
        lat: 51.514569,
        lng: -0.1264329
      }
    },
    formatted_phone_number: "+442031517488",
    opening_hours: {
      weekday_text: [
        "Monday: 12:00AM - 11:00PM",
        "Tuesday: 12:00AM - 11:00PM",
        "Wednesday: 12:00AM - 11:00PM",
        "Thursday: 12:00AM - 11:00PM",
        "Friday: 12:00AM - 11:00PM",
        "Saturday: 12:00AM - 11:00PM",
        "Sunday: 12:00AM - 11:00PM"
      ]
    },
    place_id: "ChIJaxCVKc0EdkgRDrP4g1uRznI",
    foursquare_id: "5188ddc2498efdc2be39f972",
    website: "http://www.homeslicepizza.co.uk/"
  },
  {
    name: "Pizza Pilgrims",
    formatted_address: "11 Dean St, Soho, London W1D 3RP, UK",
    geometry: {
      location: {
        lat: 51.5149415,
        lng: -0.1332323
      }
    },
    formatted_phone_number: "+442072878964",
    opening_hours: {
      weekday_text: [
        "Monday: 11:30AM - 10:30PM",
        "Tuesday: 11:30AM - 10:30PM",
        "Wednesday: 11:30AM - 10:30PM",
        "Thursday: 11:30AM - 10:30PM",
        "Friday: 11:30AM - 10:30PM",
        "Saturday: 11:30AM - 10:30PM",
        "Sunday: 12:00AM - 9:30PM"
      ]
    },
    place_id: "ChIJgVOqzCwbdkgR1tcHUo18Zpg",
    foursquare_id: "51dfcc1a498e1abc7c95e3e4",
    website: "http://pizzapilgrims.co.uk/"
  },
  {
    name: "Domino's Pizza",
    formatted_address: "166 High Holborn, London WC1V 6PB, UK",
    geometry: {
      location: {
        lat: 51.5162976,
        lng: -0.1250936
      }
    },
    formatted_phone_number: "+442072405060",
    opening_hours: {
      weekday_text: [
        "Monday: 10:00AM - 11:00PM",
        "Tuesday: 10:00AM - 11:00PM",
        "Wednesday: 10:00AM - 11:00PM",
        "Thursday: 10:00AM - 11:00PM",
        "Friday: 10:00AM - 11:00PM",
        "Saturday: 10:00AM - 11:00PM",
        "Sunday: 10:00AM - 11:00PM"
      ]
    },
    place_id: "ChIJs93DizQbdkgRx84wK0Wd4ps",
    foursquare_id: "4b506634f964a5203d2227e3",
    website: "https://www.dominos.co.uk/"
  }
];

function Place(data) {
  this.name = ko.observable(data.name);
  this.formatted_address = ko.observable(data.formatted_address);
  this.goemetry = ko.observable(data.goemetry);
  this.formatted_phone_number = ko.observable(data.formatted_phone_number);
  this.opening_hours = ko.observable(data.opening_hours);
  this.place_id = ko.observable(data.place_id);
  this.foursquare_id = ko.observable(data.foursquare_id);
  this.website = ko.observable(data.website);

}

// knockout bit

var ViewModel = function () {
  var self = this;

  self.placeList = ko.observableArray( [] );
  self.selectedPlace = ko.observable();

  initialPlaces.forEach(function (placeItem) {
    self.placeList.push( new Place(placeItem) );
  });

  this.changeSelectedPlace = function (clickedPlace) {
    self.selectedPlace( clickedPlace );

    // open the marker on the map
    callFoursquareAPI

    console.log(self.selectedPlace());
  };

  //console.log(selectedPlace());

  // this.changeCurrentCat = function (clickedCat) {
  //   self.currentCat( clickedCat );
  // };
  //
  // this.incrementCounter = function() {
  //   self.currentCat().clickCount(self.currentCat().clickCount() + 1);
  // };
}


ko.applyBindings(new ViewModel());

//

var bounds;
var defaultIcon;
var highlightedIcon;
function initMap() {
  // Constructor creates a new map - only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 51.510357,
      lng: -0.116773
    },
    zoom: 13
  });

  google.maps.event.addListenerOnce(map, 'bounds_changed', function () {
      bounds = this.getBounds();
  });

  // Style the markers a bit. This will be our listing marker icon.
  defaultIcon = makeMarkerIcon({
    hoveredOver: false
  });
  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  highlightedIcon = makeMarkerIcon({
    hoveredOver: true
  });

  createMarkersForPlaces(initialPlaces, 7);

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
}

// UNUSED
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

  bounds.extend(marker.getPosition());
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
      {
        address: address
      },
      function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          map.setZoom(14);
          getPointsOfInterest(results[0].geometry.location);
        } else {
          window.alert('We could not find that location - try entering a more' +
              ' specific place.');
        }
      }
    );
  }
}
function getPointsOfInterest (location) {
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
    location: location,
    radius: 2500,
    keyword: "POI"
  }, function (results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMarkersForPlaces(results, 20);
    }
  });
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
function callYelpAPI(place) {
  yelpURL = ("https://api.yelp.com/v3/businesses/search/phone?phone="
              + place.formatted_phone_number);
  console.log(yelpURL);
  $.ajax({
    type: "GET",
    url: yelpURL,
    headers: {
      "Authorization": "Bearer " + yelpAccessToken
    },
    dataType: "jsonp",
    jsonpCallback: 'cb',
    async: false,
    cache: true,
  }).done(function (response) {
    console.log(response);
  }).fail(function (response) {
    console.log(response);
  }).always(function () {
    console.log('ok');
  });
}

// USED
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
      id: place.place_id,
      icon: makeMarkerIcon({}),
      foursquare_id: place.foursquare_id
    });

    markers.push(marker);

    var placeInfoWindow = new google.maps.InfoWindow();
    marker.addListener('click', function() {
      callFoursquareAPI(this, placeInfoWindow);
      //getPlacesDetails(this, placeInfoWindow, foursquareData);
    });
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
    // bounds.extend(place.geometry.location);
    // if (place.geometry.viewport) {
    //   // Only geocodes have viewport.
    //   bounds.union(place.geometry.viewport);
    // } else {
    //   bounds.extend(place.geometry.location);
    // }
  }

  // map.fitBounds(bounds);
}
function callFoursquareAPI(place, infowindow) {
  var dt = new Date();
  var foursquareURI = "https://api.foursquare.com/v2/venues/" + place.foursquare_id + "?";
  foursquareURI += $.param({
    client_id: foursquareClientID,
    client_secret: foursquareClientSecret,
    v: dt.toISOString().slice(0, 10).replace(/-/g, '')
  });
  $.getJSON( foursquareURI, function() {})
    .done(function (data) {
      var message, likes, rating;
      if (data.response.venue) {
        if (data.response.venue.price) {
          message = data.response.venue.price.message;
        }
        if (data.response.venue.likes) {
          likes = data.response.venue.likes.count;
        }
        if (data.response.venue.rating) {
          rating = data.response.venue.rating;
        }
        foursquareData = {
          priceMessage: message,
          likesCount: likes,
          rating: rating
        }
        getPlacesDetails(place, infowindow, foursquareData)
      }
    })
    .fail(function (response) {
      console.log(response)
    })
}

// This is the PLACE DETAILS search - it's the most detailed so it's only
// executed when a marker is selected, indicating the user wants more
// details about that place.
function getPlacesDetails(marker, infowindow, foursquareData) {
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
      if (foursquareData) {
        if (foursquareData.priceMessage) {
          innerHTML += '<br>Price Level: ' + foursquareData.priceMessage;
        }
        if (foursquareData.likesCount) {
          innerHTML += '<br>Likes: ' + foursquareData.likesCount;
        }
        if (foursquareData.rating) {
          innerHTML += '<br>Rating (0-10): ' + foursquareData.rating;
        }
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
function makeMarkerIcon(obj) {
  var markerImage = (obj.hoveredOver) ? new google.maps.MarkerImage(
    'https://maps.gstatic.com/mapfiles/ms2/micons/blue-dot.png') :
    new google.maps.MarkerImage(
      'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png')
  return markerImage;
}
