import React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';

import styles from './TimeLineItem.module.css';


function TimeLineItem ({ event }: any) {

  return (
    <div className={styles.timeline}>
      {/* <h4 className={styles.timelineDate}>Thursday, 6 Sept</h4> */}
      <div className={styles.timelineItem}>
        <h4>
          09:30am
        </h4>
          <div className={styles.timelineIcon}>
            <RestaurantIcon />
          </div>
        <h3 className={styles.timelineContent}>
          {event.text}
        </h3>
      </div>
    </div>
  )
}

export default TimeLineItem;