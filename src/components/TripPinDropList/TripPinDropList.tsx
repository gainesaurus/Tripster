import React from 'react';
import PinDropItem from '../PinDropItem/PinDropItem';
import styles from './TripPinDropList.module.css';

function TripPinDrop () {
  return (
    <div className={styles.Container}>
      <h1 className={styles.locationTitle}>Locations</h1>
      <div className={styles.pinListContainer}>
        <PinDropItem />
        <PinDropItem />
        <PinDropItem />
      </div>
    </div>
  )
}

export default TripPinDrop;