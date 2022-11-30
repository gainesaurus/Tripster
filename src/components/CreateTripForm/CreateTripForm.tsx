import styles from './CreateTripForm.module.css';
import React, { useState } from 'react';

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { storage, uploadImage } from '../../firebase';
import { ITripItem } from '../../../Types';
import { FilePondFile } from 'filepond';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const CreateTripForm = () => {
  const [imgFiles, setImgFiles] = React.useState<FilePondFile[]>([]);
  const [trip, setTrip] = useState<ITripItem | undefined>();

  const handlePicAdd = (newImages: FilePondFile[]) => {
    console.log('Handle add called');
    newImages.forEach(async (filepond) => {
      const blob = await filepond.file.arrayBuffer();
      const uploaded = await uploadImage(blob);
      console.log(uploaded?.imageUrl);
      trip && uploaded && setTrip({ ...trip, picUrl: uploaded.imageUrl });
    });
    setImgFiles(newImages);
  };

  return (
    <div className={styles.formCont}>
      <h3>Create a new trip</h3>
      <form className={styles.formInputs}>
        <div className={styles.formContImage}>
          <FilePond
            files={imgFiles.map((fileItem) => fileItem.file)}
            onupdatefiles={handlePicAdd}
            allowMultiple={false}
            acceptedFileTypes={['image/*']}
            // server="/api"
            name="files" /* sets the file input name, it's filepond by default */
            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
          />
        </div>

        <input
          className={styles.formInput}
          type="text"
          placeholder="Trip Name"
        ></input>
        <input
          className={styles.formInput}
          type="text"
          placeholder="Description?"
        ></input>
        <input
          className={`${styles.formInput} ${styles.formDate}`}
          type="date"
          placeholder="Start"
        ></input>
        <input
          className={`${styles.formInput} ${styles.formDate}`}
          type="date"
          placeholder="End"
        ></input>
        <button className={styles.button}>Invite friends</button>
        <button className={styles.button}>Create trip</button>
      </form>
    </div>
  );
};
export default CreateTripForm;
