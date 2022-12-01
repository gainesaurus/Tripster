import { useTripsContext } from '../../Contexts/TripsContext';
import TripList from '../TripList/TripList';
import styles from './HomeLeft.module.css';

function HomeLeft() {
  const context = useTripsContext();

  return (
    <div className={styles.homeLeft}>
      {context.currentTrips.length > 0 ? (
        <TripList trips={context.currentTrips} title={'Current Trips'} />
      ) : (
        <></>
      )}
      {context.upcomingTrips.length > 0 ? (
        <TripList trips={context.upcomingTrips} title={'Upcoming Trips'} />
      ) : (
        <></>
      )}
      {context.pastTrips.length > 0 ? (
        <TripList trips={context.pastTrips} title={'Memories'} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default HomeLeft;
