import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '400px'
};

const center = {
    lat: 50.450001,
    lng: 30.523333
};

const libraries = ['places'];

const OrderMap = ({ startPlace, endPlace }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    const [directions, setDirections] = useState(null);
    const [driverDirections, setDriverDirections] = useState(null);
    const [driverLocation, setDriverLocation] = useState(null);

    useEffect(() => {
        const loadDirections = async () => {
            if (startPlace && endPlace && window.google) {
                const directionsService = new window.google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin: startPlace,
                        destination: endPlace,
                        travelMode: window.google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            setDirections(result);
                        } else {
                            console.error(`Error fetching directions ${status}`);
                        }
                    }
                );
            }
        };

        if (isLoaded) {
            loadDirections();
        }
    }, [startPlace, endPlace, isLoaded]);

    useEffect(() => {
        const loadDriverDirections = async () => {
            if (driverLocation && startPlace && window.google) {
                const directionsService = new window.google.maps.DirectionsService();
                directionsService.route(
                    {
                        origin: driverLocation,
                        destination: startPlace,
                        travelMode: window.google.maps.TravelMode.DRIVING
                    },
                    (result, status) => {
                        if (status === window.google.maps.DirectionsStatus.OK) {
                            setDriverDirections(result);
                        } else {
                            console.error(`Error fetching driver directions ${status}`);
                        }
                    }
                );
            }
        };

        if (isLoaded && driverLocation) {
            loadDriverDirections();
        }
    }, [driverLocation, startPlace, isLoaded]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setDriverLocation(location);
                },
                (error) => {
                    console.error('Error getting current location:', error);
                }
            );
        }
    }, []);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {directions && <DirectionsRenderer directions={directions} />}
            {driverDirections && <DirectionsRenderer directions={driverDirections} options={{ polylineOptions: { strokeColor: 'blue' } }} />}
        </GoogleMap>
    );
};

export default OrderMap;
