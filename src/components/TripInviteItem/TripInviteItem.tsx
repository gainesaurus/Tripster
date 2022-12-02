import { FC } from 'react';
import { ITripItem } from '../../../Types';
import { useUserContext } from '../../Contexts/UserContext';
import { respondInvite } from '../../services/inviteService';
import styles from './TripInviteItem.module.css';

interface TripItemProps {
  trip: ITripItem;
}

const TripInviteItem: FC<TripItemProps> = ({ trip }) => {
  const created_by = 'Jane Doe';
  const userContext = useUserContext();
  async function handleResponseInvite(response: boolean) {
    if (userContext.authUser && trip._id)
      respondInvite(trip._id, response, userContext.authUser.token);
  }

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
          {trip.startDate} - {trip.endDate}
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
