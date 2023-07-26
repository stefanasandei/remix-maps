import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import type { LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/loading";
import { useAppSelector } from "~/lib/hooks";
const MapView = () => {
  const mapProviders = [
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  ];

  const [position, setPosition] = useState<LatLngTuple>([0.0, 0.0]);
  const [routeCoords, setRouteCoords] = useState<LatLngTuple[]>([]);
  const destination = useAppSelector((state) => state.destination);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition([position.coords.latitude, position.coords.longitude]);
    });
  }, []);

  useEffect(() => {
    const pos = {
      lat: position[0],
      lon: position[1],
    };

    if (pos.lat == 0.0 || destination.lat == 0.0) return;

    const fetchData = async () => {
      const response = await fetch("/route", {
        method: "POST",
        body: JSON.stringify({ position: pos, destination }),
      });

      const data = await response.json();

      if (data.route.length > 0) {
        setRouteCoords(data.route);
      }
    };

    fetchData();
  }, [position, destination]);

  if (position[0] == 0.0)
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size={45} />
      </div>
    );

  return (
    <div className="bg-secondary h-full pb-14 -z-10">
      <MapContainer
        style={{ height: "100%" }}
        center={position}
        zoom={7}
        touchZoom={true}
      >
        <TileLayer attribution="infoEducatie 2023" url={mapProviders[1]} />
        <Polyline positions={routeCoords} color="red" />
        <Marker position={position}>
          <Popup>You are here</Popup>
        </Marker>
        <Marker position={[destination.lat, destination.lon]}>
          <Popup>Destination</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
export default MapView;
