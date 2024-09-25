import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './map.module.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useState } from 'react';
import { LatLngTuple } from 'leaflet';

function Map() {
  const navigate = useNavigate();
  const [position, setPosition] = useState<LatLngTuple>([51.505, -0.09]);
  const [searchParams, setSearchParams] = useSearchParams();

  const latitude = searchParams.get('lat') || 0;
  const longitude = searchParams.get('lng') || 0;

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
