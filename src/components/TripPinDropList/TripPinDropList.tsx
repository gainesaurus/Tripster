import React, { FC } from 'react';
import PinDropItem from '../PinDropItem/PinDropItem';
import { ILocation } from '../../../Types';
import styles from './TripPinDropList.module.css';

interface TripPinDropsProps{
  pinDrops: Array<ILocation>
}

const  TripPinDropList: FC<TripPinDropsProps> = ({ pinDrops }) => {
  return (
    <div className={styles.Container}>
      <h1 className={styles.locationTitle}>Locations</h1>
      <div className={styles.pinListContainer}>
        {
          pinDrops.map((location:ILocation, i)=> {
            return  <PinDropItem key={i + 1} location={location} />
          })
        }
      </div>
    </div>
  )
}

export default TripPinDropList;