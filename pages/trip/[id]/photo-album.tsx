import React, { useState, useEffect } from 'react';
import styles from '../../../styles/photo-album.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from '../../../src/components/NavBar/NavBar';
import { useUserContext } from '../../../src/Contexts/UserContext';

import Link from 'next/link';
import { PhotoAlbum } from 'react-photo-album';
import { IPhoto } from '../../../Types';
import { getPhotosByTripId } from '../../../src/services/photoService';
import { useRouter } from 'next/router';


export default function Photos() {
  const [allPhotos, setPhotos] = useState<IPhoto[]>([]);
  const user = useUserContext();
  const router = useRouter();
  const tripId = router.query.id;

  useEffect(() => {
    console.log(tripId);
    getTripPhotos()
  }, [setPhotos]);

  const getTripPhotos = async () => {
    const photos = await getPhotosByTripId(user.authUser!.token, tripId as string)
    if (photos) {
      setPhotos(photos);
    }
  }

  return (
    <>
      <NavBar />
      <div className={styles.album}>
        <div onClick={()=>{router.back()}}>
          <ArrowBackIcon/>
        </div>
        <PhotoAlbum layout='rows' photos={allPhotos}/>
      </div>
    </>
  )
}


