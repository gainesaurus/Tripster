import React, { FC } from 'react';

import styles from './TripHeader.module.css';

interface TripHeaderProps {
  title: string,
  start: string,
  end: string,
  pic: string
}

const TripHeader: FC<TripHeaderProps> = ({title, start, end, pic}) => {

  return (
    <div
    className={styles.tripHeadContainer}
    style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9hZCUyMHRyaXB8ZW58MHx8MHx8&w=1000&q=80')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
    >
      {/* <picture className={styles.tripHeadImage} >
        <source srcSet='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9hZCUyMHRyaXB8ZW58MHx8MHx8&w=1000&q=80' type='image/webp' />
        <img src='https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cm9hZCUyMHRyaXB8ZW58MHx8MHx8&w=1000&q=80' alt='trip-photo' />
      </picture> */}
      <div className={styles.tripHeadTitle}>
        <h2 className={styles.tripTitle}>{title}</h2>
        <h3 className={styles.tripDate}>{start} - {end}</h3>
      </div>
    </div>
  )
}

export default TripHeader;