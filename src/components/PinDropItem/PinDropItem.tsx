import React, { FC, useEffect, useRef } from 'react';
import styles from './PinDropItem.module.css';
import Image from 'next/image';
import { ILocation } from '../../../Types';

import { GoogleMap, Marker } from '@react-google-maps/api';

const libraries = ["places"] as any;

interface PinDropItemProps {
  location: ILocation;
}
const PinDropItem: FC<PinDropItemProps> =({ location }) => {
  const ref = useRef<any>();

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
          location &&
          <GoogleMap
          mapContainerStyle={mapStyle}
          center={location.latLng}
          zoom={12}
          options={options}
          >
            <Marker
            position={location.latLng}
            />
          </GoogleMap>
        }
      </div>

      <div className={styles.pinDropInfo}>
        {location && location.info}
      </div>
      {
        location &&
        <a
        className={styles.mapLink}
        href={`https://www.google.com/maps/search/?api=1&query=${location.latLng.lat}%2C${location.latLng.lng}`}>
          Get directions
        </a>
      }
      <div className={styles.ts}>{location && location.ts && location.ts}</div>
      <Image className={styles.profilePic} width={30} height={30} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmrIA27K-t7Uf9LMW9ZztqY9kb9lGzLKrqw&usqp=CAU`} alt={'user profile pic'} />

    </div>
  )
}

export default PinDropItem;