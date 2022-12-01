import React from 'react';
import TripList from '../TripList/TripList';
import { ITripItem } from '../../../Types';
import { AddBox } from '@mui/icons-material';

import styles from './HomeLeft.module.css';

type HomeLeftProps = {
  currentTrips: ITripItem[];
  upcomingTrips: ITripItem[];
  pastTrips: ITripItem[];
  openForm: any;
};

function HomeLeft({ currentTrips, upcomingTrips, pastTrips, openForm }: HomeLeftProps) {
  console.log(currentTrips, pastTrips, upcomingTrips);


  return (
    <div className={styles.homeLeft}>
      <div className={styles.tripsTitleBox}>
        <h2 className={styles.tripsTitle}>My Trips:</h2>
        <button className={styles.addTripBtn} title="Add Trip" onClick={openForm}>
          <AddBox className={styles.addIcon}/>
        </button>
      </div>
      {
        currentTrips && currentTrips.length > 0 ?
        <TripList trips={currentTrips} title={'Current Trips'} /> : <></>
      }
      {
        upcomingTrips && upcomingTrips.length > 0 ?
        <TripList trips={upcomingTrips} title={'Upcoming Trips'} /> : <></>
      }
      {
        pastTrips && pastTrips.length > 0 ?
        <TripList trips={pastTrips} title={'Memories'} /> : <></>
      }
    </div>
  );
}

export default HomeLeft;
