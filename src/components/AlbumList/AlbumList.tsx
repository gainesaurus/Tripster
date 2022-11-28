import React from 'react';

import styles from './AlbumList.module.css';

function AlbumList () {

  return (
    <div className={styles.albumContainer}>
      <h1 className={styles.albumListTitle}>Shared Albums:</h1>
      <div className={styles.albumList}>
        <picture className={styles.albumImage} >
          <source srcSet='https://www.arrafting.com/wp-content/uploads/2015/03/DSC_6708-min.jpg' type='image/webp' />
          <img src='https://www.arrafting.com/wp-content/uploads/2015/03/DSC_6708-min.jpg' alt='trip-photo' />
        </picture>
        <picture className={styles.albumImage} >
          <source srcSet='https://www.reserveamerica.com/marketing/html/acm/__shared/assets/family_reunion_games2500.jpg' type='image/webp' />
          <img src='https://www.reserveamerica.com/marketing/html/acm/__shared/assets/family_reunion_games2500.jpg' alt='trip-photo' />
        </picture>
      </div>
    </div>
  )
}

export default AlbumList;