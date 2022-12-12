import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ITripItem, IUser } from '../../../Types';
import { useTripsContext } from '../../Contexts/TripsContext';
import { useUserContext } from '../../Contexts/UserContext';
import { respondInvite } from '../../services/inviteService';
import { DateTime } from 'luxon';
import styles from './TripInviteItem.module.css';
import { getUser } from '../../services/userService';
import Image from 'next/image';

interface TripItemProps {
  trip: ITripItem;
  setUpdateTrips: Dispatch<SetStateAction<boolean>>;
}

const TripInviteItem: FC<TripItemProps> = ({ trip, setUpdateTrips }) => {
  const [host, setHost] = useState<IUser | void>();
  const tripsContext = useTripsContext();

  const userContext = useUserContext();
  async function handleResponseInvite(response: boolean) {
    if (userContext.authUser && trip._id)
      respondInvite(trip._id, response, userContext.authUser.token).then(() => {
        tripsContext.setTripAdded(true);
        setUpdateTrips((state) => !state);
      });
  }

  useEffect(() => {
    getUser(trip.createdBy!).then((hostUser) => setHost(hostUser));
  }, [])

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
        {
          host && host.profile_pic !== '/add_photo.png' ?
          <div className={styles.profileBox}>
            <Image className={styles.inviteProfileImage} width={500} height={500} src={`${host.profile_pic}`} alt={'profile pic'} />
          </div> : null
        }
        <h5 className={styles.headingItem}>Hosted by: {host?.username}</h5>
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
