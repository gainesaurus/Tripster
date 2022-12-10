import React, { useState } from 'react';

import styles from './AlbumList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IPhoto } from '../../../Types'
import AddPhotosForm from '../AddPhotosForm/addPhotosForm';
import { AddBox } from '@mui/icons-material';

interface AlbumListProps {
  tripId: string;
  photos: IPhoto[];
}

const  AlbumList = ({ tripId, photos }:AlbumListProps) => {
  const [allPhotos, setPhotos] = useState<IPhoto[]>(photos);

  const openForm = () => {
    document.getElementById('addPhotosForm')!.style.display = 'flex';
  }

  const closeForm = () => {
    document.getElementById('addPhotosForm')!.style.display = 'none';
  }

  let displayPhotos;
  allPhotos.length > 10 ? displayPhotos = allPhotos.slice(0, 8)
  : displayPhotos = allPhotos;

  return (
    <div className={styles.albumContainer}>
      <div className={styles.title}>
        <div className={styles.photoTitleViewAll}>
          <h1 className={styles.albumListTitle}>Shared Photos</h1>
          {
            displayPhotos.length ?
            <Link href='[id]/photo-album' as={`${tripId}/photo-album`}>
            <div className={styles.viewAll}>
              See All
            </div>
            </Link>
            : null
          }
        </div>
        <button onClick={openForm} className={styles.button}>
            <AddBox className={styles.addIcon}/>
        </button>
      </div>
      <div id='addPhotosForm' className={styles.addPhotosForm}>
        <AddPhotosForm closeForm={closeForm} setPhotos={setPhotos} allPhotos={allPhotos}/>
      </div>
      <div className={styles.albumList}>
        {
          displayPhotos.length?
          displayPhotos.map((photo: IPhoto, i) => {
          return <Image key={i + 1} src={photo.src} width={photo.width} height={photo.height} alt='shared photo' loading={'lazy'} className={styles.image}/>
          })
          : null
        }
      </div>
    </div>
  )
}

export default AlbumList;