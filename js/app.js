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

// knockout model

function Place(data) {
  this.name = ko.observable(data.name);
  this.formatted_address = ko.observable(data.formatted_address);
  this.geometry = ko.observable(data.geometry);
  this.formatted_phone_number = ko.observable(data.formatted_phone_number);
  this.opening_hours = ko.observable(data.opening_hours);
  this.place_id = ko.observable(data.place_id);
  this.foursquare_id = ko.observable(data.foursquare_id);
  this.website = ko.observable(data.website);
  this.selected = ko.observable(false);

  this.toggleHover = function () {
    this.selected(!this.selected());
  }
}

// helperfunctions
function isFunction(functionToCheck) {
 return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

function unwrapObservable(PlaceObservable) {
  if (isFunction(PlaceObservable)) {
    return {
      name: PlaceObservable().name(),
      formatted_address: PlaceObservable().formatted_address(),
      geometry: PlaceObservable().geometry(),
      formatted_phone_number: PlaceObservable().formatted_phone_number(),
      opening_hours: PlaceObservable().opening_hours(),
      place_id: PlaceObservable().place_id(),
      foursquare_id: PlaceObservable().foursquare_id(),
      website: PlaceObservable().website()
    }
  } else {
    return {
      name: PlaceObservable.name(),
      formatted_address: PlaceObservable.formatted_address(),
      geometry: PlaceObservable.geometry(),
      formatted_phone_number: PlaceObservable.formatted_phone_number(),
      opening_hours: PlaceObservable.opening_hours(),
      place_id: PlaceObservable.place_id(),
      foursquare_id: PlaceObservable.foursquare_id(),
      website: PlaceObservable.website()
    }
  }
}

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
    zoom: 13,
    zoomControl: false,
    scaleControl: true
  });

  google.maps.event.addListenerOnce(map, 'bounds_changed', function () {
      bounds = this.getBounds();
  });

  // knockout bit
  var ViewModel = function () {
    var self = this;

    self.filter = ko.observable('');
    self.placeList = ko.observableArray( [] );
    self.selectedPlace = ko.observable();

    initialPlaces.forEach(function (placeItem) {
      self.placeList.push( new Place(placeItem) );
    });

    self.initialize = function() {
      var filter = self.filter();
      if (!filter || filter == "None" || filter === "") {
        createMarkersForPlaces(initialPlaces, 7, self.selectedPlace().name());
      }
    };

    self.filteredItems = ko.computed(function() {
      var filter = self.filter();
      hideMarkers(markers);
      if (!filter || filter == "None" || filter === "") {
        console.log(self.selectedPlace());
        createMarkersForPlaces(initialPlaces, 7, false);
        console.log('called initial');
        return self.placeList();
      } else {
        var filteredPlaceArray = ko.utils.arrayFilter(self.placeList(), function (item) {
            return item.name().indexOf(filter) > -1;
          })
        console.log(filteredPlaceArray);
        var filteredPlaces = [];
        filteredPlaceArray.forEach( function (place) {
          filteredPlaces.push(unwrapObservable(place));
        });

        createMarkersForPlaces(filteredPlaces, 7, false);
        return ko.utils.arrayFilter(self.placeList(), function (item) {
          return item.name().indexOf(filter) > -1;
        })
      };
    })

    this.changeSelectedPlace = function (clickedPlace) {

      self.selectedPlace( clickedPlace );
      hideMarkers(markers);

      // open the marker on the map
      var selectedPlaceInfoWindow = new google.maps.InfoWindow();
      createMarkersForPlaces([unwrapObservable(self.selectedPlace)], 1, true);
    };

  }

  ko.applyBindings(new ViewModel());

  // end knockout bit

  // Style the markers a bit. This will be our listing marker icon.
  defaultIcon = makeMarkerIcon({
    hoveredOver: false
  });

  // Create a "highlighted location" marker color for when the user
  // mouses over the marker.
  highlightedIcon = makeMarkerIcon({
    hoveredOver: true
  });
}

function hideMarkers(markers) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function createMarkersForPlaces(places, limit, openMarker) {
  var bounds = map.getBounds();
  var placelimit = (!limit) ? 7 : limit;
  // Building a marker for each place
  for (var i = 0; i < Math.min(places.length, placelimit); i++) {
    var place = places[i];

    // handle animations for markers that are already placed
    var animation = (openMarker && limit === 1) ? undefined : google.maps.Animation.DROP;
    var opened = false;
    if ( typeof(openMarker) === "string" ) {
      if (place.name === openMarker) {
        animation = undefined;
      }
    } else if (typeof(openMarker) === "boolean") {
      opened = openMarker;
    }

    var icon = (opened) ? makeMarkerIcon({'hoveredOver':true}) : makeMarkerIcon({})
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location,
      animation: animation,
      id: place.place_id,
      icon: icon,
      foursquare_id: place.foursquare_id,
      opened: opened
    });

    markers.push(marker);
    var placeInfoWindow = new google.maps.InfoWindow();

    // Event listeners for markers

    // build and open infowindow
    marker.addListener('click', function() {
      this.setIcon(highlightedIcon);
      this.opened = true;
      callFoursquareAndOpenMarker(this, placeInfoWindow);
    });
    // highlight marker when moused
    marker.addListener('mouseover', function() {
      if (!this.opened) {
        this.setIcon(highlightedIcon);
      }
    });
    // remove highighting when moused
    marker.addListener('mouseout', function() {
      if (!this.opened) {
        this.setIcon(defaultIcon);
      }
    });

    if (openMarker && limit === 1) {
      callFoursquareAndOpenMarker(marker, placeInfoWindow)
    }
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

// Calling the Foursquare API for some extra information about the restaurants Likes
function callFoursquareAndOpenMarker(place, infowindow) {
  var dt = new Date();

  // building the request URI for Foursquare
  var foursquareURI = "https://api.foursquare.com/v2/venues/" + place.foursquare_id + "/likes?";
  foursquareURI += $.param({
    client_id: foursquareClientID,
    client_secret: foursquareClientSecret,
    v: dt.toISOString().slice(0, 10).replace(/-/g, '')
  });
  // Calling the foursquare API
  $.getJSON( foursquareURI, function() {})
    .done(function (data) {
      var likes = 0;

      if (data.response.likes) {
        likes = data.response.likes.count;
      }

      // make some aggregated data based on what gender is liking the place
      var maleCount = 0;
      var femaleCount = 0;
      if (data.response.likes.items !== undefined && data.response.likes.items.length > 0) {
        data.response.likes.items.forEach(function (like) {
          if (like.gender === 'male') {
            maleCount++;
          } else {
            femaleCount++;
          }
        });
      }

      var foursquareData = {
        likesCount: likes,
        maleCount: maleCount,
        femaleCount: femaleCount
      };

      // build the infowindow and display it
      getPlacesDetails(place, infowindow, foursquareData);
    })
  .fail(function (response) {
    // alert the user of the lack of data, and build the infowindows and display
    window.alert(
      "We failed to receive some extra details about this place, and so we are just providing you the default."
    );
    getPlacesDetails(place, infowindow);
  })
}

// This builds the info window and displays it
// it includes a API call to Google's PlacesService
function getPlacesDetails(marker, infowindow, foursquareData) {
  var service = new google.maps.places.PlacesService(map);
  // handle for using the static data from the observable
  var id = (marker.id) ? marker.id : marker.place_id;
  service.getDetails({
    placeId: id
  }, function(place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      // Set the marker property on this infowindow so it isn't created again.
      infowindow.marker = marker;

      // building the infowindow's html
      var innerHTML = '<div>';
      if (place.name) {
        innerHTML += '<strong>' + place.name + '</strong>';
      }
      if (place.formatted_address) {
        innerHTML += '<br>Address: ' + place.formatted_address;
      }
      if (place.website) {
        innerHTML += '<br><a href="' + place.website + '">website</a>'
      }
      if (place.formatted_phone_number) {
        innerHTML += '<br>Phone: ' + place.formatted_phone_number;
      }
      if (foursquareData) {
        innerHTML += '<br><br>Likes: ' + foursquareData.likesCount;
        var totalCount = foursquareData.maleCount + foursquareData.femaleCount;
        innerHTML += '<br>Pct Male Liked: ' + ((foursquareData.maleCount/totalCount)*100).toFixed(2) + '%';
        innerHTML += '<br>Pct Female Liked: ' + ((foursquareData.femaleCount/totalCount)*100).toFixed(2) + '%';
      }

      innerHTML += '</div>';
      infowindow.setContent(innerHTML);
      infowindow.open(map, marker);

      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        marker.opened = false;
        marker.setIcon(defaultIcon);
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
