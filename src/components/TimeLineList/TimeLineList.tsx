import React from 'react';
import TimeLineItem from '../TimeLineItem/TimeLineItem';
import _ from 'lodash';
import { DateTime } from "luxon";

import styles from './TimeLineList.module.css';

function TimeLineList () {

  const events = [
    {ts: "2022-09-16T12:21:46.587Z", text: "Skiing Windy Gap"},
    {ts: "2022-09-17T12:22:46.587Z", text: "Breakfast at Curly's Diner"},
    {ts: "2022-09-17T12:21:46.587Z", text: "Booze Cruise on Lake Geneva"},
    {ts: "2022-09-16T12:22:46.587Z", text: 'Dinner'},
    {ts: "2022-09-17T12:20:46.587Z", text: 'Taco Bar and Margs'},
    {ts: "2022-09-16T12:20:46.587Z", text: 'Lunch'},
  ];

  const formatDay = (date:any) => {
    date.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY);
  }

  const eventDay = (item: any) => (DateTime.fromISO(item.ts).toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY));

  const result = _.groupBy(events, eventDay);
  console.log(result)

  return (
    <div className={styles.timelineContainer}>
      <>
        <h1 className={styles.timelineTitle}>Events Timeline:</h1>
        {Object.keys(result).map((day:string) => ([
          <h4 key={day} className={styles.timelineDate}>{day}</h4>,
          result[day].map((event: any) =>
          <TimeLineItem key={event.ts} event={event} />
        )]))}
      </>
    </div>
  )
}

export default TimeLineList;