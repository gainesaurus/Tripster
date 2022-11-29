import React, { FC } from 'react';
import styles from './User.module.css';
import { IUser } from '../../../Types';

interface UserProps {
  person: IUser;
}

const TripItem: FC<UserProps> = ({ person }) => {
  console.log(person);

  return (
    <div
    className={styles.profilePic}
    style={{backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9hZCUyMHRyaXB8ZW58MHx8MHx8&w=1000&q=80')`}}>
    </div>
  )
}

export default TripItem;
