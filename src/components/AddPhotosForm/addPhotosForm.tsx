import React, { useState } from 'react';
import { IPhoto } from '../../../Types';
import styles from './addPhotosForm.module.css';
import { Close } from '@mui/icons-material';
import { MoonLoader } from 'react-spinners';
import imageSize from '@coderosh/image-size';

import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { uploadPhotosToAlbum } from '../../firebase';
import { useUserContext } from '../../Contexts/UserContext';
import { addPhotos } from '../../services/photoService';
import { useRouter } from 'next/router';
import { getImageSize } from 'next/dist/server/image-optimizer';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface AddPhotosProps {
  closeForm: () => void
  setPhotos: any
  allPhotos: IPhoto[]
}

function AddPhotosForm ({ closeForm, setPhotos, allPhotos }:AddPhotosProps) {

  const user = useUserContext()
  const [imgFiles, setImgFiles] = React.useState<FilePondFile[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const router = useRouter()
  const tripId = router.query.id;

  const uploadPic = async () => {
    const token = user.authUser?.token;
    for (const filepond of imgFiles) {
      const blob = await filepond.file.arrayBuffer();

      const size = await imageSize(blob)
      console.log(size)

      let res = await uploadPhotosToAlbum(blob);
      console.log(blob, 'blob')
      let photo = {
        src:res?.imageUrl,
        height:size.height,
        width:size.width,
        tripId: tripId,
      }
      if(photo) {
        console.log(photo);
        let returnedPic;
        returnedPic = await addPhotos(token as string, photo as IPhoto)
        setPhotos({...allPhotos, returnedPic});
      } else {
        console.log('could not save photo.')
      }
    }
    return;
  };

  async function handleSubmit(e:any) {
    e.preventDefault();
    const token = user.authUser?.token;
    if (token && imgFiles.length > 0) {
      setIsLoading(true);
      await uploadPic();
      setIsLoading(false);
      setImgFiles([]);
      closeForm();
    } else {
      alert('All fields are required');
    }
  }
  console.log(imgFiles);

  return(
    <div className={styles.addAttendeeContainer}>
      <button className={styles.XButton} onClick={closeForm}>
        <Close />
      </button>
      <form className={styles.infoContainer} onSubmit={handleSubmit}>
        <h2>Share your photo's!</h2>
        <FilePond
          files={imgFiles.map((fileItem) => fileItem.file)}
          onupdatefiles={setImgFiles}
          allowMultiple={true}
          acceptedFileTypes={['image/*']}
          // server={{uploadPhotosToAlbum}}
          // name="files" /* sets the file input name, it's filepond by default */
          // labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        {
          isLoading? (
          <div className={styles.spinnerContainer}>
            <MoonLoader color="#fff" size={14} speedMultiplier={0.75} />
          </div>
          ) : (
          <div className={styles.buttonDiv}>
            <button
              type='submit'
              className={styles.submitButton}
            >
              Submit
            </button>
          </div>
          )
        }
      </form>
    </div>
  )
}
export default AddPhotosForm;