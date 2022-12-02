import React, { FC, useEffect, useRef } from 'react';
import styles from './PinDropItem.module.css';
import Image from 'next/image';
import { ILocation } from '../../../Types';

import { GoogleMap, Marker } from '@react-google-maps/api';

import { Loader } from '@googlemaps/js-api-loader';

const libraries = ["places"] as any;

interface PinDropItemProps {
  location: ILocation;
}
const PinDropItem: FC<PinDropItemProps> =({ location }) => {
  const ref = useRef<any>();

  // const latLng = location.latLng.split(',');
  // const center = {
  //   lat: Number(latLng[0]),
  //   lng: Number(latLng[1])
  // };
  const center = location.latLng;


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
      </div>
        <a
        className={styles.mapLink}
        href={`https://www.google.com/maps/search/?api=1&query=${location.latLng.lat}%2C${location.latLng.lng}`}>
          Get directions
        </a>
      <div className={styles.ts}>{location.ts + ' '}</div>
      <Image className={styles.profilePic} width={30} height={30} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMmrIA27K-t7Uf9LMW9ZztqY9kb9lGzLKrqw&usqp=CAU`} alt={'user profile pic'} />

    </div>
  )
}

export default PinDropItem;