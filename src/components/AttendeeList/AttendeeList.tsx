import React, { FC } from 'react';
import styles from './AttendeeList.module.css';
import { IUser } from '../../../Types';
import User from '../User/User';

interface AttendeeListProps {
  attendees: IUser[],
}

const AttendeeList: FC<AttendeeListProps> = ({ attendees }) => {

  return (
    <div className={styles.attendeeContainer}>
      <h1 className={styles.attendeeTitle}>Attendees:</h1>
      <div className={styles.attendeeList}>
        {attendees.map((attendingUser: IUser)=> {
          return <User key={attendingUser.id} person={attendingUser}/>
        })}

        {/* <picture>
          <source srcSet='https://steinhardt.nyu.edu/sites/default/files/styles/nyu_profile_image/public/2020-10/AlyssaWise-NewSquareProfile.jpg?h=e9176a28&itok=F0T9f1FO' type='image/webp' />
          <img src ='https://steinhardt.nyu.edu/sites/default/files/styles/nyu_profile_image/public/2020-10/AlyssaWise-NewSquareProfile.jpg?h=e9176a28&itok=F0T9f1FO'
          alt='sarah' className={styles.profilePic} />
        </picture>
        <picture>
          <source srcSet='https://www.fullerton.edu/rebound/_resources/images/James%20Cavitt%20square%20profile.jpg' type='image/webp' />
          <img src ='https://www.fullerton.edu/rebound/_resources/images/James%20Cavitt%20square%20profile.jpg'
          alt='Howie' className={styles.profilePic} />
        </picture>
        <picture>
          <source srcSet='https://www.umass.edu/history/sites/default/files/store/img/cfm/brian-volcanoes-square-profile.jpg' type='image/webp' />
          <img src ='https://www.umass.edu/history/sites/default/files/store/img/cfm/brian-volcanoes-square-profile.jpg'
          alt='Brian' className={styles.profilePic} />
        </picture>
        <picture>
          <source srcSet='https://www.usfca.edu/sites/default/files/styles/1_1_360x360/public/migrated/images/headshots/square_profile_pic.jpeg?h=57024e64&itok=jZh4bPnM' type='image/webp' />
          <img src ='https://www.usfca.edu/sites/default/files/styles/1_1_360x360/public/migrated/images/headshots/square_profile_pic.jpeg?h=57024e64&itok=jZh4bPnM'
          alt='Rebecca' className={styles.profilePic} />
        </picture>
        <picture>
          <source srcSet='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnzimvort8i7zNPU06JVl_6or8ZzojAvGJw&usqp=CAU' type='image/webp' />
          <img src ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnzimvort8i7zNPU06JVl_6or8ZzojAvGJw&usqp=CAU'
          alt='Jordan' className={styles.profilePic} />
        </picture> */}
      </div>
    </div>
  )
}

export default AttendeeList