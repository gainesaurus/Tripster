import React, { FC, useEffect, useRef } from 'react';
import styles from './PinDropItem.module.css';
import { ILocation } from '../../../Types';

import { GoogleMap, Marker } from '@react-google-maps/api';

import { Loader } from '@googlemaps/js-api-loader';

const libraries = ["places"] as any;

interface PinDropItemProps {
  location: ILocation;
}
const PinDropItem: FC<PinDropItemProps> =({ location }) => {
  const ref = useRef<any>();

  const latLng = location.latLng.split(',');
  const center = {
    lat: Number(latLng[0]),
    lng: Number(latLng[1])
  };

  const mapStyle = {
    height: '130%',
    width: '100%',
  }
  const options = {
    fullscreenControl: false
  }

  return (
    <div className={styles.pinDropContainer}>

      <div className={styles.mapBox} id='map-box' ref={ref}>

        {
          <GoogleMap
          mapContainerStyle={mapStyle}
          center={center}
          zoom={12}
          options={options}
          >
            <Marker
            position={center}
            />
          </GoogleMap>
        }
      </div>


      <div className={styles.pinDropInfo}>
        {location.info + ' '}
        <a
        className={styles.mapLink}
        href={`https://www.google.com/maps/search/?api=1&query=${latLng[0]}%2C${latLng[1]}`}>
          Get directions
        </a>
      </div>
      <div className={styles.ts}>{location.ts + ' '}</div>
    </div>
  )
}

export default PinDropItem;