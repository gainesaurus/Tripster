import React from 'react';
import TripList from '../TripList/TripList';
import styles from './HomeLeft.module.css';
import { ITripItem } from '../../../Types';

type HomeLeftProps = {
  currentTrips: ITripItem[];
  pastTrips: ITripItem[];
};

function HomeLeft({ currentTrips, pastTrips }: HomeLeftProps) {
  return (
    <div className={styles.homeLeft}>
      <TripList trips={currentTrips} title={'Upcoming Trips'} />
      <TripList trips={pastTrips} title={'Memories'} />
    </div>
  );
}

export default HomeLeft;
