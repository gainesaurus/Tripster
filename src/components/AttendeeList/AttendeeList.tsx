import { AddBox } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { FC, FormEvent, useEffect, useState } from 'react';
import { ITripItem, IUser } from '../../../Types';
import { useUserContext } from '../../Contexts/UserContext';
import { inviteToTrip } from '../../services/inviteService';
import { getUser } from '../../services/userService';
import AddAttendeeForm from '../AddAttendeeForm/AddAttendeeForm';
import User from '../UserIcon/UserIcon';
import styles from './AttendeeList.module.css';

interface AttendeeListProps {
  attendees: string[];
}

const AttendeeList: FC<AttendeeListProps> = ({ attendees }) => {
  const [attendeesList, setAttendeesList] = useState<IUser[]>([]);
  const [uid, setUid] = useState('');
  const userContext = useUserContext();
  const router = useRouter();
  const tripId = router.query.id;

  useEffect(() => {
    attendees.forEach(async (uid) => {
      const user = await getUser(uid);
      user && setAttendeesList((attendees) => [...attendees, user]);
    });
  }, [attendees]);

  const openForm = () => {
    document.getElementById('addAttendeeForm')!.style.display = 'flex';
  };

  const closeForm = () => {
    document.getElementById('addAttendeeForm')!.style.display = 'none';
  };

  const submitAttendee = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userContext.authUser && tripId) {
      inviteToTrip(uid, tripId.toString(), userContext.authUser?.token).then(
        (trip: ITripItem | void) => {
          trip && trip.attendees && attendees.push(uid);
        },
      );
      // TODO: clear from
      closeForm();
    }
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
      <div id="addAttendeeForm" className={styles.addAttendeeForm}>
        <AddAttendeeForm
          closeForm={closeForm}
          submitAttendee={submitAttendee}
        />
      </div>
      <div className={styles.attendeeList}>
        {attendeesList.map((attendingUser: IUser) => {
          return <User key={attendingUser._id} person={attendingUser} />;
        })}
      </div>
    </div>
  );
};

export default AttendeeList;
