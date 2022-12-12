import { AddBox } from '@mui/icons-material';
import { useTripsContext } from '../../Contexts/TripsContext';
import TripList from '../TripList/TripList';

import styles from './HomeLeft.module.css';

type HomeLeftProps = {
  openForm?: () => void;
};

function HomeLeft({ openForm }: HomeLeftProps) {
  const context = useTripsContext();

  return (
    <div className={styles.homeLeft}>
      <div className={styles.tripsTitleBox}>
        <h2 className={styles.tripsTitle}>My Trips:</h2>
        <button
          className={styles.addTripBtn}
          title="Add Trip"
          onClick={openForm}
        >
          <AddBox className={styles.addIcon} />
        </button>
      </div>
      {context.currentTrips.length > 0 ? (
        <TripList trips={context.currentTrips} title={'Current Trips:'} />
      ) : (
        null
      )}
      {context.upcomingTrips.length > 0 ? (
        <TripList trips={context.upcomingTrips} title={'Upcoming Trips:'} />
      ) : (
        null
      )}
      {context.pastTrips.length > 0 ? (
        <TripList trips={context.pastTrips} title={'Memories:'} />
      ) : (
        null
      )}
    </div>
  );
}

export default HomeLeft;
