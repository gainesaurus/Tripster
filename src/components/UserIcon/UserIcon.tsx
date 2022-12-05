import React, { FC } from 'react';
import styles from './UserIcon.module.css';
import { IUser } from '../../../Types';
import Image from 'next/image'

interface UserProps {
  person: IUser;
}

const TripItem: FC<UserProps> = ({ person }) => {

  return (
    <div
    className={styles.profilePicCont}
    >
      <Image className={styles.profilePic} alt={'profile pic'} src={`${person.profile_pic}`} height={500} width={500} />
    </div>
  )
}

export default TripItem;
