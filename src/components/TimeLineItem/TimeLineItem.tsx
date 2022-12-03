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
import { useUserContext } from '../../Contexts/UserContext';
import { removeEvent } from '../../services/eventService';

import styles from './TimeLineItem.module.css';

type TimeLineItemProps = {
  event: IEvent;
  setAllEvents:any;
};

function TimeLineItem ({ event, setAllEvents }: TimeLineItemProps) {
  const user = useUserContext();
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

  const deleteEvent = async () => {
    user.authUser && removeEvent(user.authUser.token, event).then((events:any) => {setAllEvents(events)})
  }

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineItem}>
        <h4 className={styles.time}>{dateTime}</h4>
          {event.eventType == 'food' ? <Restaurant className={styles.restaurantIcon} fontSize='large' /> : <></>}
          {event.eventType == 'active' ? <DirectionsRun className={styles.activeIcon} fontSize='large' /> : <></>}
          {event.eventType == 'leisure' ? <AirlineSeatReclineExtra className={styles.leisureIcon} fontSize='large' /> : <></>}
          {event.eventType == 'shopping' ? <AttachMoney className={styles.shopIcon} fontSize='large' /> : <></>}
          {event.eventType == 'travel' ? <Luggage className={styles.travelIcon} fontSize='large' /> : <></>}
          {event.eventType == 'other' ? <ContentPaste className={styles.otherIcon} fontSize='large' /> : <></>}
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