import { Dispatch, FC, SetStateAction } from 'react';
import { ITripItem } from '../../../Types';
import { useTripsContext } from '../../Contexts/TripsContext';
import { useUserContext } from '../../Contexts/UserContext';
import { respondInvite } from '../../services/inviteService';
import { DateTime } from 'luxon';
import styles from './TripInviteItem.module.css';

interface TripItemProps {
  trip: ITripItem;
  setUpdateTrips: Dispatch<SetStateAction<boolean>>;
}

const TripInviteItem: FC<TripItemProps> = ({ trip, setUpdateTrips }) => {
  const tripsContext = useTripsContext();
  const created_by = 'Jane Doe';
  const userContext = useUserContext();
  async function handleResponseInvite(response: boolean) {
    if (userContext.authUser && trip._id)
      respondInvite(trip._id, response, userContext.authUser.token).then(() => {
        tripsContext.setTripAdded(true);
        setUpdateTrips((state) => !state);
      });
  }
  const startDate = DateTime.fromISO(`${trip.startDate}`);
  const endDate = DateTime.fromISO(`${trip.endDate}`);
  let start = startDate.toLocaleString(DateTime.DATETIME_MED);
  start = start.slice(0, 12);
  let end = endDate.toLocaleString(DateTime.DATETIME_MED);
  end = end.slice(0, 12);

  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${trip.picUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className={styles.heading}>
        <h1 className={styles.headingItem}>{trip.title}</h1>
        <h3 className={styles.headingItem}>
          {start} - {end}
        </h3>
      </div>
      <div className={styles.footer}>
        <img
          src="https://steinhardt.nyu.edu/sites/default/files/styles/nyu_profile_image/public/2020-10/AlyssaWise-NewSquareProfile.jpg?h=e9176a28&itok=F0T9f1FO"
          alt="invite profile picture"
          className={styles.inviteProfileImage}
        />
        <h5 className={styles.headingItem}>Invited by: {created_by}</h5>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.button}
            onClick={async () => await handleResponseInvite(true)}
          >
            Accept
          </button>
          <button
            className={styles.button}
            onClick={async () => await handleResponseInvite(false)}
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripInviteItem;
