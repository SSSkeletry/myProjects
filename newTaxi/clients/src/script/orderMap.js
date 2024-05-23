import React, { useEffect, useState } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 50.450001,
    lng: 30.523333
};

const libraries = ['places'];

const OrderMap = ({ startPlace, endPlace, onDistanceCalculated }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    const [directions, setDirections] = useState(null);
    const [distanceCalculated, setDistanceCalculated] = useState(false); // Добавим состояние для отслеживания расчета расстояния

    useEffect(() => {
        const loadDirections = async () => {
            if (startPlace && endPlace && window.google && !distanceCalculated) {
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
                            const distanceInMeters = result.routes[0].legs[0].distance.value;
                            const distanceInKm = distanceInMeters / 1000;
                            console.log(`Distance from ${startPlace} to ${endPlace}: ${distanceInKm} km`); // Вывод в консоль
                            onDistanceCalculated(distanceInKm); // Передача расстояния в родительский компонент
                            setDistanceCalculated(true); // Устанавливаем состояние расчета расстояния
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
    }, [startPlace, endPlace, isLoaded, distanceCalculated, onDistanceCalculated]);

    if (!isLoaded) return <div>Loading...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
    );
};

export default OrderMap;
