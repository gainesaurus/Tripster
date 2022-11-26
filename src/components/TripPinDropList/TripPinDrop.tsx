import React from 'react';
import styles from './TripPinDrop.module.css';

function TripPinDrop () {
  return (
    <div className={styles.Container}>
      <h1 className={styles.locationTitle}>Locations</h1>
      <div className={styles.pinListContainer}>
        <picture className={styles.pinImage} >
          <source srcSet='https://i.insider.com/5c954296dc67671dc8346930?width=1136&format=jpeg' type='image/webp' />
          <img src='https://i.insider.com/5c954296dc67671dc8346930?width=1136&format=jpeg' alt='pin-location' />
        </picture>
      </div>
    </div>
  )
}

export default TripPinDrop;