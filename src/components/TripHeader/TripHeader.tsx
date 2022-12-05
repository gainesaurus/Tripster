import React, { FC } from 'react';
import { DateTime } from "luxon";

import styles from './TripHeader.module.css';

interface TripHeaderProps {
  title: string,
  start: any,
  end: any,
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
      {/* <picture className={styles.tripHeadImage} >
        <source srcSet='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9hZCUyMHRyaXB8ZW58MHx8MHx8&w=1000&q=80' type='image/webp' />
        <img src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9hZCUyMHRyaXB8ZW58MHx8MHx8&w=1000&q=80' alt='trip-photo' />
      </picture> */}
      <div className={styles.tripHeadTitle}>
        <h2 className={styles.tripTitle}>{title}</h2>
        <h3 className={styles.tripTitle}><>{eventStart} - {eventEnd}</></h3>
      </div>
    </div>
  )
}

export default TripHeader;