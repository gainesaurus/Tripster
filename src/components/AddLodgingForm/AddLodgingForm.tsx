import React, { useState, useRef } from 'react';

import { Loader } from '@googlemaps/js-api-loader';
import styles from './AddLodgingForm.module.css';


const libraries = ["places"] as any;

function AddLodgingForm ({ closeForm }: any) {
  let autoCompleteRef = useRef<any>();
  let inputRef = useRef<any>();
  const [latLng, setLatLng] = useState<google.maps.LatLng>();


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

  return (
    <div className={styles.addEventContainer}>
      <div className={styles.infoContainer}>
        <h2>Share where you're staying!</h2>
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
      <input
      className={styles.lodgingSearchInput}
      type='text-box'
      placeholder='anything else you want to share?'
      >

      </input>

      <div className={styles.buttonDiv}>
        <button className={styles.submitButton}>Submit</button>
        <button className={styles.cancelButton} onClick={closeForm}>Cancel</button>
      </div>
    </div>

  )
}

export default AddLodgingForm;