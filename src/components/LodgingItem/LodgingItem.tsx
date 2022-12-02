import React, { FC } from 'react';
import styles from './LodgingItem.module.css';
import { ILodge } from '../../../Types';
import Image from 'next/image';
import CottageIcon from '@mui/icons-material/Cottage';


interface LodgingItemProps{
  lodge: ILodge
}
const LodgingItem: FC<LodgingItemProps> = ({ lodge }) => {



  return (
    <div className={styles.lodgingContainer}>
      {/* <Image src={lodge.picUrl} alt='lodge photo' width={150} height={120}/> */}
      <CottageIcon className={styles.cottage}/>

      <div className={styles.lodgingInfo}>
        <section className={styles.title}>
          {lodge.title}
        </section>
        <section className={styles.address}>
          {lodge.address}
        </section>
        <a
        className={styles.lodgeLink}
        href={`https://www.google.com/maps/search/?api=1&query=${lodge.latLng.lat}%2C${lodge.latLng.lng}`}>Get directions</a>
      </div>
    </div>
  )
}

export default LodgingItem;
