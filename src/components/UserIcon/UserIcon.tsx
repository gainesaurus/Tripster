import React, { FC } from 'react';
import styles from './UserIcon.module.css';
import { IUser } from '../../../Types';
import Image from 'next/image'
import { AccountCircle } from '@mui/icons-material';

interface UserProps {
  person: IUser;
}

const TripItem: FC<UserProps> = ({ person }) => {

  return (
    <>
      {
        person.profile_pic !== '/add_photo.png'?
        <div
        className={styles.profilePicCont}
        >
          <Image className={styles.profilePic} alt={'profile pic'} src={`${person.profile_pic}`} height={500} width={500} title={person.username} />
        </div>
        :
        <div className={styles.attendeeBox}>
          <div
          className={styles.userIconCont}
          >
          </div>
          <p className={styles.name}>{person.email}</p>
        </div>
      }
    </>
  )
}

export default TripItem;
