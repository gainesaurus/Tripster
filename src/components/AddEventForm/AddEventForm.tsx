import React from 'react';
import { Close } from '@mui/icons-material';
import { useUserContext } from '../../Contexts/UserContext';
import { createEvent } from '../../services/eventService';

import styles from './AddEventForm.module.css';

function AddEventForm ({ tripId, closeForm, tripEvent, setTripEvent, allEvents, setAllEvents }: any) {
  const user = useUserContext();

  const submitEvent = (e:any) => {
    e.preventDefault();
    user.authUser && tripEvent && createEvent(user.authUser.token, tripEvent, tripId).then((event) => {setAllEvents([...allEvents, event])})
    e.target.reset()
    closeForm();
  }

  return (
    <div className={styles.addEventContainer}>
      <form className={styles.infoContainer} onSubmit={submitEvent}>
        <button className={styles.XButton} onClick={closeForm}><Close /></button>
        <h2>Add an Event</h2>
        <h3 className={styles.formHeading}>Event Title:</h3>
          <input required className={styles.input} name='title' type='text' placeholder="Name of the Event..." onChange={(e)=>setTripEvent({...tripEvent, title:e.target.value})}/>
        <h3 className={styles.formHeading}>Start Time:</h3>
          <input required className={styles.input} name='startTime' type='datetime-local' onChange={(e)=>setTripEvent({...tripEvent, startTime:e.target.value})} />
        <h3 className={styles.formHeading}>End Time:</h3>
          <input required className={styles.input} name='endTime' type='datetime-local' onChange={(e)=>setTripEvent({...tripEvent, endTime:e.target.value})}/>
        <h3 className={styles.formHeading}>Event Type:</h3>
          <select required name="eventType" id="eventType" className={styles.select} onChange={(e)=>setTripEvent({...tripEvent, eventType:e.target.value})}>
            <option value="other">other</option>
            <option value="food">food</option>
            <option value="active">active</option>
            <option value="leisure">leisure</option>
            <option value="shopping">shopping</option>
            <option value="travel">travel</option>
          </select>
        <h3 className={styles.formHeading}>Event Info:</h3>
          <textarea required className={styles.textarea} name='info' placeholder="What do we need to know..." onChange={(e)=>setTripEvent({...tripEvent, info:e.target.value})}/>
        <div className={styles.buttonDiv}>
          <button className={styles.submitButton} type="submit">Save Event</button>
        </div>
      </form>
    </div>
  )
}

export default AddEventForm;