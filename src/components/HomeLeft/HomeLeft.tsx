import React from 'react';
import TripList from '../TripList/TripList';
import styles from './HomeLeft.module.css';
import { ITripItem } from '../../../Types';

type HomeLeftProps = {
  currentTrips: ITripItem[];
  upcomingTrips: ITripItem[];
  pastTrips: ITripItem[];
};

function HomeLeft({ currentTrips, upcomingTrips, pastTrips }: HomeLeftProps) {
  console.log(currentTrips, pastTrips, upcomingTrips);
  return (
    <div className={styles.homeLeft}>
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
