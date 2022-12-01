import React, { FC } from 'react';
import { DateTime } from "luxon";
import styles from './TripItem.module.css';
import { ITripItem } from '../../../Types';

import Link from 'next/link';

interface TripItemProps {
  trip: ITripItem;
}

const TripItem: FC<TripItemProps> = ({ trip }) => {

  const tripStart = (DateTime.fromISO(trip.startDate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));

  const tripEnd = (DateTime.fromISO(trip.endDate).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));

  return (
    <Link href='/trip/id' as={`/trip/${trip._id}`}>
      <div className={styles.card}
        style={{
          backgroundImage: `url(${trip.picUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }
      }>
        <div className={styles.heading}>
          <h1 className={styles.headingItem}>{trip.title}</h1>
          <h3 className={styles.headingItem}>{tripStart} - {tripEnd}</h3>
        </div>
      </div>
    </Link>
  )
}

export default TripItem;
