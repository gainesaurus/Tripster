import React, { FC, useState } from 'react';
import styles from './PinDropItem.module.css';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

interface PinDropItemProps {
  location: {
    info: string;
    latLng: string;
  }
}
const PinDropItem: FC<PinDropItemProps> =({ location }) => {
  const latLng = location.latLng.split(',');

  const mapStyle = {
    width: '200px',
    height: '400px',
  };
  const center = {
    lat: Number(latLng[0]),
    lng: Number(latLng[1])
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  })

  return (
    <div className={styles.pinDropContainer}>

        {
          isLoaded?
          <GoogleMap
          mapContainerStyle={mapStyle}
          center={center}
          zoom={10}
          >
            <Marker position={center} />
          </GoogleMap> : <></>
        }
        <div className={styles.pinDropInfo}>{location.info}</div>

    </div>
  )
}
<script src="https://maps.googleapis.com/maps/api/js?key=[YOUR_API_KEY]&callback=initialize" async defer></script>

export default PinDropItem;