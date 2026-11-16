
let map;
let marker;
let selectedLocation = null;

// Initialize Google Map
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");

    const defaultLocation = {
        lat: 6.5244,
        lng: 3.3792
    };

    map = new Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12,
        mapId: "DEMO_MAP_ID"
    });

    marker = new AdvancedMarkerElement({
        map,
        position: defaultLocation
    });

    selectedLocation = defaultLocation;
}

// Get user's current location
document.getElementById("currentLocation")
    .addEventListener("click", () => {

        const status = document.getElementById("locationStatus");

        if (!navigator.geolocation) {
            status.textContent =
                "Your browser does not support location services.";
            return;
        }

        status.textContent = "Getting your location...";

        navigator.geolocation.getCurrentPosition(
            (position) => {

                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                map.setCenter(userLocation);
                map.setZoom(16);

                marker.position = userLocation;
                selectedLocation = userLocation;

                status.textContent = "Location found!";
            },

            (error) => {
                status.textContent =
                    "Unable to get location. Please allow location access.";
            },

            {
                enableHighAccuracy: true,
                timeout: 10000
            }
        );
    });

document.getElementById("confirmLocation")
    .addEventListener("click", () => {

        if (!selectedLocation) return;

        console.log("Selected location:", selectedLocation);
    });
