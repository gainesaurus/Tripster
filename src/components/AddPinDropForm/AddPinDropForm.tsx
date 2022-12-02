import React, { useState, useRef } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import styles from './AddPinDropForm.module.css';
import { Close } from '@mui/icons-material';


const libraries = ["places"] as any;

interface AddPinDropProps {
  closeForm: () => void
}
function AddPinDropForm ({closeForm}:AddPinDropProps) {
  const inputRef = useRef<any>();
  const autoCompleteRef = useRef<any>();
  const [info, setInfo] = useState<string>();
  const [latLng, setLatLng] = useState<google.maps.LatLng>();

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    version: "weekly",
    libraries: libraries
  });
  loader.load()
  .then(()=> {
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
    });
    if (latLng) {
      new google.maps.Map(document.getElementById('map-display') as HTMLElement, {
        center: latLng,
        zoom: 12
      })
    }

  })

  const handleSubmit = (e:any) => {
    e.preventDefault();
  }

  return (
    <div className={styles.addPinDropContainer}>
      <form onSubmit={handleSubmit} className={styles.addPinDropContainer}>
      <button className={styles.XButton} onClick={closeForm}><Close /></button>
        <div className={styles.infoContainer}>
          <h2>Share a location!</h2>
          <input
            placeholder="Add some info..."
            className={styles.locationSearchInput}
            value={info}
            onChange={(e)=>setInfo(e.target.value)}
            ></input>

            <input
            id='search-place'
            ref={inputRef}
            type="text"
            placeholder="Where is it?"
            className={styles.locationSearchInput}
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
export default AddPinDropForm;
