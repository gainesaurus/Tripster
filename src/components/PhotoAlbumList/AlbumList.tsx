import React, { FC } from 'react';

import styles from './AlbumList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IPhoto } from '../../../Types'

interface AlbumListProps {
  photos: IPhoto[];
  id: number;
}

const  AlbumList: FC<AlbumListProps> = ({ photos, id }) => {
  let displayPhotos = photos.slice(0, 5);

  return (
    <div className={styles.albumContainer}>
      <h1 className={styles.albumListTitle}>Shared Photos:</h1>
      <div className={styles.albumList}>
        {displayPhotos.map((photo: IPhoto, i) => {
          console.log(photo);
          return <Image key={i + 1} src={photo.src} width={200} height={150} alt='shared photo' className={styles.image}/>
        })}
        <Link href='[id]/photo-album' as={`${id}/photo-album`}>
          <div className={styles.viewAll}>
            View All...
          </div>
        </Link>
      </div>
    </div>
  )
}

export default AlbumList;