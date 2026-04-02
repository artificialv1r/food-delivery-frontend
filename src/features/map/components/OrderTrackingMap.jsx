import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { startTracking, stopTracking } from "../services/trackingService";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix za Leaflet default marker ikonicu, bec fixa bude samo prazan kvadratic
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function OrderTrackingMap({ orderId, onClose }) {
    const [location, setLocation] = useState(null);
    const [finished, setFinished] = useState(false);

    useEffect(() => {
        startTracking(orderId, (data) => {
            if (data.orderStatus === "Delivered") {
                setFinished(true);
                stopTracking(orderId);
                return;
            }
            setLocation({ lat: data.latitude, lng: data.longitude });
        });

        return () => {
            stopTracking(orderId);
        };
    }, [orderId]);

    if (finished) {
        return (
            <div className="tracking-finished">
                <h3>✅ Porudžbina je isporučena!</h3>
                <button onClick={onClose}>Zatvori</button>
            </div>
        );
    }

    return (
        <div className="tracking-map-wrapper">
            <div className="tracking-map-header">
                <h3>Praćenje porudžbine #{orderId}</h3>
                <button onClick={onClose}>✕ Zatvori</button>
            </div>

            {!location ? (
                <div className="tracking-waiting">
                    ⏳ Čekanje na lokaciju kurira...
                </div>
            ) : (
                <MapContainer
                    center={[location.lat, location.lng]}
                    zoom={15}
                    style={{ height: "400px", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='© OpenStreetMap'
                    />
                    <Marker position={[location.lat, location.lng]}>
                        <Popup>Kurir je ovde</Popup>
                    </Marker>
                </MapContainer>
            )}
        </div>
    );
}