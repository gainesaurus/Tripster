import React, { FC } from 'react';
import styles from './User.module.css';
import { IUser } from '../../../Types';

interface UserProps {
  person: IUser;
}

const TripItem: FC<UserProps> = ({ person }) => {

  return (
    <div
    className={styles.profilePic}
    style={{backgroundImage: `url(${person.profile_pic})`}}>
    </div>
  )
}

export default TripItem;
