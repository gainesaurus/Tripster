import React, { FC } from 'react';
import styles from './PinDropItem.module.css';
import { ILocation } from '../../../Types';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface PinDropItemProps {
  location: ILocation;
}
const PinDropItem: FC<PinDropItemProps> =({ location }) => {
  const latLng = location.latLng.split(',');

  const mapStyle = {
    width: '100%',
    height: '100%',
  };
  const center = {
    lat: Number(latLng[0]),
    lng: Number(latLng[1])
  };
  const mapOptions = {
    fullscreenControl: false,
    keyboardShortcuts: false,
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  return (
    <div className={styles.pinDropContainer}>
      {
        isLoaded?
        <GoogleMap
        mapContainerStyle={mapStyle}
        center={center}
        zoom={13}
        options={mapOptions}
        >
          <Marker
          position={center}
          />
        </GoogleMap> : <></>
      }

      <div className={styles.pinDropInfo}>
        {location.info + ' '}
        <a
        className={styles.mapLink}
        href={`https://www.google.com/maps/search/?api=1&query=${latLng[0]}%2C${latLng[1]}`}>Get directions</a>
      </div>
      <div className={styles.ts}>{location.ts + ' '}</div>
    </div>
  )
}

export default PinDropItem;