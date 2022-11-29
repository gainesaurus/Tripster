import React, { FC } from 'react';
import TripItem from '../TripItem/TripItem';
import styles from './TripList.module.css';

import { ITripItem } from '../../../Types';

interface TripListProps {
  trips: ITripItem[];
  title: string;
}

const TripList: FC<TripListProps> = ({ trips, title }) => {
  return (
    <section>
      <h3 className={styles.header}>{title}</h3>
      <div className={styles.listCont}>
        {trips.map((item: ITripItem) => {
          return <TripItem key={item.id} trip={item} />;
        })}
      </div>
    </section>
  );
};

export default TripList;
