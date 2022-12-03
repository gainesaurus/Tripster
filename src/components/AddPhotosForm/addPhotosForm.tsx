import React, { useState } from 'react';
import { IPhoto } from '../../../Types';
import styles from './addPhotosForm.module.css';
import { Close } from '@mui/icons-material';
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { uploadPhotosToAlbum } from '../../firebase';
import { useUserContext } from '../../Contexts/UserContext';
import { addPhotos } from '../../services/photoService';

interface AddPhotosProps {
  closeForm: () => void
  setPhotos: any
  allPhotos: IPhoto[]
}

function AddPhotosForm ({ closeForm, setPhotos, allPhotos }:AddPhotosProps) {
  const user = useUserContext()
  const [imgFiles, setImgFiles] = React.useState<FilePondFile[]>([]);

  const uploadPic = async () => {
    for (const filepond of imgFiles) {
      const blob = await filepond.file.arrayBuffer();
      let res = await uploadPhotosToAlbum(blob);
      let photo = {src:res?.imageUrl, height:13, width:20}
      return photo;
    }
  };

  async function handleSubmit(e:any) {
    e.preventDefault();
    const token = user.authUser?.token;
    if (token && imgFiles.length > 0) {
      let uploadedPhoto = await uploadPic();
      console.log(uploadedPhoto)

    } else {
      alert('All fields are required');
    }

  }

  return(
    <div className={styles.addAttendeeContainer}>
      <form className={styles.infoContainer} onSubmit={handleSubmit}>
        <button className={styles.XButton} onClick={closeForm}>
          <Close />
        </button>
        <h2>Share your photo's!</h2>
        <FilePond
          files={imgFiles.map((fileItem) => fileItem.file)}
          onupdatefiles={setImgFiles}
          allowMultiple={true}
          acceptedFileTypes={['image/*']}
          name="files" /* sets the file input name, it's filepond by default */
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />
        <div className={styles.buttonDiv}>
          <button
            type='submit'
            className={styles.submitButton}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
export default AddPhotosForm;