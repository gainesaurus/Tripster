import React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { DateTime } from "luxon";

import styles from './TimeLineItem.module.css';


function TimeLineItem ({ event }: any) {

  const dateTime = (DateTime.fromISO(event.ts).toLocaleString(DateTime.TIME_SIMPLE));

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineItem}>
        <h4>
          {dateTime}
        </h4>
          <div className={styles.timelineIcon}>
            <RestaurantIcon />
          </div>
        <h3 className={styles.timelineContent}>
          {event.text}
        </h3>
      </div>
    </div>
  )
}

export default TimeLineItem;