import React, { useEffect, useState } from 'react';

import styles from './AlbumList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { IPhoto } from '../../../Types'
import { getPhotosByTripId } from '../../services/photoService';
import { useUserContext } from '../../Contexts/UserContext';
import AddPhotosForm from '../AddPhotosForm/addPhotosForm';
import { AddBox } from '@mui/icons-material';
import GridViewIcon from '@mui/icons-material/GridView';

interface AlbumListProps {
  tripId: string;
}

const  AlbumList = ({ tripId }:AlbumListProps) => {
  const [allPhotos, setPhotos] = useState<IPhoto[]>([]);
  const user = useUserContext();

  useEffect(() => {
    getTripPhotos()
  }, [setPhotos]);

  const getTripPhotos = async () => {
    const photos = await getPhotosByTripId(user.authUser!.token, tripId as string)
    if (photos) {
      setPhotos(photos);
    }
  }


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
        <h1 className={styles.albumListTitle}>Shared Photos</h1>
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
          : <></>
        }
        {
          displayPhotos.length ?
          <Link href='[id]/photo-album' as={`${tripId}/photo-album`}>
          <div className={styles.viewAll}>
            View all
            <GridViewIcon></GridViewIcon>
          </div>
          </Link>
          : <></>
        }
      </div>
    </div>
  )
}

export default AlbumList;