import React from 'react';
import { DateTime } from "luxon";
import {
  Restaurant,
  DirectionsRun,
  AirlineSeatReclineExtra,
  AttachMoney,
  Luggage,
  ContentPaste,
} from '@mui/icons-material';

import styles from './TimeLineItem.module.css';


function TimeLineItem ({ event }: any) {
  const dateTime = (DateTime.fromISO(event.ts).toLocaleString(DateTime.TIME_SIMPLE));

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineItem}>
        <h4>{dateTime}</h4>
          {event.eventType == 'food' ? <Restaurant className={styles.restaurantIcon} /> : <></>}
          {event.eventType == 'active' ? <DirectionsRun className={styles.activeIcon} /> : <></>}
          {event.eventType == 'leisure' ? <AirlineSeatReclineExtra className={styles.leisureIcon} /> : <></>}
          {event.eventType == 'shopping' ? <AttachMoney className={styles.shopIcon}/> : <></>}
          {event.eventType == 'travel' ? <Luggage className={styles.travelIcon} /> : <></>}
          {event.eventType == 'other' ? <ContentPaste className={styles.otherIcon} /> : <></>}
        <h3 className={styles.timelineContent}>
          {event.title}
        </h3>
      </div>
    </div>
  )
}

export default TimeLineItem;