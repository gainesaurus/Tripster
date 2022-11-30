import React, { useState } from 'react';
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
  const [clicked, setClicked] = useState(false);
  const dateTime = (DateTime.fromISO(event.ts).toLocaleString(DateTime.TIME_SIMPLE));

  const eventResize = () => {
    if (!clicked) {
      document.getElementById(`${event._id}info`)!.style.height = 'fit-content';
      document.getElementById(`${event._id}info`)!.style.visibility = 'visible';
      setClicked(true);
    } else {
      document.getElementById(`${event._id}info`)!.style.height = '0';
      document.getElementById(`${event._id}info`)!.style.visibility = 'hidden';
      setClicked(false);
    }
  }

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
        <div id={`${event._id}card`} className={styles.timelineContent} onClick={eventResize}>
          <h3 className={styles.eventTitle}>{event.title}</h3>
          <div id={`${event._id}info`} className={styles.eventInfo}>
            <p>{event.info}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineItem;