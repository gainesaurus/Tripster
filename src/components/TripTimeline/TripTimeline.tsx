import React from 'react';
import styles from './TripTimeline.module.css';

function TripTimeline () {

  return (
    <div className={styles.timelineContainer}>
      <h1 className={styles.timelineTitle}>Event Timeline:</h1>
      <picture className={styles.tripHeadImage} >
        <source srcSet='https://reactjsexample.com/content/images/2018/04/react-time-line.png' type='image/webp' />
        <img src='https://reactjsexample.com/content/images/2018/04/react-time-line.png' alt='trip-photo' />
      </picture>
    </div>
  )
}

export default TripTimeline;