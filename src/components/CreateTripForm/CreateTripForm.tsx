import styles from './CreateTripForm.module.css';
import React, { useState } from 'react';

import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { auth, uploadImage } from '../../firebase';
import { ITripItem } from '../../../Types';
import { FilePondFile } from 'filepond';
import { createTrip } from '../../services/apiTrip';
import { MoonLoader } from 'react-spinners';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);
interface Props {
  setTripAdded: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTripForm = ({ setTripAdded }: Props) => {
  const initialState: ITripItem = {
    title: '',
    picUrl: '',
    startDate: '',
    endDate: '',
  };

  const [imgFiles, setImgFiles] = React.useState<FilePondFile[]>([]);
  const [trip, setTrip] = useState<ITripItem>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const uploadPic = async () => {
    for (const filepond of imgFiles) {
      const blob = await filepond.file.arrayBuffer();
      return await uploadImage(blob);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = await auth.currentUser?.getIdToken();
    if (token && trip != initialState && imgFiles.length > 0) {
      const uploaded = await uploadPic();
      if (uploaded) {
        await createTrip({ ...trip, picUrl: uploaded.imageUrl }, token);
        setTrip(initialState);
        setImgFiles([]);
      }
    } else {
      alert('All field are required');
    }
    setIsLoading(false);
    setTripAdded(true);
  };

  return (
    <div className={styles.formCont}>
      <h3>Create a new trip</h3>
      <form className={styles.formInputs}>
        <FilePond
          files={imgFiles.map((fileItem) => fileItem.file)}
          onupdatefiles={setImgFiles}
          allowMultiple={false}
          acceptedFileTypes={['image/*']}
          // server="/api"
          name="files" /* sets the file input name, it's filepond by default */
          labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
        />

        <input
          value={trip.title}
          onChange={(e) => setTrip({ ...trip, title: e.target.value })}
          className={styles.formInput}
          type="text"
          placeholder="Trip Name"
        ></input>
        <input
          value={trip.startDate.split('T')[0]}
          onChange={(e) =>
            setTrip({
              ...trip,
              startDate: new Date(e.target.value).toISOString(),
            })
          }
          className={`${styles.formInput} ${styles.formDate}`}
          type="date"
          placeholder="Start"
        ></input>
        <input
          value={trip.endDate.split('T')[0]}
          onChange={(e) =>
            setTrip({
              ...trip,
              endDate: new Date(e.target.value).toISOString(),
            })
          }
          className={`${styles.formInput} ${styles.formDate}`}
          type="date"
          placeholder="End"
        ></input>
        <button className={styles.button}>Invite friends</button>

        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <MoonLoader color="#fff" size={14} speedMultiplier={0.75} />
          </div>
        ) : (
          <button
            className={styles.button}
            onClick={async (e) => await handleSubmit(e)}
          >
            Create trip
          </button>
        )}
      </form>
    </div>
  );
};
export default CreateTripForm;
