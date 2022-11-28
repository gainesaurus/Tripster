import React, { FC } from 'react'
import TripItem from '../TripItem/TripItem';
import styles from './TripList.module.css';

import { ITripItem } from '../../../Types';

interface TripListProps {
  trips: ITripItem[];
}

const TripList: FC<TripListProps> = ({ trips }) => {


  return (
    <div className={styles.listCont}>
      {trips.map((trip:ITripItem) => {
        return <TripItem key={trip.id} trip={trip}/>
      })}
    </div>
  )
}

export default TripList;