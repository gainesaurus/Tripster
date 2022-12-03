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


  const mockEvents = [
    {_id: 12, startTime: "2022-09-16T12:20:46.587Z", endTime: "2022-09-16T12:21:46.587Z", title: 'Pickup Scott at the Airport', eventType: 'travel', info: 'Delta Flight# AZ235979. Meet him at Terminal #2!'},
    {_id: 13, startTime: "2022-09-17T12:20:46.587Z", endTime: "2022-09-17T12:21:46.587Z", title: 'Margs on the Patio', eventType: 'other', info: 'Our table is reserved. Ask for the Gainey party.'},
    {_id: 14, startTime: "2022-09-17T12:21:46.587Z", endTime: "2022-09-17T12:22:46.587Z", title: "Cruise on Lake Geneva", eventType: 'leisure', info: 'No swimming gear needed. Just a relaxing cruise!'},
    {_id: 15, startTime: "2022-09-16T12:21:46.587Z", endTime: "2022-09-16T12:22:46.587Z", title: "Skiing Windy Gap", eventType: 'active', info: 'Uncle John has ski equipment enough for everyone, no need to rent!'},
    {_id: 16, startTime: "2022-09-16T12:22:46.587Z", endTime: "2022-09-16T12:23:46.587Z", title: 'Hit the Outlets', eventType: 'shopping', info: 'We have three cars of people going. Contact either Ann, Jim, or William to get a ride!'},
    {_id: 17, startTime: "2022-09-17T12:22:46.587Z", endTime: "2022-09-17T12:23:46.587Z", title: "Breakfast at Curly's Diner", eventType: 'food', info: 'No reservation, just a typical diner. Grab your own table when we get there. PS try the chilaquiles!'},
  ];

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
    <div className={styles.timelineContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.timelineTitle}>Events Timeline:</h1>
        <button onClick={openForm} className={styles.button} title="Add Event">
          <AddBox className={styles.addIcon}/>
        </button>
      </div>
      <div id='addEventForm' className={styles.addEventForm}>
        <AddEventForm tripId={tripId} tripEvent={tripEvent} setTripEvent={setTripEvent} allEvents={allEvents} setAllEvents={setAllEvents} closeForm={closeForm} />
      </div>
      {Object.entries(result).map(([day, events]) => ([
        <h4 key={day} className={styles.timelineDate}>{day}</h4>,
        events.map((event: any) =>
        <TimeLineItem key={event._id} event={event} setAllEvents={setAllEvents}/>
      )]))}
    </div>
  )
}

export default TimeLineList;