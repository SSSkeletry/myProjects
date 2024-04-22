export function initMap(google) {
    var map, directionsService, directionsRenderer;
    var markerLocation = null;
    var markerArrival = null;
    var selectedInput = null;

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 50.450001, lng: 30.523333}
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            map.setCenter(userLocation);
            map.setZoom(17);
            addMarker(userLocation, map);
        }, function() {
            console.log("Геолокація не підтримується цим браузером.");
        });
    } else {
        console.log("Геолокація не підтримується цим браузером.");
    }

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    setupAutocomplete('loc', true);
    setupAutocomplete('arrival', false);
    setupMapClickListener();

    document.getElementById('loc').addEventListener('focus', function() {
        selectedInput = 'loc';
    });
    document.getElementById('arrival').addEventListener('focus', function() {
        selectedInput = 'arrival';
    });

    function setupAutocomplete(inputId, isLocation) {
        var input = document.getElementById(inputId);
        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', function() {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                console.log("Немає деталей, доступних для введення: '" + place.name + "'");
                return;
            }
            var location = place.geometry.location;
            map.setCenter(location);
            map.setZoom(17);
            addMarker(location, isLocation);
            calculateAndDisplayRoute();
        });
    }

    function setupMapClickListener() {
        map.addListener('click', function(mapsMouseEvent) {
            if (!selectedInput) return;
            var latLng = mapsMouseEvent.latLng;
            placeMarkerAndPanTo(latLng, selectedInput === 'loc');
        });
    }

    function placeMarkerAndPanTo(latLng, isLocation) {
        addMarker(latLng, isLocation);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'location': latLng}, function(results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    var fullAddress = results[0].formatted_address;
                    var addressWithoutPlusCode = fullAddress.replace(/^[^\s]+ /, '');
                    document.getElementById(isLocation ? 'loc' : 'arrival').value = addressWithoutPlusCode;
                    calculateAndDisplayRoute();
                }
            }
        });
    }

    function addMarker(location, isLocation) {
        if (isLocation) {
            if (markerLocation) markerLocation.setMap(null);
            markerLocation = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Location'
            });
        } else {
            if (markerArrival) markerArrival.setMap(null);
            markerArrival = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Arrival'
            });
        }
    }

    function calculateAndDisplayRoute() {
        if (markerLocation && markerArrival) {
            directionsService.route({
                origin: markerLocation.getPosition(),
                destination: markerArrival.getPosition(),
                travelMode: google.maps.TravelMode.DRIVING
            }, function(response, status) {
                if (status === 'OK') {
                    directionsRenderer.setDirections(response);
                } else {
                    alert('Помилка запиту маршруту через ' + status);
                }
            });
        }
    }
}