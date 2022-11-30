import React, { FC } from 'react';
import styles from './AttendeeList.module.css';
import { IUser } from '../../../Types';
import User from '../UserIcon/UserIcon';

interface AttendeeListProps {
  attendees: IUser[],
}

const AttendeeList: FC<AttendeeListProps> = ({ attendees }) => {

  return (
    <div className={styles.attendeeContainer}>
      <h1 className={styles.attendeeTitle}>Attendees:</h1>
      <div className={styles.attendeeList}>
        {attendees.map((attendingUser: IUser)=> {
          return <User key={attendingUser._id} person={attendingUser}/>
        })}

      </div>
    </div>
  )
}

export default AttendeeList