import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/loading";

const MapView = () => {
  const [position, setPosition] = useState<LatLngTuple>([0.0, 0.0]);

  const mapProviders = [
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  if (position[0] == 0.0)
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size={45} />
      </div>
    );

  return (
    <div className="bg-secondary h-full pb-14 -z-10">
      <MapContainer
        style={{
          height: "100%",
        }}
        center={position}
        zoom={13}
        touchZoom={true}
      >
        <TileLayer attribution="infoEducatie 2023" url={mapProviders[1]} />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapView;
