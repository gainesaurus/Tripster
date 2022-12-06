import { Close } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useUserContext } from '../../Contexts/UserContext';
import { inviteToTrip } from '../../services/inviteService';
import SearchBar from '../SearchBar/SearchBar';

import styles from './AddAttendeeForm.module.css';

interface AddAttendeeFormProps {
  attendees?: string[];
  invites?: string[];
  setInvites?: Dispatch<SetStateAction<string[]>>;
}

function AddAttendeeForm({
  attendees,
  invites,
  setInvites,
}: AddAttendeeFormProps) {
  const [newAttendees, setNewAttendees] = useState<string[]>([]);
  const router = useRouter();
  const { id } = router.query;
  const userContext = useUserContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    newAttendees.forEach((attendee) => {
      userContext.authUser &&
        id &&
        attendees &&
        !attendees.includes(attendee) &&
        inviteToTrip(attendee, id.toString(), userContext.authUser.token);
    });
    setInvites && setInvites(newAttendees);
    closeForm(e);
  };

  const closeForm = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById('addAttendeeForm')!.style.display = 'none';
  };

  return (
    <div id="addAttendeeForm" className={styles.addAttendeeForm}>
      <div className={styles.addAttendeeContainer}>
        <div className={styles.infoContainer}>
          <button className={styles.XButton} onClick={closeForm}>
            <Close />
          </button>
          <h2>Invite friends</h2>
          <SearchBar
            attendees={attendees}
            setNewAttendees={setNewAttendees}
            invites={invites}
          />
          <button
            className={styles.submitButton}
            type="submit"
            onClick={handleSubmit}
          >
            Invite friends
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAttendeeForm;
