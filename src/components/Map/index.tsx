import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './map.module.css';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';
import { LatLngTuple } from 'leaflet';
import { useCities } from '../../hooks/use-cities';
import { useGeolocation } from '../../hooks/use-geolocation';
import Button from '../Button';

function Map() {
  const { cities } = useCities();
  const {
    position,
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultPosition = { lat: 0, lng: 0 };
  const [mapPosition, setMapPosition] = useState<LatLngTuple>([
    position?.lat ?? defaultPosition.lat,
    position?.lng ?? defaultPosition.lng,
  ]);

  const mapLatitude = +(searchParams.get('lat') ?? 0);
  const mapLongitude = +(searchParams.get('lng') ?? 0);

  useEffect(() => {
    if (mapLatitude && mapLongitude) {
      setMapPosition([mapLatitude, mapLongitude]);
    }
  }, [mapLatitude, mapLongitude]);

  useEffect(() => {
    if (position) {
      setMapPosition([position.lat, position.lng]);
    }
  }, [position]);

  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button color="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        // center={position}
        center={[mapLatitude, mapLongitude]}
        zoom={6}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.emoji} </span>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          );
        })}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngTuple }) {
  const map = useMap();

  map.setView(position, 6);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  // Detect click event on the map
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
}

export default Map;
