import React, { useEffect, useRef } from 'react';

const Map = ({ address }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
        script.async = true;
        script.defer = true;

        window.initMap = () => {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: address }, (results, status) => {
                if (status === 'OK' && mapRef.current) {
                    const map = new window.google.maps.Map(mapRef.current, {
                        center: results.geometry.location,
                        zoom: 15,
                    });
                    new window.google.maps.Marker({
                        map: map,
                        position: results.geometry.location,
                    });
                } else {
                    console.error('Geocode was not successful for the following reason: ' + status);
                }
            });
        };

        document.head.appendChild(script);

        return () => {
            // Cleanup function to remove the script and the global callback
            const scripts = document.head.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].src.includes('maps.googleapis.com')) {
                    scripts[i].remove();
                }
            }
            delete window.initMap;
        };
    }, [address]);

    return <div ref={mapRef} style={{ width: '100%', height: '400px' }} className="rounded-lg" />;
};

export default Map;