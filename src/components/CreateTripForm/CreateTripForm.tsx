import { Close } from '@mui/icons-material';
import React, { FormEvent, useState } from 'react';

import { FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import { MoonLoader } from 'react-spinners';
import { ITripItem } from '../../../Types';
import { useTripsContext } from '../../Contexts/TripsContext';
import { useUserContext } from '../../Contexts/UserContext';
import { uploadImage } from '../../firebase';

import { inviteToTrip } from '../../services/inviteService';
import { createTrip } from '../../services/tripService';
import AddAttendeeForm from '../AddAttendeeForm/AddAttendeeForm';
import styles from './CreateTripForm.module.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

interface CreateTripFormProps {
  closeForm: () => void;
}
const CreateTripForm = ({ closeForm }: CreateTripFormProps) => {
  const initialState: ITripItem = {
    title: '',
    picUrl: '',
    startDate: '',
    endDate: '',
  };

  const context = useTripsContext();
  const userContext = useUserContext();
  const [imgFiles, setImgFiles] = useState<FilePondFile[]>([]);
  const [trip, setTrip] = useState<ITripItem>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [invites, setInvites] = useState<string[]>([]);

  const uploadPic = async () => {
    for (const filepond of imgFiles) {
      const blob = await filepond.file.arrayBuffer();
      return await uploadImage(blob);
    }
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = userContext.authUser?.token;
    if (trip != initialState && token && imgFiles.length > 0) {
      const uploaded = await uploadPic();
      if (uploaded) {
        const newTrip = await createTrip(
          { ...trip, picUrl: uploaded.imageUrl },
          token,
        );
        newTrip && newTrip._id && inviteToTrip(invites, newTrip._id, token);
        setTrip(initialState);
        setImgFiles([]);
      }
    } else {
      alert('All fields are required');
    }
    setIsLoading(false);
    context.setTripAdded(true);
  };

  const openForm = (e: FormEvent) => {
    e.preventDefault();
    document.getElementById('addAttendeeForm')!.style.display = 'flex';
  };

  return (
    <div className={styles.formCont}>
      <div className={styles.titleX}>
        <h3 className={styles.formTitle}>Create a new trip</h3>
        <button className={styles.XButton} onClick={closeForm}>
          <Close />
        </button>
      </div>
      <form className={styles.formInputs}>
        <FilePond
          files={imgFiles.map((fileItem) => fileItem.file)}
          onupdatefiles={setImgFiles}
          allowMultiple={false}
          acceptedFileTypes={['image/*']}
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
        <button className={styles.button} onClick={openForm}>
          Invite friends
        </button>
        <AddAttendeeForm setInvites={setInvites} />
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
