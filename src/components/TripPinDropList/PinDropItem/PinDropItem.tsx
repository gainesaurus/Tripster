import React from 'react';

import styles from './PinDropItem.module.css';

function PinDropItem () {

  return (
    <div className={styles.pinDropContainer}>
      <picture className={styles.pinImage} >
        <source srcSet='https://i.insider.com/5c954296dc67671dc8346930?width=1136&format=jpeg' type='image/webp' />
        <img src='https://i.insider.com/5c954296dc67671dc8346930?width=1136&format=jpeg' alt='pin-location' />
      </picture>
      <div className={styles.pinInfo}>
        <p>Tonight&apos;s Beach Bonfire</p>
      </div>
    </div>
  )
}

export default PinDropItem;