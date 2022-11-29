import React, { FC } from 'react';
import styles from './TripInviteItem.module.css';
import { ITripItem } from '../../../Types';

interface TripItemProps {
  item: ITripItem;
}

const TripInviteItem: FC<TripItemProps> = ({ item }) => {
  const created_by = 'Jane Doe';
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${item.pic_url})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className={styles.heading}>
        <h1 className={styles.headingItem}>{item.title}</h1>
        <h3 className={styles.headingItem}>
          {item.startDate} - {item.endDate}
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
          <button className={styles.button}>Accept</button>
          <button className={styles.button}>Decline</button>
        </div>
      </div>
    </div>
  );
};

export default TripInviteItem;
