import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import type { LatLngExpression, LatLngTuple } from "leaflet";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/loading";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { addInfo } from "~/lib/slices/destination";
import { set as setPosition } from "~/lib/slices/position";
import { CameraDialog } from "./camera-dialog";

export type Camera = {
  name: string;
  link: string;
  cars: number;
  processedLink: string;
  coords: { lat: number; lon: number };
};

const MapView = (props: {
  zoom: "low" | "high";
  center?: number[];
  cameras?: Camera[];
}) => {
  const mapProviders = [
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  ];

  const [routeCoords, setRouteCoords] = useState<LatLngTuple[]>([]);

  const destination = useAppSelector((state) => state.destination);
  const position = useAppSelector((state) => state.position);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        dispatch(
          setPosition({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
        );
      });
    }
    // dispatch(setPosition({ lat: 44.439663, lon: 26.096306 }));
  }, [dispatch]);

  useEffect(() => {
    const pos = {
      lat: position.lat,
      lon: position.lon,
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
        dispatch(addInfo({ duration: data.duration, distance: data.distance }));
      }
    };

    fetchData();
  }, [position, destination, dispatch]);

  if (position.lat == 0.0)
    return (
      <div className="flex items-center justify-center h-full">
        <LoadingSpinner size={45} />
      </div>
    );

  return (
    <div className="bg-secondary h-full pb-14 -z-10">
      <MapContainer
        style={{ height: "100%" }}
        center={
          (props.center as LatLngExpression) ?? [position.lat, position.lon]
        }
        zoom={props.zoom == "high" ? 7 : 12}
        touchZoom={true}
      >
        <TileLayer attribution="infoEducatie 2023" url={mapProviders[1]} />
        <Polyline positions={routeCoords} color="red" />
        <Marker position={[position.lat, position.lon]}>
          <Popup>You are here</Popup>
        </Marker>
        <Marker position={[destination.lat, destination.lon]}>
          <Popup>Destination</Popup>
        </Marker>
        {props.cameras != undefined &&
          props.cameras.map((camera) => (
            <div key={camera.link}>
              <Marker position={[camera.coords.lat, camera.coords.lon]}>
                <Popup>
                  <CameraDialog camera={camera} />
                </Popup>
              </Marker>
            </div>
          ))}
      </MapContainer>
    </div>
  );
};
export default MapView;
