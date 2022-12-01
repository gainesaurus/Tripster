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
import { IEvent } from '../../../Types';

import styles from './TimeLineItem.module.css';

type TimeLineItemProps = {
  event: IEvent;
  deleteEvent: any;
};

function TimeLineItem ({ event, deleteEvent }: TimeLineItemProps) {
  const [clicked, setClicked] = useState(false);
  const dateTime = (DateTime.fromISO(event.startTime).toLocaleString(DateTime.TIME_SIMPLE));
  const endTime = (DateTime.fromISO(event.endTime).toLocaleString(DateTime.TIME_SIMPLE));

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
        <h4 className={styles.time}>{dateTime}</h4>
          {event.eventType == 'food' ? <Restaurant className={styles.restaurantIcon} /> : <></>}
          {event.eventType == 'active' ? <DirectionsRun className={styles.activeIcon} /> : <></>}
          {event.eventType == 'leisure' ? <AirlineSeatReclineExtra className={styles.leisureIcon} /> : <></>}
          {event.eventType == 'shopping' ? <AttachMoney className={styles.shopIcon}/> : <></>}
          {event.eventType == 'travel' ? <Luggage className={styles.travelIcon} /> : <></>}
          {event.eventType == 'other' ? <ContentPaste className={styles.otherIcon} /> : <></>}
        <div id={`${event._id}card`} className={styles.timelineContent} onClick={eventResize}>
          <h3 className={styles.eventTitle}>{event.title}</h3>
          <div id={`${event._id}info`} className={styles.eventInfo}>
            <p>{dateTime} - {endTime}</p>
            <p>{event.info}</p>
            <div className={styles.buttonDiv}>
              <button className={styles.editButton} type="button">Edit</button>
              <button className={styles.deleteButton} onClick={deleteEvent}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeLineItem;