import React, { useState, useEffect } from 'react';
import styles from '../../../styles/photo-album.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavBar from '../../../src/components/NavBar/NavBar';
import { useUserContext } from '../../../src/Contexts/UserContext';

import { PhotoAlbum } from 'react-photo-album';
import { IPhoto } from '../../../Types';
import { getPhotosByTripId } from '../../../src/services/photoService';
import { useRouter } from 'next/router';
import { withAuthUser, AuthAction, withAuthUserTokenSSR } from 'next-firebase-auth';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import FullPageLoader from '../../../src/components/FullPageLoader/FullPageLoader';

function Photos({ photos }:InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [allPhotos, setPhotos] = useState<IPhoto[]>(photos);
  const router = useRouter();

  return (
    <>
      <NavBar />
      <div className={styles.album}>
        <div onClick={()=>{router.back()}} className={styles.cursor}>
          <ArrowBackIcon/>
        </div>
        <PhotoAlbum layout='rows' photos={allPhotos}/>
      </div>
    </>
  )
}
export default withAuthUser()(Photos as React.FunctionComponent<any>)

export const getServerSideProps: GetServerSideProps<{photos: IPhoto[]}> = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,

})(async ({ params, AuthUser }) => {
  const token = await AuthUser.getIdToken()
  const photos = await getPhotosByTripId(token as string, params?.id as string) as IPhoto[];

  return { props:{ photos }}
})



