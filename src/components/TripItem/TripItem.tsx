import React, { FC } from 'react';
import styles from './TripItem.module.css';
import { ITripItem } from '../../../Types';

interface TripItemProps {
  item: ITripItem;
}

const TripItem: FC<TripItemProps> = ({ item }) => {
  return (
    <div className={styles.card}
      style={{
        backgroundImage: `url(${item.pic_url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }
    }>
      <div className={styles.heading}>
        <h1 className={styles.headingItem}>{item.title}</h1>
        <h3 className={styles.headingItem}>{item.startDate} - {item.endDate}</h3>
      </div>
    </div>
  )
}

export default TripItem;
