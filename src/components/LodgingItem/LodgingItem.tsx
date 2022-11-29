import React, { FC, useEffect, useState } from 'react';
import styles from './LodgingItem.module.css';
import { ILodge } from '../../../Types';
import Image from 'next/image';


interface LodgingItemProps{
  lodge: ILodge
}
const LodgingItem: FC<LodgingItemProps> = ({ lodge }) => {
  const latLng = lodge.latLng.split(',');


  return (
    <div className={styles.lodgingContainer}>
      <Image src={lodge.pic_url} alt='lodge photo' width={150} height={120}/>

      <div className={styles.lodgingInfo}>
        <section className={styles.title}>
          {lodge.title}
        </section>
        <section className={styles.address}>
          {lodge.address}
        </section>
        <a
        className={styles.lodgeLink}
        href={`https://www.google.com/maps/search/?api=1&query=${latLng[0]}%2C${latLng[1]}`}>Get directions</a>
      </div>
    </div>
  )
}

export default LodgingItem;
