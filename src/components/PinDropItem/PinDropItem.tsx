import React, { FC, useEffect, useState, useRef } from 'react';
import styles from './PinDropItem.module.css';
import Image from 'next/image';
import { ILocation, IUser } from '../../../Types';
import { getUser } from '../../services/userService';

import { GoogleMap, Marker } from '@react-google-maps/api';

interface PinDropItemProps {
  location: ILocation;
}
const PinDropItem: FC<PinDropItemProps> =({ location }) => {
  const ref = useRef<any>();
  const [user, setUser] = useState<IUser>();
  useEffect(()=> {
    retrieveUser()
  }, []);
  const retrieveUser = async () => {
    const user = await getUser(location.uid as string);
    setUser(user as IUser);
  }

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
      {
        user && user.profile_pic !== '/add_photo.png' ?
        <div className={styles.profileBox}>
          <Image className={styles.profilePic} width={500} height={500} src={`${user.profile_pic}`} alt={'profile pic'} />
        </div>
        :
          <p className={styles.userEmail}>posted by:{user?.email}</p>
      }

    </div>
  )
}

export default PinDropItem;