import { useTripsContext } from '../../Contexts/TripsContext';
import TripList from '../TripList/TripList';
import { ITripItem } from '../../../Types';
import { AddBox } from '@mui/icons-material';

import styles from './HomeLeft.module.css';

type HomeLeftProps = {
  openForm: any;
};

function HomeLeft({ openForm }: HomeLeftProps) {
  const context = useTripsContext();
  
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
        <TripList trips={context.currentTrips} title={'Current Trips'} /> : <></>
      }
      {
        upcomingTrips && upcomingTrips.length > 0 ?
        <TripList trips={context.upcomingTrips} title={'Upcoming Trips'} /> : <></>
      }
      {
        pastTrips && pastTrips.length > 0 ?
        <TripList trips={context.pastTrips} title={'Memories'} /> : <></>
      }
    </div>
  );
}

export default HomeLeft;
