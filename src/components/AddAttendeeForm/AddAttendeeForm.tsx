import { Close } from '@mui/icons-material';
import SearchBar from '../SearchBar/SearchBar';

import styles from './AddAttendeeForm.module.css';

function AddAttendeeForm({ closeForm, submitAttendee }: any) {
  return (
    <div className={styles.addAttendeeContainer}>
      <form className={styles.infoContainer} onSubmit={submitAttendee}>
        <button className={styles.XButton} onClick={closeForm}>
          <Close />
        </button>
        <h2>Add an Attendee</h2>
        <SearchBar />
      </form>
    </div>
  );
}

export default AddAttendeeForm;
