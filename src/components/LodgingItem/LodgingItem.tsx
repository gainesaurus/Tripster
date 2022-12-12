import React, { FC } from 'react';
import styles from './LodgingItem.module.css';
import { ILodge } from '../../../Types';
import { Cottage } from '@mui/icons-material';


interface LodgingItemProps{
  lodge: ILodge
}
const LodgingItem: FC<LodgingItemProps> = ({ lodge }) => {

  return (
    <div className={styles.lodgingContainer}>
      <div className={styles.iconWrapper}>
        <Cottage className={styles.cottageIcon} fontSize='inherit'></Cottage>
      </div>
      <div className={styles.lodgingInfo}>
        <section className={styles.title}>
          {lodge.title}
        </section>
        <section className={styles.address}>
          {lodge.address}
        </section>
        {
          lodge.latLng &&
          <a
          className={styles.lodgeLink}
          href={`https://www.google.com/maps/search/?api=1&query=${lodge.latLng.lat}%2C${lodge.latLng.lng}`}>
          Get directions</a>
        }
      </div>
    </div>
  )
}

export default LodgingItem;
