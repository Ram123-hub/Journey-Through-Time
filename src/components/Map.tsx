// components/Map.tsx
'use client'
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Map as LeafletMap } from "leaflet";

// Create the default icon
const defaultIcon = L.icon({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapProps {
  placeName: string;
}

const Map: React.FC<MapProps> = ({ placeName }) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const SetViewOnPlaceChange = () => {
    const map = useMap();

    useEffect(() => {
      if (!placeName) return;

      const fetchCoordinates = async () => {
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`
          );
          const data = await response.json();

          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            const newLatLng = L.latLng(parseFloat(lat), parseFloat(lon));
            map.setView(newLatLng, 13);
            L.marker(newLatLng).addTo(map).bindPopup(`${placeName}`).openPopup();
          } else {
            alert("Location not found!");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };

      fetchCoordinates();
    }, [map]);

    return null;
  };

  return (
    <MapContainer
      center={[23.259933, 77.412613]} // Default center
      zoom={13}
      className="h-96"
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SetViewOnPlaceChange />
    </MapContainer>
  );
};

export default Map;
