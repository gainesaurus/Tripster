import React, { useState, useRef } from 'react';

import styles from './AddLodgingForm.module.css';
import { Close } from '@mui/icons-material';
import { createLodging } from '../../services/lodgingService';
import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/router';
import { useUserContext } from '../../Contexts/UserContext';
import { ILodge } from '../../../Types';
import { ILatLng } from '../../../Types';

const libraries = ["places"] as any;

interface AddLodgingProps {
  closeForm: () => void
  setAllLodging: any
  allLodging: ILodge[]
}

function AddLodgingForm ({ closeForm, setAllLodging, allLodging }:AddLodgingProps) {
  const user = useUserContext();
  let autoCompleteRef = useRef<any>(null);
  let inputRef = useRef<any>(null);
  const [latLng, setLatLng] = useState<ILatLng>();
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const router = useRouter()
  const tripId = router.query.id;

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: "weekly",
    libraries: libraries
  });

  loader.load()
  .then((google) => {
    autoCompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current as HTMLInputElement, {
        fields: ["address_components", "geometry", "icon", "name"]
      }
    );
    autoCompleteRef.current.addListener("place_changed", async function () {
      const place = await autoCompleteRef.current.getPlace();
      console.log({ place });
      let lat = place.geometry.location.lat()
      let lng = place.geometry.location.lng()
      setLatLng({lat, lng});
      setFormattedAddress(place.name);
    });

    let map = new google.maps.Map(document.getElementById('map-display') as HTMLElement, {
      center: latLng,
      zoom: 10
    });
    let panorama = new google.maps.StreetViewPanorama(
      document.getElementById('map-display') as HTMLElement, {
        position: latLng,
        pov: {
          heading: 180,
          pitch: 10,
        }
      });
    map.setStreetView(panorama);

  })
  .catch((e) => console.log(e));

  //HANDLE SUBMIT
  const handleSubmit = (e:any) => {
    e.preventDefault();

    const lodge = {
      tripId: tripId as string,
      title: title as string,
      address: formattedAddress as string,
      latLng: latLng as ILatLng,
    }
    user.authUser && lodge && createLodging(user.authUser.token, lodge).then((lodge:ILodge | void) => {setAllLodging([...allLodging, lodge])})

    setTitle('');
    setLatLng(undefined);
    closeForm();
    inputRef.current.value = '';
  }

  return (
    <div className={styles.addLodgingContainer}>
      <button className={styles.XButton} onClick={closeForm}><Close /></button>
      <form onSubmit={handleSubmit} className={styles.infoContainer}>
        <div>
          <h2>Share where you're staying!</h2>
          <input
            placeholder="What do you want to call this place?"
            className={styles.lodgingSearchInput}
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            ></input>

            <input
            id='search-place'
            ref={inputRef}
            type="text"
            placeholder="Search for your place."
            className={styles.lodgingSearchInput}
            ></input>

        </div>
        {
          latLng?
          <div className={styles.mapDisplay} id='map-display'>
          </div>
          : null
        }

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

export default AddLodgingForm;