import React, { FC } from 'react';
import TripInviteItem from '../TripInviteItem/TripInviteItem';
import styles from './TripInviteList.module.css';

import { ITripItem } from '../../../Types';

interface TripListProps {
  trips: ITripItem[];
  title: string;
}

const TripInviteList: FC<TripListProps> = ({ trips, title }) => {
  return (
    <section>
      <h3 className={styles.header}>{title}</h3>
      <div className={styles.listCont}>
        {trips.map((trip: ITripItem) => {
          return <TripInviteItem key={trip._id} trip={trip} />;
        })}
      </div>
    </section>
  );
};

export default TripInviteList;
