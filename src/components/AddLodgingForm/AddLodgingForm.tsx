import React, { useState, useRef } from 'react';

import styles from './AddLodgingForm.module.css';
import { Close } from '@mui/icons-material';

import { createLodging } from '../../services/lodgingService';

import { Loader } from '@googlemaps/js-api-loader';
import { useRouter } from 'next/router';

const libraries = ["places"] as any;

interface AddLodgingProps {
  closeForm: () => void
}

function AddLodgingForm ({ closeForm }:AddLodgingProps) {
  let autoCompleteRef = useRef<any>();
  let inputRef = useRef<any>();
  const [latLng, setLatLng] = useState<google.maps.LatLng>();
  const [formattedAddress, setFormattedAddress] = useState<string>();
  const [title, setTitle] = useState<string>();

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
      setLatLng({lat, lng} as google.maps.LatLng);
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
      tripId: tripId,
      title: title,
      address: formattedAddress,
      latLng: latLng,
    }
    console.log(lodge)
    //createLodging(lodge);

    // setTitle('');
    // setFormattedAddress();
    // setLatLng(null);

    closeForm();
  }

  return (
    <div className={styles.addLodgingContainer}>
      <form onSubmit={handleSubmit} className={styles.addLodgingContainer}>
      <button className={styles.XButton} onClick={closeForm}><Close /></button>
        <div className={styles.infoContainer}>
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
          : <></>
        }

        <div className={styles.buttonDiv}>
          <button
            type='submit'
            className={styles.submitButton}
            onClick={async (e) => handleSubmit(e)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>

  )
}

export default AddLodgingForm;