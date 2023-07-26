import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { LatLngTuple } from "leaflet";

const MapView = () => {
  const position: LatLngTuple = [44.43551, 26.10252];
  const mapProviders = [
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  ];

  return (
    <div className="bg-secondary h-full pb-10">
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
