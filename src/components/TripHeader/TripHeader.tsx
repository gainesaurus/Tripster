import React, { FC } from 'react';
import { DateTime } from "luxon";

import styles from './TripHeader.module.css';

interface TripHeaderProps {
  title: string,
  start: string,
  end: string,
  pic: string
}

const TripHeader: FC<TripHeaderProps> = ({title, start, end, pic}) => {

  const eventStart = (DateTime.fromISO(start).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));
  const eventEnd = (DateTime.fromISO(end).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));

  return (
    <div
    className={styles.tripHeadContainer}
    style={{
      backgroundImage: `url(${pic})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
    >
      <div className={styles.tripHeadTitle}>
        <h2 className={styles.tripTitle}>{title}</h2>
        <h3 className={styles.tripTitle}><>{eventStart} - {eventEnd}</></h3>
      </div>
    </div>
  )
}

export default TripHeader;