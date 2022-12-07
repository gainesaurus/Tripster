import React, { useState, useEffect, FC } from 'react';
import _ from 'lodash';
import { DateTime } from "luxon";

import { AddBox } from '@mui/icons-material';
import TimeLineItem from '../TimeLineItem/TimeLineItem';
import AddEventForm from '../AddEventForm/AddEventForm';
import { IEvent } from '../../../Types';

import { useUserContext } from '../../Contexts/UserContext';
import { getEventsByTripId, createEvent, updateEvent, removeEvent } from '../../services/eventService';

import styles from './TimeLineList.module.css';
interface TimeLineListProps {
  tripId: any;
}
function TimeLineList({ tripId }:TimeLineListProps) {
  const user = useUserContext();
  const [tripEvent, setTripEvent] = useState<IEvent>();
  const [allEvents, setAllEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    user.authUser && getEventsByTripId(user.authUser.token, tripId).then((events:any) => {setAllEvents(events)})
  }, [user.authUser, tripId]);

  const eventDay = (item: any) => (DateTime.fromISO(item.startTime).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));

  const result = _.groupBy(allEvents, eventDay);

  const openForm = () => {
    document.getElementById('addEventForm')!.style.display = 'flex';
  }

  const closeForm = () => {
    document.getElementById('addEventForm')!.style.display = 'none';
  }

  return (
    <div className={styles.timelineContainer} data-testid='timelineContainer'>
      <div className={styles.titleContainer}>
        <h1 className={styles.timelineTitle}>Events Timeline</h1>
        <button onClick={openForm} className={styles.button} title="Add Event">
          <AddBox className={styles.addIcon}/>
        </button>
      </div>
      <div id='addEventForm' className={styles.addEventForm}>
        <AddEventForm tripId={tripId} tripEvent={tripEvent} setTripEvent={setTripEvent} allEvents={allEvents} setAllEvents={setAllEvents} closeForm={closeForm} />
      </div>
      {Object.entries(result).map(([day, events]) => ([
        <h4
          key={day}
          className={styles.timelineDate}
          data-testid='eventDay'
        >
          {day}
        </h4>,
        events.map((event: IEvent) =>
        <TimeLineItem key={event._id} event={event} allEvents={allEvents} setAllEvents={setAllEvents}/>
      )]))}
    </div>
  )
}

export default TimeLineList;