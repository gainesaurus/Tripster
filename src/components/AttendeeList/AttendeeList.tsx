import { AddBox } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { IUser } from '../../../Types';
import { useUserContext } from '../../Contexts/UserContext';
import AddAttendeeForm from '../AddAttendeeForm/AddAttendeeForm';
import User from '../UserIcon/UserIcon';
import styles from './AttendeeList.module.css';

interface AttendeeListProps {
  attendees?: string[];
  attendeesObj: (void | IUser)[];
  invites?: string[];
}

const AttendeeList: FC<AttendeeListProps> = ({ attendeesObj, attendees, invites }) => {
  const [attendeesList, setAttendeesList] = useState<IUser[]>(attendeesObj as IUser[]);

  const openForm = () => {
    document.getElementById('addAttendeeForm')!.style.display = 'flex';
  };

  return (
    <div className={styles.attendeeContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.attendeeTitle}>Attendees</h1>
        <button
          onClick={openForm}
          className={styles.button}
          title="Add Attendee"
        >
          <AddBox className={styles.addIcon} />
        </button>
      </div>

      <AddAttendeeForm attendees={attendees} invites={invites} />
      <div className={styles.attendeeList}>
        {attendeesList.map((attendingUser: IUser, i) => {
          return <User key={attendingUser._id} person={attendingUser} />;
        })}
      </div>
    </div>
  );
};

export default AttendeeList;
